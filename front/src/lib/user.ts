export default async function NewUser(email: string, password: string, name: string) {
    return fetch("http://191.233.252.142:3000/users/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email: email,
            password: password,
            nome: name
        })
    })
}
