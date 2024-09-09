'use client'
import { Button } from '@/components/ui/button';
import { PegaThreadsDoBoard } from '@/lib/threads';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import Newthread from '../../components/dialogs/newthread';


export default function BoardPage ({ params }: { params: { boardid: string } }) {
  const [threads,setThreads] = React.useState<any[]>([]);
  const [paginas,setPaginas] = React.useState(10);
  const [paginaAtual,setPaginaAtual] = React.useState(1);
  const [existentBoard,setExistentBoard] = React.useState(false);
  const boardid = params.boardid;
  const usouUmavez = React.useRef(false);
  React.useEffect(() => {
    async function pegaThreads(){
      const result = await PegaThreadsDoBoard(boardid);
      console.log(result);
      setThreads(result);
      if (result.length > 0) {
        setExistentBoard(true);
      }
    }
    if (!usouUmavez.current) {
      console.log("Board ID: ", boardid);
      usouUmavez.current = true;
      pegaThreads();
    }
  });
  const recarregarThreads = async () => {
    const result = await PegaThreadsDoBoard(boardid);
    console.log(result);
    setThreads(result);
  }
    console.log(threads)
    return (
      <div className="flex flex-wrap justify-top align-center justify-center">
        <div className="flex w-full wrap justify-left gap-2">
          <Button onClick={recarregarThreads}>recarregar</Button>
          <Newthread Trigger={""} />
        </div>
        {threads.length>0 ? ( threads.map((thread, index) => (
          <Link href={boardid+"/"+thread.id} key={thread.id+"threadId"} className="w-[97%] sm:w-[25%] md:w-[19.6%] lg:w-[15%] xl:w-[13%] 2xl:w-[11%] flex flex-wrap m-2">
            <h1 className="w-full text-center truncate" title={thread.titulo}>{thread.titulo}</h1>
            <div className="w-full flex justify-center">
              {thread.arquivo && !thread.arquivo.endsWith("undefined") ?(<Image width={150} height={150} src={thread.arquivo} alt={thread.titulo} />): (null)}
            </div>
            <p className="line-clamp-3 text-center items-center w-full h-[4.8em]" title={thread.mensagem}>
              {thread.mensagem.split(/\r?\n/).map((line:string, index:any) => (<div key={index+"dividindoMensagem"}>{line}</div>))}
            </p>
            <div className='w-full flex justify-evenly'><strong>C:{thread.clicks}</strong> </div>
          </Link>
        )).reverse()):(<div className="w-[97%] sm:w-[25%] md:w-[19.6%] lg:w-[15%] xl:w-[13%] 2xl:w-[11%] flex flex-wrap m-2">
        <h1 className="w-full text-center truncate" title="Nada por enquanto">Nada por enquanto</h1>
        <div className="w-full flex justify-center">
          <Image width={150} height={150} src="/logo.png" alt="o logo do ITTHREADS" />
        </div>
        <p className="line-clamp-3 text-center items-center w-full h-[4.9em]" title="Não tem nada por enquanto">
          Não tem nada por enquanto
        </p>
        <div className='w-full flex justify-evenly'><strong>C:404</strong> </div>
      </div>)}
      </div>
    );
  
};