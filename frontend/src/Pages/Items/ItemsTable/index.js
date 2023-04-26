import React, {useEffect, useState} from "react";
import ListTable from "../../../Components/ListTable/ListTable";
import addButton from "../../../Assets/Icons/plus_orange.png"
import {useNavigate} from "react-router-dom";
import ListTableIfEmpty from "../../../Components/ListTableIfEmpty/ListTable";
import {FaQrcode} from "react-icons/fa";
import QRReader from "../../QRReader";
import PopUpQRReader from "../../QRReader/AddFromQRCode/popUpQrCode";

const ItemsTable = ({tableData}) => {
    const navigate = useNavigate()
    const [qrcodeClicked, setQrcodeClicked] = useState(false)
    const [color, setColor] = useState("white")

    // change format of numbers
    function commifyCurrency(n = 0) {
        let parts = n.toString().split(".");
        const numberPart = parts[0];
        const decimalPart = parts[1];
        const thousands = /\B(?=(\d{3})+(?!\d))/g;
        return numberPart.replace(thousands, "’") + (decimalPart ? "." + decimalPart : " " + "EUR");
    }

    function commify(n = 0) {
        let parts = n.toString().split(".");
        const numberPart = parts[0];
        const decimalPart = parts[1];
        const thousands = /\B(?=(\d{3})+(?!\d))/g;
        return numberPart.replace(thousands, ",") + (decimalPart ? "." + decimalPart : "");
    }

    //create columns model
    const columns = [
        {
            Header: "Name",
            accessor: "name",
        },
        {
            Header: "Status",
            accessor: "status",
        },
        {
            Header: "SKU",
            accessor: "sku",
        },
        {
            Header: "Current Stock",
            accessor: "stock_level_total_current",
            Cell: (props) => {
                const number = commify(props.value)
                return <span>{number}</span>
            }
        },
        {
            Header: "Sale Price",
            accessor: "item_specifications[0].sale_price_net_eur",
            Cell: (props) => {
                const number = commifyCurrency(props.value)
                return <span>{number}</span>
            }
        },
        {
            Header: "Purchase Price",
            accessor: "item_specifications[0].purchase_price_net_eur",
            Cell: (props) => {
                const number = commifyCurrency(props.value)
                return <span>{number}</span>
            }
        },
        {
            Header: "Size",
            accessor: "item_specifications[0].size",
        },

    ];

    //Handle Buttons
    const handleCreateButton = (e) => {
        e.preventDefault()
        navigate(`/items/new/`)
    }

    const handleGoToModels = (e) => {
        e.preventDefault()
        navigate(`/items/models`)
    }




    const hanldeClickQrCode = (e) => {
        e.preventDefault()
        setQrcodeClicked(!qrcodeClicked)
        if(qrcodeClicked){
            setColor('white')
        } else {
            setColor('black')
        }
        console.log(color)
        setQrcodeClicked(!qrcodeClicked)
        // navigate(`/readqr`)
    }

    //table data if empy in order to avoid rendering problems
    const data_if_empty = [{
        name: ""
    }]

    useEffect(()=>{

    },[color])

    return (
        <div
            className='flex h-full w-full py-6 px-8 justify-center
    bg-backgroundGrey'
        >
            <div
                style={{
                    background: color
                }}
                className='w-full h-full py-6 px-8
        flex flex-col
           rounded-ifRadius
        overflow-y-auto scrollbar-thin scrollbar-track-transparent
        scrollbar-thumb-drawGrey hover:scrollbar-thumb-buttonGrey'
            >
                <div className="flex gap-10">
                    <h1 className="text-title mb-2">Items</h1>
                    <button className="p-0 p-0 bg-ifOrange w-40 h-8 text-white" onClick={handleGoToModels}>Go to
                        Models
                    </button>
                    <FaQrcode className="w-8 h-8 cursor-pointer" onClick={hanldeClickQrCode}/>
                </div>
                {
                    tableData?.length > 0 ?
                        <ListTable data={tableData} columns={columns}></ListTable> :
                        <ListTableIfEmpty data={data_if_empty} columns={columns}></ListTableIfEmpty>
                }
                <div>
                    <img className="cursor-pointer absolute bottom-10 right-12" src={addButton} alt={"create new item"}
                         onClick={handleCreateButton}/>
                </div>

                {
                    qrcodeClicked ?
                        <div className="fixed top-40 left-1/3">
                            <PopUpQRReader/>
                        </div> :
                        ""
                }
            </div>
        </div>
    );
}

export default ItemsTable