'use client'
import NewAnswer from '@/components/dialogs/newAnswer';
import { Button, buttonVariants } from '@/components/ui/button';
import { Card, CardFooter } from '@/components/ui/card';
import { getUserName } from '@/lib/admin';
import { Thread } from '@/lib/threads';
import Image from 'next/image';
import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { ResponseCard } from './responseCard';
/* 
const boardsExistentes = [
  "hw",
  "elt",
  "gms",
  "pg",
  "so",
  "ia",
  "gm"
]
const threadsExistentes = [
  "123",
  "yryry",
  "pg",
  "so",
  "ia",
  "1"
]
 */
/* 
const respostasRecebidas = [{
  id: 1,
  mensagem: "mensage",
  arquivo: "/icondialog.png",
  ip: "123.123.123"
},
{
  id: 2,
  mensagem: "Losexo voluntário id, laborum et itaque explicabo doloremque fugiat ipsa deserunt nesciunt culpa, saepe doloribus voluptatem commodi tempora vel sequi animi.",
  arquivo: '',
  ip: "45.77.88.55"
},
{
  id: 3,
  mensagem: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro cumque voluptate id, laborum et itaque explicabo doloremque fugiat ipsa deserunt nesciunt culpa, saepe doloribus voluptatem commodi tempora vel sequi animi.",
  arquivo: '/games.png',
  ip: ""
},
{
  id: 4,
  mensagem: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro cumque voluptate id, laborum et itaque explicabo doloremque fugiat ipsa deserunt nesciunt culpa, saepe doloribus voluptatem commodi tempora vel sequi animi.",
  arquivo: '/IA.png',
  ip: ""
},
{
  id: 5,
  mensagem: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro cumque voluptate id, laborum et itaque explicabo doloremque fugiat ipsa deserunt nesciunt culpa, saepe doloribus voluptatem commodi tempora vel sequi animi.",
  arquivo: '/vercel.svg',
  ip: ""
},
{
  id: 6,
  mensagem: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro cumque voluptate id, laborum et itaque explicabo doloremque fugiat ipsa deserunt nesciunt culpa, saepe doloribus voluptatem commodi tempora vel sequi animi.",
  arquivo: '/errorImage.png',
  ip: ""
},
{
  id: 7,
  mensagem: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro cumque voluptate id, laborum et itaque explicabo doloremque fugiat ipsa deserunt nesciunt culpa, saepe doloribus voluptatem commodi tempora vel sequi animi.",
  arquivo: '/SO.png',
  ip: ""
},
{
  id: 8,
  mensagem: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro cumque voluptate id, laborum et itaque explicabo doloremque fugiat ipsa deserunt nesciunt culpa, saepe doloribus voluptatem commodi tempora vel sequi animi.",
  arquivo: '/SO.png',
  ip: ""
},
{
  id: 9,
  mensagem: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro cumque voluptate id, laborum et itaque explicabo doloremque fugiat ipsa deserunt nesciunt culpa, saepe doloribus voluptatem commodi tempora vel sequi animi.",
  arquivo: '/SO.png',
  ip: ""
}


] */


class Resposta {
  constructor(public resp: any) { }
  getCard() {
    console.log("fui chamado!");
  }
}



export default function ThreadPage({ params }: { params: { boardid: string, threadid: string } }) {
  const { boardid, threadid } = params;
  const [respostas, setRespostas] = useState<Resposta[]>([]);
  const [imageExpanded, setImageExpanded] = useState(false);
  const [thread, setThread] = useState<any>({});
  const [originalSize, setOriginalSize] = useState({ width: 0, height: 0 }); // Tamanho real da imagem
  const usouUmaVez = React.useRef(false);
  const [dialogResponse, setDialogResponse] = useState(false);
  const [addedUsers, setAddedUsers] = useState(0);
  const [users, setUsers] = useState<Map<number, string>>(new Map<number, string>());
  const [loading, setLoading] = useState(true); // Novo estado para controlar o carregamento

  async function getUsersNames(mapa: Map<number, string>): Promise<Map<number, string>> {
    console.log("entrou no getUsersNames");
    const newMap = new Map<number, string>(mapa); // Cria uma nova instância do Map para evitar mutações diretas
    newMap.forEach(async (key, value) => {
      if (key === '') {
        const userName = await getUserName(value + '');
        newMap.set(value, userName);
      }
    })
    return newMap;
  }



  const addIdIfNotExists = (id: number, nome: string) => {
    console.log("entrou no addIfNoteExists");
    setUsers(prevMap => {
        if (!prevMap.has(id)) {
            console.log("encontrou um id que não existia no mapa")
            const newMap = new Map(prevMap); // Cria uma nova instância do Map
            newMap.set(id, nome);
            setAddedUsers(prevAddedUsers => {
                const newAddedUsers = prevAddedUsers + 1;
                console.log("valor de addedUsers: ", newAddedUsers);
                return newAddedUsers;
            });
            return newMap;
        }
        console.log("não encontrou um id que não existia no mapa")
        return prevMap;
    });
};



const pegaRespostas = async () => {
  const respostas = await Thread(boardid, threadid);
  setThread(respostas);
  console.log(respostas);
  if (respostas.id === undefined || respostas.id === null || respostas.id === "" || respostas.id === 0) {
    return redirect(notFound());
  }

  if (respostas.userId != null) {
    addIdIfNotExists(respostas.userId, "");
  }
  setRespostas(respostas.answers);

  respostas.answers.forEach((r: any) => {
    if (r.userId != null) {
      addIdIfNotExists(r.userId, "");
    }
  });
   
  const img = new window.Image();
  img.src = respostas.arquivo;
  img.onload = () => {
    setOriginalSize({
      width: img.naturalWidth,
      height: img.naturalHeight,
    });
  };

  setLoading(false); // Concluiu o carregamento
};

useEffect(() => {
  if (!usouUmaVez.current) {
    pegaRespostas();
    
    usouUmaVez.current = true;
  }
}, []);

useEffect(() => {
  if (addedUsers > 0) {
    getUsersNames(users).then(updatedUsers => {
      setUsers(updatedUsers);
      setAddedUsers(0);
    });
  }
}, [addedUsers, users]);

  function newAnswerSent() {
    setDialogResponse(false);
    pegaRespostas();
  }

  const expand = () => {
    setImageExpanded(!imageExpanded);
  };
  return (
    <div className="w-[99vw] flex flex-wrap gap-2 items-start justify-center">
      <Card className="m-1 text-[var(--font-color)] w-[98%]">
        {!loading && (
          <div className="pl-5">
            {thread.id} - {thread.userId ? users.get(thread.userId) ?? "Carregando nome..." : "Anonymous"}
            <Link className={buttonVariants({ variant: "default" }) + " text-[var(--font-color)] h-5"} href={"/" + boardid}>
              Voltar
            </Link>
          </div>
        )}
        {loading && <p>Carregando...</p>} {/* Exibe um carregando enquanto a página é carregada */}
        <h4 className="pl-6">{thread.titulo}</h4>
        <div className="flex p-6 justify-left">
          {thread.arquivo && (
            <div className="flex flex-col items-center">
              <p className="text-xs flex flex-row items-center">
                {originalSize.width}x{originalSize.height} {/* Mostra o tamanho original */}
                <Button className="p-0 text-decoration:underline h-5 bg-transparent" onClick={expand}>
                  {imageExpanded ? "Diminuir imagem" : "Expandir imagem"}
                </Button>
              </p>
              
              <Image
                width={imageExpanded ? originalSize.width : 150}
                height={imageExpanded ? originalSize.height : 150}
                src={thread.arquivo}
                alt={thread.mensagem}
                onClick={expand}
                unoptimized={imageExpanded} // Desativa otimização quando expandido
              />
            </div>
          )}
          <p className="p-6">{thread.mensagem}</p>
        </div>
        <CardFooter className='flex flex-wrap'>
          <Button className="fixed right-0 top-1/2 transform -translate-y-1/2" onClick={() => { setDialogResponse(!dialogResponse) }}>
            Responder thread
          </Button>
          {respostas.map((r, index) => (
            <ResponseCard key={index} id={`${index}cardid`} index={index} resp={r} users={users} />
          ))}
        </CardFooter>
        <div className='pl-6 pb-6'>
          <Button onClick={pegaRespostas}>Atualizar respostas</Button>
        </div>
      </Card>
      {dialogResponse && (<NewAnswer boardId={boardid} threadId={threadid} done={newAnswerSent} />)}
    </div>
  );
}