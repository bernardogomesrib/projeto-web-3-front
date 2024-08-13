import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../ui/button';
import { Checkbox } from '../ui/checkbox';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import './stylesForDialog.css';

export default function Cadastrese ({ setClose }: { setClose: () => void }){


  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [date, setDate] = useState('');
  const [termos, setTermos] = useState(false);
  const executarCadastro = () => {
    console.log(fullName, email, password, date, termos);
    if(termos){
      alert('cadastrado com sucesso');
      setClose();
    }
  }
return(
  <Dialog.Root defaultOpen={true}>
    <Dialog.Portal >
      <Dialog.Overlay className="fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
      <Dialog.Content className="fixed left-[50%] top-[50%] z-50 grid w-full lg:w-[1024px] translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background pt-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg text-white">
        <Dialog.Title className="text-lg font-semibold leading-none tracking-tight text-center">Cadastre-se</Dialog.Title>
        <Dialog.Description>

        </Dialog.Description>
        <Dialog.Close className='absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground'>
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </Dialog.Close>
        <div className='w-full flex border-t border-t-1-white '>
        <div id="labels" className='border-r border-t border-r-1-white border-t-white w-[30%] text-center flex flex-wrap pt-6 content-start gap-3'>
          <Label className="h-10 w-full text-center flex"htmlFor="nome">
            <div className='w-full flex items-center'><div className='w-full'>Nome de usuário</div></div>
          </Label>
          <Label className="h-10 w-full text-center flex"htmlFor="email">
            <div className='w-full flex items-center'><div className='w-full'>Email</div></div>
          </Label>
          <Label className="h-10 w-full text-center flex"htmlFor="password">
            <div className='w-full flex items-center'><div className='w-full'>Senha</div></div>
          </Label>
          <Label className="h-10 w-full text-center flex"htmlFor="date">
            <div className='w-full flex items-center'><div className='w-full'>Data de Nascimento</div></div>
          </Label>
        </div>
        <div id="inputs" className='w-[65%] pt-6 pl-6 gap-3 flex flex-wrap'>
          <Input className='w-full' id="nome" name='nome' placeholder="Pedro Duarte" onChange={(e)=>{setFullName(e.target.value)}}/>
          <Input className='w-full' id="email" name='email' type='email' placeholder="email@email.com" onChange={(e)=>{setEmail(e.target.value)}}/>
          <Input className='w-full' id="password" name='senha' type='password' placeholder='sua senha' onChange={(e)=>{setPassword(e.target.value)}}/>
          <Input className='w-full' name="date" id='dia' type='date' onChange={(e)=>{setDate(e.target.value)}}/>
          <div className='w-full h-10 items-center flex gap-2'>
          
          <Checkbox checked={termos} id="termos" onClick={() => { setTermos(!termos) }} />
          <Label htmlFor='termos'>Aceito os termos de serviço</Label>
          </div>
          <div className='w-full items-center flex justify-center pb-6'>
          <Button onClick={executarCadastro}>Cadastrar</Button>
          </div>
          
        </div>

        </div>
        
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
  );
};

