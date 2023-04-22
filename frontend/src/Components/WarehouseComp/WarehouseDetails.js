import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import callAPI from "../../Axios/callAPI";



const WarehouseDetails = () => {
  const dispatch = useDispatch();
  const [merchant, setMerchant] = useState({});
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
  const [releaseDate, setReleaseDate] = useState("");

  const handleEditButton = async (e) => {
    e.preventDefault();
    if (editClicked) {
      setEditClicked(!editClicked);
      setDisableInput(!disableInput);
      updateWarehouse();
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

  const handleReleaseDateInput = (e) => {
    setReleaseDate(e.target.value);
  };

  const getWarehouseByID = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };

      const response = await callAPI.get(`/warehouses/`, config);
      setMerchant(response.data);
      setName(response.data.name);
      setAddress(response.data.address);
      setCountryCode(response.data.country_code);
      setContact(response.data.contact);
      setPhone(response.data.phone);
      setEmail(response.data.email);
      setIsStandard(response.data.is_standard);
      setStatus(response.data.status);
      setReleaseDate(response.data.release_date);
    } catch (error) {
      console.log(error);
    }
  };

  const updateWarehouse = async () => {
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
        release_date: releaseDate,
      };
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };
      await callAPI.patch(`/warehouses/`, data, config);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getWarehouseByID();
  }, []);

return (
      <div className="flex flex-col w-full justify-between gap-4">
        <div className="flex items-center justify-between bg-backgroundGrey px-4">
          <h2 className="text-xl">Warehouse Details</h2>
          <button onClick={handleEditButton}>
            {editClicked ? "Save" : "Edit"}
          </button>
        </div>
<div className="flex">
  <div className="w-2/3 gap-4">
    <div className="flex gap-4">
      <div className="w-full">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={handleNameInput}
          disabled={disableInput}
          className="w-full"
        />
      </div>
    </div>
    <div className="flex gap-4">
      <div className="w-1/2">
        <label htmlFor="address">Address</label>
        <input
          type="text"
          id="address"
          name="address"
          value={address}
          onChange={handleAddressInput}
          disabled={disableInput}
          className="w-full"
        />
      </div>
      <div className="w-1/2">
        <label htmlFor="countryCode">Country Code</label>
        <input
          type="text"
          id="countryCode"
          name="countryCode"
          value={countryCode}
          onChange={handleCountryCodeInput}
          disabled={disableInput}
          className="w-full"
        />
      </div>
    </div>
    <div className="flex gap-4">
      <div className="w-1/2">
        <label htmlFor="phone">Phone</label>
        <input
          type="text"
          id="phone"
          name="phone"
          value={phone}
          onChange={handlePhoneInput}
          disabled={disableInput}
          className="w-full"
        />
      </div>
      <div className="w-1/2">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={handleEmailInput}
          disabled={disableInput}
          className="w-full"
        />
      </div>
    </div>
  </div>
  <div className="w-1/3 gap-4 ml-4">
    <div className="w-full">
      <label htmlFor="status">Status</label>
      <input
        type="text"
        id="status"
        name="status"
        value={status}
        onChange={handleStatusInput}
        disabled={disableInput}
        className="w-full"
      />
    </div>
    <div className="w-full">
      <label htmlFor="releaseDate">Release Date</label>
      <input
        type="date"
        id="releaseDate"
        name="releaseDate"
        value={releaseDate}
        onChange={handleReleaseDateInput}
        disabled={disableInput}
        className="w-full"
      />
    </div>
   <div className="flex mt-6 items-center">
    <input
      type="checkbox"
      id="isStandard"
      name="isStandard"
      checked={isStandard}
      onChange={() => setIsStandard(!isStandard)}
      disabled={disableInput}
      className="h-7 w-7 border rounded-md "
    />
    <label htmlFor="isStandard" className="ml-3"> Is Standard </label>
  </div>
  </div>
</div>

</div>
);



}

export default WarehouseDetails;
