"use client";
import Link from 'next/link'
import { useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { appName } from '@/utils/utils';
import { ToastContainer, toast } from 'react-toastify';
import { loginAdminResponse, loginUserResponse } from '@/utils/demo';

export default function Home() {
    const [theme, setTheme] = useState<null | any | string>(
        "light"
    );

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setTheme(localStorage.getItem("theme") ? localStorage.getItem("theme") : "light");
            if (localStorage.getItem("token")) {
                window.location.href = "/chat";
            }
        }
    }, [])

    useEffect(() => {
        localStorage.setItem("theme", theme);
        const localTheme: string = localStorage.getItem("theme")!.toString();
        document.querySelector("html")!.setAttribute("data-theme", localTheme);
    }, [theme]);

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const login = async () => {
        var response;
        if (email === "admin@rewordai.com" && password === "admin123") {
            response = loginAdminResponse;
            toast.success("Logged In!");
            localStorage.setItem("token", response.token);
            window.location.href = response.user.type === "admin" ? "/admin" : "/";
        }
        else if (email === "user@rewordai.com" && password === "user123") {
            response = loginUserResponse;
            toast.success("Logged In!");
            localStorage.setItem("token", response.token);
            window.location.href = response.user.type === "admin" ? "/admin" : "/";
        }
        else {
            toast.error("Incorrect email or password!");
            return;
        }
    }

    return (
        <main className="w-screen h-screen bg-base-100 flex p-2 overflow-hidden">
            <div className='flex flex-col text-white p-10 max-w-[30vw] bg-primary h-full rounded-md'>
                <p className="mb-10">📝 {appName} ✨</p>
                <p className="text-2xl font-semibold mb-2">
                    {appName} - Your AI-Powered Text Rewriter
                </p>
                <p className="opacity-70">Seamlessly create, rewrite, and enhance content with advanced AI-driven technology. Unlock the potential of perfect grammar and captivating text effortlessly.</p>
            </div>
            <div className="animate-fade-in-bottom flex flex-col w-full h-full ml-2 rounded-md p-10">
                <p className="font-bold text-xl mb-3">Login</p>
                <p className="mb-5">Don&apos;t have an account? <Link href={'/signup'}><label htmlFor="createchatbot_modal" className="btn btn-sm">Sign up</label></Link></p>
                <p className="text-sm mb-1">Email</p>
                <input className="input input-bordered mb-5 max-w-xs" placeholder="Email" type="text" onChange={(x) => setEmail(x.target.value)} value={email} />
                <p className="text-sm mb-1">Password</p>
                <input className="input input-bordered mb-5 max-w-xs" placeholder="Password" type="password" onChange={(x) => setPassword(x.target.value)} value={password} />
                <button className="btn btn-primary max-w-xs" onClick={() => login()}>Login</button>
            </div>
            <ToastContainer />
        </main>
    )
}