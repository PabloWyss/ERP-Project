import React from "react";
import CreatePartner from "../../../Components/PartnerComp/CreatePartner";
import {useNavigate} from "react-router-dom";
import arrow_left_image from "../../../Assets/Icons/arrow_left_orange.svg";

function CreatePartnerView() {
    const navigate = useNavigate()
    const handleClickGoBack = (e) => {
        e.preventDefault()
        navigate(`/partners`)
    }
  return (
          <div
      className="h-screen w-screen py-6 px-8 justify-center
    bg-backgroundGrey"
    >
      <div
        className="w-full h-full py-6 px-8
        flex flex-col
      bg-white rounded-ifRadius
        overflow-y-auto scrollbar-thin scrollbar-track-transparent
        scrollbar-thumb-drawGrey hover:scrollbar-thumb-buttonGrey"
      >
      <div className="flex flex-col h-screen w-11/12 pt-10 pb-10 gap-4">
          <div className="flex justify-start w-1/4">
              <div className="flex items-center w-full">
              <img
                  className="cursor-pointer mr-2"
                  src={arrow_left_image}
                  alt={"go back"}
                  onClick={handleClickGoBack}
              />
              <h1 className="text-title">Partner </h1>
              </div>
          </div>
          <div className="flex flex-col w-full gap-4 justify-between">
              <CreatePartner/>
          </div>
      </div>
    </div>
 </div>
);
}

export default CreatePartnerView;