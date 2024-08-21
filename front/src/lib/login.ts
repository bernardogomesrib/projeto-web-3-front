export default async function login(loging: string, password: string) {

    console.log(loging, password);
    const result = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
             'accept': 'application/json'
        },
        body: JSON.stringify({
            email: loging,
            password: password
        }),
        mode: 'cors'
    });
    console.log(result);
    
}
