"use client";
import React from 'react';
import { FiCheck, FiDelete, FiEdit, FiGift, FiPlay, FiPlus, FiTrash } from 'react-icons/fi';

export default function Page() {
    return <div className='animate-fade-in-bottom w-full h-full p-4'>
        <p className='font-semibold text-xl flex items-center'><FiGift className='mr-2' /> Plans</p>
        <div className='w-full flex flex-wrap'>
            {
                [...Array(4)].map((x, i) => {
                    return <div className="card w-96 bg-base-100 shadow-xl mr-5 mb-5">
                        <div className="card-body">
                            <h2 className="card-title">
                                Monthly Plan
                                <div className="badge badge-secondary">NEW</div>
                            </h2>
                            <p className='flex items-center'><FiCheck className='mr-1' /> 200 rewrites</p>
                            <p className='flex items-center'><FiCheck className='mr-1' /> 200 rewrites</p>
                            <p className='flex items-center'><FiCheck className='mr-1' /> 200 rewrites</p>
                            <p className='flex items-center'><FiCheck className='mr-1' /> 200 rewrites</p>
                            <div className="card-actions justify-end">
                                <label className='btn btn-sm'><FiEdit />Edit</label>
                                <label className='btn btn-sm'><FiTrash />Delete</label>
                            </div>
                        </div>
                    </div>
                })
            }
            <div className="btn h-auto min-h-[30vh] card w-96 bg-base-100 shadow-xl mr-5 mb-5">
                <FiPlus className='text-4xl' />
                <p>New Plan</p>
            </div>
        </div>
    </div>
}