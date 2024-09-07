'use client';
import BoardImage from '@/components/arquivosRetorno/files';
import { Card } from '@/components/ui/card';
import { useEffect, useState } from 'react';

export function ResponseCard({ resp, index, id }: { resp: any, index: number, id: string }) {
  const [imageExpanded, setImageExpanded] = useState(false);
  const [imageSize, setImageSize] = useState({ width: 150, height: 150 }); // Tamanho inicial pequeno
  const [originalSize, setOriginalSize] = useState({ width: 0, height: 0 }); // Tamanho real da imagem

  const expand = () => {
    setImageExpanded(!imageExpanded);
  };

  // Função para obter o tamanho original da imagem sem carregá-la completamente
  useEffect(() => {
    const img = new window.Image();
    img.src = resp.arquivo;
    img.onload = () => {
      setOriginalSize({
        width: img.naturalWidth,
        height: img.naturalHeight,
      });
    };
  }, [resp.arquivo]);

  return (
    <div className='w-full' id={id}>
      <Card key={index} className='text-[var(--font-color)]'>
      <div className="pl-5">{resp.id} - {resp.userId ?resp.userName : "Anonymous"} { new Intl.DateTimeFormat('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
            }).format(new Date(resp.createdAt))}</div>
        <div className="flex p-6 justify-left flex-wrap">
          {resp.arquivo && (
            <BoardImage url={resp.arquivo} alt={resp.mensagem}/>
          )}
          <p className="p-6">{resp.mensagem}</p>
        </div>
      </Card>
    </div>
  );
}

export default ResponseCard;
