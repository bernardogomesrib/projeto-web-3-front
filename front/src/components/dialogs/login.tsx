import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function LoginDialog({Trigger}:{Trigger:string}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
       <Button className={Trigger}>Login</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-center">Login</DialogTitle>

        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Nome de Usuário
            </Label>
            <Input
              id="name"
              defaultValue="Pedro Duarte"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="Senha" className="text-right">
              Senha
            </Label>
            <Input
              id="Senha"
              type="password"

              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          {/* <Button type="submit">Cancelar</Button> */}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
