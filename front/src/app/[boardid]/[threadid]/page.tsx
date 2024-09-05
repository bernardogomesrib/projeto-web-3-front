'use client'
import NewAnswer from '@/components/dialogs/newAnswer';
import { Button, buttonVariants } from '@/components/ui/button';
import { Card, CardFooter } from '@/components/ui/card';

import BoardImage from '@/components/arquivosRetorno/files';
import { Thread } from '@/lib/threads';
import Link from 'next/link';
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
  const [thread, setThread] = useState<any>({});
  const usouUmaVez = React.useRef(false);
  const [dialogResponse, setDialogResponse] = useState(false);
  const [loading, setLoading] = useState(true); // Novo estado para controlar o carregamento


  
  useEffect(() => {
    if (!usouUmaVez.current) {
      pegaRespostas();
      usouUmaVez.current = true;
    }
  }, []); // Array vazio para garantir que seja executado uma vez
  
  const pegaRespostas = async () => {
    const r = await Thread(boardid, threadid);
    console.log(r);
    // Apenas atualize os estados se os dados forem diferentes
    if (r.id && r.id !== thread.id && r.answers.length != thread.answers?.length) {
      setThread(r);
      setRespostas(r.answers);
      console.log("era pra ter atualizado.")
      setLoading(false); // Concluiu o carregamento
    }
  };
  
  const atualizaRespostas = async()=>{
    const resposta = await Thread(boardid, threadid);
    setRespostas(resposta.answers);

  }

  function newAnswerSent() {
    setDialogResponse(false);
    atualizaRespostas();
  }


  return (
    <div className="w-[99vw] flex flex-wrap gap-2 items-start justify-center">
      <Card className="m-1 text-[var(--font-color)] w-[98%]">
        {!loading && (
          <div className="pl-5">
            {thread.id} - {thread.userId ? thread.userName : "Anonymous"} - { new Intl.DateTimeFormat('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
            }).format(new Date(thread.createdAt))}
            <Link className={buttonVariants({ variant: "default" }) + " text-[var(--font-color)] h-5"} href={"/" + boardid}>
              Voltar
            </Link>
          </div>
        )}
        {loading && <p>Carregando...</p>} {/* Exibe um carregando enquanto a página é carregada */}
        <h4 className="pl-6">{thread.titulo}</h4>
        <div className="flex p-6 justify-left">
          {thread.arquivo && (
            <BoardImage url={thread.arquivo as string} alt={thread.titulo}/>
          )}
          <p className="p-6">{thread.mensagem}</p>
        </div>
        <CardFooter className='flex flex-wrap'>
          <Button className="fixed right-0 top-1/2 transform -translate-y-1/2" onClick={() => { setDialogResponse(!dialogResponse) }}>
            Responder thread
          </Button>
          {respostas.map((r, index) => (
            <ResponseCard key={index} id={`${index}cardid`} index={index} resp={r} />
          ))}
        </CardFooter>
        <div className='pl-6 pb-6'>
          <Button onClick={atualizaRespostas}>Atualizar respostas</Button>
        </div>
      </Card>
      {dialogResponse && (<NewAnswer boardId={boardid} threadId={threadid} done={newAnswerSent} />)}
    </div>
  );
}