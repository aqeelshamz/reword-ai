"use client";
import serverURL from '@/utils/utils';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FiCheckCircle, FiDollarSign, FiEdit, FiFile, FiGift, FiMonitor, FiPlus, FiTrash, FiType } from 'react-icons/fi';
import { toast } from 'react-toastify';

export default function Page() {
    const [plans, setPlans] = useState<any[]>([]);
    const [title, setTitle] = useState("");
    const [rewriteLimit, setRewriteLimit] = useState(1);
    const [ads, setAds] = useState(true);
    const [price, setPrice] = useState(0);
    const [type, setType] = useState(0);
    const [enable, setEnable] = useState(false);

    const [editPlanId, setEditPlanId] = useState("");
    const [deletePlanId, setDeletePlanId] = useState("");

    const getPlans = async () => {
        const config = {
            method: "GET",
            url: `${serverURL}/admin/plans`,
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
        };

        axios(config)
            .then((response) => {
                setPlans(response.data);
            })
    }

    const createPlan = async () => {
        if (!title) return toast.error("Please enter a title!");
        if (!rewriteLimit) return toast.error("Please enter a rewrite limit!");
        if (!price) return toast.error("Please enter a price!");

        const config = {
            method: "POST",
            url: `${serverURL}/admin/plans/create`,
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": `application/json`,
            },
            data: {
                title: title,
                rewriteLimit: rewriteLimit,
                ads: ads,
                price: type === 0 ? 0 : price,
                type: type,
            }
        };

        axios(config)
            .then((response) => {
                toast.success("Plan created!");
                setTitle("");
                setRewriteLimit(1);
                setAds(true);
                setPrice(0);
                setType(0);
                getPlans();
            })
            .catch((error) => {
                toast.error("Something went wrong!");
            });
    }


    const editPlan = async () => {
        if (!title) return toast.error("Please enter a title!");
        if (!rewriteLimit) return toast.error("Please enter a rewrite limit!");
        if (!price) return toast.error("Please enter a price!");

        const config = {
            method: "POST",
            url: `${serverURL}/admin/plans/edit`,
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": `application/json`,
            },
            data: {
                planId: editPlanId,
                enable: enable,
                title: title,
                rewriteLimit: rewriteLimit,
                ads: ads,
                price: type === 0 ? 0 : price,
                type: type,
            }
        };

        axios(config)
            .then((response) => {
                toast.success("Plan updated!");
                setTitle("");
                setRewriteLimit(1);
                setAds(true);
                setPrice(0);
                setType(0);
                setEnable(false);
                setEditPlanId("");
                getPlans();
            })
            .catch((error) => {
                toast.error("Something went wrong!");
            });
    }

    const deletePlan = async () => {
        const config = {
            method: "POST",
            url: `${serverURL}/admin/plans/delete`,
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": `application/json`,
            },
            data: {
                planId: deletePlanId
            }
        };

        axios(config)
            .then((response) => {
                toast.success("Plan deleted!");
                getPlans();
            })
            .catch((error) => {
                toast.error("Something went wrong!");
            });
    }

    useEffect(() => {
        getPlans();
    }, []);

    return <div className='animate-fade-in-bottom w-full h-full p-4'>
        <p className='font-semibold text-xl flex items-center mb-4'><FiGift className='mr-2' /> Plans</p>
        <div className='w-full flex flex-wrap'>
            {
                plans.map((plan, i) => {
                    return <div key={i} className="select-none card w-96 bg-base-100 shadow-xl mr-5 mb-5">
                        <div className="card-body">
                            <h2 className="card-title">
                                {plan?.title}
                                <div className="badge badge-secondary">{["Free", "Monthly", "Yearly", "Lifetime"][plan?.type]}</div>
                                {!plan?.enable ? <div className="badge badge-ghost">Disabled</div> : ""}
                            </h2>
                            <p className="font-semibold text-4xl mb-4">${plan?.price}<span className="text-sm">{["", " / Month", " / Year", " / Lifetime"][plan?.type].toLowerCase()}</span></p>
                            <p className='flex items-center'><FiCheckCircle className='mr-2' />{plan?.rewriteLimit} rewrites</p>
                            <p className='flex items-center'><FiCheckCircle className='mr-2' />{plan?.ads ? "Shows Ads" : "No Ads"}</p>
                            <div className="card-actions justify-end">
                                <label htmlFor='editplan_modal' className='btn btn-sm' onClick={() => {
                                    setTitle(plan?.title);
                                    setRewriteLimit(plan?.rewriteLimit);
                                    setAds(plan?.ads);
                                    setPrice(plan?.price);
                                    setType(plan?.type);
                                    setEditPlanId(plan?._id);
                                    setEnable(plan?.enable);
                                }}><FiEdit />Edit</label>
                                <label htmlFor="deleteplan_modal" className='btn btn-sm' onClick={() => setDeletePlanId(plan?._id)}><FiTrash />Delete</label>
                            </div>
                        </div>
                    </div>
                })
            }
            <label htmlFor='newplan_modal' className="btn h-auto min-h-[30vh] card w-96 bg-base-100 shadow-xl mr-5 mb-5">
                <FiPlus className='text-4xl' />
                <p>New Plan</p>
            </label>
        </div>
        {/* New Plan Modal */}
        <input type="checkbox" id="newplan_modal" className="modal-toggle" />
        <div className="modal">
            <div className="modal-box">
                <h3 className="flex items-center font-bold text-lg"><FiGift className="mr-1" /> New Plan</h3>
                <p className="flex items-center py-4"><FiType className='mr-2' />Title</p>
                <input className="input input-bordered w-full" placeholder="Plan title" type="text" onChange={(x) => setTitle(x.target.value)} value={title} />
                <p className="flex items-center py-4"><FiEdit className='mr-2' />Rewrite Limit</p>
                <input className="input input-bordered w-full" placeholder="Limit" type="number" min={1} onChange={(x) => setRewriteLimit(parseInt(x.target.value))} value={rewriteLimit} />
                <div className="form-control py-4">
                    <label className="label cursor-pointer">
                        <span className="flex items-center"><FiMonitor className="mr-2" />Show Ads</span>
                        <input type="checkbox" className="toggle" onChange={(x) => setAds(x.target.checked)} checked={ads} />
                    </label>
                </div>
                <p className="flex items-center py-4"><FiDollarSign className='mr-2' />Price</p>
                <input className="input input-bordered w-full" placeholder="Price" type="number" min={0} onChange={(x) => setPrice(parseInt(x.target.value))} value={price} />
                <p className="flex items-center py-4"><FiFile className='mr-2' />Type</p>
                <div className='flex flex-wrap'>
                    <button onClick={() => setType(0)} className={(type === 0 ? "btn-primary" : "") + ' btn btn-sm mr-2'}>Free</button>
                    <button onClick={() => setType(1)} className={(type === 1 ? "btn-primary" : "") + ' btn btn-sm mr-2'}>Monthly</button>
                    <button onClick={() => setType(2)} className={(type === 2 ? "btn-primary" : "") + ' btn btn-sm mr-2'}>Yearly</button>
                    <button onClick={() => setType(3)} className={(type === 3 ? "btn-primary" : "") + ' btn btn-sm mr-2'}>Lifetime</button>
                </div>
                <div className="modal-action">
                    <label htmlFor="newplan_modal" className="btn">Cancel</label>
                    <label htmlFor="newplan_modal" className="btn btn-primary" onClick={() => createPlan()}>Create plan</label>
                </div>
            </div>
        </div>
        {/* Edit Plan Modal */}
        <input type="checkbox" id="editplan_modal" className="modal-toggle" />
        <div className="modal">
            <div className="modal-box">
                <h3 className="flex items-center font-bold text-lg"><FiEdit className="mr-1" /> Edit Plan</h3>
                <div className="form-control py-4">
                    <label className="label cursor-pointer">
                        <span className="flex items-center"><FiCheckCircle className="mr-2" />Enable</span>
                        <input type="checkbox" className="toggle" onChange={(x) => setEnable(x.target.checked)} checked={enable} />
                    </label>
                </div>
                <p className="flex items-center py-4"><FiType className='mr-2' />Title</p>
                <input className="input input-bordered w-full" placeholder="Plan title" type="text" onChange={(x) => setTitle(x.target.value)} value={title} />
                <p className="flex items-center py-4"><FiEdit className='mr-2' />Rewrite Limit</p>
                <input className="input input-bordered w-full" placeholder="Limit" type="number" min={1} onChange={(x) => setRewriteLimit(parseInt(x.target.value))} value={rewriteLimit} />
                <div className="form-control py-4">
                    <label className="label cursor-pointer">
                        <span className="flex items-center"><FiMonitor className="mr-2" />Show Ads</span>
                        <input type="checkbox" className="toggle" onChange={(x) => setAds(x.target.checked)} checked={ads} />
                    </label>
                </div>
                <p className="flex items-center py-4"><FiDollarSign className='mr-2' />Price</p>
                <input className="input input-bordered w-full" placeholder="Price" type="number" min={0} onChange={(x) => setPrice(parseInt(x.target.value))} value={price} />
                <p className="flex items-center py-4"><FiFile className='mr-2' />Type</p>
                <div className='flex flex-wrap'>
                    <button onClick={() => setType(0)} className={(type === 0 ? "btn-primary" : "") + ' btn btn-sm mr-2'}>Free</button>
                    <button onClick={() => setType(1)} className={(type === 1 ? "btn-primary" : "") + ' btn btn-sm mr-2'}>Monthly</button>
                    <button onClick={() => setType(2)} className={(type === 2 ? "btn-primary" : "") + ' btn btn-sm mr-2'}>Yearly</button>
                    <button onClick={() => setType(3)} className={(type === 3 ? "btn-primary" : "") + ' btn btn-sm mr-2'}>Lifetime</button>
                </div>
                <div className="modal-action">
                    <label htmlFor="editplan_modal" className="btn">Cancel</label>
                    <label htmlFor="editplan_modal" className="btn btn-primary" onClick={() => editPlan()}>Save</label>
                </div>
            </div>
            <label htmlFor="editplan_modal" className="modal-backdrop"></label>
        </div>
        {/* Delete Plan Modal */}
        <input type="checkbox" id="deleteplan_modal" className="modal-toggle" />
        <div className="modal">
            <div className="modal-box">
                <h3 className="flex items-center font-bold text-lg"><FiTrash className="mr-1" /> Delete Plan</h3>
                <p className="py-4">Are you sure want to delete this plan?</p>
                <div className="modal-action">
                    <label htmlFor="deleteplan_modal" className="btn">Cancel</label>
                    <label htmlFor="deleteplan_modal" className="btn btn-error" onClick={() => deletePlan()}>Delete</label>
                </div>
            </div>
            <label className="modal-backdrop" htmlFor="deleteplan_modal">Cancel</label>
        </div>
    </div>
}