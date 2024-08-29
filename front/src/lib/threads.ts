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