"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { currencySymbol } from "@/utils/utils";
import { FiArrowLeft, FiArrowRight, FiCheckCircle, FiCreditCard, FiShoppingCart } from "react-icons/fi";
import { ToastContainer, toast } from "react-toastify";

export default function Page() {
    const [paymentMethods, setPaymentMethods] = useState<any>();
    const [items, setItems] = useState<any[]>([]);
    const [selectedItem, setSelectedItem] = useState(0);
    const [paymentMethod, setPaymentMethod] = useState("stripe"); // ["stripe", "razorpay"]

    const getItems = async () => {
        var data = {
            "items": [
                {
                    "_id": "65b223b50d34920db58463c2",
                    "enable": true,
                    "userId": "65b21c0d4a0adf48311fe652",
                    "title": "Premium",
                    "rewriteLimit": 1200,
                    "price": 999,
                    "type": 1,
                    "createdAt": "2024-01-25T09:02:45.555Z",
                    "updatedAt": "2024-01-25T09:04:07.599Z",
                    "__v": 0
                },
                {
                    "_id": "65b223c70d34920db58463c7",
                    "enable": true,
                    "userId": "65b21c0d4a0adf48311fe652",
                    "title": "Basic 100",
                    "rewriteLimit": 200,
                    "price": 129,
                    "type": 1,
                    "createdAt": "2024-01-25T09:03:03.769Z",
                    "updatedAt": "2024-02-02T23:33:09.574Z",
                    "__v": 0
                }
            ],
            "paymentMethods": {
                "razorpay": true,
                "stripe": true
            }
        };
        setItems(data.items);
        setPaymentMethods(data.paymentMethods);
    }

    useEffect(() => {
        getItems();
    }, []);

    return <main className="flex flex-col w-screen h-screen bg-base-100 p-4 overflow-hidden">
        <p className="flex items-center mb-5 font-semibold text-2xl max-sm:mb-3"><Link href="/"><FiArrowLeft className="mr-5" /></Link> <FiShoppingCart className="mr-2" /> Shop</p>
        <div className="animate-fade-in-bottom w-full h-full flex items-center justify-center flex-wrap overflow-y-auto">
            {
                items.map((item: any, i: number) => {
                    return <div key={i} onClick={() => setSelectedItem(i)} className={(selectedItem === i ? "border-primary " : "") + "cursor-pointer border-2 select-none card w-96 bg-base-100 hover:bg-base-200 duration-75 active:scale-95 shadow-xl mr-5 mb-5"}>
                        <div className="card-body">
                            <h2 className="card-title">
                                {item?.title}
                                <div className="badge badge-secondary">{["Free", "Paid"][item?.type]}</div>
                                {!item?.enable ? <div className="badge badge-ghost">Disabled</div> : ""}
                            </h2>
                            <p className="font-semibold text-4xl mb-4">{currencySymbol} {item?.price}</p>
                            <p className='flex items-center'><FiCheckCircle className='mr-2' />{item?.rewriteLimit} rewrites</p>
                        </div>
                    </div>
                })
            }
        </div>
        {!paymentMethods?.razorpay && !paymentMethods?.stripe ? <p className="text-center mb-10 text-red-600">No payment method available</p> : <div className="flex justify-center my-5">
            <label htmlFor="paymentmethod_modal" className="btn btn-primary" >Buy Now <FiArrowRight /></label>
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
                    <label htmlFor="paymentmethod_modal" className="btn btn-primary" onClick={() => {
                        toast.error("This feature is not available in the demo version!");
                    }}>Pay</label>
                </div>
            </div>
            <label className="modal-backdrop" htmlFor="paymentmethod_modal">Cancel</label>
            <label htmlFor="paymentmethod_modal" hidden></label>
        </div>
        <ToastContainer />
    </main>
}


