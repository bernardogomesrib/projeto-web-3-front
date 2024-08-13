'use client'
import { notFound, redirect, usePathname } from 'next/navigation';
import React from 'react';

const boardsExistentes = [
  "hw",
  "elt",
  "gms",
  "pg",
  "so",
  "ia",
  "gm"
]
const threadsExistentes = [
  "123",
  "yryry",
  "pg",
  "so",
  "ia"
]
export default function ThreadPage() {

  const [empty, boardid, threadid] = usePathname().split('/');
  const usouUmavez = React.useRef(false);
  React.useEffect(() => {
    if (!usouUmavez.current) {
      console.log("Board ID: ", boardid);
      console.log("Thread ID: ", threadid);
      usouUmavez.current = true;
    }
  });

  if (boardsExistentes.includes(boardid)) {

    if (threadsExistentes.includes(threadid)) {
      return (
        <div className="w-[99vw] flex flex-wrap gap-2 items-start justify-center">
          <h1>Board ID: {boardid}</h1> <br />
          <h2>Thread ID: {threadid}</h2>
          {/* Exiba os detalhes da thread com o ID correspondente */}
        </div>
      );

    } else {

      return redirect(notFound());
    }
  } else {

    return redirect(notFound());
  }
}
