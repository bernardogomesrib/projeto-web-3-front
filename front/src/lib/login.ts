'use client';
export default async function login(loging: string, password: string) {
    const result = await fetch("http://191.233.252.142:3000/login/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email: loging,
            password: password
        })
    });
    console.log(result);
    if (result.ok) {
        const data = await result.json();
        document.cookie = `token=${'BEARER' + data.token}; HttpOnly`;
    }
}
