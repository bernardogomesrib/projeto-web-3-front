'use client'
import { Button } from '@/components/ui/button';
import { Card, CardFooter } from '@/components/ui/card';
import Image from 'next/image';
import { notFound, redirect } from 'next/navigation';
import React, { useState } from 'react';

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


const respostas = [{  
      id:1,
      mensagem:"mensage",
      arquivo:"icondialog.png",
      ip:"123.123.123"
    },
    {
      id:2,
      mensagem: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro cumque voluptate id, laborum et itaque explicabo doloremque fugiat ipsa deserunt nesciunt culpa, saepe doloribus voluptatem commodi tempora vel sequi animi.",
      arquivo:'SO.png',
      ip:"45.77.88.55"
    },
    {
      id:3,
      mensagem: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro cumque voluptate id, laborum et itaque explicabo doloremque fugiat ipsa deserunt nesciunt culpa, saepe doloribus voluptatem commodi tempora vel sequi animi.",
      arquivo:'SO.png',
      ip:""
      },
    {
      id:4,
      mensagem: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro cumque voluptate id, laborum et itaque explicabo doloremque fugiat ipsa deserunt nesciunt culpa, saepe doloribus voluptatem commodi tempora vel sequi animi.",
      arquivo:'SO.png',
      ip:""
    },
    {
      id:5,
      mensagem: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro cumque voluptate id, laborum et itaque explicabo doloremque fugiat ipsa deserunt nesciunt culpa, saepe doloribus voluptatem commodi tempora vel sequi animi.",
      arquivo:'SO.png',
      ip:""
    },
    {
      id:6,
      mensagem: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro cumque voluptate id, laborum et itaque explicabo doloremque fugiat ipsa deserunt nesciunt culpa, saepe doloribus voluptatem commodi tempora vel sequi animi.",
      arquivo:'SO.png',
      ip:""
    },
    {
      id:7,
      mensagem: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro cumque voluptate id, laborum et itaque explicabo doloremque fugiat ipsa deserunt nesciunt culpa, saepe doloribus voluptatem commodi tempora vel sequi animi.",
      arquivo:'SO.png',
      ip:""
    },
    {
      id:8,
      mensagem: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro cumque voluptate id, laborum et itaque explicabo doloremque fugiat ipsa deserunt nesciunt culpa, saepe doloribus voluptatem commodi tempora vel sequi animi.",
      arquivo:'SO.png',
      ip:""
    },
    {
      id:9,
      mensagem: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro cumque voluptate id, laborum et itaque explicabo doloremque fugiat ipsa deserunt nesciunt culpa, saepe doloribus voluptatem commodi tempora vel sequi animi.",
      arquivo:'SO.png',
      ip:""
    }
    
  
]
type size = {
  width:number,
  height:number
}
export type res ={
  resposta:any,
  imageSize:size|null,
  imageExpanded:boolean
}
function expand(boolean:boolean){
  boolean = !boolean;
}
function handleLoad(resp:res,e:any){
  resp.imageSize!.width = e.target.naturalWidth;
  resp.imageSize!.height = e.target.naturalHeight;
}
export default function ThreadPage({ params }: { params: { boardid: string,threadid:string } }) {
  const boardid = params.boardid;
  const threadid = params.threadid;
  const thread =  {
    id: 1,
    titulo: "como lidar com isto?",
    mensagem: "fui comprar um notebook só pra ficar em casa como servidor ou substituir o meu notebook antigo, mas daí quando perguntei sobre o notebook que estava a venda a mulher me manda uma dessas, eu achei que fosse sempre uma piadada internet, não uma realidade :(",
    arquivo: "https://storage.googleapis.com/projetoweb3-b30a2.appspot.com/Captura de tela 2024-08-25 103112.png",
    ip: "::ffff:179.73.195.95",
    clicks: 1,
    createdAt: "2024-09-01T20:13:03.000Z",
    updatedAt: "2024-09-01T21:03:34.000Z",
    boardId: "elt",
    userId: null
  }
  
  //useState<any|null>();
  const answers = useState<any[]>([]);
  const usouUmavez = React.useRef(false);
  const [expandThreadImage,setExpandThreadImage] = useState(false);
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
  const [respostas,setResposta] = useState<res[]|null>(null)
  const [respostasImageSize,setRespostasImageSize] = useState<any[]>([{}])
  
  const handleImageLoad = (e:any) => {
    setImageSize({
      width: e.target.naturalWidth,
      height: e.target.naturalHeight,
    });
  };
  const handleImageClick= ()=>{
    setExpandThreadImage(!expandThreadImage);
  }
  React.useEffect(() => {
    async function requests() {
      
    }
    if (!usouUmavez.current) {
      console.log("Board ID: ", boardid);
      console.log("Thread ID: ", threadid);


      usouUmavez.current = true;
    }
  });

  if (boardsExistentes.includes(boardid)) {

    if (threadsExistentes.includes(threadid)) {
      return (
        <div className="w-[99vw] flex flex-wrap gap-2 items-start justify-center">
          <Card className='m-1'>
            <div className="pl-5">{thread.id} - {thread.userId?thread.userId:"Anonymous"}</div>
            <h4 className='pl-6'>{thread.titulo}</h4>
            <div className='flex p-6 justify-left'>
              <div className='flex-wrap flex'>
              <p className='text-xs'>{imageSize.width}x{imageSize.height} <Button className="p-0 text-decoration:underline h-5 bg-transparent" onClick={handleImageClick}>{expandThreadImage?("Diminuir imagem"):("Expandir imagem")}</Button></p>
              {!expandThreadImage?(<Image width={150} height={150} src={thread.arquivo} alt={thread.titulo} onClick={handleImageClick} onLoad={handleImageLoad}/>):(<Image width={imageSize.width} height={imageSize.height} src={thread.arquivo} alt={thread.titulo} onClick={handleImageClick} onLoad={handleImageLoad}/>)}
              </div>
              <p className='p-6'>{thread.mensagem}</p>

            </div>
            <CardFooter>
              {/* {respostas.map((resposta)=>{
                <Card key={resposta.id}>
                    
                </Card>
              })} */}
            </CardFooter>
          </Card>
        </div>
      );

    } else {

      return redirect(notFound());
    }
  } else {

    return redirect(notFound());
  }
}
