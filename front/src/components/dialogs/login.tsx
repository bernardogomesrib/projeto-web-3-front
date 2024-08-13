import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"

export function LoginDialog({ Trigger }: { Trigger: string }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className={Trigger}>Login</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-center py-2 text-2xl">Login</DialogTitle>
          <hr className="border-t border-white" />
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name" className="text-left">
              Nome de Usuário ou E-mail:
            </Label>
            <Input
              id="name"
              className="col-span-3 bg-[#706F6F] border-none focus:ring-0"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="Senha" className="left">
              Senha:
            </Label>
            <Input
              id="Senha"
              type="password"
              className="col-span-3 bg-[#706F6F] border-none focus:ring-0"
            />
          </div>
          <div>
            <Link href="/esqueceu-senha" className=" text-[#BF32DC] font-bold hover:underline text-sm"
              style={{
                textShadow: `
                  -1px -1px 0 #000, 
                  1px -1px 0 #000, 
                  -1px 1px 0 #000, 
                  1px 1px 0 #000`
              }}>Esqueceu a senha?</Link>
          </div>
          <div className="text-center mt-4">
            <Button className="bg-[#BF32DC] px-10 text-sm" type="submit" style={{
              textShadow: `
                  -1px -1px 0 #000, 
                  1px -1px 0 #000, 
                  -1px 1px 0 #000, 
                  1px 1px 0 #000`
            }}>Login</Button>
          </div>
          <div className="text-center">
            <span className="text-[#BF32DC] font-bold text-sm" style={{
              textShadow: `
                  -1px -1px 0 #000, 
                  1px -1px 0 #000, 
                  -1px 1px 0 #000, 
                  1px 1px 0 #000`
            }}>Não tem uma conta? </span>
            <Link href="/cadastrar" className=" text-[#6370DB] font-bold hover:underline text-sm"
              style={{
                textShadow: `
                  -1px -1px 0 #000, 
                  1px -1px 0 #000, 
                  -1px 1px 0 #000, 
                  1px 1px 0 #000`
              }}>Cadastre-se</Link>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
