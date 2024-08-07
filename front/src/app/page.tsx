import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
export default function Home() {
  return (
    <div className="w-[99vw] flex flex-wrap gap-2 items-start">
      
      <Card className="w-full md:w-[60vw] gap-3 flex flex-wrap ">
        <CardHeader className="text-4xl font-bold w-full ">
        <h1 className="">Boards</h1>
        </CardHeader>
        <CardContent className="w-full flex flex-wrap gap-2 justify-evenly">
        <Button className="w-[45%]">Hardware</Button>
        <Button className="w-[45%]">Eletrônica</Button>
        <Button className="w-[45%]">Games</Button>
        <Button className="w-[45%]">Programação</Button>
        <Button className="w-[45%]">S.O.</Button>
        <Button className="w-[45%]">I.A.</Button>
        </CardContent>
        
        <CardFooter className="flex flex-wrap">
          <h1 className="text-4xl font-bold w-full ">Threads populares</h1>
          <div className="w-full md:w-[30%] flex flex-wrap">
            <Button className="w-full">
              Games
            </Button>
            <Image src="/games.png" alt="icone" width={136} height={136}/>
          </div>
        </CardFooter>
      </Card>
      <Card className="w-full md:w-[35vw] flex flex-wrap p-6">
        <h2 className="font-bold w-full md:w-[35vw] ">Últimas publicações</h2>
        <Card className="w-full flex flex-wrap p-3">
          <CardTitle className="flex"><Image src="/next.svg" alt="next Logo" width={72} height={16} />Games retro</CardTitle>
          <CardContent>
            <p>mario kart é over rated.</p>
          </CardContent>

        </Card>
      </Card>
     

    </div>
  );
}

