import React, {useEffect, useState} from "react";
import callAPI from "../../../Axios/callAPI";

const PrimaryDetails = () => {

    const [item, setItem] = useState({})
    const [editClicked, setEditClicked] = useState(false)
    const [disableInput, setDisableInput] = useState(true)
    const [name, setName] = useState("")
    const [status, setStatus] = useState("")
    const [series, setSeries] = useState("")
    const [SKU, setSKU] = useState("")
    const [EAN, setEAN] = useState("")
    const [UPC, setUPC] = useState("")
    const [AASIN, setAASIN] = useState("")
    const [AFNSKU, setAFNSKU] = useState("")


    const item_id = 1

    const handleEditButton = (e) => {
        e.preventDefault()
        if(editClicked){
            setEditClicked(!editClicked)
            setDisableInput(!disableInput)
            updateItem()
        } else {
            setEditClicked(!editClicked)
            setDisableInput(!disableInput)
        }
    }

    const obtainItemsInfo = async () => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            };

            const response = await callAPI.get(`/items/${item_id}/`, config);
            setItem(response.data)
            setName(response.data.name)
            setStatus(response.data.status)
            setSeries(response.data.series)
            setSKU(response.data.sku)
            setEAN(response.data.ean)
            setUPC(response.data.upc)
            setAASIN(response.data.amazon_asin)
            setAFNSKU(response.data.amazon_fnsku)
        } catch (error) {
            console.log(error);
        }

    }

    useEffect(() => {
        obtainItemsInfo()
    }, [])

    const handleNameInput = (e) => {
        setName(e.target.value);
        console.log(name)
    };

    const handleStatusInput = (e) => {
        setStatus(e.target.value);
    };

    const handleSeriesInput = (e) => {
        setSeries(e.target.value);
    };

    const handleSKUInput = (e) => {
        setSKU(e.target.value);
    };

    const handleEANInput = (e) => {
        setEAN(e.target.value);
    };

    const handleUPCInput = (e) => {
        setUPC(e.target.value);
    };

    const handleAASINInput = (e) => {
        setAASIN(e.target.value);
    };

    const handleAFNSKUInput = (e) => {
        setAFNSKU(e.target.value);
    };

    const updateItem = async () => {

        if (!localStorage.getItem('token')) {
            return;
        }
        try {
            const data = {
                name: name,
                status: status,
                sku: SKU,
                ean: EAN,
                upc: UPC,
                amazon_asin: AASIN,
                amazon_fnsku: AFNSKU
            }
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            };
            const response = await callAPI.patch(`/items/${item_id}/`, data, config)
        } catch (error) {
            console.log(error)
        }
      }

    return (
        <form className="flex flex-col w-full justify-between gap-4" onSubmit={handleEditButton}>
            <div className="flex items-center justify-between bg-backgroundGrey px-4">
                <h2 className="text-xl">
                    Primary Details
                </h2>
                <button onClick={handleEditButton}>
                    {
                        editClicked ?
                            "Save" :
                            "Edit"
                    }
                </button>
            </div>
            <div className="flex w-full">
                <div className="flex w-full justify-around gap-4">
                    <div className="flex w-1/3 flex-col gap-1">
                        <div className="flex gap-1 items-center justify-between">
                            <label htmlFor="item_id">Item ID: </label>
                            <input id="item_id" name="item_id" value={item.id}
                                   disabled/>
                        </div>
                        <div className="flex gap-1 items-center justify-between">
                            <label htmlFor="item_release_date">Release Date: </label>
                            <input id="item_release_date" name="item_release_date"
                                   value={item.release_date?.slice(0, 10)}
                                   disabled/>
                        </div>
                        <div className="flex gap-1 items-center justify-between">
                            <label htmlFor="item_name">Item Name: </label>
                            <input id="item_name" name="item_name" value={name}
                                   disabled={disableInput}
                                   onChange={handleNameInput}/>
                        </div>
                        <div className="flex gap-1 items-center justify-between">
                            <label htmlFor="item_status">Item Status: </label>
                            <input id="item_status" name="item_status" value={status}
                                   disabled={disableInput}
                                   onChange={handleStatusInput}/>
                        </div>

                        <div className="flex gap-1 items-center justify-between">
                            <label htmlFor="item_series">Series No.: </label>
                            <input id="item_series" name="item_series" value={series}
                                   disabled={disableInput}
                                   onChange={handleSeriesInput}/>
                        </div>
                    </div>
                    <div className="flex w-1/3 flex-col gap-1">
                        <div className="flex gap-1 items-center justify-between">
                            <label htmlFor="item_sku">SKU No.: </label>
                            <input id="item_sku" name="item_sku" value={SKU}
                                   disabled={disableInput}
                                   onChange={handleSKUInput}/>
                        </div>
                        <div className="flex gap-1 items-center justify-between">
                            <label htmlFor="item_ean">EAN No.: </label>
                            <input id="item_ean" name="item_ean" value={EAN}
                                   disabled={disableInput}
                                   onChange={handleEANInput}/>
                        </div>
                        <div className="flex gap-1 items-center justify-between">
                            <label htmlFor="item_upc">UPC No.: </label>
                            <input id="item_upc" name="item_upc" value={UPC}
                                   disabled={disableInput}
                                   onChange={handleUPCInput}/>
                        </div>
                        <div className="flex gap-1 items-center justify-between">
                            <label htmlFor="item_amazon_asin">Amazon ASIN No.: </label>
                            <input id="item_amazon_asin" name="item_amazon_asin" value={AASIN}
                                   disabled={disableInput}
                                   onChange={handleAASINInput}/>
                        </div>
                        <div className="flex gap-1 items-center justify-between   ">
                            <label htmlFor="item_amazon_fnsku">Amazon FNSKU No.: </label>
                            <input id="item_amazon_fnsku" name="item_amazon_fnsku"
                                   value={AFNSKU}
                                   disabled={disableInput}
                                   onChange={handleAFNSKUInput}/>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    )
}

export default PrimaryDetails