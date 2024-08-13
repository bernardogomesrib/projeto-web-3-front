'use client'

import {
  Dialog,
  DialogPanel
} from '@headlessui/react'
import { PhoneIcon, PlayCircleIcon } from '@heroicons/react/20/solid'
import {
  ArrowPathIcon,
  Bars3Icon,
  ChartPieIcon,
  CursorArrowRaysIcon,
  FingerPrintIcon,
  SquaresPlusIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import Link from 'next/link'
import { useState } from 'react'
import Cadastrese from '../dialogs/cadastrese'
import { LoginDialog } from '../dialogs/login'
import { Button } from '../ui/button'

const products = [
  { name: 'Analytics', description: 'Get a better understanding of your traffic', href: '#', icon: ChartPieIcon },
  { name: 'Engagement', description: 'Speak directly to your customers', href: '#', icon: CursorArrowRaysIcon },
  { name: 'Security', description: 'Your customers’ data will be safe and secure', href: '#', icon: FingerPrintIcon },
  { name: 'Integrations', description: 'Connect with third-party tools', href: '#', icon: SquaresPlusIcon },
  { name: 'Automations', description: 'Build strategic funnels that will convert', href: '#', icon: ArrowPathIcon },
]
const callsToAction = [
  { name: 'Watch demo', href: '#', icon: PlayCircleIcon },
  { name: 'Contact sales', href: '#', icon: PhoneIcon },
]

export default function NavbarConteudo({coisas}:{coisas:any[]}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [openCadastrese, setOpenCadastrese] = useState(false)
  return (
    <header className="bg-transparent w-[99vw]">
      <nav aria-label="Global" className="mx-auto flex items-center justify-between p-6  ">
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
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
        <div className="hidden lg:flex lg:flex-1 lg:justify-end gap-3">
        {openCadastrese ? (<Cadastrese setClose={() => setOpenCadastrese(!openCadastrese)} />):(null)}
        <Button onClick={()=>{setOpenCadastrese(true)}}>Cadastre-se</Button>
          <LoginDialog Trigger={""} />
        </div>
      </nav>
      <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
        <div className="fixed inset-0 z-10" />
        <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-card-foreground  px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <h1 className="text-4xl font-bold">ITThreads</h1>
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
      
              <div className="py-6">
              <Button className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 w-full hover:bg-gray-50 hover:text-black bg-transparent text-left flex justify-start"onClick={()=>{setOpenCadastrese(!openCadastrese)}}>Cadastre-se</Button>
                <LoginDialog Trigger={"-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 w-full hover:bg-gray-50 hover:text-black bg-transparent text-left flex justify-start "} />
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  )
}