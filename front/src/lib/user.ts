export default async function NewUser(email: string, password: string, name: string) {
    return fetch("http://localhost:3000/users/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email: email,
            password: password,
            nome: name
        }),
    })
}
