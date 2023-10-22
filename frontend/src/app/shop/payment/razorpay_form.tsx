"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
export default function RazorpayIntegration(item: any | string) {
    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;
        document.body.appendChild(script);
        openPayModal();
    }, []);

    const openPayModal = async () => {
        const config = {
            method: 'POST',
            url: 'http://localhost:8080/plans/create-order-razorpay',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
            data: { planId: item.item },
        };

        const response = await axios(config);

        const { id: order_id, amount: order_amount } = response.data;

        const options = {
            key: "rzp_test_mCodGqhrqtU4wk",
            amount: order_amount,
            currency: 'INR',
            name: 'Merchant Name',
            description: 'Payment for upgrade',
            order_id: order_id,
            prefill: {
                name: 'Sanjana Kumari',
                email: 'sanjana@gmail.com',
                contact: '1234567890',
            },
            handler: async (response: any) => {
                const { razorpay_signature, razorpay_payment_id } = response;

                const values = {
                    razorpay_signature,
                    razorpay_order_id: order_id,
                    transactionid: razorpay_payment_id,
                    transactionamount: order_amount,
                };

                try {
                    const config = {
                        method: 'POST',
                        url: 'http://localhost:8080/plans/verify-razorpay-payment',
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem('token')}`,
                            'Content-Type': 'application/json',
                        },
                        data: values,
                    };

                    await axios(config);
                    toast.success('Payment successful');

                    setTimeout(() => {
                        window.location.href = '/';
                    }, 2000);
                } catch (error) {
                    console.error(error);
                    alert('Payment failed');
                }
            },
            theme: {
                color: '#528ff0',
            },
        };

        if (typeof window !== 'undefined') {
            const rzp1 = new (window as any).Razorpay(options);
            rzp1.open();
        }
    };

    return (
        <div>
        </div>
    );
};