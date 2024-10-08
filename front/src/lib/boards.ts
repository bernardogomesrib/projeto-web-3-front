'use server'
export async function Boards(){
    const result = await fetch(`${process.env.NEXT_PUBLIC_API_URL}boards/`, {
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
export async function BoardsPopulares(){
    const result = await fetch(`${process.env.NEXT_PUBLIC_API_URL}boards/popular`, {
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
export async function AdminCreatesNewBoard(formData: FormData, token: string){
    const result = await fetch(`${process.env.NEXT_PUBLIC_API_URL}boards/`, {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "authorization": `BEARER ${token}`
        },
        mode: 'cors',
        body: formData
    });
    const data = await result.json();
    return data;
}
export async function BoardExiste(id:string){
    const result = await fetch(`${process.env.NEXT_PUBLIC_API_URL}boards/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        mode: 'cors'
    });

    const data = await result.json();
    if(data){
        return true;
    }else{
        return false;
    }
    
}