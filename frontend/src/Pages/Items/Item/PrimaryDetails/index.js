import React, {useEffect, useState} from "react";
import callAPI from "../../../../Axios/callAPI";
import ItemDetailsInput from "./ItemDetailsInput";
import {useNavigate, useParams} from "react-router-dom";

const PrimaryDetails = ({fromCreate, obtainNameFromChildren}) => {

    const [item, setItem] = useState({})
    const [editClicked, setEditClicked] = useState(false)
    const [disableInput, setDisableInput] = useState(true)
    const [name, setName] = useState("")
    const [status, setStatus] = useState("Active")
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
        // navigate(`/items/${newItemID}/`)

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
            obtainNameFromChildren(name)
            setStatus(response.data.status)
            setSeries(response.data.series)
            setSKU(response.data.sku)
            setEAN(response.data.ean)
            setUPC(response.data.upc)
            setAASIN(response.data.amazon_asin)
            setAFNSKU(response.data.amazon_fnsku)
        } catch (error) {
            console.log(error.data);
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
            const values = Object.values(error.response.data)
            let message = ""
            values?.forEach((errorMessage)=>{
                message += errorMessage + "\n"
            })
            alert(message)
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
            navigate(`/items/${response.data.id}/`)

        } catch (error) {
            console.log(error)
            const keys = Object.keys(error.response.data)
            const values = Object.values(error.response.data)
            let message = ""
            values?.forEach((errorMessage)=>{
                message += errorMessage + " " + keys + "\n"
            })
            alert(message)
        }
      }

      const date = new Date(item.valid_from).toString().slice(0,15)

    return (
        <form className="flex flex-col w-full justify-between gap-4" onSubmit={handleSubmitButton}>
            <div className="flex items-center justify-between bg-backgroundGrey px-4 h-10">
                <h2 className="text-xl">
                    Primary Details
                </h2>
                {
                    fromCreate ?
                        "":
                        <button className="p-0 bg-ifOrange w-20 text-white" onClick={handleEditButton}>
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
                                                   disableInput={true}
                                                   description={"Item ID:"}/>,
                                <ItemDetailsInput value={date}
                                                  disableInput={true}
                                                  description={"Release Date:"}/>]
                        }
                        <ItemDetailsInput value={name}
                                          disableInput={!fromCreate & disableInput}
                                          handleInput={handleNameInput}
                                          description={"Item Name:"}/>
                        <ItemDetailsInput value={status}
                                          disableInput={!fromCreate & disableInput}
                                          handleInput={handleStatusInput}
                                          description={"Item Status: "}
                                          choicesEnabeled={true}
                                          choices={["Active",'No restock']}/>
                        <ItemDetailsInput value={series}
                                          disableInput={!fromCreate & disableInput}
                                          handleInput={handleSeriesInput}
                                          description={"Series No.:"}/>
                    </div>
                    <div className="flex w-1/2 flex-col gap-1">
                        <ItemDetailsInput value={SKU}
                                          disableInput={!fromCreate & disableInput}
                                          handleInput={handleSKUInput}
                                          description={"SKU No.:"}/>
                        <ItemDetailsInput value={EAN}
                                          disableInput={!fromCreate & disableInput}
                                          handleInput={handleEANInput}
                                          description={"EAN No.:"}/>
                        <ItemDetailsInput value={UPC}
                                          disableInput={!fromCreate & disableInput}
                                          handleInput={handleUPCInput}
                                          description={"UPC No.:"}/>
                        <ItemDetailsInput value={AASIN}
                                          disableInput={!fromCreate & disableInput}
                                          handleInput={handleAASINInput}
                                          description={"Amazon ASIN No.:"}/>
                        <ItemDetailsInput value={AFNSKU}
                                          disableInput={!fromCreate & disableInput}
                                          handleInput={handleAFNSKUInput}
                                          description={"Amazon FNSKU No.:"}/>
                    </div>
                </div>
            </div>
            <div className="flex w-full justify-center">
                {
                    fromCreate ?
                        <div>
                            <button className="text-xl p-0 bg-ifOrange w-20 text-white" type={"submit"}>
                                Submit
                            </button>
                        </div>:
                        ""
                }
            </div>
        </form>
    )
}

export default PrimaryDetails