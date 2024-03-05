import { headers } from "next/headers";
import { type NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    const requestHeaders = new Headers(req.headers)
    const headerList = headers()
    console.log(headerList.get("Authorization"))

    return new Response('<h1> Profile API data <h1/>', {
        headers: { "Content-Type": "text/html" },
    })
}

