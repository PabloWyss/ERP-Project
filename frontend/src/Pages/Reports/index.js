// import React, {useEffect, useState} from "react";
// import callAPI from "../../Axios/callAPI";
// import WarehouseRepTable from "./WarehouseRepTable";
// import MyResponsiveLine from "./Graphs";
//
// function Reports() {
//
//     //define const
//     const [inventoryLedgers, setInventoryLedgers] = useState([])
//
//     // fetch data
//     const obtainModelsInfo = async () => {
//         try {
//             const config = {
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'Authorization': `Bearer ${localStorage.getItem('token')}`,
//                 },
//             };
//
//             const response = await callAPI.get(`/inventory_ledgers/`, config)
//             setInventoryLedgers(response.data)
//         } catch (error) {
//             console.log(error);
//         }
//     }
//
//
//     useEffect(() => {
//         obtainModelsInfo()
//     }, [])
//
//
// [
//   {
//     "country": "AD",
//     "hot dog": 51,
//     "hot dogColor": "hsl(126, 70%, 50%)",
//     "burger": 120,
//     "burgerColor": "hsl(71, 70%, 50%)",
//     "sandwich": 173,
//     "sandwichColor": "hsl(0, 70%, 50%)",
//     "kebab": 87,
//     "kebabColor": "hsl(272, 70%, 50%)",
//     "fries": 40,
//     "friesColor": "hsl(333, 70%, 50%)",
//     "donut": 176,
//     "donutColor": "hsl(175, 70%, 50%)"
//   },
//   {
//     "country": "AE",
//     "hot dog": 179,
//     "hot dogColor": "hsl(96, 70%, 50%)",
//     "burger": 112,
//     "burgerColor": "hsl(168, 70%, 50%)",
//     "sandwich": 159,
//     "sandwichColor": "hsl(281, 70%, 50%)",
//     "kebab": 124,
//     "kebabColor": "hsl(255, 70%, 50%)",
//     "fries": 49,
//     "friesColor": "hsl(172, 70%, 50%)",
//     "donut": 163,
//     "donutColor": "hsl(228, 70%, 50%)"
//   },
//   {
//     "country": "AF",
//     "hot dog": 128,
//     "hot dogColor": "hsl(21, 70%, 50%)",
//     "burger": 122,
//     "burgerColor": "hsl(55, 70%, 50%)",
//     "sandwich": 92,
//     "sandwichColor": "hsl(190, 70%, 50%)",
//     "kebab": 75,
//     "kebabColor": "hsl(87, 70%, 50%)",
//     "fries": 15,
//     "friesColor": "hsl(271, 70%, 50%)",
//     "donut": 66,
//     "donutColor": "hsl(329, 70%, 50%)"
//   },
//   {
//     "country": "AG",
//     "hot dog": 97,
//     "hot dogColor": "hsl(255, 70%, 50%)",
//     "burger": 20,
//     "burgerColor": "hsl(120, 70%, 50%)",
//     "sandwich": 51,
//     "sandwichColor": "hsl(319, 70%, 50%)",
//     "kebab": 148,
//     "kebabColor": "hsl(73, 70%, 50%)",
//     "fries": 58,
//     "friesColor": "hsl(116, 70%, 50%)",
//     "donut": 174,
//     "donutColor": "hsl(302, 70%, 50%)"
//   },
//   {
//     "country": "AI",
//     "hot dog": 171,
//     "hot dogColor": "hsl(277, 70%, 50%)",
//     "burger": 74,
//     "burgerColor": "hsl(259, 70%, 50%)",
//     "sandwich": 52,
//     "sandwichColor": "hsl(25, 70%, 50%)",
//     "kebab": 90,
//     "kebabColor": "hsl(226, 70%, 50%)",
//     "fries": 123,
//     "friesColor": "hsl(4, 70%, 50%)",
//     "donut": 118,
//     "donutColor": "hsl(307, 70%, 50%)"
//   },
//   {
//     "country": "AL",
//     "hot dog": 17,
//     "hot dogColor": "hsl(310, 70%, 50%)",
//     "burger": 139,
//     "burgerColor": "hsl(324, 70%, 50%)",
//     "sandwich": 9,
//     "sandwichColor": "hsl(127, 70%, 50%)",
//     "kebab": 32,
//     "kebabColor": "hsl(113, 70%, 50%)",
//     "fries": 66,
//     "friesColor": "hsl(226, 70%, 50%)",
//     "donut": 158,
//     "donutColor": "hsl(227, 70%, 50%)"
//   },
//   {
//     "country": "AM",
//     "hot dog": 120,
//     "hot dogColor": "hsl(16, 70%, 50%)",
//     "burger": 72,
//     "burgerColor": "hsl(272, 70%, 50%)",
//     "sandwich": 169,
//     "sandwichColor": "hsl(55, 70%, 50%)",
//     "kebab": 143,
//     "kebabColor": "hsl(98, 70%, 50%)",
//     "fries": 43,
//     "friesColor": "hsl(228, 70%, 50%)",
//     "donut": 90,
//     "donutColor": "hsl(122, 70%, 50%)"
//   }
// ]
//
//
//     return (
//         <div className="flex flex-col w-full">
//             <WarehouseRepTable tableData={inventoryLedgers}/>
//             <MyResponsiveLine data={data}/>
//         </div>
//     );
// }
//
// export default Reports;
