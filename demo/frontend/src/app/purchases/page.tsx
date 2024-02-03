"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { currencySymbol } from "@/utils/utils";
import { FiArrowLeft, FiDownload, FiShoppingBag } from "react-icons/fi";

export default function Page() {
    const [data, setData] = useState<any>([]);

    const getData = async () => {
        setData([
            {
                "_id": "65b228852c1449cd2e55ff81",
                "item": "Premium",
                "amount": 999,
                "paymentMethod": "razorpay",
                "date": "1/25/2024"
            },
            {
                "_id": "65b227af2c1449cd2e55ff27",
                "item": "Basic 100",
                "amount": 129,
                "paymentMethod": "stripe",
                "date": "1/25/2024"
            }
        ]);
    }

    useEffect(() => {
        getData();
    }, []);

    return <main className="flex flex-col w-screen h-screen bg-base-100 p-4 overflow-hidden">
        <p className="flex items-center mb-5 font-semibold text-2xl max-sm:mb-3"><Link href="/"><FiArrowLeft className="mr-5" /></Link> <FiShoppingBag className="mr-2" /> My Purchases</p>
        <div className="overflow-x-auto">
            <table className="table">
                {/* head */}
                <thead>
                    <tr>
                        <th></th>
                        <th>Purchase Date</th>
                        <th>Item</th>
                        <th>Total Price</th>
                        <th>Payment Method</th>
                        <th>Invoice</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map((item: any, i: number) => {
                            return <tr key={i} className='hover'>
                                <th>1</th>
                                <td>{item?.date}</td>
                                <td>{item?.item}</td>
                                <td>{currencySymbol} {item?.amount}</td>
                                <td>{item?.paymentMethod}</td>
                                <td><Link href={"/invoice/" + item._id}><button className='btn btn-md'><FiDownload /></button></Link></td>
                            </tr>
                        })
                    }
                </tbody>
            </table>
        </div>
    </main>
}


