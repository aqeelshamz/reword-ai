"use client";
import Link from 'next/link'
import { useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { appName } from '@/utils/utils';
import { ToastContainer, toast } from 'react-toastify';

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

    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const [verificationCodeSent, setVerificationCodeSent] = useState<boolean>(false);
    const [verificationCode, setVerificationCode] = useState<string>("");

    const [loading, setLoading] = useState<boolean>(false);

    const sendVerificationCode = async () => {
        setLoading(true);
        if (email == "" || name == "" || password == "") {
            toast.error("Please fill out all fields!");
            return;
        }

        toast.success("Verification Code Sent!");
        setVerificationCodeSent(true);
        setLoading(false);
    }

    const verifyEmail = async () => {
        if (email == "" || name == "" || password == "") {
            toast.error("Please fill out all fields!");
            return;
        }

        if (verificationCode == "") {
            toast.error("Please enter the verification code!");
            return;
        }

        toast.success("Email verified!");
        signup();
    }

    const signup = async () => {
        if (email == "" || name == "" || password == "") {
            toast.error("Please fill out all fields!");
            return;
        }

        toast.error("This feature is not available in the demo version!");
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
                <p className="font-bold text-xl mb-3">Sign Up</p>
                <p className="mb-5">Have an account? <Link href={'/login'}><label htmlFor="createchatbot_modal" className="btn btn-sm">Login</label></Link></p>
                <p className="text-sm mb-1">Full Name</p>
                <input className="input input-bordered mb-5 max-w-xs" placeholder="Full Name" type="text" onChange={(x) => setName(x.target.value)} value={name} />
                <p className="text-sm mb-1">Email</p>
                <input className="input input-bordered mb-5 max-w-xs" placeholder="Email" type="text" onChange={(x) => setEmail(x.target.value)} value={email} />
                <p className="text-sm mb-1">Password</p>
                <input className="input input-bordered mb-5 max-w-xs" placeholder="Password" type="password" onChange={(x) => setPassword(x.target.value)} value={password} />
                {verificationCodeSent && <div className="flex flex-col">
                    <p className="text-sm mb-1">Verification Code</p>
                    <input className="input input-bordered mb-5 max-w-xs" placeholder="Verification Code" type="text" onChange={(x) => setVerificationCode(x.target.value)} value={verificationCode} />
                </div>}
                <button className="btn btn-primary max-w-xs" onClick={() => {
                    if (loading) return;
                    if (!verificationCodeSent) {
                        sendVerificationCode();
                    }
                    else {
                        verifyEmail();
                    }
                }}>{loading ? <span className="loading loading-spinner"></span> : verificationCodeSent ? "Create Account" : "Send Verification Code"}</button>
            </div>
            <ToastContainer />
        </main>
    )
}