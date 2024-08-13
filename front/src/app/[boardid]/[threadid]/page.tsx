'use client'
import { notFound, redirect, usePathname } from 'next/navigation';

const boardsExistentes  = [
  "hw",
  "elt",
  "gms",
  "pg",
  "so",
  "ia"
]
const threadsExistentes  = [
  "gm",
  "elt",
  "pg",
  "so",
  "ia"
]
export default function ThreadPage() {

  const [empty, boardid, threadid] = usePathname().split('/');
  console.log(boardid, threadid);
  if (boardsExistentes.includes(boardid)) {
    console.log("Board existe");
    if(threadsExistentes.includes(threadid)){
      return (
        <div className="w-[99vw] flex flex-wrap gap-2 items-start justify-center">
          <h1>Board ID: {boardid}</h1> <br />
          <h2>Thread ID: {threadid}</h2>
          {/* Exiba os detalhes da thread com o ID correspondente */}
        </div>
      );

    }else{
      console.log("Thread não existe");
      return redirect(notFound());
    }
  } else {
    console.log("Board não existe");
    return redirect(notFound());
  }
}
