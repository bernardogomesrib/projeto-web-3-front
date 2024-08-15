'use client'
import { notFound, redirect } from 'next/navigation';
import React from 'react';
import HardwareTable from '../(paginas-hardcode)/hwPage';
const existentBoards = [
  "hw",
  "elt",
  "gms",
  "pg",
  "so",
  "ia"
]
export default function BoardPage ({ params }: { params: { boardid: string } }) {
  
  const boardid = params.boardid;
  const usouUmavez = React.useRef(false);
  React.useEffect(() => {
    if (!usouUmavez.current) {
      console.log("Board ID: ", boardid);
      usouUmavez.current = true;
    }
  });
  if (existentBoards.includes(boardid)) {

    switch (boardid) {
      case "hw":
        return (<HardwareTable />);
      // case "elt":
      //   return ();
      default:
        // coloquei como default por enquanto um retorno mostrando o id que tá no url,
        // o certo era para por um notFound que no caso é o que está no else também, 
        // mas por enquanto fica assim pra teste
        return (
          <div className="w-[99vw] flex flex-wrap gap-2 items-start justify-center">
    
            <h1>Board ID: {boardid}</h1>
            {/* Add your content here */}
          </div>
        );
    }
  } else {
    redirect(notFound());
  }
};

