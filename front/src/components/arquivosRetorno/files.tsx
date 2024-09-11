'use client';
import Image from "next/image";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";

export default function BoardImage({ url, alt,res }: { url: string, alt: string,res:string }) {
    const [imageExpanded, setImageExpanded] = useState(false);
    const [originalSize, setOriginalSize] = useState({ width: 0, height: 0 });
    const [test, setTest] = useState<string | undefined>(undefined);
    const [extension,setExtension] = useState<string | undefined>(undefined);
    const validTest = ['image', 'video', 'pdf'];
    const expand = () => {
        setImageExpanded(!imageExpanded);
    }
    
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



    }, [url]);
    useEffect(() => {
        if (test === 'image') {
            if(res){
                const r = res.split("x");
                setOriginalSize({
                    width: parseInt(r[0]),
                    height: parseInt(r[1]),
                });
            }else{
                const img = new window.Image();
                img.src = url;
                img.onload = () => {
                    setOriginalSize({
                        width: img.naturalWidth,
                        height: img.naturalHeight,
                    });
            };
            }
            
        } else if (test === "video") {

            if(res){
                const r = res.split("x");
                setOriginalSize({
                    width: parseInt(r[0]),
                    height: parseInt(r[1]),
                });
            }else{

                const video = document.createElement('video');
                video.src = url;
                
                video.addEventListener('loadedmetadata', () => {
                    setOriginalSize({
                        width: video.videoWidth,
                        height: video.videoHeight,
                    });
    
                });
                video.load();
            }


        } else if(test==='pdf'){
            setOriginalSize({
                width: Math.round(window.innerWidth * 0.7),
                height: Math.round(window.innerHeight * 0.8),
            });
        }
        else {
            console.log("é nada");
        }
    }, [test]);
    return (
  <div className="flex flex-col items-center">
    {test&&<p className="text-xs flex flex-row items-center">
      {(validTest.includes(test))?(`${originalSize.width}x${originalSize.height}  `):(null)} - 
       <Button className="pt-0 pb-0 pl-2 pr-2 text-decoration:underline h-5 bg:gray-500" onClick={expand}>
        {test === "video" && (imageExpanded ? "Diminuir video" : "Expandir video")}
        {test === "image" && (imageExpanded ? "Diminuir imagem" : "Expandir imagem")}
        {test === "pdf" &&(imageExpanded ? "Diminuir pdf":"Expandir pdf")}
      </Button>
    </p>}

    {test === "video" ? (
      <video
        width={imageExpanded ? originalSize.width : 150}
        height={imageExpanded ? originalSize.height : 150}
        controls={imageExpanded}
        onClick={!imageExpanded?expand:undefined}
        preload="metadata"
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
      null)
    }
  </div>
);
}