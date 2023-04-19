import {
  useTable,
  useSortBy,
  useFilters,
  useRowSelect,
  usePagination,
} from "react-table";
import { useMemo } from "react";
import {
  FaChevronDown,
  FaChevronLeft,
  FaChevronRight,
  FaChevronUp,
} from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { forwardRef } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { setCheckedItems } from "../../Redux/Slices/tableCheckedItems";
import { useDispatch } from "react-redux";

function ListTable(props) {
  const data = useMemo(() => props.data, []);

  const columns = useMemo(() => props.columns, []);

  //create input field for search
  function TextFilter({ column: { filterValue, preFilteredRows, setFilter } }) {
    // const count = preFilteredRows.length;
    return (
      <input
        value={filterValue || ""}
        onChange={(e) => {
          setFilter(e.target.value || undefined);
        }}
        // placeholder={`Search ${count} records...`}
        placeholder={`Search...`}
        className="float-left w-full mb-2"
      />
    );
  }

  //apply input field to every column
  const defaultColumn = useMemo(
    () => ({
      Filter: TextFilter,
    }),
    []
  );

  //checkbox component besides row
  const IndeterminateCheckbox = forwardRef(
    ({ indeterminate, ...rest }, ref) => {
      const defaultRef = useRef();
      const resolvedRef = ref || defaultRef;

      useEffect(() => {
        resolvedRef.current.indeterminate = indeterminate;
      }, [resolvedRef, indeterminate]);

      return (
        <>
          <input
            type="checkbox"
            ref={resolvedRef}
            {...rest}
            className="text-drawGray"
          />
        </>
      );
    }
  );

  //create table
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    selectedFlatRows,
    state: { selectedRowIds },
    page,
    pageOptions,
    state: { pageIndex, pageSize },
    previousPage,
    nextPage,
    canPreviousPage,
    canNextPage,
  } = useTable(
    { columns, data, defaultColumn, initialState: { pageSize: 5 } },
    useFilters,
    useSortBy,
    usePagination,
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((columns) => [
        // Let's make a column for selection
        {
          id: "selection",
          // The header can use the table's getToggleAllRowsSelectedProps method
          // to render a checkbox
          Header: ({ getToggleAllRowsSelectedProps }) => (
            <div>
              <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
            </div>
          ),
          // The cell can use the individual row's getToggleRowSelectedProps method
          // to the render a checkbox
          Cell: ({ row }) => (
            <div>
              <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
            </div>
          ),
        },
        ...columns,
      ]);
    }
  );

  //navigate to details page when clicking on a list item
  const location = useLocation();
  const navigate = useNavigate();
  const handleRowClick = (row) => {
    navigate(location.pathname + "/" + row.id);
  };

  //update redux store when selecting a row with the checkbox
  const dispatch = useDispatch();
  const extractIdFromSelectedRows = () => {
    const selectedId = [];
    selectedFlatRows.map((row) => selectedId.push(row.original.id));
    dispatch(setCheckedItems(selectedId));
  };
  useEffect(extractIdFromSelectedRows, [selectedFlatRows]);

  return (
    <div>
      <div
        className="overflow-y-scroll 
      scrollbar-thin scrollbar-track-transparent scrollbar-thumb-drawGrey hover:scrollbar-thumb-buttonGrey
      bg-white"
      >
        <table {...getTableProps()}>
          <thead className="sticky top-0 bg-white">
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th key={uuidv4()} className="px-2">
                    <div
                      {...column.getHeaderProps(
                        column.getSortByToggleProps()
                      )} /*handle sorting*/
                    >
                      <div className="float-left pt-2 pr-2 text-buttonGrey">
                        {column.render("Header")}
                      </div>
                      <div className="pt-3 h-7">
                        {column.isSorted ? (
                          column.isSortedDesc ? (
                            <FaChevronUp className="text-buttonGrey" />
                          ) : (
                            <FaChevronDown className="text-buttonGrey" />
                          )
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                    <div className="w-full py-3">
                      {column.canFilter ? column.render("Filter") : null}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell, index) => {
                    return (
                      <td
                        {...cell.getCellProps()}
                        {...(index !== 0
                          ? { onClick: () => handleRowClick(row.original) }
                          : {})} /*exclude navigation to details page for the checkbox*/
                        className="px-2 py-2 border-t-2 border-drawGrey text-textGrey"
                      >
                        {cell.render("Cell")}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="flex flex-row my-2">
        <div>
          <button
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
            className="px-4 py-2 border-2 rounded-ifRadius border-buttonGrey bg-white"
          >
            <FaChevronLeft className="text-buttonGrey" />
          </button>
        </div>
        <div className="text-buttonGrey pt-2 px-2">
          Page{" "}
          <span>
            {pageIndex + 1} of {pageOptions.length}
          </span>
        </div>
        <div>
          <button
            onClick={() => nextPage()}
            disabled={!canNextPage}
            className="px-4 py-2 border-2 rounded-ifRadius border-buttonGrey bg-white"
          >
            <FaChevronRight className="text-buttonGrey" />
          </button>
        </div>
      </div>
      <div>
        <p>Selected Rows: {Object.keys(selectedRowIds).length}</p>
        <pre>
          <code>
            {JSON.stringify(
              {
                selectedRowIds: selectedRowIds,
                "selectedFlatRows[].original": selectedFlatRows.map(
                  (d) => d.original
                ),
              },
              null,
              2
            )}
          </code>
        </pre>
        <p>
          Selected names: {selectedFlatRows.map((item) => item.original.name)}
        </p>
      </div>
    </div>
  );
}

export default ListTable;
