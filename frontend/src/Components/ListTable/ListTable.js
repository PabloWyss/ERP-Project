import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { useMemo, useState } from "react";

function ListTable() {
  // const data = useMemo(
  //   () => [
  //     {
  //       name: "Espadrilla Formentera Yellow",
  //       supplier: "Manifactura Castellana",
  //       quantity: 47,
  //     },
  //     {
  //       name: "Poncho Multicolor",
  //       supplier: "Manifactura Mexicana",
  //       quantity: 12,
  //     },
  //   ],
  //   []
  // );

  // //create the columns model
  // const columnHelper = createColumnHelper();
  // const columns = [
  //   columnHelper.accessor("data.name", {
  //     header: () => "Name",
  //   }),
  //   columnHelper.accessor("data.supplier", {
  //     header: () => "Supplier",
  //   }),
  //   columnHelper.accessor("data.quantity", {
  //     header: () => "Qty.",
  //   }),
  // ];

  // //create the table
  // const table = useReactTable({
  //   data,
  //   columns,
  //   getCoreRowModel: getCoreRowModel(),
  // });

  const defaultData = [
    {
      firstName: 'tanner',
      lastName: 'linsley',
      age: 24,
      visits: 100,
      status: 'In Relationship',
      progress: 50,
    },
    {
      firstName: 'tandy',
      lastName: 'miller',
      age: 40,
      visits: 40,
      status: 'Single',
      progress: 80,
    },
    {
      firstName: 'joe',
      lastName: 'dirte',
      age: 45,
      visits: 20,
      status: 'Complicated',
      progress: 10,
    },
  ]
  
  const columnHelper = createColumnHelper()
  
  const columns = [
    columnHelper.accessor('firstName', {
      cell: info => info.getValue(),
    }),
    columnHelper.accessor(row => row.lastName, {
      id: 'lastName',
      cell: info => <i>{info.getValue()}</i>,
      header: () => <span>Last Name</span>,
    }),
    columnHelper.accessor('age', {
      header: () => 'Age',
      cell: info => info.renderValue(),
    }),
    columnHelper.accessor('visits', {
      header: () => <span>Visits</span>,
    }),
    columnHelper.accessor('status', {
      header: 'Status',
    }),
    columnHelper.accessor('progress', {
      header: 'Profile Progress',
    }),
  ]

  const [data, setData] = useState(() => [...defaultData])

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })
  return (
    <div className="absolute left-80">
      <table>
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th className="p-3" key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id}>
              {row.getVisibleCells().map(cell => (
                <td className="p-3" key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
  // return <div className="bg-red-600 text-center">Table
  // </div>;
}

export default ListTable;
