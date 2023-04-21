import PrimaryDetails from "../Items/Item/PrimaryDetails";
import React from "react";
import arrow_left_image from "../../Assets/Icons/arrow_left_orange.svg";
import {useNavigate} from "react-router-dom";

const CreateItem = () => {
    const navigate = useNavigate()
    const handleClickGoBack = (e) =>{
        e.preventDefault()
        navigate(`/items`)
    }

    return (
        <div className="flex h-screen w-screen justify-center bg-backgroundGrey items-center p-5">
            <div className="flex flex-col h-full w-full rounded-ifRadius p-5 bg-white  overflow-y-scroll">
                <div className="flex  h-10 rounded-ifRadius bg-white gap-4 justify-center items-center">
                    <div className="flex w-full content-start items-center gap-4 bg-backgroundGrey px-4">
                        <div >
                          <img className="cursor-pointer" src={arrow_left_image} alt={"go back"} onClick={handleClickGoBack}/>
                        </div>
                        <h1 className="text-title">
                          Create New Item
                        </h1>
                    </div>
                </div>
                <div className="flex h-screen w-full justify-center">
                    <div className="flex flex-col h-full w-11/12 pt-10 pb-10 gap-4">
                        <PrimaryDetails fromCreate={true}/>
                    </div>
                </div>
            </div>
        </div>

    )
}
export default CreateItem