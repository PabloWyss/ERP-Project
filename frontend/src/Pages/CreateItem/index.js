import PrimaryDetails from "../Items/Item/PrimaryDetails";
import React from "react";

const CreateItem = () => {

    return (
        <div className="flex h-screen w-screen justify-center bg-backgroundGrey items-center p-5">
            <div className="flex flex-col h-full w-full rounded-ifRadius p-5 bg-white  overflow-y-scroll">
                <div className="flex  h-10 rounded-ifRadius bg-white gap-4 justify-center items-center">
                    <div className="flex w-full justify-center bg-backgroundGrey">
                        <div className="text-xl">
                            {`Create new Item`}
                        </div>
                        <div className="items-center flex gap-4 justify-items-center">
                        </div>
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