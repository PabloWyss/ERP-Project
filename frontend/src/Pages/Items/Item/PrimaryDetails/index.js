import React, {useEffect, useState} from "react";
import callAPI from "../../../../Axios/callAPI";
import ItemDetailsInput from "./ItemDetailsInput";
import {useNavigate, useParams} from "react-router-dom";
import QRCode from "qrcode";
import JsBarcode from "jsbarcode";

const PrimaryDetails = ({fromCreate, fromItem, itemFromItem, obtainNameFromChildren, obtainModelIdFromChildren}) => {

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


    // QRCODE GENERATOR

    const [qrcode, setQrcode] = useState("")

    const handleCreateQRCode = (e) => {
        e.preventDefault()
        const data = {
        ean: item.ean,
        }
        const datJson = JSON.stringify(data)
        const generateQR = async text => {
          try {
            setQrcode(await QRCode.toDataURL(datJson))
          } catch (err) {
            console.error(err)
          }
        }
        generateQR()
    }


    //Barcode Generator

    const handleCreateBarcode = (e) => {
        e.preventDefault()
        JsBarcode(".barcode").init();
    }



    const handleEditButton = (e) => {
        e.preventDefault()
        if(editClicked) {
            setEditClicked(!editClicked)
            setDisableInput(!disableInput)
            updateItem()
        }else {
            setEditClicked(!editClicked)
            setDisableInput(!disableInput)
        }
    }

    if (obtainModelIdFromChildren){
        obtainModelIdFromChildren(item.item_model)
    }

    const handleSubmitButton = (e) => {
        e.preventDefault()
        createItem()
        // navigate(`/items/${newItemID}/`)
    }


    useEffect(() => {
        if (fromItem) {
            setItem(itemFromItem)
            setName(itemFromItem.name)
            obtainNameFromChildren(name)
            setStatus(itemFromItem.status)
            setSeries(itemFromItem.series)
            setSKU(itemFromItem.sku)
            setEAN(itemFromItem.ean)
            setUPC(itemFromItem.upc)
            setAASIN(itemFromItem.amazon_asin)
            setAFNSKU(itemFromItem.amazon_fnsku)
        }
    }, [itemFromItem])

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
            navigate(`/items/${response.data.id}/`)

        } catch (error) {
            const keys = Object.keys(error.response.data)
            const values = Object.values(error.response.data)
            let message = ""
            values?.forEach((errorMessage, index)=>{
                message += `${errorMessage} ${keys[index]} \n`
            })
            alert(message)
        }
      }

      const date = new Date(item.release_date).toString().slice(0,15)



    return (
        <form className="flex flex-col w-full justify-between gap-4" onSubmit={handleSubmitButton}>
            <div className="flex items-center justify-between bg-backgroundGrey px-4 h-10">
                <h2 className="text-title">
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
                                          disableInput={!fromCreate & fromItem & disableInput}
                                          handleInput={handleNameInput}
                                          description={"Item Name:"}/>
                        <ItemDetailsInput value={status}
                                          disableInput={!fromCreate & fromItem & disableInput}
                                          handleInput={handleStatusInput}
                                          description={"Item Status: "}
                                          choicesEnabeled={true}
                                          choices={["","Active",'No restock']}/>
                        <ItemDetailsInput value={series}
                                          disableInput={!fromCreate & fromItem & disableInput}
                                          handleInput={handleSeriesInput}
                                          description={"Series No.:"}/>
                    </div>
                    <div className="flex w-1/2 flex-col gap-1">
                        <ItemDetailsInput value={SKU}
                                          disableInput={!fromCreate & fromItem & disableInput}
                                          handleInput={handleSKUInput}
                                          description={"SKU No.:"}/>
                        <ItemDetailsInput value={EAN}
                                          disableInput={!fromCreate & fromItem & disableInput}
                                          handleInput={handleEANInput}
                                          description={"EAN No.:"}/>
                        <ItemDetailsInput value={UPC}
                                          disableInput={!fromCreate & fromItem & disableInput}
                                          handleInput={handleUPCInput}
                                          description={"UPC No.:"}/>
                        <ItemDetailsInput value={AASIN}
                                          disableInput={!fromCreate & fromItem & disableInput}
                                          handleInput={handleAASINInput}
                                          description={"Amazon ASIN No.:"}/>
                        <ItemDetailsInput value={AFNSKU}
                                          disableInput={!fromCreate & fromItem & disableInput}
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
            <div>
                <h2>QRCode</h2>
                <img alt={"Barcode"} src={qrcode}/>
                <button onClick={handleCreateQRCode}> Create </button>
            </div>
            <div>
                <h2>Barcode</h2>
                <button onClick={handleCreateBarcode}> Create </button>
                <svg className="barcode"
                     // jsbarcode-format="EAN13"
                     jsbarcode-value={item.ean}
                     jsbarcode-textmargin="0"
                     jsbarcode-fontoptions="bold">
                </svg>
            </div>
        </form>
    )
}

export default PrimaryDetails