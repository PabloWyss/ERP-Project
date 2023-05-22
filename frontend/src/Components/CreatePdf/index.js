import {PDFViewer} from '@react-pdf/renderer';
import MyDocument from "./PdfFile";
import ItemDetailsInput from "../../Pages/Items/Item/PrimaryDetails/ItemDetailsInput";
import React, {useState} from "react";
import {useLocation} from "react-router-dom";

const PDFCreate = () => {

    const [nubmerOf, setNumberOf] = useState(0)
    const location = useLocation()


    const handeleInputNumber = (e) =>{
        e.preventDefault()
        setNumberOf(e.target.value)
    }

        return (
            <div className="flex flex-col w-full">
                <div className="flex w-1/3 justify-start m-4">
                    <ItemDetailsInput className="flex justify-center w-full"
                                  value={nubmerOf}
                                          disableInput={false}
                                          handleInput={handeleInputNumber}
                                          description={'Number of Codes'}/>
                </div>
                <PDFViewer className="w-full h-screen">
                    <MyDocument origin={location.state.origin} item={location.state?.item} number={nubmerOf}/>
                </PDFViewer>
            </div>


        )
    }
;

export default PDFCreate