"use client";
import Link from "next/link";

export default function Page() {
    return <main className="flex flex-col w-screen h-screen bg-base-100 p-4 overflow-hidden">
        <p className="mb-5 font-semibold text-2xl max-sm:mb-3"><Link href="/"><span>📝 RewordAI ✨</span></Link> | Payment Successful</p>
    </main>
}

