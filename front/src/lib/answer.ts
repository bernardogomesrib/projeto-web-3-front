'use client';
export async function newAnswer(formData: FormData, boardId: string,threadId: string) {
    const result = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/boards/${boardId}/threads/${threadId}/respostas`, {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Authorization": `Bearer ${localStorage.getItem('user')}`
        },
        mode: 'cors',
        body:formData
    });

    const data = await result.json();
    return data;
}