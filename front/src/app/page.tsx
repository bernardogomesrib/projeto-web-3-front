'use client'
import NewBoard from "@/components/dialogs/newBoard";
import { getUser } from "@/components/navbar/navbar-conteudo";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Boards, BoardsPopulares } from "@/lib/boards";
import { ThreadsRecentes } from "@/lib/threads";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";



export default function Home() {
  const [boards, setBoards] = useState<any[]>([]);
  const [boardsPopulares, setBoardsPopulares] = useState<any[]>([]);
  const [ultimasPubs, setUltimasPubs] = useState<any[]>([]);
  const usouUmavez = useRef(false);
  const [admin, setAdmin] = useState(false);
  useEffect(() => {
    async function fetchData() {
      const data = await Boards();
      console.log(data)
      setBoards(data);
      const data2 = await BoardsPopulares();
      setBoardsPopulares(data2);
      const data3 = await ThreadsRecentes();
      console.log(data3);
      setUltimasPubs(data3);
      usouUmavez.current = true;
    }
    if (!usouUmavez.current) {
      fetchData();

      const u = getUser();

      if (u) {
        if (u.tipo === 2) {
          setAdmin(true);
        }
      }

    }

  }, [])


  return (
    <div className="w-[99vw] flex flex-wrap gap-2 items-start justify-center">

      <Card className="w-[96%] md:w-[60vw] gap-3 flex flex-wrap text-[var(--font-color)]">
        <CardHeader className="text-4xl font-bold w-full">
          <h1 className="flex items-center flex-row justify-left gap-4">Boards{admin ? <NewBoard/> : null}</h1>
        </CardHeader>


        <CardContent className="w-full flex flex-wrap gap-2 justify-evenly">
          {boards.map((thread, index) => (
            <Link key={index + "links"} href={thread.id} className={"w-[45%] " + buttonVariants({ variant: "default" })}>{thread.nome}</Link>
          ))}
        </CardContent>

        <CardFooter className="flex flex-wrap gap-3 w-full editavel">
          <h1 className="text-4xl font-bold w-full ">Boards populares</h1>

          {boardsPopulares.map((thread, index) => (
            <Link href={thread.id} key={index + "tp"} className="w-full md:w-[23%] flex flex-wrap items-center">
              <Button className={"w-full " + buttonVariants({ variant: "default" })} >
                {thread.nome}
              </Button>
              <div className="w-full relative pb-[100%]">
                {thread.image && <Image
                  src={thread.image}
                  alt="icone"
                  fill
                  style={{ objectFit: "cover" }}
                />}
              </div>
            </Link>
          ))}
        </CardFooter>


      </Card>




      <Card className="w-full md:w-[35vw] flex flex-wrap p-6 text-[var(--font-color)]">
        <h2 className="font-bold w-full md:w-[35vw] ">Últimas publicações</h2>
        {ultimasPubs.length > 0 ? (ultimasPubs.map((pub, index) => (
          <Link key={index + "utp"} className="w-full" href={pub.boardId + "/" + pub.id}>
            <Card className="w-full flex flex-wrap p-3 text-[var(--font-color)]">
              <CardTitle className="flex justify-right w-full items-center gap-3">
                <Image
                  className="rounded-full aspect-square object-cover"
                  src={!(pub.arquivo === "" || pub.arquivo === null || pub.arquivo === undefined ||pub.arquivo.endsWith("undefined")) ? pub.arquivo : "/fallbackImage.jpg"}
                  alt="thread image"
                  width={72}
                  height={72}
                />
                {pub.titulo}
              </CardTitle>
              <CardContent className="flex justify-evenly items-center w-full">
                <p className="truncate" title={pub.mensagem}>{pub.mensagem}</p>
              </CardContent>
            </Card>
          </Link>
        ))) : (null)}

      </Card>


    </div>
  );
}

