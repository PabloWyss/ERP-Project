import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import callAPI from "../../Axios/callAPI";
import ItemDetailsInput from "../../Pages/Items/Item/PrimaryDetails/ItemDetailsInput";
import {useNavigate, useParams} from "react-router-dom";

const PartnerDetails = ({fromCreate}) => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const [partner, setPartner] = useState({});
  const [editClicked, setEditClicked] = useState(false);
  const [disableInput, setDisableInput] = useState(true);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [contact, setContact] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [isStandard, setIsStandard] = useState(false);
  const [status, setStatus] = useState("");
  const [creationDate, setCreationDate] = useState("");
  const { partnerID } = useParams();

  const handleEditButton = async (e) => {
    e.preventDefault();
    if (editClicked) {
      setEditClicked(!editClicked);
      setDisableInput(!disableInput);
      updatePartner();
    } else {
      setEditClicked(!editClicked);
      setDisableInput(!disableInput);
    }
  };

  const handleNameInput = (e) => {
    setName(e.target.value);
  };

  const handleAddressInput = (e) => {
    setAddress(e.target.value);
  };

  const handleCountryCodeInput = (e) => {
    setCountryCode(e.target.value);
  };

  const handleContactInput = (e) => {
    setContact(e.target.value);
  };

  const handlePhoneInput = (e) => {
    setPhone(e.target.value);
  };

  const handleEmailInput = (e) => {
    setEmail(e.target.value);
  };

const handleIsStandardInput = (e) => {
  setIsStandard(e.target.checked);
};



  const handleStatusInput = (e) => {
    setStatus(e.target.value);
  };


  const handleCreationDateInput = (e) => {
    setCreationDate(e.target.value);
  };

  const getPartnerByID = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };

      const response = await callAPI.get(`/partners/${partnerID}/`, config);
      setPartner(response.data);
      setName(response.data.name);
      setAddress(response.data.address);
      setCountryCode(response.data.country_code);
      setContact(response.data.contact);
      setPhone(response.data.phone);
      setEmail(response.data.email);
      setIsStandard(response.data.is_standard);
      setStatus(response.data.status);
      setCreationDate(response.data.creation_date);

    } catch (error) {
      console.log(error);
    }
  };

  const updatePartner = async () => {
    if (!localStorage.getItem("token")) {
      return;
    }
    try {
      const data = {
        name: name,
        address: address,
        country_code: countryCode,
        contact: contact,
        phone: phone,
        email: email,
        is_standard: isStandard,
        status: status,
        creation_date: creationDate,
      };
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };
      await callAPI.patch(`/partners/${partnerID}/`, data, config);
      navigate('/partners')
    } catch (error) {
      console.log(error);
    }
  };

let date = '';

if (partner.creation_date) {
  date = new Date(partner.creation_date).toString().slice(0, 15);
}

  useEffect(() => {
    getPartnerByID();
  }, []);

return (
      <div className="flex flex-col w-full justify-between gap-4">
        <div className="flex items-center justify-between bg-backgroundGrey px-4">

          <h2 className="text-xl">Partner Details</h2>
          <button onClick={handleEditButton}>
            {editClicked ? "Save" : "Edit"}
          </button>
        </div>
          <div className="flex w-full justify-around gap-4">
            <div className="flex w-1/2 flex-col gap-1">

               <ItemDetailsInput value={date}
               disableInput={true}
               description={"Creation Date:"}/>
              <ItemDetailsInput
                disableInput={disableInput}
                handleInput={handleNameInput}
                description={"Name"}
                value={name}
              />
              <ItemDetailsInput
                disableInput={disableInput}
                handleInput={handleAddressInput}
                description={"Address"}
                value={address}
              />
              <ItemDetailsInput
                disableInput={disableInput}
                handleInput={handleCountryCodeInput}
                description={"Country Code"}
                value={countryCode}
              />

              <ItemDetailsInput
                type={"checkbox"}
                disableInput={disableInput}
                description={"Is Standard: "}
                value={isStandard}
                checked={isStandard}
                handleInput={handleIsStandardInput}
                className="w-10 h-10 mr-2"
              />
            </div>
            <div className="flex w-1/2 flex-col gap-1">
              <ItemDetailsInput
                disableInput={disableInput}
                handleInput={handlePhoneInput}
                description={"Phone: "}
                value={phone}
              />
              <ItemDetailsInput
                disableInput={disableInput}
                handleInput={handleEmailInput}
                description={"Email: "}
                value={email}
              />
              <ItemDetailsInput value={status}
                disableInput={disableInput}
                handleInput={handleStatusInput}
                description={"Status: "}
                choicesEnabeled={true}
                choices={["Active",'No restock']}/>
              <ItemDetailsInput
                value={contact}
                type="text"
                handleInput={handleContactInput}
                description={"Contact: "}
              />


            </div>
          </div>


</div>
);

}

export default PartnerDetails;
