import QrReader from "react-qr-reader"
import React, {useEffect, useRef, useState} from "react";
import {useNavigate} from "react-router-dom";

const PopUpQRReader = () => {

    // define const
    const qrRef = useRef(null)
    const [fileResult, setFileResult] = useState()
    const navigate = useNavigate()
    const [warehouses, setWarehouses] = useState([])
    const [warehousesClicked, setWarehousesClicked] = useState(false)


    // QRcode Reader
    const openDialog = () => {
        qrRef.current.openImageDialog()
    }
    const webcamError = (error) => {
        if (error) {
            console.log(error)
        }
    }
    const webcamScan = (result) => {
        if (result) {
            const objectResult = JSON.parse(result)
            setFileResult(objectResult)
        }
    }

    useEffect(() => {
        if(fileResult){
            navigate(`/readqr`)
        }
    }, [fileResult])


    return (
        <div className="flex h-80 w-100 justify-center bg-backgroundGrey items-center p-5">
            <div className="flex flex-col h-full w-full rounded-ifRadius p-5 bg-white  overflow-y-scroll">
                <div className="flex  h-10 rounded-ifRadius bg-white gap-4 justify-center items-center">
                    <div className="flex w-full content-start items-center gap-4 bg-backgroundGrey px-4">
                        <h1 className="text-title">
                            ReadQRcode
                        </h1>
                    </div>
                </div>
                <div className="flex h-screen w-full justify-center">
                    <div className="w-full">
                        <div className="flex justify-around items-center">
                            <div className="flex w-1/2 h-40 justify-center mt-4 items-center">
                                <QrReader
                                    className="flex justify-center items-center w-40 h-40"
                                    delay={1000}
                                    onError={webcamError}
                                    onScan={webcamScan}
                                    legacyMode={false}
                                    facingMode={'environment'}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default PopUpQRReader