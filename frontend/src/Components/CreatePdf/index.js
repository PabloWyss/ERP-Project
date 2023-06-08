import {PDFViewer} from '@react-pdf/renderer';
import MyDocument from "./PdfFile";
import ItemDetailsInput from "../../Pages/Items/Item/PrimaryDetails/ItemDetailsInput";
import React, {useState} from "react";
import {useLocation} from "react-router-dom";

const PDFCreate = () => {

    const location = useLocation()
    const [isStandard, setIsStandard] = useState(true)
    const [inputIfo, setInputInfo] = useState(
        {
            "quantity": 1,
            "width": "42",
            "showName": true,
            "height": "32.7",
            "topMargin": "0",
            "sideMargin": "0",
            "personalizedText": location.state.item.name,
        })

    const handeleInputQty = (e) => {
        setInputInfo(prevState => ({
            ...prevState, "quantity": e.target.value,
        }))
    }

    const handeleInputWidth = (e) => {
        setInputInfo(prevState => ({
            ...prevState, "width": `${e.target.value}`,
        }))
    }

    const handeleInputHeight = (e) => {
        setInputInfo(prevState => ({
            ...prevState, "height": `${e.target.value}`,
        }))
    }

    const handeleInputSideMargin = (e) => {
        setInputInfo(prevState => ({
            ...prevState, "sideMargin": `${e.target.value}`,
        }))
    }

    const handeleInputTopMargin = (e) => {
        setInputInfo(prevState => ({
            ...prevState, "topMargin": `${e.target.value}`,
        }))
    }

    const handeleInputShowName = (e) => {
        setInputInfo(prevState => ({
            ...prevState, "showName": e.target.checked,
        }))
    }

    const handeleInputText = (e) => {
        setInputInfo(prevState => ({
            ...prevState, "personalizedText": e.target.value,
        }))
    }

    const handeleInputDefault = (e) => {
        setIsStandard(e.target.checked);
        setInputInfo(prevState => ({
            ...prevState,
            "quantity": 1,
            "width": "42",
            "height": "32.7",
            "showName": true,
            "topMargin": "0",
            "sideMargin": "0",
            "personalizedText": location.state.item.name,
        }))
    }

    return (<div className="flex flex-col w-full h-screen">
        <div className="flex w-full h-32 justify-between">
            <div className="flex w-1/6 justify-center">
                <ItemDetailsInput
                    type={"checkbox"}
                    disableInput={false}
                    description={"Standard View"}
                    value={isStandard}
                    checked={isStandard}
                    handleInput={handeleInputDefault}
                />
            </div>
            {isStandard ? "" :
                <div className="flex justify-around w-5/6 items-center ">
                    <div className="flex-col w-2/6">
                        <ItemDetailsInput
                            className="flex justify-center w-full"
                            value={inputIfo.quantity}
                            disableInput={false}
                            handleInput={handeleInputQty}
                            description={'Number of Codes'}/>
                        <ItemDetailsInput
                            className="flex justify-center w-full"
                            value={inputIfo.width}
                            disableInput={false}
                            handleInput={handeleInputWidth}
                            description={'Width (mm)'}/>
                        <ItemDetailsInput
                            className="flex justify-center w-full"
                            value={inputIfo.height}
                            disableInput={false}
                            handleInput={handeleInputHeight}
                            description={'Height (mm)'}/>

                    </div>
                    <div className="flex-col justify-between w-3/6">
                        <div className="flex justify-between">
                            <div>
                                <ItemDetailsInput
                                    className="flex justify-center w-full"
                                    value={inputIfo.sideMargin}
                                    disableInput={false}
                                    handleInput={handeleInputSideMargin}
                                    description={'Side (mm)'}/>
                                <ItemDetailsInput
                                    className="flex justify-center w-full"
                                    value={inputIfo.topMargin}
                                    disableInput={false}
                                    handleInput={handeleInputTopMargin}
                                    description={'Top/Down (mm)'}/>


                            </div>
                            <div className="flex-col justify-between w-2/6">
                                <ItemDetailsInput
                                    type={"checkbox"}
                                    disableInput={false}
                                    description={"Show Name"}
                                    value={inputIfo.showName}
                                    checked={inputIfo.showName}
                                    handleInput={handeleInputShowName}
                                />
                            </div>
                        </div>
                        <div className="flex-col">
                            <ItemDetailsInput
                                className="flex justify-center w-full"
                                value={inputIfo.personalizedText}
                                disableInput={false}
                                handleInput={handeleInputText}
                                description={'Personilized Text'}/>
                        </div>

                    </div>
                </div>}
        </div>
        <PDFViewer className="w-full flex-1">
            <MyDocument origin={location.state.origin} item={location.state?.item} inputInfo={inputIfo}
                        isStandard={isStandard} selection={location.state.selection}/>
        </PDFViewer>
    </div>)
};

export default PDFCreate