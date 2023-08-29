"use client";
import React from 'react';
import { FiCheckCircle, FiDollarSign, FiDownload, FiXCircle } from 'react-icons/fi';

export default function Page() {
    return <div className='animate-fade-in-bottom w-full h-full p-4'>
        <p className='font-semibold text-xl flex items-center'><FiDollarSign className='mr-2' /> Purchases</p>
        <div className="overflow-x-auto">
            <table className="table">
                {/* head */}
                <thead>
                    <tr>
                        <th></th>
                        <th>User</th>
                        <th>Plan</th>
                        <th>Total Price</th>
                        <th>Payment Status</th>
                        <th>Invoice</th>
                    </tr>
                </thead>
                <tbody>
                    {/* row 1 */}
                    <tr className='hover'>
                        <th>1</th>
                        <td>Aqeel</td>
                        <td>Yearly</td>
                        <td>$ 80.0</td>
                        <td className='flex items-center'><FiCheckCircle className='mr-1' />Success</td>
                        <td><button className='btn btn-md'><FiDownload /></button></td>
                    </tr>
                    {/* row 2 */}
                    <tr className='hover'>
                        <th>2</th>
                        <td>Fadil</td>
                        <td>Monthly</td>
                        <td>$ 25.0</td>
                        <td className='flex items-center'><FiXCircle className='mr-1' />Failed</td>
                        <td><button className='btn btn-md'><FiDownload /></button></td>
                    </tr>
                    {/* row 3 */}
                    <tr className='hover'>
                        <th>3</th>
                        <td>Sahal</td>
                        <td>Quarterly</td>
                        <td>$ 50.0</td>
                        <td className='flex items-center'><FiCheckCircle className='mr-1' />Success</td>
                        <td><button className='btn btn-md'><FiDownload /></button></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
}