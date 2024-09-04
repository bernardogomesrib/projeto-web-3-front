'use client'
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Boards, BoardsPopulares } from "@/lib/boards";
import { ThreadsRecentes } from "@/lib/threads";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

/* let brds:any = [{ nome: "Hardware", id: "/hw" },
{ nome: "Eletrônica", id: "/elt" },
{ nome: "Games", id: "/gms" },
{ nome: "Programação", id: "/pg" },
{ nome: "S.O.", id: "/so" },
{ nome: "I.A.", id: "/ia" }] */
// const ultimasPubs = [
//   { titulo: "Games Retro", threadLink: "/gm/123", mensagem: "mario kart é over rated. Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae reprehenderit ex nobis obcaecati doloribus atque quis, deleniti quasi blanditiis repellendus minima quaerat dolorem architecto facilis harum aperiam veniam sed molestias!", threadImage: "/games.png" },
//   { titulo: "Venda de nodebook", threadLink: "/elt/yryry", mensagem: "Vendo nodebook com 8gb de ram e 1tb de hd. Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae reprehenderit ex nobis obcaecati doloribus atque quis, deleniti quasi blanditiis repellendus minima quaerat dolorem architecto facilis harum aperiam veniam sed molestias!", threadImage: "" },
//   { titulo: "Como fazer um jogo", threadLink: "/pg/123", mensagem: "Como fazer um jogo em 3 passos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae reprehenderit ex nobis obcaecati doloribus atque quis, deleniti quasi blanditiis repellendus minima quaerat dolorem architecto facilis harum aperiam veniam sed molestias!", threadImage: "" },
// ]
// const threadsPopulares = [
//   { nome: "Programação", id: "/pg", image: "/games.png" },
//   { nome: "S.O.", id: "/so", image: "/SO.png" },
//   { nome: "I.A.", id: "/ia", image: "/IA.png" },
//   { nome: "Programação", id: "/pg", image: "/games.png" },
//   { nome: "S.O.", id: "/so", image: "/SO.png" },
//   { nome: "I.A.", id: "/ia", image: "/IA.png" }]

export default function Home() {
  const [boards, setBoards] = useState<any[]>([]);
  const [boardsPopulares, setBoardsPopulares] = useState<any[]>([]);
  const [ultimasPubs, setUltimasPubs] = useState<any[]>([]);
  const usouUmavez = useRef(false);

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
    }

  }, [])

  return (
    <div className="w-[99vw] flex flex-wrap gap-2 items-start justify-center">

      <Card className="w-[96%] md:w-[60vw] gap-3 flex flex-wrap text-[var(--font-color)]">
        <CardHeader className="text-4xl font-bold w-full">
          <h1 className="">Boards</h1>
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
                <Image
                  src={thread.image}
                  alt="icone"
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
            </Link>
          ))}
        </CardFooter>


      </Card>




      <Card className="w-full md:w-[35vw] flex flex-wrap p-6 text-[var(--font-color)]">
        <h2 className="font-bold w-full md:w-[35vw] ">Últimas publicações</h2>
        {ultimasPubs.length>0 ?(ultimasPubs.map((pub, index) => (
          <Link key={index + "utp"} className="w-full" href={pub.boardId + "/" + pub.id}>
            <Card className="w-full flex flex-wrap p-3 text-[var(--font-color)]">
              <CardTitle className="flex justify-right w-full items-center gap-3">
                <Image
                  className="rounded-full aspect-square object-cover"
                  src={!(pub.arquivo === "" || pub.arquivo === null || pub.arquivo === undefined) ? pub.arquivo : "/fallbackImage.jpg"}
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
        ))):(null)}

      </Card>


    </div>
  );
}

