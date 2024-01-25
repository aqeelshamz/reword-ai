"use client";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import CheckoutForm from "./stripe_form";
import serverURL from "@/utils/utils";
import RazorpayIntegration from "./razorpay_form";
import { useSearchParams } from "next/navigation";
const stripePromise = loadStripe("pk_test_51NaV1ISCTPV4jDzycVuMlryjTVFBVYpyXfZ9kM5TRZFauiRxBKB5XnYSyCU1lzllFJuN6XXzgDac907yFrkiQq9300AQLTb7c5");

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
        <p className="mb-5 font-semibold text-2xl max-sm:mb-3"><Link href="/"><span>📝 RewordAI ✨</span></Link> | Payment</p>
        <div className="w-full h-full flex items-center justify-center">
            {params.get("method") === "stripe" ? clientSecret && orderId  && (
                <Elements options={options} stripe={stripePromise}>
                    <CheckoutForm orderId={orderId} />
                </Elements>
            ) :
                <RazorpayIntegration item={params.get("item")} />
            }
        </div>
    </main>
}