import { comments } from "../data";


export async function GET(
    _req: Request,
     {params}: {params: {id: string}} 
     ) {

       const comment = comments.find(c => c.id === parseInt(params.id)) 

    return new Response(JSON.stringify(comment), {
        headers: { "Content-Type": "application/json" },
    });
}