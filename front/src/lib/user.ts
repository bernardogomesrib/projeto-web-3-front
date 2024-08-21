export default async function NewUser(email: string, password: string, name: string) {
    return fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            email: email,
            password: password,
            nome: name
        }),
        mode: 'cors'
    })
}
