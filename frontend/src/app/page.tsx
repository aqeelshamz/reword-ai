"use client";
import { appName, currencySymbol, serverURL } from '@/utils/utils';
import axios from 'axios';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useState } from 'react'
import { FaBimobject, FaRobot } from 'react-icons/fa';
import { FiArrowRight, FiCloud, FiCreditCard, FiEdit, FiFacebook, FiFileText, FiHome, FiInstagram, FiLock, FiLogIn, FiMonitor, FiPlayCircle, FiSettings, FiShoppingCart, FiSmartphone, FiTwitter, FiUsers, FiX, FiZap } from 'react-icons/fi';
import Img1 from "./img/img_1.png";
import Img2 from "./img/img_2.png";
import Img3 from "./img/img_3.png";
import Img4 from "./img/img_4.png";
import Img5 from "./img/img_5.png";
import Img6 from "./img/img_6.png";
import Img7 from "./img/img_7.png";
import Img8 from "./img/img_8.png";
import Img9 from "./img/img_9.png";
import Img10 from "./img/img_10.png";
import Img11 from "./img/img_11.png";
import Img12 from "./img/img_12.png";
import Image from 'next/image';

export default function Main() {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (localStorage.getItem("token")) {
        setLoggedIn(true);
      }
    }
  }, []);

  const [color, setColor] = useState(false)

  const changeColor = () => {
    if (window.scrollY >= window.innerHeight - 350) {
      setColor(true)
    } else {
      setColor(false)
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', changeColor)
    return () => {
      window.removeEventListener('scroll', changeColor)
    }
  }, [])

  const [selectedTab, setSelectedTab] = useState(0);

  const features = [
    {
      icon: <FaRobot />,
      title: "AI Rewriting & Grammar Correcting",
      subtitle: "Effortlessly enhance your writing with AI-powered rewriting and precise grammar correcting."
    },
    {
      icon: <FiEdit />,
      title: "Rewrites in Custom Tones & Length",
      subtitle: "Personalize your text with customizable rewrites in various tones and lengths."
    },
    {
      icon: <FiFileText />,
      title: "Multiple Document Creation",
      subtitle: "Seamlessly create and manage multiple documents for all your writing needs."
    },
    {
      icon: <FiMonitor />,
      title: "Admin Panel",
      subtitle: "Effortlessly manage shop items, purchases, and payment methods through a user-friendly admin interface."
    },
    {
      icon: <FiCreditCard />,
      title: "Payment Integration",
      subtitle: "Accept payments and make income through integrated payment gateways like Stripe, PayPal & Razorpay."
    },
    {
      icon: <FiSmartphone />,
      title: "Simple & Beautiful User Interface",
      subtitle: "Enjoy a seamless and visually appealing user experience built using DaisyUI, a user-friendly Tailwind CSS component library."
    }
  ];

  const howItWorks = [
    {
      title: "Create Classes & Evaluators",
      subtitle: "Effortlessly organize classes, add students, and create evaluators. Define class details and streamline the setup for a seamless evaluation process.",
    },
    {
      title: "Upload Answer Sheets",
      subtitle: `Upload question papers and answer keys, and let ${appName}'s advanced AI algorithms take charge. Effortlessly upload answer sheets, eliminating manual grading hassles.`,
    },
    {
      title: "Explore Detailed Results",
      subtitle: "Dive into detailed results effortlessly. Navigate between 'All Students' for a quick overview and 'Detailed View' for a granular analysis. Gain insights into individual performances and make informed decisions.",
    }
  ];

  const [videoPreview, setVideoPreview] = useState(false);

  const [shopItems, setShopItems] = useState<any>({});
  const [faq, setFAQ] = useState<any>([]);

  const getShopItems = async () => {
    const config = {
      method: "GET",
      url: `${serverURL}/shop`,
    };

    axios(config)
      .then((response) => {
        setShopItems(response.data);
      })
  }

  const getFAQ = async () => {
    const config = {
      method: "GET",
      url: `${serverURL}/faq`,
    };

    axios(config)
      .then((response) => {
        setFAQ(response.data);
      })
  }

  useEffect(() => {
    getShopItems();
    getFAQ();
  }, []);

  return <main className="flex flex-col realtive overflow-x-hidden">
    {videoPreview && <div className='fixed z-[999] video-preview w-full h-full bg-black p-20' onClick={() => setVideoPreview(false)}>
      <FiX className='text-4xl absolute top-5 right-5 text-white cursor-pointer' onClick={() => setVideoPreview(false)} />
      <iframe allowFullScreen className='w-full h-full' src="https://www.youtube.com/embed/kyPSFg3fY30" title="RewordAI | AI Rewriter and Grammar Corrector SaaS Platform | Envato Codecanyon | Full Demo" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe>
    </div>}
    <div id="home" className='min-h-screen w-screen bg-gradient-to-b from-purple-400 via-violet-500 to-indigo-600 flex flex-col justify-center items-center'>
      <div className={"flex z-50 items-center justify-between fixed top-0 w-full p-3 md:px-10 duration-200 backdrop-blur-md border-b border-[rgba(255,255,255,0.1)] " + (color ? "bg-white" : "text-white")}>
        <Link href="/"><div className="text-lg">🤖 {appName} 📝</div></Link>
        <div className='hidden md:flex'>
          <Link href={"#home"}><label onClick={() => setSelectedTab(0)} className={'mr-5 btn btn-sm btn-ghost ' + (selectedTab === 0 ? "btn-active text-white " : "") + (color ? " text-black" : "")}>Home</label></Link>
          <Link href={"#features"}><label onClick={() => setSelectedTab(1)} className={'mr-5 btn btn-sm btn-ghost ' + (selectedTab === 1 ? "btn-active text-white " : "") + (color ? " text-black" : "")}>Features</label></Link>
          <Link href={"#flexible-pricing"}><label onClick={() => setSelectedTab(2)} className={'mr-5 btn btn-sm btn-ghost ' + (selectedTab === 2 ? "btn-active text-white " : "") + (color ? " text-black" : "")}>Pricing</label></Link>
          <Link href={"#have-a-question"}><label onClick={() => setSelectedTab(3)} className={'mr-5 btn btn-sm btn-ghost ' + (selectedTab === 3 ? "btn-active text-white " : "") + (color ? " text-black" : "")}>FAQ</label></Link>
        </div>
        {loggedIn ?
          <Link href={"/home"}><label className={'btn btn-primary ' + (!color ? "glass text-white" : "")}><FiHome /> Home</label></Link>
          : <Link href={"/login"}><label className={'btn btn-primary ' + (!color ? "glass text-white" : "")}><FiLogIn /> Sign In</label></Link>}
      </div>
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: -30 }}
        transition={{ type: "spring", stiffness: 100, duration: 0.1, ease: "easeInOut" }}
        className='duration-200 font-black text-5xl md:text-7xl text-white w-full text-center'>🤖 Ultimate AI<br />Rewriter📝</motion.h1>
      <motion.p initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 0.8, y: -30 }}
        transition={{ type: "spring", stiffness: 100, duration: 0.1, ease: "easeInOut", delay: 0.2 }}
        className='duration-200 text-center mt-5 font-normal text-md md:text-xl text-white w-full'>A powerful AI tool to revolutionize your content creation process.<br />Seamlessly create, rewrite, and enhance content with advanced AI-driven technology.</motion.p>
      <motion.button initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: -30 }}
        transition={{ type: "spring", stiffness: 100, duration: 0.1, ease: "easeInOut", delay: 0.4 }} className="mt-10 btn btn-md md:btn-lg glass text-white btn-primary" onClick={() => setVideoPreview(true)}><FiPlayCircle /> See how it works</motion.button>
      <Link href={loggedIn ? "/home" : "/login"}><motion.button initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 0.7, y: -30 }}
        transition={{ type: "spring", stiffness: 100, duration: 0.1, ease: "easeInOut", delay: 0.6 }} className="mt-5 btn btn-sm md:btn-md text-white btn-ghost">{loggedIn ? "Go to home" : "Sign in"}<FiArrowRight /></motion.button></Link>
    </div>
    <div id="features" className='min-h-screen w-screen bg-white flex flex-col items-center py-20 md:p-20'>
      <h1 className='text-4xl md:text-5xl font-bold mb-20'>Features</h1>
      <div className='flex flex-wrap justify-evenly items-center w-full md:w-3/4'>
        {features.map((feature: any, i) => {
          return <div key={i} className='flex group m-5'>
            <div className='bg-gray-100 group-hover:bg-black group-hover:text-white group-hover:scale-110 duration-200 text-3xl flex justify-center items-center w-20 h-20 rounded-lg mr-4'>
              {feature?.icon}
            </div>
            <div className='flex flex-col'>
              <p className='text-xl font-semibold'>{feature?.title}</p>
              <p className='text-lg max-w-sm'>{feature?.subtitle}</p>
            </div>
          </div>
        })}
      </div>
    </div>
    <div id="how-it-works" className='text-white min-h-screen w-screen flex flex-col items-center py-20 md:p-20 bg-gradient-to-br from-violet-500 via-purple-600 to-indigo-700 '>
      <h1 className='text-4xl md:text-5xl font-bold mb-10'>AI-Powered Rewriting</h1>
      <Image className='mb-3 hover:scale-105 duration-200' src={Img1} width={500} alt='Img1' />
      <Image className='mb-3 hover:scale-105 duration-200' src={Img2} width={500} alt='Img2' />
      <Image className='mb-3 hover:scale-105 duration-200' src={Img3} width={500} alt='Img3' />
    </div>
    <div id="how-it-works" className='text-white min-h-screen w-screen flex flex-col items-center py-20 md:p-20 bg-gradient-to-br from-violet-500 via-purple-600 to-indigo-700 '>
      <h1 className='text-4xl md:text-5xl font-bold mb-10'>And more...</h1>
      <Image className='mb-3 hover:scale-105 duration-200' src={Img4} width={500} alt='Img4' />
      <Image className='mb-3 hover:scale-105 duration-200' src={Img5} width={500} alt='Img5' />
      <Image className='mb-3 hover:scale-105 duration-200' src={Img6} width={500} alt='Img6' />
      <Image className='mb-3 hover:scale-105 duration-200' src={Img7} width={500} alt='Img7' />
      <Image className='mb-3 hover:scale-105 duration-200' src={Img8} width={500} alt='Img8' />
      <Image className='mb-3 hover:scale-105 duration-200' src={Img9} width={500} alt='Img9' />
      <Image className='mb-3 hover:scale-105 duration-200' src={Img10} width={500} alt='Img10' />
      <Image className='mb-3 hover:scale-105 duration-200' src={Img11} width={500} alt='Img11' />
      <Image className='mb-3 hover:scale-105 duration-200' src={Img12} width={500} alt='Img12' />
    </div>
    <div id="flexible-pricing" className='min-h-screen w-screen flex flex-col items-center py-20 md:p-20 bg-white '>
      <div className='flex flex-col items-center w-full border rounded-2xl p-10'>
        <h1 className='text-4xl md:text-5xl font-bold mb-10'>Flexible Pricing</h1>
        <div className='flex flex-col md:flex-row flex-wrap justify-evenly items-center w-full md:w-3/4 mb-14'>
          {shopItems?.items?.map((item: any, i: number) => {
            return <div key={i} className='min-w-[250px] shadow-lg p-10 rounded-xl flex flex-col group m-5 max-w-xs items-center hover:scale-105 duration-100'>
              <p className='text-center mt-10 duration-200 text-xl'>{item?.title}</p>
              <p className='flex items-start text-center mt-10 duration-200 text-4xl mb-7'>{currencySymbol}<span className='text-6xl font-bold'>{item?.price}</span></p>
              <p className='flex text-xl duration-200 items-center my-2'><FiSettings className='mr-2' />{item?.rewriteLimit} Rewrites</p>
            </div>
          })}
        </div>
        <div className='flex items-center'>
          <div className='mr-6'>
            <FiLock className='text-2xl' />
          </div>
          <div>
            <p className='font-semibold'>Secure Payment Gateways:</p>
            <p>{shopItems?.paymentMethods?.stripe && "Stripe,"} {shopItems?.paymentMethods?.paypal && "PayPal,"} {shopItems?.paymentMethods?.razorpay && "Razorpay"}</p>
          </div>
        </div>
      </div>
    </div>
    <div id="have-a-question" className='min-h-screen w-screen flex flex-col items-center py-20 md:p-20 bg-white '>
      <h1 className='text-4xl md:text-5xl font-bold mb-4'>Have a question?</h1>
      <p className='text-xl md:text-2xl text-center w-full mb-20'>We're here to help. Check out our FAQ section or reach out to us directly.</p>
      <div className='flex flex-col md:flex-row flex-wrap justify-evenly items-center w-full md:w-3/4'>
        {
          faq.map((item: any, index: number) => {
            return <div className="collapse collapse-plus bg-base-200 mb-2">
              <input type="radio" name="my-accordion-3" defaultChecked />
              <div className="collapse-title text-xl font-medium">
                {item.question}
              </div>
              <div className="collapse-content">
                <p>{item.answer}</p>
              </div>
            </div>
          })
        }
      </div>
    </div>
    <div id="get-started" className='text-white w-screen flex flex-col items-center py-20 md:p-20 bg-[conic-gradient(at_bottom_right,_var(--tw-gradient-stops))] from-blue-700 via-blue-800 to-gray-900'>
      <h1 className='text-4xl md:text-7xl font-bold mb-5 text-center'>Unleash your<br />true potential.</h1>
      <Link href={"#home"}><button className="mt-10 btn btn-md md:btn-lg glass text-white btn-primary"><FiZap /> Try RewordAI Today!</button></Link>
      <p className='opacity-75 duration-200 text-center mt-10 font-normal text-md md:text-xl text-white w-full'>Experience the power of {appName} in revolutionizing your content creation process. <br />Get started today and unlock a world of possibilities.</p>
    </div>
    <div className='text-white w-screen flex flex-col items-center py-20 md:px-32 bg-black'>
      <div className='w-full flex flex-col md:flex-row items-center justify-between'>
        <Link href="/home"><div className="text-lg">🤖 {appName} 📝</div></Link>
        <div className='mt-10 md:mt-0 flex flex-col md:flex-row items-center'>
          <Link className='flex items-center my-2 md:ml-10' href="#"><FiInstagram className='mr-2' /><p>Instagram</p></Link>
          <Link className='flex items-center my-2 md:ml-10' href="#"><FiTwitter className='mr-2' /><p>X</p></Link>
          <Link className='flex items-center my-2 md:ml-10' href="#"><FiFacebook className='mr-2' /><p>Facebook</p></Link>
        </div>
      </div>
      <div className="divider divider-neutral"></div>
      <p>© 2024 {appName}. All rights reserved.</p>
    </div>
    <button className='btn btn-primary btn-lg btn-square fixed z-[100] bottom-10 right-10' onClick={() => window.open("https://codecanyon.net/item/rewordai-ai-rewriter-and-grammar-corrector-saas-platform/50500483")}>
      <svg fill="#0ac994" xmlns="http://www.w3.org/2000/svg" width="19.824" height="22.629" viewBox="0 0 19.824 22.629">
        <path d="M17.217,9.263c-.663-.368-2.564-.14-4.848.566-4,2.731-7.369,6.756-7.6,13.218-.043.155-.437-.021-.515-.069a9.2,9.2,0,0,1-.606-7.388c.168-.28-.381-.624-.48-.525A11.283,11.283,0,0,0,1.6,17.091a9.84,9.84,0,0,0,17.2,9.571c3.058-5.481.219-16.4-1.574-17.4Z" transform="translate(-0.32 -9.089)"></path>
      </svg>
    </button>
  </main>
}