import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
} from "@tanstack/react-table";
import { useMemo } from "react";
import { useState } from "react";

function TestTable() {
  const data = [
    {
      name: "Manolo",
      age: 72,
      location: "Sevilla",
    },
    {
      name: "Azulejo",
      age: 67,
      location: "Bogota",
    },
    {
      name: "Paco",
      age: 25,
      location: "Madrid",
    },
    {
      name: "Paco",
      age: 25,
      location: "Madrid",
    },
    {
      name: "Paco",
      age: 25,
      location: "Madrid",
    },
    {
      name: "Paco",
      age: 25,
      location: "Madrid",
    },
    {
      name: "Paco",
      age: 25,
      location: "Madrid",
    },
    {
      name: "Paco",
      age: 25,
      location: "Madrid",
    },
    {
      name: "Paco",
      age: 25,
      location: "Madrid",
    },
    {
      name: "Paco",
      age: 25,
      location: "Madrid",
    },
    {
      name: "Paco",
      age: 25,
      location: "Madrid",
    },
  ];

  //status for sorting
  const [sorting, setSorting] = useState([{ id: "age", desc: false }]);
  console.log(sorting)
  //const [sorting, setSorting] = useState();
  //const [sorting, setSorting] = useState([]);

  //create columns (headers)
  const columnHelper = createColumnHelper();

  const columns = [
    columnHelper.accessor("name", {
      //which property of the object in "data" to access
      header: "Name", //text to display on the header
    }),
    columnHelper.accessor("age", {
      header: "Age",
    }),
    columnHelper.accessor("location", {
      header: "City",
    }),
  ];

  // const columns = useMemo(() => [
  //   {
  //     accessorKey: 'name',
  //     header: 'Name'
  //   },
  //   {
  //     accessorKey: 'age',
  //     header: 'Age'
  //   },
  //   {
  //     accessorKey: 'location',
  //     header: 'City'
  //   },
  // ], [])


  //create table with sorting enabled
  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    debugTable: true,
  });

 

  // return (
  //   <div className="absolute left-80 top-80 border-black border-2 h-40 overflow-y-scroll">
  //     <table>
  //       <thead>
  //         {/*create header*/}
  //         {table
  //           .getHeaderGroups()
  //           .map(
  //             (
  //               headerGroup /*headers can be grouped, if no groups are defined, there will be just one*/
  //             ) => (
  //               <tr key={headerGroup.id}>
  //                 {/*one row per header group*/}
  //                 {headerGroup.headers.map((header) => (
  //                   <th key={header.id}>
  //                     {" "}
  //                     {/*create the header of each column*/}
  //                     <div onClick={header.column.getToggleSortingHandler()}>
  //                       {/*handle sorting*/}
  //                       {flexRender(
  //                         /*handles dynamic values*/
  //                         header.column.columnDef.header,
  //                         header.getContext()
  //                       )}
  //                       {
  //                         {
  //                           asc: " 🔽",
  //                           desc: " 🔼",
  //                         }[header.column.getIsSorted()]
  //                       }
  //                     </div>
  //                   </th>
  //                 ))}
  //               </tr>
  //             )
  //           )}
  //       </thead>
  //       <tbody>
  //         {/*create table body (content)*/}
  //         {table.getRowModel().rows.map((row /*create rows*/) => (
  //           <tr key={row.id}>
  //             {row.getVisibleCells().map((cell /*create cells*/) => (
  //               <td key={cell.id}>
  //                 {flexRender(cell.column.columnDef.cell, cell.getContext())}
  //               </td>
  //             ))}
  //           </tr>
  //         ))}
  //       </tbody>
  //     </table>
  //   </div>
  // );

  return (
    // <div className="absolute left-80 top-80 border-black border-2 h-40 overflow-y-scroll">
          <div className="absolute left-80 top-80 border-black border-2">
      <table>
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => {
                return (
                  <th key={header.id} colSpan={header.colSpan}>
                    {header.isPlaceholder ? null : (
                      <div
                        {...{
                          className: header.column.getCanSort()
                            ? 'cursor-pointer select-none'
                            : '',
                          onClick: header.column.getToggleSortingHandler(),
                        }}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {{
                          asc: ' 🔼',
                          desc: ' 🔽',
                        }[header.column.getIsSorted()] ?? null}
                      </div>
                    )}
                  </th>
                )
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {table
            .getRowModel()
            .rows.slice(0, 10)
            .map(row => {
              return (
                <tr key={row.id}>
                  {row.getVisibleCells().map(cell => {
                    return (
                      <td key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    )
                  })}
                </tr>
              )
            })}
        </tbody>
      </table>
      <div>{table.getRowModel().rows.length} Rows</div>
      <pre>{JSON.stringify(sorting, null, 2)}</pre>
    </div>
  )

}

export default TestTable;
