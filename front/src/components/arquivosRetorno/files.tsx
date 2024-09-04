'use client';
import Image from "next/image";
import { useState } from "react";
import { Button } from "../ui/button";

export default function BoardImage({ url, alt }: { url: string, alt: string }) {
    const [imageExpanded, setImageExpanded] = useState(false);
    const [originalSize, setOriginalSize] = useState({ width: 0, height: 0 });
    const expand = () => {
        setImageExpanded(!imageExpanded);
    }
  
    function getFileType(url: string) {
        
        const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp', '.svg', '.tiff'];
        const videoExtensions = ['.mp4', '.avi', '.mov', '.wmv', '.mkv', '.webm', '.flv', '.mpeg', '.3gp'];

        imageExtensions.forEach((ext) => {
            if (url.includes(ext)) {
                return 'image';
            }
        })
        videoExtensions.forEach((ext) => {
            if (url.includes(ext)) {
                return 'video';
            }
        })
        return undefined;
    }

    const test = getFileType(url)
    if (test === 'image') {
        const img = new window.Image();
        img.src = url;
        img.onload = () => {
            setOriginalSize({
                width: img.naturalWidth,
                height: img.naturalHeight,
            });
        };
        console.log("é imagem: ",url);
        return (

            <div className="flex flex-col items-center">
                <p className="text-xs flex flex-row items-center">
                    {originalSize.width}x{originalSize.height}
                    <Button className="p-0 text-decoration:underline h-5 bg-transparent" onClick={expand}>
                        {imageExpanded ? "Diminuir imagem" : "Expandir imagem"}
                    </Button>
                </p>

                <Image
                    width={imageExpanded ? originalSize.width : 150}
                    height={imageExpanded ? originalSize.height : 150}
                    src={url}
                    alt={alt}
                    onClick={expand}
                    unoptimized={imageExpanded} // Desativa otimização quando expandido
                />
            </div>

        );
    }
    else if (test === "video") {
        const video = document.createElement('video');
        video.src = url;
        console.log("é video: ",url)
        video.addEventListener('loadedmetadata', () => {
            setOriginalSize({
                width: video.videoWidth,
                height: video.videoHeight,
            });

        });

        video.load();

        return (
            <div className="flex flex-col items-center">
                <p className="text-xs flex flex-row items-center">
                    {originalSize.width}x{originalSize.height}
                    <Button className="p-0 text-decoration:underline h-5 bg-transparent" onClick={expand}>
                        {imageExpanded ? "Diminuir video" : "Expandir video"}
                    </Button>
                </p>

                <video
                    width={imageExpanded ? originalSize.width : 150}
                    height={imageExpanded ? originalSize.height : 150}
                    src={url}
                    onClick={expand}
                />
            </div>);
    } else {
        console.log("é nada: ",url);
        return null;
    }
}