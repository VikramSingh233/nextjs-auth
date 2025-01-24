"use client";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import React , {useState} from "react";
import Link from "next/link";
export default function ProfilePage() {
    const router = useRouter();
    const [data,setdata]= useState("");
    const logout = async () => {
       try {
        await axios.get("/api/users/logout");
        toast.success("Logout successful");
        router.push("/login");
       } catch (error:any) {
        console.error("Logout failed", error.toJSON());
       }}

    const getUserDetail = async()=>{
        const res = await axios.get("/api/users/me");
        setdata(res.data.data._id)
    }
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-900">
            <h1 className="text-4xl font-bold text-white">Profile</h1>
            <h2 className="padding rounded text-white">{data==="" ? "":data} <Link 
            href={`/profile/${data}`}
            >{data}</Link></h2>
            <hr />

            <button onClick={getUserDetail} className="bg-orange-500 hover:bg-blue-700 mt-3 text-white font-bold py-2 px-4 rounded">getUserDetail</button>
            <button onClick={logout} className="bg-blue-500 hover:bg-blue-700 mt-3 text-white font-bold py-2 px-4 rounded">Logout</button>
        </div>
    );
}