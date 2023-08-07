"use client";
import serverURL from "@/utils/utils";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FiArrowRight, FiCheckCircle } from "react-icons/fi";

export default function Page() {
    const [plans, setPlans] = useState<any[]>([]);
    const [selectedPlan, setSelectedPlan] = React.useState(0);

    const getPlans = async () => {
        const config = {
            method: "GET",
            url: `${serverURL}/plans`,
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
        };

        axios(config)
            .then((response) => {
                setPlans(response.data);
            })
    }

    useEffect(() => {
        getPlans();
    }, []);

    return <main className="flex flex-col w-screen h-screen bg-base-100 p-4 overflow-hidden">
        <p className="mb-5 font-semibold text-2xl max-sm:mb-3"><Link href="/"><span>📝 RewordAI ✨</span></Link> | Plans</p>
        <div className="animate-fade-in-bottom w-full h-full flex items-center justify-center flex-wrap overflow-y-auto">
            {
                plans.map((plan: any, i: number) => {
                    return <div key={i} onClick={() => setSelectedPlan(i)} className={(selectedPlan === i ? "border-primary " : "") + "cursor-pointer border-2 select-none card w-96 bg-base-100 hover:bg-base-200 duration-75 active:scale-95 shadow-xl mr-5 mb-5"}>
                        <div className="card-body">
                            <h2 className="card-title">
                                {plan?.title}
                                <div className="badge badge-secondary">{["Free", "Monthly", "Yearly", "Lifetime"][plan?.type]}</div>
                                {!plan?.enable ? <div className="badge badge-ghost">Disabled</div> : ""}
                            </h2>
                            <p className="font-semibold text-4xl mb-4">${plan?.price}<span className="text-sm">{["", " / Month", " / Year", " / Lifetime"][plan?.type].toLowerCase()}</span></p>
                            <p className='flex items-center'><FiCheckCircle className='mr-2' />{plan?.rewriteLimit} rewrites</p>
                            <p className='flex items-center'><FiCheckCircle className='mr-2' />{plan?.ads ? "Shows Ads" : "No Ads"}</p>
                        </div>
                    </div>
                })
            }
        </div>
        <div className="flex justify-center my-5">
            <button className="btn btn-primary" onClick={() => window.location.href = `/plans/payment?item=${plans[selectedPlan]?._id}`}>Checkout <FiArrowRight /></button>
        </div>
    </main>
}


