"use client";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
// import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AdminCreatesNewBoard } from "@/lib/boards";
import jwt from 'jsonwebtoken';
import { CircleAlert, Plus } from "lucide-react";
import { useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";


export default function NewBoard() {
    let aux = "" as string | null;
    try {
        aux = localStorage.getItem('user');
    }
    catch (e) {
        console.log("para de dar erro demonio");
    }

    const logic = (aux) ? (aux) : ('unkonwn')
    const [user, setUser] = useState<any>(jwt.decode(logic));
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        console.log({ formData: formData, user: user });
        if (user.tipo === 2 && aux) {
            const answer = await AdminCreatesNewBoard(formData, aux);
            console.log(answer);
            if (answer.id) {
                window.location.reload();
            } else {
                setError(answer.error);
            }
        } else {
            alert('Você não tem permissão para criar um board: faça login como admin');
        }


    };


    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="h-6 w-6 p-0"><Plus className="h-5 w-5" /></Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[80%] max-h-[90%] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-center py-2">Novo Board</DialogTitle>
                    <hr className="border-t border-white" />
                </DialogHeader>
                <div className="w-fit flex gap-3 pt-4">
                    <div>
                        <Avatar>
                            <AvatarImage src="https://github.com/shadcn.png" />
                            <AvatarFallback>user</AvatarFallback>
                        </Avatar>
                    </div>
                    <div className="pt-1"><strong>{user?.nome !== undefined ? user.nome : 'Anonymous'}</strong></div>
                </div>
                <form onSubmit={handleSubmit} className="grid gap-4 py-4">
                    <div className="grid gap-2">
                        <Input
                            name="id"
                            className="col-span-3"
                            placeholder="id do board"
                        />
                    </div>
                    <div className="grid gap-2">
                        <Input
                            name="nome"
                            className="col-span-3"
                            placeholder="nome do board, vai aparecer no botão dele"
                        />
                    </div>
                    <div className="grid gap-2">
                        <Input
                            name="image"
                            type="file"
                            id="file-upload"
                            style={{ width: '50%' }}
                        />
                    </div>
                    <div className="grid gap-2">
                        <Textarea
                            name="mensagem"
                            rows={7}
                            className="col-span-3 h-50"
                            placeholder="mensagem do board"
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
                {error && 
                <Alert className="flex justify-left text-[var(--font-color-alert)]" >
                    <CircleAlert className="h-5 w-5" stroke="red" />
                    <AlertTitle>Erro!</AlertTitle>
                    <AlertDescription>
                        {error}
                    </AlertDescription>
                </Alert>}
            </DialogContent>
        </Dialog>
    )
}
