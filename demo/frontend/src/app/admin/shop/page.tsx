"use client";
import { toast } from 'react-toastify';
import React, { useEffect, useState } from 'react';
import { currencySymbol } from "@/utils/utils";
import { FiCheckCircle, FiDollarSign, FiEdit, FiFile, FiPlus, FiShoppingCart, FiTrash, FiType } from 'react-icons/fi';

export default function Page() {
    const [items, setItems] = useState<any[]>([]);
    const [title, setTitle] = useState("");
    const [rewriteLimit, setRewriteLimit] = useState(1);
    const [price, setPrice] = useState(0);
    const [type, setType] = useState(0);
    const [enable, setEnable] = useState(false);

    const [editItemId, setEditItemId] = useState("");
    const [deleteItemId, setDeleteItemId] = useState("");

    const getItems = async () => {
        setItems([
            {
                "_id": "65b223c70d34920db58463c7",
                "enable": true,
                "userId": "65b21c0d4a0adf48311fe652",
                "title": "Basic 100",
                "rewriteLimit": 200,
                "price": 129,
                "type": 1,
                "createdAt": "2024-01-25T09:03:03.769Z",
                "updatedAt": "2024-01-25T09:04:51.419Z",
                "__v": 0
            },
            {
                "_id": "65b223b50d34920db58463c2",
                "enable": true,
                "userId": "65b21c0d4a0adf48311fe652",
                "title": "Premium",
                "rewriteLimit": 1200,
                "price": 999,
                "type": 1,
                "createdAt": "2024-01-25T09:02:45.555Z",
                "updatedAt": "2024-01-25T09:04:07.599Z",
                "__v": 0
            }
        ]);
    }

    const createItem = async () => {
        if (!title) return toast.error("Please enter a title!");
        if (!rewriteLimit) return toast.error("Please enter a rewrite limit!");
        if (!price) return toast.error("Please enter a price!");

        toast.error("This feature is not available in the demo version!");
    }


    const editItem = async () => {
        if (!title) return toast.error("Please enter a title!");
        if (!rewriteLimit) return toast.error("Please enter a rewrite limit!");
        if (!price) return toast.error("Please enter a price!");

        toast.error("This feature is not available in the demo version!");
    }

    const deleteItem = async () => {
        toast.error("This feature is not available in the demo version!");
    }

    useEffect(() => {
        getItems();
    }, []);

    return <div className='animate-fade-in-bottom w-full h-full p-4'>
        <p className='font-semibold text-xl flex items-center mb-4'><FiShoppingCart className='mr-2' /> Shop</p>
        <div className='w-full flex flex-wrap'>
            {
                items.map((item, i) => {
                    return <div key={i} className="select-none card w-96 bg-base-100 shadow-xl mr-5 mb-5">
                        <div className="card-body">
                            <h2 className="card-title">
                                {item?.title}
                                <div className="badge badge-secondary">{["Free", "Paid"][item?.type]}</div>
                                {!item?.enable ? <div className="badge badge-ghost">Disabled</div> : ""}
                            </h2>
                            <p className="font-semibold text-4xl mb-4">{currencySymbol} {item?.price}</p>
                            <p className='flex items-center'><FiCheckCircle className='mr-2' />{item?.rewriteLimit} rewrites</p>
                            <div className="card-actions justify-end">
                                <label htmlFor='edititem_modal' className='btn btn-sm' onClick={() => {
                                    setTitle(item?.title);
                                    setRewriteLimit(item?.rewriteLimit);
                                    setPrice(item?.price);
                                    setType(item?.type);
                                    setEditItemId(item?._id);
                                    setEnable(item?.enable);
                                }}><FiEdit />Edit</label>
                                <label htmlFor="deleteitem_modal" className='btn btn-sm' onClick={() => setDeleteItemId(item?._id)}><FiTrash />Delete</label>
                            </div>
                        </div>
                    </div>
                })
            }
            <label htmlFor='newitem_modal' className="btn h-auto min-h-[30vh] card w-96 bg-base-100 shadow-xl mr-5 mb-5">
                <FiPlus className='text-4xl' />
                <p>New Item</p>
            </label>
        </div>
        {/* New Item Modal */}
        <input type="checkbox" id="newitem_modal" className="modal-toggle" />
        <div className="modal">
            <div className="modal-box">
                <h3 className="flex items-center font-bold text-lg"><FiShoppingCart className="mr-1" /> New Item</h3>
                <p className="flex items-center py-4"><FiType className='mr-2' />Title</p>
                <input className="input input-bordered w-full" placeholder="Item title" type="text" onChange={(x) => setTitle(x.target.value)} value={title} />
                <p className="flex items-center py-4"><FiEdit className='mr-2' />Rewrite Limit</p>
                <input className="input input-bordered w-full" placeholder="Limit" type="number" min={1} onChange={(x) => setRewriteLimit(parseInt(x.target.value))} value={rewriteLimit} />
                <p className="flex items-center py-4"><FiDollarSign className='mr-2' />Price</p>
                <input className="input input-bordered w-full" placeholder="Price" type="number" min={0} onChange={(x) => setPrice(parseInt(x.target.value))} value={price} />
                <p className="flex items-center py-4"><FiFile className='mr-2' />Type</p>
                <div className='flex flex-wrap'>
                    <button onClick={() => setType(0)} className={(type === 0 ? "btn-primary" : "") + ' btn btn-sm mr-2'}>Free</button>
                    <button onClick={() => setType(1)} className={(type === 1 ? "btn-primary" : "") + ' btn btn-sm mr-2'}>Paid</button>
                </div>
                <div className="modal-action">
                    <label htmlFor="newitem_modal" className="btn">Cancel</label>
                    <label htmlFor="newitem_modal" className="btn btn-primary" onClick={() => createItem()}>Create item</label>
                </div>
            </div>
        </div>
        {/* Edit Item Modal */}
        <input type="checkbox" id="edititem_modal" className="modal-toggle" />
        <div className="modal">
            <div className="modal-box">
                <h3 className="flex items-center font-bold text-lg"><FiEdit className="mr-1" /> Edit Item</h3>
                <div className="form-control py-4">
                    <label className="label cursor-pointer">
                        <span className="flex items-center"><FiCheckCircle className="mr-2" />Enable</span>
                        <input type="checkbox" className="toggle" onChange={(x) => setEnable(x.target.checked)} checked={enable} />
                    </label>
                </div>
                <p className="flex items-center py-4"><FiType className='mr-2' />Title</p>
                <input className="input input-bordered w-full" placeholder="Item title" type="text" onChange={(x) => setTitle(x.target.value)} value={title} />
                <p className="flex items-center py-4"><FiEdit className='mr-2' />Rewrite Limit</p>
                <input className="input input-bordered w-full" placeholder="Limit" type="number" min={1} onChange={(x) => setRewriteLimit(parseInt(x.target.value))} value={rewriteLimit} />
                <p className="flex items-center py-4"><FiDollarSign className='mr-2' />Price</p>
                <input className="input input-bordered w-full" placeholder="Price" type="number" min={0} onChange={(x) => setPrice(parseInt(x.target.value))} value={price} />
                <p className="flex items-center py-4"><FiFile className='mr-2' />Type</p>
                <div className='flex flex-wrap'>
                    <button onClick={() => setType(0)} className={(type === 0 ? "btn-primary" : "") + ' btn btn-sm mr-2'}>Free</button>
                    <button onClick={() => setType(1)} className={(type === 1 ? "btn-primary" : "") + ' btn btn-sm mr-2'}>Paid</button>
                </div>
                <div className="modal-action">
                    <label htmlFor="edititem_modal" className="btn">Cancel</label>
                    <label htmlFor="edititem_modal" className="btn btn-primary" onClick={() => editItem()}>Save</label>
                </div>
            </div>
            <label htmlFor="edititem_modal" className="modal-backdrop"></label>
        </div>
        {/* Delete Item Modal */}
        <input type="checkbox" id="deleteitem_modal" className="modal-toggle" />
        <div className="modal">
            <div className="modal-box">
                <h3 className="flex items-center font-bold text-lg"><FiTrash className="mr-1" /> Delete Item</h3>
                <p className="py-4">Are you sure want to delete this item?</p>
                <div className="modal-action">
                    <label htmlFor="deleteitem_modal" className="btn">Cancel</label>
                    <label htmlFor="deleteitem_modal" className="btn btn-error" onClick={() => deleteItem()}>Delete</label>
                </div>
            </div>
            <label className="modal-backdrop" htmlFor="deleteitem_modal">Cancel</label>
        </div>
    </div>
}