'use client'
import { notFound, redirect } from 'next/navigation';
import React from 'react';
const existentBoards = [
  "hw",
  "elt",
  "gms",
  "pg",
  "so",
  "ia"
]
const Page: React.FC = ({ params }: { params: { boardid: string } }) => {
  
  const boardid = params.boardid;
  const usouUmavez = React.useRef(false);
  React.useEffect(() => {
    if (!usouUmavez.current) {
      console.log("Board ID: ", boardid);
      usouUmavez.current = true;
    }
  });
  if (existentBoards.includes(boardid)) {
    return (
      <div className="w-[99vw] flex flex-wrap gap-2 items-start justify-center">

        <h1>Board ID: {boardid}</h1>
        {/* Add your content here */}
      </div>
    );
  } else {
    redirect(notFound());
  }
};

export default Page;