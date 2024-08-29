'use client'
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Boards } from "@/lib/boards";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

/* let brds:any = [{ nome: "Hardware", id: "/hw" },
{ nome: "Eletrônica", id: "/elt" },
{ nome: "Games", id: "/gms" },
{ nome: "Programação", id: "/pg" },
{ nome: "S.O.", id: "/so" },
{ nome: "I.A.", id: "/ia" }] */
const ultimasPubs = [
  { threadName: "Games Retro", threadLink: "/gm/123", threadText: "mario kart é over rated. Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae reprehenderit ex nobis obcaecati doloribus atque quis, deleniti quasi blanditiis repellendus minima quaerat dolorem architecto facilis harum aperiam veniam sed molestias!", threadImage: "/games.png" },
  { threadName: "Venda de nodebook", threadLink: "/elt/yryry", threadText: "Vendo nodebook com 8gb de ram e 1tb de hd. Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae reprehenderit ex nobis obcaecati doloribus atque quis, deleniti quasi blanditiis repellendus minima quaerat dolorem architecto facilis harum aperiam veniam sed molestias!", threadImage: "" },
  { threadName: "Como fazer um jogo", threadLink: "/pg/123", threadText: "Como fazer um jogo em 3 passos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae reprehenderit ex nobis obcaecati doloribus atque quis, deleniti quasi blanditiis repellendus minima quaerat dolorem architecto facilis harum aperiam veniam sed molestias!", threadImage: "" },
]
const threadsPopulares = [
  { thread: "Programação", link: "/pg", image: "/games.png" },
  { thread: "S.O.", link: "/so", image: "/SO.png" },
  { thread: "I.A.", link: "/ia", image: "/IA.png" },
  { thread: "Programação", link: "/pg", image: "/games.png" },
  { thread: "S.O.", link: "/so", image: "/SO.png" },
  { thread: "I.A.", link: "/ia", image: "/IA.png" }]

export default function Home() {
  const [boards, setBoards] = useState<any[]>([]);
  useEffect(() => {
    async function fetchData() {
      const data = await Boards();
      setBoards(data);
    }
  
    fetchData();
  }, [])

  return (
    <div className="w-[99vw] flex flex-wrap gap-2 items-start justify-center">

      <Card className="w-[96%] md:w-[60vw] gap-3 flex flex-wrap text-white">
        <CardHeader className="text-4xl font-bold w-full">
          <h1 className="">Boards</h1>
        </CardHeader>


        <CardContent className="w-full flex flex-wrap gap-2 justify-evenly">
          {boards.map((thread, index) => (
            <Link key={index + "links"} href={thread.id} className={"w-[45%] " + buttonVariants({ variant: "default" })}>{thread.nome}</Link>
          ))}
        </CardContent>

        <CardFooter className="flex flex-wrap gap-3 w-full editavel">
          <h1 className="text-4xl font-bold w-full ">Threads populares</h1>

          {threadsPopulares.map((thread, index) => (
            <div key={index + "tp"} className="w-full md:w-[23%] flex flex-wrap items-center">
              <Link className={"w-full " + buttonVariants({ variant: "default" })} href={thread.link}>
                {thread.thread}
              </Link>
              <div className="w-full relative pb-[100%]">
                <Image
                  src={thread.image}
                  alt="icone"
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
            </div>
          ))}
        </CardFooter>


      </Card>




      <Card className="w-full md:w-[35vw] flex flex-wrap p-6 text-white">
        <h2 className="font-bold w-full md:w-[35vw] ">Últimas publicações</h2>
        {ultimasPubs.map((pub, index) => (
          <Link key={index + "utp"} className="w-full" href={pub.threadLink}>
            <Card className="w-full flex flex-wrap p-3 text-white">
              <CardTitle className="flex justify-right w-full items-center gap-3"><Image className="rounded-[100%]" src={!(pub.threadImage===""|| pub.threadImage=== null|| pub.threadImage===undefined) ? pub.threadImage : "/fallbackImage.jpg"} alt="thread image" width={72} height={72} />{pub.threadName}</CardTitle>
              <CardContent className="flex justify-evenly items-center w-full">
                <p className="truncate" title={pub.threadText}>{pub.threadText}</p>
              </CardContent>

            </Card>
          </Link>
        ))}
      </Card>


    </div>
  );
}

