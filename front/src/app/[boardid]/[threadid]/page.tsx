'use client'
import { Button } from '@/components/ui/button';
import { Card, CardFooter } from '@/components/ui/card';
import Image from 'next/image';
import { notFound, redirect } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { ResponseCard } from './responseCard';

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


]


class Resposta {
  constructor(public resp: any) {}
  getCard() {
    console.log("fui chamado!");
  }
}



export default function ThreadPage({ params }: { params: { boardid: string, threadid: string } }) {
  const { boardid, threadid } = params;
  const thread = {
    id: 1,
    titulo: "como lidar com isto?",
    mensagem: "fui comprar um notebook só pra ficar em casa como servidor ou substituir o meu notebook antigo, mas daí quando perguntei sobre o notebook que estava a venda a mulher me manda uma dessas, eu achei que fosse sempre uma piadada internet, não uma realidade :(",
    arquivo: "https://storage.googleapis.com/projetoweb3-b30a2.appspot.com/Captura de tela 2024-08-25 103112.png",
    ip: "::ffff:179.73.195.95",
    clicks: 1,
    createdAt: "2024-09-01T20:13:03.000Z",
    updatedAt: "2024-09-01T21:03:34.000Z",
    boardId: "elt",
    userId: null,
  };

  const [respostas, setRespostas] = useState<Resposta[]>([]);
  const [expandThreadImage, setExpandThreadImage] = useState(false);
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
  const usouUmaVez = React.useRef(false);

  useEffect(() => {
    if (!usouUmaVez.current) {
      setRespostas(respostasRecebidas.map((r) => new Resposta(r)));
      usouUmaVez.current = true;
    }
  }, []);

  const handleImageLoad = (e: any) => {
    setImageSize({
      width: e.target.naturalWidth,
      height: e.target.naturalHeight,
    });
  };

  const handleImageClick = () => {
    setExpandThreadImage(!expandThreadImage);
  };

  if (!boardsExistentes.includes(boardid)) {
    return notFound();
  }

  if (!threadsExistentes.includes(threadid)) {
    return redirect(notFound());
  }

  return (
    <div className="w-[99vw] flex flex-wrap gap-2 items-start justify-center">
      <Card className="m-1 text-[var(--font-color)]">
        <div className="pl-5">{thread.id} - {thread.userId ? thread.userId : "Anonymous"}</div>
        <h4 className="pl-6">{thread.titulo}</h4>
        <div className="flex p-6 justify-left">
          <div className="flex-wrap flex">
            <p className="text-xs">{imageSize.width}x{imageSize.height} <Button className="p-0 text-decoration:underline h-5 bg-transparent" onClick={handleImageClick}>{expandThreadImage ? "Diminuir imagem" : "Expandir imagem"}</Button></p>
            {!expandThreadImage && thread.arquivo ? (
              <Image width={150} height={150} src={thread.arquivo} alt={thread.titulo} onClick={handleImageClick} onLoad={handleImageLoad} />
            ) : (
              <Image width={imageSize.width} height={imageSize.height} src={thread.arquivo} alt={thread.titulo} onClick={handleImageClick} onLoad={handleImageLoad} />
            )}
          </div>
          <p className="p-6">{thread.mensagem}</p>
        </div>
        <CardFooter className='flex flex-wrap'>
        <Button className="fixed right-0 top-1/2 transform -translate-y-1/2 ">
          Responder thread
        </Button>
          {respostas.map((r, index) => (
            <ResponseCard key={index} id={`${index}cardid`} index={index} resp={r.resp} />
          ))}
        </CardFooter>
      </Card>
    </div>
  );
}