import QrReader from "react-qr-reader"
import {useRef, useState} from "react";
import AddFromQRCode from "./AddFromQRCode";
const QRReader = () => {
    const qrRef = useRef(null)
    const [fileResult, setFileResult] = useState()

    const openDialog = () =>{
        qrRef.current.openImageDialog()
    }
    const webcamError = (error)=>{
        if (error){
            console.log(error)
        }
    }
    const webcamScan = (result) => {
        if(result){
            const objectResult = JSON.parse(result)
            setFileResult(objectResult)
        }
    }
    return (
        <div className="w-1/3">
            <div>
                <div>
                    Hello
                </div>
                    <div className="w-100 h-100">
                        <QrReader
                            className="w-100 h-100"
                          delay={300}
                          onError={webcamError}
                          onScan={webcamScan}
                          legacyMode={false}
                            facingMode={"user"}
                        />
                    </div>
                </div>
                <div>
                    {
                        fileResult ?
                            <AddFromQRCode fileResult={fileResult}/>:
                            ""
                    }

                </div>

        </div>
    )
}
export default QRReader