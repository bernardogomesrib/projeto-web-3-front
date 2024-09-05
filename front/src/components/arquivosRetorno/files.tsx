'use client';
import Image from "next/image";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";

export default function BoardImage({ url, alt }: { url: string, alt: string }) {
    const [imageExpanded, setImageExpanded] = useState(false);
    const [originalSize, setOriginalSize] = useState({ width: 0, height: 0 });
    const [test, setTest] = useState<string | undefined>(undefined);
    const [extension,setExtension] = useState<string | undefined>(undefined);
    const expand = () => {
        setImageExpanded(!imageExpanded);
    }
    console.log("o arquivo files recebeu:", url);
    useEffect(() => {
        function getFileType(url: string) {
            const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp', '.svg', '.tiff'];
            const videoExtensions = ['.mp4', '.avi', '.mov', '.wmv', '.mkv', '.webm', '.flv', '.mpeg', '.3gp'];
            
            let teste = undefined;
            if(url.includes('.pdf')){
                return 'pdf';
            }
            imageExtensions.forEach((ext) => {

                if (url.includes(ext)) {
                    console.log("é imagem: ", ext);
                    teste = 'image';

                }
            })
            videoExtensions.forEach((ext) => {
                if (url.includes(ext)) {
                    setExtension(ext.replace('.',''));
                    teste = 'video';
                }
            })

            return teste;
        }

        setTest(getFileType(url));



    }, []);
    useEffect(() => {
        if (test === 'image') {
            console.log("entrou como imagem");
            const img = new window.Image();
            img.src = url;
            img.onload = () => {
                setOriginalSize({
                    width: img.naturalWidth,
                    height: img.naturalHeight,
                });
            };
        } else if (test === "video") {
            const video = document.createElement('video');
            video.src = url;
            console.log("é video: ", url)
            video.addEventListener('loadedmetadata', () => {
                setOriginalSize({
                    width: video.videoWidth,
                    height: video.videoHeight,
                });

            });

            video.load();

        } else if(test==='pdf'){
            setOriginalSize({
                width: 500,
                height: 500,
            });
        }
        else {
            console.log("é nada");
        }
    }, [test]);
    return (
  <div className="flex flex-col items-center">
    <p className="text-xs flex flex-row items-center">
      {originalSize.width}x{originalSize.height}
      <Button className="p-0 text-decoration:underline h-5 bg-transparent" onClick={expand}>
        {test === "video" && (imageExpanded ? "Diminuir video" : "Expandir video")}
        {test === "image" && (imageExpanded ? "Diminuir imagem" : "Expandir imagem")}
      </Button>
    </p>

    {test === "video" ? (
      <video
        width={imageExpanded ? originalSize.width : 150}
        height={imageExpanded ? originalSize.height : 150}
        controls
        onClick={!imageExpanded?expand:undefined}
      >
        <source src={url} type={"video/"+extension} />
        Seu navegador não suporta o vídeo.
      </video>
    ) : test === "image" ? (
      <Image
        width={imageExpanded ? originalSize.width : 150}
        height={imageExpanded ? originalSize.height : 150}
        src={url}
        alt={alt}
        onClick={expand}
        unoptimized={imageExpanded}
      />
    ) : (test==='pdf')?(
        <embed src={url} 
        width={imageExpanded ? originalSize.width : 150}
        height={imageExpanded ? originalSize.height : 150}
        onClick={!imageExpanded?expand:undefined}
        type="application/pdf" />
    ):(
      <h1>Eh nada</h1>)
    }
  </div>
);
}