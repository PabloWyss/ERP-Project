import React, {useEffect, useState} from "react";
import callAPI from "../../../Axios/callAPI";
import ItemDetailsInput from "./ItemDetailsInput";
import {useNavigate, useParams} from "react-router-dom";

const PrimaryDetails = ({fromCreate}) => {

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
    const [newItemID, setNewItemID] = useState("")
    const navigate = useNavigate()

    const { itemID } = useParams();

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

    const handleSubmitButton = (e) => {
        e.preventDefault()
        createItem()
        navigate(`/items/${newItemID}/`)

    }

    const obtainItemsInfo = async () => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            };

            const response = await callAPI.get(`/items/${itemID}/`, config);
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
        if (fromCreate) {
        } else {
            obtainItemsInfo()
        }
    }, [])

    const handleNameInput = (e) => {
        setName(e.target.value);
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
                series: series,
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
            const response = await callAPI.patch(`/items/${itemID}/`, data, config)
        } catch (error) {
            console.log(error)
        }
      }

      const createItem = async () => {

        if (!localStorage.getItem('token')) {
            return;
        }
        try {
            const data = {
                name: name,
                status: status,
                series: series,
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
            const response = await callAPI.post(`/items/new/`, data, config)
            setNewItemID(response.data.id)
            console.log(newItemID)
        } catch (error) {
            console.log(error)
        }
      }

      const date = new Date(item.release_date).toString().slice(0,15)

    return (
        <form className="flex flex-col w-full justify-between gap-4" onSubmit={handleSubmitButton}>
            <div className="flex items-center justify-between bg-backgroundGrey px-4">
                <h2 className="text-xl">
                    Primary Details
                </h2>
                {
                    fromCreate ?
                        "":
                        <button className="text-xl p-0" onClick={handleEditButton}>
                            {
                                editClicked ?
                                    "Save" :
                                    "Edit"
                            }
                        </button>
                }
            </div>
            <div className="flex w-full">
                <div className="flex w-full justify-around gap-4">
                    <div className="flex w-1/2 flex-col gap-1">
                        {
                            fromCreate ?
                                "":
                                [<ItemDetailsInput value={item.id}
                                                   disableInput={!fromCreate}
                                                   description={"Item ID:"}/>,
                                <ItemDetailsInput value={date}
                                                  disableInput={!fromCreate}
                                                  description={"Release Date:"}/>]
                        }
                        <ItemDetailsInput value={name}
                                          disableInput={!fromCreate}
                                          handleInput={handleNameInput}
                                          description={"Item Name:"}/>
                        <ItemDetailsInput value={status}
                                          disableInput={!fromCreate}
                                          handleInput={handleStatusInput}
                                          description={"Item Status: "}/>
                        <ItemDetailsInput value={series}
                                          disableInput={!fromCreate}
                                          handleInput={handleSeriesInput}
                                          description={"Series No.:"}/>
                    </div>
                    <div className="flex w-1/2 flex-col gap-1">
                        <ItemDetailsInput value={SKU}
                                          disableInput={!fromCreate}
                                          handleInput={handleSKUInput}
                                          description={"SKU No.:"}/>
                        <ItemDetailsInput value={EAN}
                                          disableInput={!fromCreate}
                                          handleInput={handleEANInput}
                                          description={"EAN No.:"}/>
                        <ItemDetailsInput value={UPC}
                                          disableInput={!fromCreate}
                                          handleInput={handleUPCInput}
                                          description={"UPC No.:"}/>
                        <ItemDetailsInput value={AASIN}
                                          disableInput={!fromCreate}
                                          handleInput={handleAASINInput}
                                          description={"Amazon ASIN No.:"}/>
                        <ItemDetailsInput value={AFNSKU}
                                          disableInput={!fromCreate}
                                          handleInput={handleAFNSKUInput}
                                          description={"Amazon FNSKU No.:"}/>
                    </div>
                </div>
            </div>
            {
                fromCreate ?
                    <div>
                        <button type={"submit"}>
                            submit
                        </button>
                    </div>:
                    ""
            }
        </form>
    )
}

export default PrimaryDetails