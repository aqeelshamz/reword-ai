"use client";
import Link from "next/link";
import CheckoutForm from "./stripe_form";
import { loadStripe } from "@stripe/stripe-js";
import RazorpayIntegration from "./razorpay_form";
import { useSearchParams } from "next/navigation";
import { Elements } from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";
import { appName, serverURL, stripeKey } from "@/utils/utils";

const stripePromise = loadStripe(stripeKey);

export default function Page() {
    const params = useSearchParams();
    const [clientSecret, setClientSecret] = useState("");
    const [orderId, setOrderId] = useState("");

    useEffect(() => {
        // Create PaymentIntent as soon as the page loads (STRIPE)
        fetch(`${serverURL}/shop/create-order-stripe`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ itemId: params.get("item") }),
        })
            .then((res) => res.json())
            .then((data) => {
                setClientSecret(data.clientSecret);
                setOrderId(data.orderId);
            });
    }, []);

    const appearance = {
        theme: 'flat',
        variables: {
            colorPrimary: '#570df8',
        },
    };

    const options: any = {
        clientSecret,
        appearance,
    };

    return <main className="flex flex-col w-screen h-screen bg-base-100 p-4 overflow-hidden">
        <p className="mb-5 font-semibold text-2xl max-sm:mb-3"><Link href="/"><span>📝 {appName} ✨</span></Link> | Payment</p>
        <div className="w-full h-full flex items-center justify-center">
            {params.get("method") === "stripe" ? clientSecret && orderId && (
                <Elements options={options} stripe={stripePromise}>
                    <CheckoutForm orderId={orderId} />
                </Elements>
            ) :
                <RazorpayIntegration item={params.get("item")} />
            }
        </div>
    </main>
}