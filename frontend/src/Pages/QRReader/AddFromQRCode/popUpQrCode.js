import {Html5QrcodeScanner} from "html5-qrcode";
import React, {useEffect, useState} from "react";
import callAPI from "../../../Axios/callAPI";
import {useNavigate} from "react-router-dom";


const PopUpQRReader = ({qrcodeClicked}) => {

    const navigate = useNavigate()
    const [itemFound, setItemFound] = useState(true)
    const [inputScan, setInputScan] = useState("")


    // search for SKU
    const searchItemSKU = async (inputScan) => {

        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
                params: { search_string: inputScan }
            };
            const response = await callAPI.get(`/items/searchSKU/`, config)
            navigate(`/readqr/${response.data[0].id}`)
        } catch (error) {
            setItemFound(!itemFound)
            console.log(error);
        }
    }


    useEffect(() => {
        const html5QrcodeScanner = new Html5QrcodeScanner(
            "reader", {fps: 10, qrbox: 250});

        function onScanSuccess(decodedText, decodedResult) {
            // handle the scanned code as you like, for example:
            if (decodedResult.result.format.formatName == "QR_CODE") {
                const obj = JSON.parse(decodedText);
                setInputScan(obj.sku)
                html5QrcodeScanner.clear();
                searchItemSKU(obj.sku)

            } else {
                html5QrcodeScanner.clear();
                setInputScan(decodedText)
                searchItemSKU(decodedText)
            }
        }

        function onScanFailure(error) {
            // handle scan failure, usually better to ignore and keep scanning.
            // for example:
            // console.warn(`Code scan error = ${error}`);
        }

        html5QrcodeScanner.render(onScanSuccess, onScanFailure);

    }, [qrcodeClicked])

    const hanldeGoBack = (e) => {
        e.preventDefault()
        const refresh = () => window.location.reload(true)
        refresh()

    }

    const hanldeClickCreateItem = (e) => {
        e.preventDefault()
        navigate('/items/new/', {state:{sku:inputScan}})

    }

    return (
        <div className="flex flex-col gap-4 items-center justify-center">
            <div id='reader'></div>
            {
                itemFound ?
                    "":
                    <div className="flex flex-col gap-4 items-center justify-center">
                        <p>
                            Item Not Found, would you like to create an item with this SKU?
                        </p>
                        <button className="p-0 p-0 bg-ifOrange w-40 h-8 text-white"
                                onClick={hanldeClickCreateItem}>
                            Create Item
                        </button>

                    </div>

            }
            <button className="p-0 p-0 bg-ifOrange w-40 h-8 text-white"
                    onClick={hanldeGoBack}>
                Go Back
            </button>
        </div>

    )
}
export default PopUpQRReader