"use client";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FiArrowLeft, FiFileText } from "react-icons/fi";
import { appName, currencySymbol } from "@/utils/utils";

export default function Page() {
    const { id } = useParams();
    const [data, setData] = useState<any>();

    const getData = async () => {
        var response;
        if (id === "65b228852c1449cd2e55ff81") {
            response = {
                "to": {
                    "name": "Aqeel",
                    "email": "aqeelten@gmail.com"
                },
                "from": {
                    "name": "RewordAI",
                    "email": "RewordAI, RewordAI Street, 123456, RewordAI."
                },
                "_id": "65b228852c1449cd2e55ff86",
                "purchaseId": "65b228852c1449cd2e55ff81",
                "userId": "65b21c9d4a0adf48311fe6c1",
                "date": "1/25/2024",
                "item": "Premium (1200 Rewrites)",
                "amount": 999,
                "paymentMethod": "Stripe",
                "createdAt": "2024-01-25T09:23:17.580Z",
                "updatedAt": "2024-01-25T09:23:17.580Z",
                "__v": 0
            };

            setData(response);
        }
        else {
            response = {
                "to": {
                    "name": "Aqeel",
                    "email": "aqeelten@gmail.com"
                },
                "from": {
                    "name": "RewordAI",
                    "email": "RewordAI, RewordAI Street, 123456, RewordAI."
                },
                "_id": "65b227af2c1449cd2e55ff2c",
                "purchaseId": "65b227af2c1449cd2e55ff27",
                "userId": "65b21c9d4a0adf48311fe6c1",
                "date": "1/25/2024",
                "item": "Basic 100 (200 Rewrites)",
                "amount": 129,
                "paymentMethod": "Stripe",
                "createdAt": "2024-01-25T09:19:43.704Z",
                "updatedAt": "2024-01-25T09:19:43.704Z",
                "__v": 0
            };

            setData(response);
        }
    }

    useEffect(() => {
        getData();
    }, []);

    useEffect(() => {
        if (data) {
            window.print();
        }
    }, [data]);

    return <main className="invoice-page flex flex-col w-screen h-screen p-4 overflow-hidden bg-purple-100">
        <div className="headerp flex items-center mb-5 font-semibold text-2xl max-sm:mb-3"><div className="cursor-pointer" onClick={() => { window.location.href = "/" }}><FiArrowLeft className="mr-5" /></div> <FiFileText className="mr-2" /> Invoice</div>
        <div className="w-full h-full flex flex-col justify-center items-center ">
            <p className="mb-5 text-lg">{appName}</p>
            <div className="min-w-[35vw] bg-white rounded-xl overflow-hidden">
                <div className="flex justify-center p-10 bg-primary text-white text-xl">
                    <p>Thank you.</p>
                </div>
                <div>
                    <div className="flex justify-between p-6">
                        <p>Purchase ID: {data?.purchaseId}</p>
                        <p>{data?.date}</p>
                    </div>
                    <div className="divider my-0"></div>
                    <div className="flex justify-between p-6">
                        <p>Payment Method:</p>
                        <p>{data?.paymentMethod}</p>
                    </div>
                    <div className="divider my-0"></div>
                    <div className="flex justify-between p-6">
                        <p>{data?.item}</p>
                        <p>{currencySymbol} {data?.amount}</p>
                    </div>
                    <div className="divider my-0"></div>
                    <div className="flex justify-between p-6">
                        <div>
                            <p>Invoice for: </p>
                            <p>{data?.to?.name}</p>
                            <p>{data?.to?.email}</p>
                        </div>
                        <div>
                            <p>From: </p>
                            <p>{data?.from?.name}</p>
                            <p className="max-w-xs">{data?.from?.email}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
}
