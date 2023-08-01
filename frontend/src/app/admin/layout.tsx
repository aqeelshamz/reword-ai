"use client";
import type { Metadata } from 'next'
import { Golos_Text } from 'next/font/google'
import Link from 'next/link';
import React, { useState } from 'react';
import { FiCreditCard, FiDollarSign, FiEdit, FiFile, FiFileText, FiGift, FiHome, FiKey, FiLogOut, FiMoreHorizontal, FiPlus, FiSettings, FiTrash, FiUser, FiUsers } from "react-icons/fi";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

const golos = Golos_Text({
  weight: '400',
  subsets: ['latin'],
})

export const metadata = {
  title: 'RewordAI',
  description: 'Your AI Text Rewriter',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [showMenu, setShowMenu] = useState(true);
  const [moreMenuOpen, setMoreMenuOpen] = useState(false);

  return (
    <main className="flex bg-base-100 h-screen w-screen p-2 max-sm:p-0" onClick={() => {
      if (moreMenuOpen) setMoreMenuOpen(false);
    }}>
      {/* Sidebar */}
      <div className={'flex flex-col p-5 min-w-[275px] max-w-[15vw] h-full rounded-md ' + (!showMenu ? "max-sm:hidden " : "max-sm:fixed max-sm:w-full max-sm:h-full max-sm:max-w-none bg-base-100 max-sm:z-50 ")}>
        <div className="flex justify-between items-center max-sm:mb-4">
          <Link href="/"><p className="mb-5 font-semibold max-sm:mb-3">📝 RewordAI ✨ | Admin</p></Link>
          <div className="hidden max-sm:flex justify-end mb-3">
            <button className="btn btn-square btn-sm" onClick={() => setShowMenu(false)}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>
        </div>
        <div className='p-0 my-2 h-full w-full overflow-hidden hover:overflow-y-auto'>
          <Link href="/admin/dashboard"><label className='btn w-full justify-start normal-case' onClick={() => { }}><FiHome /> Dashboard</label></Link>
          <Link href="/admin/plans"><label className='btn btn-ghost w-full justify-start normal-case' onClick={() => { }}><FiGift /> Plans</label></Link>
          <Link href="/admin/purchases"><label className='btn btn-ghost w-full justify-start normal-case' onClick={() => { }}><FiDollarSign /> Purchases</label></Link>
          <Link href="/admin/payment_methods"><label className='btn btn-ghost w-full justify-start normal-case' onClick={() => { }}><FiCreditCard /> Payment methods</label></Link>
          <Link href="/admin/users"><label className='btn btn-ghost w-full justify-start normal-case' onClick={() => { }}><FiUsers /> Users</label></Link>
          <Link href="/admin/settings"><label className='btn btn-ghost w-full justify-start normal-case' onClick={() => { }}><FiSettings /> Settings</label></Link>
        </div>
        <hr />
        <div tabIndex={0} className='cursor-pointer dropdown dropdown-top flex items-center mt-2 hover:bg-base-200 p-2 rounded-lg'>
          <div className='flex items-center justify-between w-full'>
            <div className='flex items-center'>
              <div className="avatar placeholder mr-2">
                <div className="bg-blue-700 text-white mask mask-squircle w-10">
                  <span><FiUser /></span>
                </div>
              </div>
              <p className='font-semibold'>Admin</p>
            </div>
            <FiMoreHorizontal />
          </div>
          <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 mb-2">
            <li className='flex' onClick={() => {
              localStorage.clear()
              window.location.href = "/login";
            }}><p><FiLogOut className="text-red-600" />Logout</p></li>
          </ul>
        </div>
      </div>
      <div className='w-full h-full overflow-y-auto'>
        {children}
      </div>
      <ToastContainer />
    </main>
  )
}
