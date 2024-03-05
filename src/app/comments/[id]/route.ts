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

export async function PATCH(
    req: Request,
     {params}: {params: {id: string}} 
     ) {

     const body = await req.json()  
     const {text} = body
     const index =  comments.findIndex(c => c.id === parseInt(params.id))
     comments[index].text = text 

     return Response.json(comments[index])
       
}