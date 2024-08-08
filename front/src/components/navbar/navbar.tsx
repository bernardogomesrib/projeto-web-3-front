'use server';

import NavbarConteudo from "./navbar-conteudo";

export default async function Navbar() {
    //função pra pegar o usuario do servidor
    return(<NavbarConteudo coisas={[{},{}]}/>)
}