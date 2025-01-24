import {connect} from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import { compare } from "bcrypt-ts"
import jwt from "jsonwebtoken";

connect()

export async function POST(request:NextRequest){

    try {
       const reqBody =  await request.json()
       const {email,password} = reqBody;

       if(!email || !password){
        return NextResponse.json({
            
            error:"All fields are required",
            status:400

        })
       }

       const user = await User.findOne({email}).select("-password")

       if(!user){
        return NextResponse.json({
            
            error:"User does not exist",
            status:400
        })
       }

       const isPasswordCorrect = await user.compare(password,user.password);

       if(!isPasswordCorrect){
        return NextResponse.json({
            
            error:"Invalid credentials",
            status:400
        })
       }
    //    create token

    const tokenData = {
        id:user._id,
        username:user.username,
        email:user.email
    }

    const token = await jwt.sign(tokenData,process.env.TOKEN_SECRET!,{expiresIn:"1d"})

    const response = NextResponse.json({
        message:"Login successful",
        status:200,
        success:true,
    })

    response.cookies.set("token",token,{httpOnly:true})

    return response;

    

    } catch (error:any) {
        return NextResponse.json({error:error.message,status:500});
    }
}