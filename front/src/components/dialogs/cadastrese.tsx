import NewUser from '@/lib/user';
import * as Dialog from '@radix-ui/react-dialog';
import { CircleAlert, X } from 'lucide-react';
import { useState } from 'react';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { Button } from '../ui/button';
import { Checkbox } from '../ui/checkbox';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import './stylesForDialog.css';

export default function Cadastrese({ setClose }: { setClose: () => void }) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [date, setDate] = useState('');
  const [termos, setTermos] = useState(false);
  const [error, setError] = useState<null | string>(null);
  const executarCadastro = async () => {
    console.log(fullName, email, password, date, termos);
    let aux: string|null|undefined|any = '';
    if (termos) {
      const res = await NewUser(email, password, fullName);
      console.log(res);
      if (res.token) {
        alert('Cadastrado com sucesso');
        setClose();  // Fecha o diálogo após o cadastro
      } else{
        
        setError(aux.error)
      }
    }
  };

  return (
    <Dialog.Root defaultOpen={true}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <Dialog.Content className="fixed left-[50%] top-[50%] z-50 grid w-full lg:w-[1024px] translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background pt-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg text-white">
          <Dialog.Title className="text-lg font-semibold leading-none tracking-tight text-center">Cadastre-se</Dialog.Title>
          <Dialog.Description></Dialog.Description>

          <div className='w-full flex border-t border-t-1-white '>
            <div id="labels" className='border-r w-[30%] text-center flex flex-wrap pt-6 content-start gap-3'>
              <Label className="h-10 w-full text-center flex" htmlFor="nome">
                <div className='w-full flex items-center'><div className='w-full flex justify-center'>Nome de usuário<div className='text-[rgb(191,50,220)]'>*</div></div></div>
              </Label>
              <Label className="h-10 w-full text-center flex" htmlFor="email">
                <div className='w-full flex items-center'><div className='w-full flex justify-center'>Email<div className='text-[rgb(191,50,220)]'>*</div></div></div>

              </Label>
              <Label className="h-10 w-full text-center flex" htmlFor="password">
                <div className='w-full flex items-center'><div className='w-full flex justify-center'>Senha<div className='text-[rgb(191,50,220)]'>*</div></div></div>

              </Label>
              {/* <Label className="h-10 w-full text-center flex" htmlFor="date">
                <div className='w-full flex items-center'><div className='w-full flex justify-center'>Data de Nascimento<div className='text-[rgb(191,50,220)]'>*</div></div></div>
              </Label> */}
              <Label className="h-10 w-full text-center flex" >
                <div className='w-full flex items-center'><div className='w-full text-[rgb(191,50,220)]'>(*) Campo Obrigatório</div></div>
              </Label>

            </div>
            <div id="inputs" className='w-[65%] pt-6 pl-6 gap-3 flex flex-wrap'>
              <Input className='w-full' id="nome" name='nome' placeholder="Pedro Duarte" onChange={(e) => { setFullName(e.target.value) }} />
              <Input className='w-full' id="email" name='email' type='email' placeholder="email@email.com" onChange={(e) => { setEmail(e.target.value) }} />
              <Input className='w-full' id="password" name='senha' type='password' placeholder='sua senha' onChange={(e) => { setPassword(e.target.value) }} />
              {/* <Input className='w-full sm:max-w-[150px]' name="date" id='dia' type='date' onChange={(e) => { setDate(e.target.value) }} /> */}
              <div className='w-full h-10 items-center flex gap-2'>
                <Checkbox checked={termos} id="termos" onClick={() => { setTermos(!termos) }} />
                <Label htmlFor='termos'>Aceito os termos de serviço</Label>
              </div>

              {error && <div className='w-full h-10 items-center flex gap-2'>
                <Alert className="flex justify-left" >
                  <CircleAlert className="h-4 w-4" />
                  <AlertTitle>Erro!</AlertTitle>
                  <AlertDescription>
                    {error}
                  </AlertDescription>
                </Alert>
              </div>}
              <div className='w-full items-center flex justify-center pb-6'>
                <Button className="bg-[#BF32DC]" onClick={executarCadastro}>Cadastrar</Button>
              </div>
            </div>
          </div>
          <Dialog.Close
            className='absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground border-0'
            onClick={setClose}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
