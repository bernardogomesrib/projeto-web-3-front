'use client'
import { Button } from '@/components/ui/button';
import { PegaThreadsDoBoard } from '@/lib/threads';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import Newthread from '../../components/dialogs/newthread';

// const threadsExample = [
//   {
//     id: "1",
//     titulo: "Thread ojashdfhaiskdfliashdasidji askdhflkajshd asioduhfias d asdi fasdi1",
//     arquivo: "https://via.placeholder.com/150",
//     mensagem: "Mensagem 1 Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel ea non quas autem eaque laboriosam placeat nobis et voluptatem temporibus sit, odit voluptate ipsa, a repellat veritatis, reprehenderit quos distinctio." ,
//     respostas: 10,
//     arquivos: 5
//   },
//   {
//     id: "2",
//     titulo: "Thread 2",
//     arquivo: "https://via.placeholder.com/150",
//     mensagem: "Mensagem 2",
//     respostas: 10,
//     arquivos: 5
//   },
//   {
//     id: "3",
//     titulo: "Thread 3",
//     arquivo: "https://via.placeholder.com/150",
//     mensagem: "Mensagem 3",
//     respostas: 10,
//     arquivos: 5
//   },
//   {
//     id: "4",
//     titulo: "Thread 4",
//     arquivo: "https://via.placeholder.com/150",
//     mensagem: "Mensagem 4",
//     respostas: 10,
//     arquivos: 5
//   },
//   {
//     id: "5",
//     titulo: "Thread 5",
//     arquivo: "https://via.placeholder.com/150",
//     mensagem: "Mensagem 5",
//     respostas: 10,
//     arquivos: 5
//   },
//   {
//     id: "6",
//     titulo: "Thread 6",
//     arquivo: "https://via.placeholder.com/150",
//     mensagem: "Mensagem 6",
//     respostas: 10,
//     arquivos: 5
//   },
//   {
//     id: "7",
//     titulo: "Thread 7",
//     arquivo: "https://via.placeholder.com/150",
//     mensagem: "Mensagem 7",
//     respostas: 10,
//     arquivos: 5
//   },
//   {
//     id: "8",
//     titulo: "Thread 8",
//     arquivo: "https://via.placeholder.com/150",
//     mensagem: "Mensagem 8",
//     respostas: 10,
//     arquivos: 5
//   },
//   {
//     id: "9",
//     titulo: "Thread 9",
//     arquivo: "https://via.placeholder.com/150",
//     mensagem: "Mensagem 9",
//     respostas: 10,
//     arquivos: 5
//   },
//   {
//     id: "10",
//     titulo: "Thread 10",
//     arquivo: "https://via.placeholder.com/150",
//     mensagem: "Mensagem 10",
//     respostas: 10,
//     arquivos: 5
//   },
//   {
//     id: "11",
//     titulo: "Thread 11",
//     arquivo: "https://via.placeholder.com/150",
//     mensagem: "Mensagem 11",
//     respostas: 10,
//     arquivos: 5
//   },
//   {
//     id: "12",
//     titulo: "Thread 12",
//     arquivo: "https://via.placeholder.com/150",
//     mensagem: "Mensagem 12",
//     respostas: 10,
//     arquivos: 5
//   },
//   {
//     id: "13",
//     titulo: "Thread 13",
//     arquivo: "https://via.placeholder.com/150",
//     mensagem: "Mensagem 13",
//     respostas: 10,
//     arquivos: 5
//   },
//   {
//     id: "14",
//     titulo: "Thread 14",
//     arquivo: "https://via.placeholder.com/150",
//     mensagem: "Mensagem 14",
//     respostas: 10,
//     arquivos: 5
//   },
//   {
//     id: "15",
//     titulo: "Thread 15",
//     arquivo: "https://via.placeholder.com/150",
//     mensagem: "Mensagem 15",
//     respostas: 10,
//     arquivos: 5
//   },
//   {
//     id: "16",
//     titulo: "Thread 16",
//     arquivo: "https://via.placeholder.com/150",
//     mensagem: "Mensagem 16",
//     respostas: 10,
//     arquivos: 5
//   },
//   {
//     id: "17",
//     titulo: "Thread 17",
//     arquivo: "https://via.placeholder.com/150",
//     mensagem: "Mensagem 17",
//     respostas: 10,
//     arquivos: 5
//   },
//   {
//     id: "18",
//     titulo: "Thread 18",
//     arquivo: "https://via.placeholder.com/150",
//     mensagem: "Mensagem 18",
//     respostas: 10,
//     arquivos: 5
//   },
//   {
//     id: "19",
//     titulo: "Thread 19",
//     arquivo: "https://via.placeholder.com/150",
//     mensagem: "Mensagem 19",
//     respostas: 10,
//     arquivos: 5
//   },
//   {
//     id: "20",
//     titulo: "Thread 20",
//     arquivo: "https://via.placeholder.com/150",
//     mensagem: "Mensagem 20",
//     respostas: 10,
//     arquivos: 5
//   },
// ]

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