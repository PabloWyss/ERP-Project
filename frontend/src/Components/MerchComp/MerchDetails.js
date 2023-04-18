import React, {useEffect, useState} from "react";
import callAPI from "../../Axios/callAPI";

const MerchDetails = () => {
    const [merchant, setMerchant] = useState({});
    const [editClicked, setEditClicked] = useState(false);
    const [disableInput, setDisableInput] = useState(true);
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [countryCode, setCountryCode] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [profilePicture, setProfilePicture] = useState(null);

    const merchant_id = 1;

    const handleEditButton = (e) => {
        e.preventDefault();
        if (editClicked) {
            setEditClicked(!editClicked);
            setDisableInput(!disableInput);
            updateMerchant();
        } else {
            setEditClicked(!editClicked);
            setDisableInput(!disableInput);
        }
    };

    const obtainMerchantInfo = async () => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            };

            const response = await callAPI.get(`/merchants/${merchant_id}/`, config);
            setMerchant(response.data);
            setName(response.data.name);
            setAddress(response.data.address);
            setCountryCode(response.data.country_code);
            setPhone(response.data.phone);
            setEmail(response.data.email);
            setProfilePicture(response.data.profile_picture);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        obtainMerchantInfo();
    }, []);

    const handleNameInput = (e) => {
        setName(e.target.value);
        console.log(name);
    };

    const handleAddressInput = (e) => {
        setAddress(e.target.value);
    };

    const handleCountryCodeInput = (e) => {
        setCountryCode(e.target.value);
    };

    const handlePhoneInput = (e) => {
        setPhone(e.target.value);
    };

    const handleEmailInput = (e) => {
        setEmail(e.target.value);
    };

    const handleProfilePictureInput = (e) => {
        setProfilePicture(e.target.files[0]);
    };

    const updateMerchant = async () => {
        if (!localStorage.getItem('token')) {
            return;
        }
        try {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('address', address);
            formData.append('country_code', countryCode);
            formData.append('phone', phone);
            formData.append('email', email);
            formData.append('profile_picture', profilePicture);

            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            };

            const response = await callAPI.patch(`/merchants/`, formData, config);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <form className="flex flex-col w-full justify-between gap-4" onSubmit={handleEditButton}>
            <div className="flex items-center justify-between bg-backgroundGrey px-4">
                <h2 className="text-xl">Merchant Details</h2>
                <button onClick={handleEditButton}>
                    {editClicked ? 'Save' : 'Edit'}
                </button>
            </div>
            <div className="flex w-full">
                <div className="flex w-full justify-around gap-4">
                    <div className="w-1/3">
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
                    <div className="w-1/3">
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
                    <div className="w-1/3">
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
            </div>
            <div className="flex w-full">
                <div className="flex w-full justify-around gap-4">
                    <div className="w-1/3">
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
                    <div className="w-1/3">
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
                    <div className="w-1/3">
                        <label htmlFor="profilePicture">Profile Picture</label>
                        <input
                            type="file"
                            id="profilePicture"
                            name="profilePicture"
                            onChange={handleProfilePictureInput}
                            disabled={disableInput}
                            className="w-full"
                        />
                    </div>
                </div>
            </div>
        </form>
    );
}

export default MerchDetails;