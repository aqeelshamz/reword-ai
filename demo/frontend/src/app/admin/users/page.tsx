"use client";
import Link from 'next/link';
import { FiUser, FiUsers } from 'react-icons/fi';
import React, { useEffect, useState } from 'react';

export default function Page() {
    const [users, setUsers] = useState<any>([]);

    const getUsers = async () => {
        setUsers([
            {
                "_id": "65b34532e07b594aae9e50d3",
                "name": "Zaptox",
                "email": "zaptox@gmail.com",
                "type": "user",
                "rewrites": 100,
                "purchases": 0
            },
            {
                "_id": "65b34071c91e92def2ed4192",
                "name": "Afreen",
                "email": "afreen@gmail.com",
                "type": "user",
                "rewrites": 100,
                "purchases": 0
            },
            {
                "_id": "65b21c9d4a0adf48311fe6c1",
                "name": "User",
                "email": "user@rewordai.com",
                "type": "user",
                "rewrites": 1479,
                "purchases": 2
            },
            {
                "_id": "65b21c0d4a0adf48311fe652",
                "name": "Admin",
                "email": "admin@rewordai.com",
                "type": "admin",
                "rewrites": 96,
                "purchases": 0
            }
        ]);
    }

    useEffect(() => {
        getUsers();
    }, []);


    return <div className='animate-fade-in-bottom w-full h-full p-4'>
        <p className='font-semibold text-xl flex items-center'><FiUsers className='mr-2' /> Users</p>
        <div className="overflow-x-auto">
            <table className="table">
                <thead>
                    <tr>
                        <th></th>
                        <th>User</th>
                        <th>Email</th>
                        <th>Rewrites Left</th>
                        <th>Purchases</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.map((user: any, index: number) => {
                            return <tr key={index}>
                                <td>
                                    {index + 1}
                                </td>
                                <td>
                                    <div className="flex items-center space-x-3">
                                        <div className="avatar placeholder mr-2">
                                            <div className="bg-blue-700 text-white mask mask-squircle w-10">
                                                <span><FiUser /></span>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">{user?.name}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <Link href={`mailto:${user?.email}`} target='_blank' className='underline'>{user?.email}</Link>
                                </td>
                                <td>{user?.rewrites}</td>
                                <td>{user?.purchases}</td>
                            </tr>
                        })
                    }
                </tbody>
            </table>
        </div>
    </div>
}