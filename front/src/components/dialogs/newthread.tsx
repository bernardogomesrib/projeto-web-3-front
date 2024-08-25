import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
// import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"


export default function NewThread({ Trigger }: { Trigger: string }) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className={Trigger}>Criar thread</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[80%] max-h-[90%] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-center py-2">Nova thread</DialogTitle>
                    <hr className="border-t border-white" />
                </DialogHeader>
                <div className="w-fit flex gap-3 pt-4">
                    <div>
                        <Avatar>
                            <AvatarImage src="https://github.com/shadcn.png" />
                            <AvatarFallback>user</AvatarFallback>
                        </Avatar>
                    </div>
                    <div className="pt-1"><strong>User</strong></div>
                </div>
                <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                        <Input
                            id="name"
                            className="col-span-3"
                            placeholder="Sobre o que vamos falar hoje?"
                        />
                    </div>
                    <div className="grid gap-2">
                        <Input
                            type="file"
                            id="file-upload"
                            style={{ width: '32%' }} 
                        />
                    </div>
                    <div className="grid gap-2">
                        <Textarea
                            id="description"
                            rows={7}
                            className="col-span-3 h-50"
                            placeholder="Comentário..."
                            style={{
                                resize: "none"
                            }}
                        ></Textarea>
                    </div>
                    <div>
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
                </div>
            </DialogContent>
        </Dialog>
    )
}
