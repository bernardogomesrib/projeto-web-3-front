'use client'
import { Button } from '@/components/ui/button';
import { BoardExiste } from '@/lib/boards';
import { PegaThreadsDoBoard, requestNewPage } from '@/lib/threads';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import Newthread from '../../components/dialogs/newthread';


export default function BoardPage ({ params }: { params: { boardid: string } }) {
  const [threads,setThreads] = React.useState<any[]>([]);
  const [paginas,setPaginas] = React.useState(10);
  const [paginaAtual,setPaginaAtual] = React.useState(1);
  
  const boardid = params.boardid;
  const usouUmavez = React.useRef(false);
  React.useEffect(() => {
    async function pegaThreads(){
      const existeMesmo = await BoardExiste(boardid);
      const result = await PegaThreadsDoBoard(boardid);
      console.log(result);
      setThreads(result.data);
      setPaginas(result.totalPages);
      setPaginaAtual(result.currentPage);
      if(!existeMesmo){
        setThreads([{titulo:"Board não existe",mensagem:"Board não existe",arquivo:"/errorImage.png",id:"0",clicks:404}]);
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
    //console.log(threads)
  const paginar = async (pagina:number) => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}${boardid}/threads?page=${pagina}&size=20`
    //console.log(url);
    try{const result = await requestNewPage(url);
    setThreads(result.data);
    setPaginas(result.totalPages);
    setPaginaAtual(result.currentPage);
    }catch(err:any){
      alert(err.message);
    }
  }
    return (
      <div className="flex flex-wrap justify-top align-center justify-center">
        <div className="flex w-full wrap justify-left gap-2">
          <Button onClick={recarregarThreads}>recarregar</Button>
          <Newthread Trigger={""} />
        </div>
        {threads.length>0 ? ( threads.map((thread, index) => (
          <Link href={boardid+"/"+thread.id} key={thread.id+"threadId"} className="w-[97%] sm:w-[25%] md:w-[19.6%] lg:w-[15%] xl:w-[13%] 2xl:w-[11%] flex flex-wrap m-2">
            <strong className="w-full text-center truncate" title={thread.titulo}>{thread.titulo}</strong>
            <div className="w-full flex justify-center">
              {thread.arquivo && !thread.arquivo.endsWith("undefined") ?(<Image width={150} height={150} src={thread.arquivo} alt={thread.titulo} />): (null)}
            </div>
            <div className="line-clamp-3 text-center items-center w-full h-[4.8em]" title={thread.mensagem}>
              {thread.mensagem.split(/\r?\n/).map((line:string, index:any) => (<div key={index+"dividindoMensagem"}>{line}</div>))}
            </div>
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

      
      <div className="flex w-full gap-2 justify-center">
          <Button onClick={()=>{paginar(1)}}>{'<<'}</Button>
          <Button onClick={()=>{if(paginaAtual>1){paginar(paginaAtual-1)}}}>{'<'}</Button>
          {Array.from({ length: paginas }, (_, i) => {
            if ((i >= paginaAtual - 3 && i <= paginaAtual + 1)) {
              return (
                <Button
                  className={(i + 1 === paginaAtual) ? '' : 'bg-transparent underline'}
                  key={i + 1}
                  onClick={() => {paginar(i + 1) }}
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
          <Button onClick={()=>{if(paginas>paginaAtual){paginar(paginaAtual+1)}}}>{'>'}</Button>
          <Button onClick={()=>{paginar(paginas)}}>{'>>'}</Button>
        </div> 
      </div>
    );
      
};