'use server';
import jwt from 'jsonwebtoken';

declare global {
  var adminToken: string|undefined;
}



async function thisToken(){
    if (globalThis.adminToken === undefined||globalThis.adminToken === null){ 
        globalThis.adminToken = await getAdminToken();
        console.log("retornando o token: ",globalThis.adminToken);
        return globalThis.adminToken;
    }else{
        console.log("retornando o token: ",globalThis.adminToken);
        return globalThis.adminToken;
    }
    
}

export async function getAdminToken() {
    console.log('entrou no getAdminToken');
    const login = process.env.ADMIN_LOGIN;
    const password = process.env.ADMIN_PASSWORD;
    console.log(login);
    console.log(password);
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/login', {
        method: 'POST',
        headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            login: login,
            password: password
        })
    });

    const data = await response.json();
    console.log(data);
    const decode = jwt.decode(data.token);
    console.log(decode);
    return data.token;
}




export async function getUserName(id: string) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${id}`, {
        method: 'GET',
        headers: {
            'accept': 'application/json',
            'Authorization': `BEARER ${await thisToken()}`
        }
    });

        const data = await response.json();
        console.log(data);
        return data.nome;
    
}

