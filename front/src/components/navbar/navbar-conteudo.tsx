'use client'

import {
  Dialog,
  DialogPanel
} from '@headlessui/react'
import {
  Bars3Icon,
  XMarkIcon
} from '@heroicons/react/24/outline'
import jwt from 'jsonwebtoken'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import Cadastrese from '../dialogs/cadastrese'
import { LoginDialog } from '../dialogs/login'
import { Button } from '../ui/button'


let NavbarUser: any = null;
export function getUser() {
  return NavbarUser;
}
export function Logout() {
  localStorage.removeItem('user');
  NavbarUser = null;
  window.location.reload();
}
export function setUser(usr: string) {
  NavbarUser = jwt_decode(usr);
  window.location.reload();
}
export default function NavbarConteudo({ coisas }: { coisas: any[] }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [openCadastrese, setOpenCadastrese] = useState(false)
  const [user, setUser] = useState<any | null>(null);
  useEffect(() => {

    // transformando a string que é um jwt do localstorage em um objeto
    const user = localStorage.getItem('user');
    if (user) {
      const userObj = jwt_decode(user);
      setUser(userObj);
      NavbarUser = userObj;
    }
  }, [])

  return (
    <header className="bg-transparent w-[99vw]">
      <nav aria-label="Global" className="mx-auto flex items-center justify-between p-6  ">
        <div className="flex lg:flex-1">

          <Link href="/" className="-m-1.5 p-1.5 flex items-center">
            <span className="sr-only">Your Company</span>
            <img src="/logo.png" alt="LogoITThreads" className="h-12 w-12 mr-3" />
            <h1 className="text-4xl font-bold">ITThreads</h1>
          </Link>

        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="h-6 w-6" />
          </button>
        </div>
        {user ? (<div className="hidden lg:flex lg:flex-1 lg:justify-end gap-3">
          <div className={"inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"}>{user.nome}</div>
          <Button onClick={() => { localStorage.removeItem('user'); window.location.reload(); }}>Sair</Button>
        </div>) : (
          <div className="hidden lg:flex lg:flex-1 lg:justify-end gap-3">
            {openCadastrese ? (<Cadastrese setClose={() => setOpenCadastrese(!openCadastrese)} />) : (null)}
            <Button onClick={() => { setOpenCadastrese(true) }}> <span style={{ textShadow: '1px 1px 2px black' }}>Cadastre-se</span></Button>
            <LoginDialog Trigger={""} />
          </div>
        )}

      </nav>
      <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
        <div className="fixed inset-0 z-10" />
        <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-card-foreground  px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <h1 className="text-4xl font-bold">ITThreads</h1>
              <h1 className="text-4xl font-bold">teste</h1>
            </a>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="h-6 w-6" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {/*qualquer coisa que for ser adicionada no meio da barra tem que ser aqui */}

              </div>


              {user ? (
                <div className="py-6">
                  <div>
                    {user.nome}
                    <Button className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 w-full hover:bg-gray-50 hover:text-black bg-transparent text-left flex justify-start" onClick={() => { localStorage.removeItem('user'); window.location.reload(); }}> <span style={{ textShadow: '1px 1px 2px black' }}>Sair</span></Button>
                  </div>
                </div>
              ) : (
                <div className="py-6">
                  <Button className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 w-full hover:bg-gray-50 hover:text-black bg-transparent text-left flex justify-start" onClick={() => { setOpenCadastrese(!openCadastrese) }}>Cadastre-se</Button>
                  <LoginDialog Trigger={"-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 w-full hover:bg-gray-50 hover:text-black bg-transparent text-left flex justify-start "} />
                </div>
              )}


            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  )
}
function jwt_decode(user: string) {
  // Implement the logic to decode the JWT token here
  // For example, you can use a library like jsonwebtoken to decode the token
  const decodedToken = jwt.decode(user);
  return decodedToken;
}
