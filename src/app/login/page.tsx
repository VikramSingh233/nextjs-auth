"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import {useRouter} from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";


export default function LoginPagePage() {
    const router = useRouter();
    const [user,setUser] = React.useState({email:"",password:""});
    const [loading,setLoading] = React.useState(false);
    const [buttonDisabled,setButtonDisabled] = React.useState(false);

    const onLogin = async() =>{
        try {
            setLoading(true);
            const response = await axios.post("/api/users/login", user);
            console.log("Login success", response.data);
            toast.success("Login success");
            router.push("/profile");
        } catch (error:any) {
            console.error("Login failed", error.toJSON());
            if (error.response) {
                toast.error(error.response.data.message || "Login failed");
            } else if (error.request) {
                toast.error("Network error: API not reachable.");
            } else {
                toast.error("Unexpected error occurred.");
            }
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if(user.email.length > 0 && user.password.length > 0){
            setButtonDisabled(false);
        }else{
            setButtonDisabled(true);
        }
    },[user]);
    return <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-900">
        <h1 className="text-4xl font-bold text-white">{loading ? "Processing" : "Login"}</h1>
        <hr />

        <label htmlFor="email"className="mt-4 text-white">Email</label>
        <input className="border border-gray-200 rounded-lg mb-4 focus:outline-none focus:border-gray-600 p-2" type="email" id="email" value={user.email} placeholder="email" required onChange={(e) => setUser({...user,email:e.target.value})} />

        <label htmlFor="password"className="mt-4 text-white">Password</label>
        <input className="border border-gray-200 rounded-lg mb-4 focus:outline-none focus:border-gray-600 p-2" type="password" id="password" value={user.password} placeholder="password" required onChange={(e) => setUser({...user,password:e.target.value})} />

        <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg" onClick={onLogin} type="submit">
        {buttonDisabled ? "All fields are required" : "Login"}
        </button>

        <Link href="/signup" className="mt-4 text-white">Not have an account</Link>
    </div>;
}