'use client'
import NewAnswer from '@/components/dialogs/newAnswer';
import { Button, buttonVariants } from '@/components/ui/button';
import { Card, CardFooter } from '@/components/ui/card';

import BoardImage from '@/components/arquivosRetorno/files';
import { getUser } from '@/components/navbar/navbar-conteudo';
import { FormatText } from '@/components/textAgent/textAgent';
import { Thread } from '@/lib/threads';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { ResponseCard } from './responseCard';



class Resposta {
  constructor(public resp: any) { }
  id = this.resp.id;
}

export function Break(){
  return (<br/>);
}

export function replace(string:string|undefined){
  if(!string){
    return "";
  }
  
}


export default function ThreadPage({ params }: { params: { boardid: string, threadid: string } }) {
  const { boardid, threadid } = params;
  const [respostas, setRespostas] = useState<Resposta[]>([]);
  const [thread, setThread] = useState<any>({});
  const usouUmaVez = React.useRef(false);
  const [dialogResponse, setDialogResponse] = useState(false);
  const [loading, setLoading] = useState(true); // Novo estado para controlar o carregamento
  const [isAdmin, setIsAdmin] = useState(false);

  
  useEffect(() => {
    if (!usouUmaVez.current) {
      pegaRespostas();
      usouUmaVez.current = true;
      
      const u = getUser();

      if (u) {
        if (u.tipo === 2) {
          setIsAdmin(true);
        }
      }
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
      setLoading(false);
      
    }
  };
  useEffect(() => {
    if(!loading){
      soColocaDenovo();
    }
  },[loading])
  const atualizaRespostas = async()=>{
    const resposta = await Thread(boardid, threadid);
    setRespostas(resposta.answers);

  }
  const soColocaDenovo = ()=>{
    console.log(thread.answers);
    setRespostas(thread.answers)
  }
  function newAnswerSent() {
    setDialogResponse(false);
    atualizaRespostas();
  }

  const formatTime =(inpt:any)=>{
    const stringlt = new Intl.DateTimeFormat('pt-BR', {day: '2-digit',month: '2-digit',year: 'numeric',weekday: 'short',hour: '2-digit',minute: '2-digit',second: '2-digit',}).format(new Date(inpt)).toString().split(",");
    return `${stringlt[1]} - (${stringlt[0].replace(".","")}) - ${stringlt[2]} `;
}
  
  return (
    <div className="w-[99vw] flex flex-wrap gap-2 items-start justify-center">
      <Card className="m-1 text-[var(--font-color)] w-[98%]">
        {!loading && (
            <div className="pl-5">
            {thread.id} - {thread.userId ? thread.userName : "Anonymous"} - {formatTime(thread.createdAt)}
            <Link className={buttonVariants({ variant: "default" }) + " text-[var(--font-color)] h-5"} href={"/" + boardid}>
              Voltar
            </Link>
            </div>
        )}
        {loading && <p>Carregando...</p>} {/* Exibe um carregando enquanto a página é carregada */}
        <strong className="pl-6">{thread.titulo}</strong>
        <div id="" className="flex p-6 justify-left flex-wrap">
          {thread.arquivo && (
            <BoardImage url={thread.arquivo as string} alt={thread.titulo} res={thread.resolution}/>
          )}
          <div className="p-6">{FormatText(thread.mensagem)}</div>
        </div>
        <CardFooter className='flex flex-wrap'>
          <Button className="fixed right-0 top-1/2 transform -translate-y-1/2" onClick={() => { setDialogResponse(!dialogResponse) }}>
            Responder thread
          </Button>
          {respostas.map((r, index) => (
            <ResponseCard key={index} id={`${r.id}cardid`} index={index} resp={r} />
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