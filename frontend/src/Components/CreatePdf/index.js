import {PDFViewer} from '@react-pdf/renderer';
import MyDocument from "./PdfFile";
import ItemDetailsInput from "../../Pages/Items/Item/PrimaryDetails/ItemDetailsInput";
import React, {useState} from "react";
import {useLocation} from "react-router-dom";

const PDFCreate = () => {

        const [nubmerOf, setNumberOf] = useState(40)
        const [isStandard, setIsStandard] = useState(true)
        const location = useLocation()


        const handeleInputNumber = (e) => {
            setNumberOf(e.target.value)
        }
        const handeleInputDefault = (e) => {
            setIsStandard(e.target.checked);
        }

        return (
            <div className="flex flex-col w-full">
                <div className="flex w-1/3 h-1/6 justify-start m-4">

                    <ItemDetailsInput
                        type={"checkbox"}
                        disableInput={false}
                        description={"Standard View"}
                        value={isStandard}
                        checked={isStandard}
                        handleInput={handeleInputDefault}
                    />
                    {isStandard ?
                        "":
                    <ItemDetailsInput className="flex justify-center w-full"
                                      value={nubmerOf}
                                      disableInput={false}
                                      handleInput={handeleInputNumber}
                                      description={'Number of Codes'}/>}
                </div>
                <PDFViewer className="w-full h-5/6 h-screen">
                    <MyDocument origin={location.state.origin} item={location.state?.item} number={nubmerOf}
                                isStandard={isStandard} selection={location.state.selection}/>
                </PDFViewer>
            </div>


        )
    }
;

export default PDFCreate