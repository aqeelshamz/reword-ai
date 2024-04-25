import { NextResponse, NextRequest } from "next/server";
import { serverURL } from "./utils/utils";

export default async function middleware(req: NextRequest) {
    const token = req.cookies.get('token')?.value;
    if (token) {
        var response = await fetch(`${serverURL}/users`, { method: "GET", credentials: "include", headers: { Authorization: `Bearer ${token}` }, });

        //print the response
        const user = await response.json();

        if (req.nextUrl.pathname === '/admin') {
            return NextResponse.redirect(new URL('/admin/dashboard', req.url))
        }

        if (req.nextUrl.pathname.startsWith("/admin") && user.type !== 'admin') {
            return NextResponse.redirect(new URL('/home', req.url))
        }
    }
    else{
        return NextResponse.redirect(new URL('/login', req.url))
    }
}