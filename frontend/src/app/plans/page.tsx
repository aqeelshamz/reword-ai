"use client";
import Link from "next/link";
import React from "react";
import { FiCheckCircle } from "react-icons/fi";

export default function Page() {
    const [selectedPlan, setSelectedPlan] = React.useState(0);

    return <main className="flex flex-col w-screen h-screen bg-base-100 p-4 overflow-hidden">
        <p className="mb-5 font-semibold text-2xl max-sm:mb-3"><Link href="/"><span>📝 RewordAI ✨</span></Link> | Plans</p>
        <div className="animate-fade-in-bottom w-full h-full flex items-center justify-center flex-wrap">
            {
                [...Array(3)].map((x, i) => {
                    return <div onClick={() => setSelectedPlan(i)} className={(selectedPlan === i ? "border-primary " : "") + " border-2 cursor-pointer card w-96 bg-base-100 hover:bg-base-200 active:scale-95 duration-75 select-none shadow-xl mr-5 mb-5 "}>
                        <div className="card-body">
                            <h2 className="card-title">
                                Basic
                                <div className="badge badge-primary">Monthly</div>
                            </h2>
                            <p className='flex items-center'><FiCheckCircle className='mr-2' /> 200 rewrites</p>
                            <p className='flex items-center'><FiCheckCircle className='mr-2' /> 200 rewrites</p>
                            <p className='flex items-center'><FiCheckCircle className='mr-2' /> 200 rewrites</p>
                            <p className='flex items-center'><FiCheckCircle className='mr-2' /> 200 rewrites</p>
                        </div>
                    </div>
                })
            }
        </div>
    </main>
}