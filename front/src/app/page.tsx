import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

const threads = [{ thread: "Hardware", link: "/hw" },
{ thread: "Eletrônica", link: "/elt" },
{ thread: "Games", link: "/gms" },
{ thread: "Programação", link: "/pg" },
{ thread: "S.O.", link: "/so" },
{ thread: "I.A.", link: "/ia" }]
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
  return (
    <div className="w-[99vw] flex flex-wrap gap-2 items-start">

      <Card className="w-full md:w-[60vw] gap-3 flex flex-wrap ">
        <CardHeader className="text-4xl font-bold w-full">
          <h1 className="">Boards</h1>
        </CardHeader>
        <CardContent className="w-full flex flex-wrap gap-2 justify-evenly">
          {threads.map((thread, index) => (
            <Link key={index + "links"} href={thread.link} className={"w-[45%] " + buttonVariants({ variant: "default" })}>{thread.thread}</Link>
          ))}
        </CardContent>

        <CardFooter className="flex flex-wrap gap-3">
          <h1 className="text-4xl font-bold w-full ">Threads populares</h1>
          
          {threadsPopulares.map((thread, index) => (
            <div key={index + "tp"} className="w-full md:w-[22%] flex flex-wrap items-center">
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
      <Card className="w-full md:w-[35vw] flex flex-wrap p-6">
        <h2 className="font-bold w-full md:w-[35vw] ">Últimas publicações</h2>
        <Card className="w-full flex flex-wrap p-3">
          <CardTitle className="flex justify-evenly w-full items-center"><Image src="/games.png" alt="next Logo" width={72} height={72} />Games retro</CardTitle>
          <CardContent className="flex justify-evenly items-center w-full">
            <p className="truncate" title="mario kart é over rated. Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae reprehenderit ex nobis obcaecati doloribus atque quis, deleniti quasi blanditiis repellendus minima quaerat dolorem architecto facilis harum aperiam veniam sed molestias!">mario kart é over rated. Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae reprehenderit ex nobis obcaecati doloribus atque quis, deleniti quasi blanditiis repellendus minima quaerat dolorem architecto facilis harum aperiam veniam sed molestias!</p>
          </CardContent>

        </Card>
      </Card>


    </div>
  );
}

