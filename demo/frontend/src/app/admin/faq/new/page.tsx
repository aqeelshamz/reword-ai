"use client";
import React, { useState } from 'react';
import { FiHelpCircle } from 'react-icons/fi';
import { toast } from 'react-toastify';

export default function Page() {
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');

    const createFAQ = async () => {
        toast.error("This feature is not available in the demo version!");
    }

    return <div className='animate-fade-in-bottom w-full h-full p-4'>
        <p className='font-semibold text-xl flex items-center mb-5'><FiHelpCircle className='mr-2' /> New FAQ</p>
        <div className="overflow-x-auto flex flex-col">
            <p className='mb-2'>Question</p>
            <input type="text" className="input input-bordered w-full max-w-lg" value={question} onChange={(e) => setQuestion(e.target.value)} />
            <p className='mb-2 mt-4'>Answer</p>
            <textarea className="textarea textarea-bordered w-full max-w-lg" value={answer} onChange={(e) => setAnswer(e.target.value)}></textarea>
            <button className='max-w-lg btn btn-primary mt-4' onClick={() => createFAQ()}>Save</button>
        </div>
    </div>
}