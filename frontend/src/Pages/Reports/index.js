import React, {useEffect, useState} from "react";
import callAPI from "../../Axios/callAPI";
import ModelTable from "../Model/ModelTable";
import WarehouseRepTable from "./WarehouseRepTable";

function Reports() {

    //define const
    const [modelsList, setModelsList] = useState([])

    // fetch data
    const obtainModelsInfo = async () => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            };

            const response = await callAPI.get(`/inventory_ledgers/`, config)
            setModelsList(response.data)

        } catch (error) {
            console.log(error);
        }
    }


    useEffect(() => {
        obtainModelsInfo()
    }, [])


    return (
        <div className="flex w-full">
            <WarehouseRepTable tableData={modelsList}/>:
        </div>
    );
}

export default Reports;
