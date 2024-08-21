export default async function login(loging: string, password: string) {
    console.log(loging, password);
    
    const result = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            login: loging,
            password: password
        }),
        mode: 'cors' 
    });

    const data = await result.json();
    console.log('Resposta:', data);

    return result;
}
