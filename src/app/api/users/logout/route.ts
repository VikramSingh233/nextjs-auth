import { NextResponse } from "next/server";

export async function GET() {
    try {
        const response = NextResponse.json({ message: "Logout successful" ,success:true});
        // now this is response and it is capable of doing any setting on cookies like delete the cookie or set the cookie 
        response.cookies.set("token", "", { httpOnly: true, expires: new Date(0) });
        return response;
    } catch (error:any) {
        console.error("Logout failed", error);
        return NextResponse.json({ error: "Logout failed" }, { status: 500 });
    }
}