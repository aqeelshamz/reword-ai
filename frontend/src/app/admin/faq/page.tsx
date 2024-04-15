"use client";
import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { FiHelpCircle, FiTrash } from 'react-icons/fi';
import { serverURL } from '@/utils/utils';
import { toast } from 'react-toastify';

export default function Page() {
    const [data, setData] = useState([]);
    const [deleteFaqId, setDeleteFaqId] = useState("");

    const getData = async () => {
        const config = {
            method: "GET",
            url: `${serverURL}/faq`,
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
        };

        axios(config)
            .then((response) => {
                setData(response.data);
            })
    }

    const deleteFAQ = async () => {
        const config = {
            method: "POST",
            url: `${serverURL}/admin/faq/delete`,
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
            data: {
                faqId: deleteFaqId
            }
        };

        axios(config)
            .then((response) => {
                toast.success("FAQ deleted successfully");
                getData();
            })
    }

    useEffect(() => {
        getData();
    }, []);

    return <div className='animate-fade-in-bottom w-full h-full p-4'>
        <p className='font-semibold text-xl flex items-center mb-5'><FiHelpCircle className='mr-2' /> FAQ</p>
        <Link href="/admin/faq/new"><button className='btn btn-primary'>+ New FAQ</button></Link>
        <div className="overflow-x-auto mt-5">
            <table className="table">
                <thead>
                    <tr>
                        <th></th>
                        <th>Question</th>
                        <th>Answer</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map((item: any, i: number) => {
                            return <tr key={i} className='hover'>
                                <th>1</th>
                                <td>{item?.question}</td>
                                <td>{item?.answer}</td>
                                <td><label onClick={() => setDeleteFaqId(item?._id)} htmlFor='deletefaq_modal' className='btn btn-square btn-outline btn-error'><FiTrash /></label></td>
                            </tr>
                        })
                    }
                </tbody>
            </table>
        </div>
        {/* Delete FAQ Modal */}
        <input type="checkbox" id="deletefaq_modal" className="modal-toggle" />
        <div className="modal">
            <div className="modal-box">
                <h3 className="flex items-center font-bold text-lg"><FiTrash className="mr-1" /> Delete FAQ</h3>
                <p className="py-4">Are you sure want to delete this FAQ?</p>
                <div className="modal-action">
                    <label htmlFor="deletefaq_modal" className="btn">Cancel</label>
                    <label htmlFor="deletefaq_modal" className="btn btn-error" onClick={() => deleteFAQ()}>Delete</label>
                </div>
            </div>
            <label className="modal-backdrop" htmlFor="deletefaq_modal">Cancel</label>
        </div>
    </div>
}