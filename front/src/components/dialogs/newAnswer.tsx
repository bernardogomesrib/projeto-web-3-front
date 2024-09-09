"use client";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
// import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { newAnswer } from "@/lib/answer";
import jwt from 'jsonwebtoken';
import { useState } from "react";


export default function NewAnswer({ boardId,threadId,done }: { boardId: string,threadId: string,done:()=>void }) {
    let aux = "" as string | null;
    try {
        aux = localStorage.getItem('user');
    }
    catch (e) {
        console.log("para de dar erro demonio");
    }

    const logic = (aux) ? (aux) : ('unkonwn')
    const [user, setUser] = useState<any>(jwt.decode(logic));


    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        
        console.log({formData: formData, local: boardId+"/"+threadId, user: user});
        const answer = await newAnswer(formData, boardId,threadId,aux);
        console.log(answer);
        if (answer.id) {
            done();
        }
    };
    

    return (
        <Dialog defaultOpen={true}>
           
            <DialogContent className="sm:max-w-[80%] max-h-[90%] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-center py-2">Nova resposta</DialogTitle>
                    <hr className="border-t border-white" />
                </DialogHeader>
                <div className="w-fit flex gap-3 pt-4">
                    <div>
                        <Avatar>
                            <AvatarImage src="https://github.com/shadcn.png" />
                            <AvatarFallback>user</AvatarFallback>
                        </Avatar>
                    </div>
                    <div className="pt-1"><strong>{user?.nome !== undefined ? user.nome : 'Anonimo'}</strong></div>
                </div>
                <form onSubmit={handleSubmit} className="grid gap-4 py-4">
                    <div className="grid gap-2">
                        <Input
                            type="file"
                            id="file-upload"
                            name="image"
                            style={{ width: '32%' }}
                            accept=".jpg, .jpeg, .png, .gif, .bmp, .webp, .svg, .tiff, .mp4, .avi, .mov, .wmv, .mkv, .webm, .flv, .mpeg, .3gp, .pdf"
                        />
                    </div>
                    <div className="grid gap-2">
                        <Textarea
                            name="mensagem"
                            rows={7}
                            className="col-span-3 h-50"
                            placeholder="Comentário..."
                            style={{ resize: "none" }}
                        ></Textarea>
                    </div>
                    <div className="text-center mt-4">
                        <Button className="bg-[#BF32DC] px-10 text-sm" type="submit" style={{
                            textShadow: `
                            -1px -1px 0 #000,
                            1px -1px 0 #000,
                            -1px 1px 0 #000,
                            1px 1px 0 #000`
                        }}>Publicar</Button>
                    </div>
                </form>

            </DialogContent>
        </Dialog>
    )
}
