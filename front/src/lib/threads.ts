'use server';

export async function PegaUltimasPublicacoes() {
    const result = await fetch(`${process.env.NEXT_PUBLIC_API_URL}threads/recent`, {
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

export async function PegaThreadsDoBoard(board: string) {
    try {
        const result = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${board}/threads`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            mode: 'cors'
        })
        const data = await result.json();
        if(data.error)
            return {data:[{ id: 69, titulo: "Deu erro ao buscar os threads", mensagem: data.error.name, arquivo: '/errorImage.png' }],currentPage:1,pages:1,next:null,previous:null};
        return data;
    } catch (err: any) {
        return {data:[{ id: 69, titulo: "Deu erro ao buscar os threads", mensagem: err.message, arquivo: '/errorImage.png' }],currentPage:1,pages:1,next:null,previous:null};
    }
}

export async function ThreadsRecentes() {
    const result = await fetch(`${process.env.NEXT_PUBLIC_API_URL}threads/recent`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        mode: 'cors'
    });
    const data = await result.json();
    return data;
}

// esta função é para pegar a thread e as respostas ou apenas a thread, depende se deus quizer é os 2.
export async function Thread(boardId:string,threadId: string) {
   
    const result = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${boardId}/threads/${threadId}`, {
        method: 'GET',
        headers: {
            "Accept": "application/json"
        },
        mode: 'cors'
    });
    const data = await result.json();
   
    return data;

}

// função para criar thread caso anonima ou caso identificada

export async function sendNewThread(formdata: FormData, board: string,aux:string|null) {

    
    const logic = aux ? '' : '/anonymous';
    const logic2 = aux ? 'BEARER ' + aux : '';
    const url = `${process.env.NEXT_PUBLIC_API_URL}${board}/threads${logic}`;

    console.log(url);

    // O FormData já está sendo passado com todos os campos necessários

        const result = await fetch(url, {
            method: 'POST',
            headers: {
                "accept": "application/json",
                'Authorization': logic2,
                // Não defina `Content-Type` aqui, pois o navegador faz isso automaticamente
            },
            body: formdata,  // Envie o formData diretamente
            mode: 'cors'
        });
        console.log(result);
        if (!result.ok) {
            console.error("Erro ao enviar o formulário:", result.statusText);
            return;
        }
        const data = await result.json();
        return data;
  
}
export async function requestNewPage(url:string){
    const result = await fetch(url, {
        method: 'GET',
        mode: 'cors'
    });
    const data = await result.json();
    return data;
}