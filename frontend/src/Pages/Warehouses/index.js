import React from "react";
import ListTable from "../../Components/ListTable/ListTable";
import { useLocation } from "react-router-dom";
import WarehouseDetailsWarehouseDetails from "../../Components/WarehouseComp/WarehouseDetails";

function Warehouse() {
  //read id of the warehouse to fetch from the URL
  const location = useLocation();
  const warehouseId = location.pathname.slice(11); //remove "/warehouse/" from the path


  //fake warehouse for testing
  const warehouse = {
    id: warehouseId,
    name: "Amazon Warehouse",
    address: "123 Main Street, Seattle, WA 98101",
    contact_name: "John Doe",
    contact_email: "johndoe@amazon.com",
    contact_phone: "(123) 456-7890",
  };

  //fake data for table testing
  const warehouses = [
    {
      id: 1,
      name: "Nike Warehouse",
      address: "456 Elm Street, Portland, OR 97204",
      contact_name: "Jane Smith",
      contact_email: "janesmith@nike.com",
      contact_phone: "(555) 555-5555",
    },
    {
      id: 2,
      name: "Adidas Warehouse",
      address: "789 Oak Street, Los Angeles, CA 90012",
      contact_name: "Bob Johnson",
      contact_email: "bobjohnson@adidas.com",
      contact_phone: "(444) 444-4444",
    },
    {
      id: 3,
      name: "Puma Warehouse",
      address: "321 Maple Street, Boston, MA 02108",
      contact_name: "Sarah Lee",
      contact_email: "sarahlee@puma.com",
      contact_phone: "(777) 777-7777",
    },
  ];

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
      Header: "Contact Name",
      accessor: "contact_name",
    },
    {
      Header: "Contact Email",
      accessor: "contact_email",
    },
    {
      Header: "Contact Phone",
      accessor: "contact_phone",
    },
  ];

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

        <div className="flex items-center justify-between bg-backgroundGrey px-4 mb-2">
          <h2 className="text-section"> Warehouses</h2>
        </div>
        <ListTable data={warehouses} columns={columns}></ListTable>
      </div>
    </div>
  );
}

export default Warehouse;

