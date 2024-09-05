'use server';
export async function newAnswer(formData: FormData, boardId: string,threadId: string,token: string |null) {

    const logic = token?"":`/anonymous`;

    
    
    const result = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${boardId}/${threadId}/respostas${logic}`, {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Authorization": `Bearer ${token}`
        },
        mode: 'cors',
        body:formData
    });

    const data = await result.json();
    return data;
}