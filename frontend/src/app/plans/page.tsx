"use client";
import serverURL from "@/utils/utils";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FiArrowRight, FiCheckCircle, FiCreditCard, FiFileText, FiType } from "react-icons/fi";

export default function Page() {
    const [paymentMethods, setPaymentMethods] = useState<any>();
    const [plans, setPlans] = useState<any[]>([]);
    const [selectedPlan, setSelectedPlan] = useState(0);
    const [paymentMethod, setPaymentMethod] = useState("stripe"); // ["stripe", "razorpay"]

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
                setPlans(response.data.plans);
                setPaymentMethods(response.data.paymentMethods);
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
        {!paymentMethods?.razorpay && !paymentMethods?.stripe ? <p className="text-center mb-10 text-red-600">No payment method available</p> : <div className="flex justify-center my-5">
            <label htmlFor="paymentmethod_modal" className="btn btn-primary" >Checkout <FiArrowRight /></label>
        </div>}
        {/* Payment Method Modal */}
        <input type="checkbox" id="paymentmethod_modal" className="modal-toggle" />
        <div className="modal">
            <div className="modal-box">
                <h3 className="flex items-center font-bold text-lg"><FiCreditCard className="mr-1" /> Select Payment Method</h3>
                {paymentMethods?.stripe ? <div onClick={() => setPaymentMethod("stripe")} className={(paymentMethod === "stripe" ? "border-primary " : "") + "cursor-pointer border-2 select-none card bg-base-100 hover:bg-base-200 duration-75 active:scale-95 shadow-xl mr-5 my-4"}>
                    <div className="card-body">
                        <h2 className="card-title">
                            Stripe
                        </h2>
                    </div>
                </div> : ""}
                {paymentMethods?.razorpay ? <div onClick={() => setPaymentMethod("razorpay")} className={(paymentMethod === "razorpay" ? "border-primary " : "") + "cursor-pointer border-2 select-none card bg-base-100 hover:bg-base-200 duration-75 active:scale-95 shadow-xl mr-5 my-4"}>
                    <div className="card-body">
                        <h2 className="card-title">
                            Razorpay
                        </h2>
                    </div>
                </div> : ""}
                <div className="modal-action mt-10">
                    <label htmlFor="paymentmethod_modal" className="btn">Cancel</label>
                    <label className="btn btn-primary" onClick={() => window.location.href = `/plans/payment?item=${plans[selectedPlan]?._id}&method=${paymentMethod}`}>Pay</label>
                </div>
            </div>
            <label className="modal-backdrop" htmlFor="paymentmethod_modal">Cancel</label>
            <label htmlFor="paymentmethod_modal" hidden></label>
        </div>
    </main>
}


