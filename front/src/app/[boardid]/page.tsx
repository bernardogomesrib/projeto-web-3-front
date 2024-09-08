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
        {threads.map((thread) => (
          <Link href={boardid+"/"+thread.id} key={thread.id+"threadId"} className="w-[97%] sm:w-[25%] md:w-[19.6%] lg:w-[15%] xl:w-[13%] 2xl:w-[11%] flex flex-wrap m-2">
            <h1 className="w-full text-center truncate" title={thread.titulo}>{thread.titulo}</h1>
            <div className="w-full flex justify-center">
              {thread.arquivo ?(<Image width={150} height={150} src={thread.arquivo} alt={thread.titulo} />): (null)}
            </div>
            <p className="line-clamp-3 text-center items-center w-full h-[4.9em]" title={thread.mensagem}>
              {thread.mensagem}
            </p>
            <div className='w-full flex justify-evenly'><strong>C:{thread.clicks}</strong> </div>
          </Link>
        ))}

        {/* quando existir de fato uma paginação talvez descomentar isto
        <div className="flex w-full gap-2 justify-center">
          <Button onClick={()=>{setPaginaAtual(1)}}>{'<<'}</Button>
          <Button onClick={()=>{setPaginaAtual(paginaAtual-1)}}>{'<'}</Button>
          {Array.from({ length: paginas }, (_, i) => {
            if ((i >= paginaAtual - 3 && i <= paginaAtual + 1)) {
              return (
                <Button
                  className={(i + 1 === paginaAtual) ? '' : 'bg-transparent underline'}
                  key={i + 1}
                  onClick={() => setPaginaAtual(i + 1)}
                >
                  {i + 1}
                </Button>
              );
            } else if ((i === (paginaAtual + 2)) || (i === (paginaAtual - 4)) ) {
              return <Button className='bg-transparent hover:bg-tranparent' key={i+1}>...</Button>;
            } else {
              return null;
            }
          })}
          <Button onClick={()=>{setPaginaAtual(paginaAtual+1)}}>{'>'}</Button>
          <Button onClick={()=>{setPaginaAtual(paginas)}}>{'>>'}</Button>
        </div> */}
      </div>
    );
  
};