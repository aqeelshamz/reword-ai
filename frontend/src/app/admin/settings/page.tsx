"use client";
import React from 'react';
import { FiSettings } from 'react-icons/fi';

export default function Page() {
    return <div className='animate-fade-in-bottom w-full h-full p-4'>
        <p className='font-semibold text-xl flex items-center'><FiSettings className='mr-2' /> Settings</p>

    </div>
}