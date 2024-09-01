export async function PegaUltimasPublicacoes(){
    const result = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/threads/recent`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        mode: 'cors'
    });

    const data = await result.json();
    return data;
}
export async function PegaThreadsDoBoard(board:string ){    
    const result = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/boards/${board}/threads`,{
        method:'GET',
        headers:{
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        mode: 'cors'
    });
    const data = await result.json();
    return data;
}
export async function ThreadsRecentes(){
    const result = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/threads/recent`,{
        method:'GET',
        headers:{
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        mode: 'cors'
    });
    const data = await result.json();
    return data;
}


export async function Thread(id:string){
    // TODO: é pra fazer a requizição de respostas também, ou criar uma rota na api que devolve o id e as respostas de um thread
    const result = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/threads/${id}`,{
        method:'GET',
        headers:{
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        mode: 'cors'
    });
    const data = await result.json();
    const result2 = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/`)
    return data;

}