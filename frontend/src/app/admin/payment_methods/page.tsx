"use client";
import serverURL from '@/utils/utils';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FiCheckCircle, FiCreditCard, FiDownload, FiXCircle } from 'react-icons/fi';

export default function Page() {
    type PaymentMethodData = {
        stripe: boolean;
        razorpay: boolean;
    }

    const [data, setData] = useState<PaymentMethodData | null>();

    const getData = async () => {
        const config = {
            method: "GET",
            url: `${serverURL}/admin/payment-methods`,
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
        };

        axios(config)
            .then((response) => {
                setData(response.data);
            })
    }

    const saveData = async (data:PaymentMethodData) => {
        const config = {
            method: "POST",
            url: `${serverURL}/admin/payment-methods`,
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json"
            },
            data: data
        };

        axios(config).then((response) => {
            setData(response.data);
        });
    }

    useEffect(() => {
        getData();
    }, []);

    return <div className='animate-fade-in-bottom w-full h-full p-4'>
        <p className='font-semibold text-xl flex items-center'><FiCreditCard className='mr-2' /> Payment methods</p>
        <div className="overflow-x-auto">
            <table className="table">
                {/* head */}
                <thead>
                    <tr>
                        <th></th>
                        <th>Payment method</th>
                        <th>Enable</th>
                    </tr>
                </thead>
                <tbody>
                    {/* row 1 */}
                    <tr className='hover'>
                        <th>1</th>
                        <td>Stripe</td>
                        <td><input type="checkbox" className="toggle" onChange={(x) => {
                            setData({
                                ...data!,
                                stripe: !data?.stripe
                            });
                            saveData({razorpay: data?.razorpay!, stripe: !data?.stripe!});
                        }} checked={data?.stripe} /></td>
                    </tr>
                    {/* row 2 */}
                    <tr className='hover'>
                        <th>2</th>
                        <td>Razorpay</td>
                        <td><input type="checkbox" className="toggle" onChange={(x) => {
                            setData({
                                ...data!,
                                razorpay: !data?.razorpay
                            });
                            saveData({razorpay: !data?.razorpay!, stripe: data?.stripe!});
                        }} checked={data?.razorpay} /></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
}