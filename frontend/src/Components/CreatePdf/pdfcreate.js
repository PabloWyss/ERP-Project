
import PDFCreate from "./index";
import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import QRCode from "qrcode";
import callAPI from "../../Axios/callAPI";

const PdfShow = () => {


    const [item, setItem] = useState({})
    const {itemID} = useParams();


    // QRCODE GENERATOR

    const [qrcode, setQrcode] = useState("")
    const handleCreateQRCode = (e) => {
        const data = {
            id: item.id,
            amazon_asin: item.amazon_asin,
            amazon_fnsku: item.amazon_fnsku,
            ean: item.ean,
            sku: item.sku,
            upc: item.upc,
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

    const obtainItemInfo = async () => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            };

            const response = await callAPI.get(`/items/1/`, config).then()
            setItem(response.data)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
        obtainItemInfo()
        handleCreateQRCode()
    },[])

    return (
        PDFCreate(qrcode)
    )
}

export default PdfShow