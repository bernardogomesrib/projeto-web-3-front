'use client';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Image from 'next/image';
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
        <div className="pl-3">{resp.id}</div>
        <div className="flex p-6 justify-left">
          {resp.arquivo && (
            <div className="flex flex-col items-center">
              <p className="text-xs flex flex-row items-center">
                {originalSize.width}x{originalSize.height} {/* Mostra o tamanho original */}
                <Button className="p-0 text-decoration:underline h-5 bg-transparent" onClick={expand}>
                  {imageExpanded ? "Diminuir imagem" : "Expandir imagem"}
                </Button>
              </p>
              <Image
                width={imageExpanded ? originalSize.width : 150}
                height={imageExpanded ? originalSize.height : 150}
                src={resp.arquivo}
                alt={resp.mensagem}
                onClick={expand}
                unoptimized={imageExpanded} // Desativa otimização quando expandido
              />
            </div>
          )}
          <p className="p-6">{resp.mensagem}</p>
        </div>
      </Card>
    </div>
  );
}

export default ResponseCard;
