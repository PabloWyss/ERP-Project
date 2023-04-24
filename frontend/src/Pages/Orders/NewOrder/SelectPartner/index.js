import React, { useEffect, useRef } from "react";
import ListTable from "../../../../Components/ListTable/ListTable.js";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import OrderSelectItem from "./OrderSelectItem/index.js";
import { setCheckedItems } from "../../../../Redux/Slices/tableCheckedItems.js";
import callAPI from "../../../../Axios/callAPI.js";

function SelectPartner() {
  //retrieve type buy or sell from redux
  const isOrderBuy = useSelector((store) => store.orderbuysellrefund.isbuy);
  //store retrieved data here
  const [partnerList, setPartnerList] = useState([]);
  //fetch partner list from backend
  const fetchSuppliersOrCustomers = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };
      const endpoint = isOrderBuy
        ? "/partners/suppliers/"
        : "/partners/customers/";
      const response = await callAPI.get(endpoint, config);
      setPartnerList(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchSuppliersOrCustomers();
  }, [isOrderBuy]);

  //create columns model
  const columns = [
    {
      Header: "Name",
      accessor: "name",
    },
    {
      Header: "Address",
      accessor: "address",
    },
    {
      Header: "E-Mail",
      accessor: "email",
    },
    {
      Header: "Phone",
      accessor: "phone",
    },
  ];

  //show the partner list or the selected partner
  const dispatch = useDispatch(); //used later to reset redux store
  //retrieve id of selected partner from redux
  const selectedPartnerId = useSelector(
    (store) => store.checkeditems.checkeditems
  );
  // let selectedPartnerData = useRef(undefined); //will be fetched when selected
  const [isPartnerSelected, setIsPartnerSelected] = useState(false);
  //store retrieved data here
  const [partnerData, setPartnerData] = useState([]);
  //fetch partner list from backend
  const fetchPartnerData = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };
      // const response = await callAPI.get(`/partners/${selectedPartner}/`, config);
      const response = await callAPI.get(`/partners/5/`, config);
      setPartnerData(response.data);
      console.log(partnerData)
    } catch (error) {
      console.log(error);
    }
  };
useEffect(() => {
  fetchPartnerData()
}, [selectedPartnerId])

  const handleSelectPartner = () => {
    if (selectedPartnerId.length === 1) {
      console.log("id: " + selectedPartnerId)
      setIsPartnerSelected(true);
      dispatch(setCheckedItems([])); //reset redux store for item selection
    }
  };
  useEffect(handleSelectPartner, [selectedPartnerId]);

  //TODO set isPartnerSelected to false if the user toggles Buy/Sell after selecting a partner

  //change an already selected partner
  const handleChangePartner = () => {
    setIsPartnerSelected(false);
  };

  return (
    <div>
      <div className="flex flex-col">
        {isPartnerSelected ? (
          <div className="flex justify-between">
            <div className="pt-4">
              {partnerData.name} -{" "}
              {partnerData.address}
            </div>
            <div className="m-2">
              <button
                onClick={handleChangePartner}
                className="float-right text-buttonGrey border-2 border-buttonGrey"
              >
                Change
              </button>
            </div>
          </div>
        ) : (
          <ListTable data={partnerList} columns={columns} />
        )}
      </div>
      <div>
        {isPartnerSelected ? (
          <div>
            <h2 className=" bg-backgroundGrey text-section px-4 mt-4">Items</h2>
            {/* <OrderSelectItem partnerid={selectedPartner.id} /> */}
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default SelectPartner;
