"use client";

import classNames from "classnames";
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";
import { ReactNode, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { IoIosSearch } from "react-icons/io";
import { InputField } from "../forms";
import { CustomRadio } from "./custom-radio";

type TableColumn<Entry> = {
  title: string;
  field: keyof Entry;
  Cell?({ entry }: { entry: Entry }): React.ReactNode;
};

const options = [
  { id: "all", label: "All", value: "all" },
  { id: "active", label: "Active", value: "inactive" },
  { id: "inactive", label: "Inactive", value: "inactive" },
  { id: "deactive", label: "Deactive", value: "deactive" },
];

export type TableProps<Entry> = {
  data: Entry[];
  columns: TableColumn<Entry>[];
  rowSelection?: (row: Entry[]) => void;
  isLoading?: boolean;
  totalItems?: number;
  currentPage?: number;
  pageSize?: number;
  onPageChange: (size: number) => void;
  onPageSizeChange: (size: number) => void;
  showFilter?: boolean;
  thClassName?: string;
  tdClassName?: string;
  setFiltered?: (data: Record<string, string>) => void;
  showSearchField?: boolean;
  onSearchField?: (searchPhrase: string) => void;
  filterChildren?: () => JSX.Element;
  filterFields?: { label: string; required: boolean; key: string }[];
};

export const Table = <Entry extends { id: string }>({
  data,
  columns,
  rowSelection,
  isLoading,
  pageSize,
  currentPage,
  totalItems,
  onPageChange,
  onPageSizeChange,
  showFilter,
  thClassName,
  tdClassName,
  filterFields,
  setFiltered,
  onSearchField,
  showSearchField,
  filterChildren,
}: TableProps<Entry>) => {
  const checbockRefs = useRef<HTMLInputElement[]>([]);
  const itemsRef = useRef(new Map<string, HTMLInputElement>());
  const [isOpen, setIsOpen] = useState(false);

  const methods = useForm<Record<string, string>>({
    mode: "onChange",
  });
  const { handleSubmit, register } = methods;

  const selectRowsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    for (const value of itemsRef.current.values()) {
      value.checked = e.target.checked;
    }
    filterHandler();
  };

  const updateCheckRow = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const input = itemsRef.current?.get(`${index}`);

    if (input) {
      input.checked = e.target.checked;
    }
  };

  const filterHandler = () => {
    const selectedRows: Entry[] = [];

    for (const value of itemsRef.current.values()) {
      if (value.checked) {
        const idx = Number(value.getAttribute("data-value"));
        if (idx > -1 && data[idx]) {
          selectedRows.push(data[idx]);
        }
      }
    }

    if (rowSelection) {
      if (selectedRows) rowSelection(selectedRows);
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    updateCheckRow(e, index);
    filterHandler();
  };

  // if (!data?.length && !isLoading) {
  //   return (
  //     <div className="flex flex-col items-center  text-[18px] justify-center text-gray-500 bg-white h-80">
  //       <h4>No Entries Found</h4>
  //     </div>
  //   );
  // }

  function getMap() {
    if (!checbockRefs.current) {
      // Initialize the Map on first usage.
      itemsRef.current = new Map();
    }
    return itemsRef.current;
  }

  const onSubmit = (data: Record<string, string>) => {
    if (setFiltered) {
      setFiltered(data);

      setIsOpen(false);
    }
  };

  return (
    <div className="relative w-full">
      <div className="flex gap-8 items-center mb-[1.2rem]">
        {showSearchField && onSearchField && (
          <div className="flex-1">
            <InputField
              placeholder="Search"
              className="w-full"
              onChange={(e) => onSearchField?.(e.target.value)}
              suffixIcon={
                <IoIosSearch className="h-[2.4rem] w-[2.4rem] rounded-[10px]" />
              }
            />
          </div>
        )}
      </div>

      <div className="flex gap-[1.6rem] items-center  py-[1.6rem]">
        <h3 className="font-medium text-[1.4rem] leading-[21px]">Show only:</h3>
        <div>
          <CustomRadio
            options={options}
            defaultValue="All"
            value="all"
            // value={value}
            onChange={(e) => {}}
          />
        </div>
      </div>

      <div className="flex flex-col">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div
            className={classNames(
              "inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8 ",
              isLoading && "h-[400px]",
              !isLoading && !data.length && "h-[400px]"
            )}
          >
            <div className="overflow-hidden  shadow sm:rounded-lg h-full">
              <table className="min-w-full divide-y divide-[#848484] ">
                <thead className="bg-[#282828]">
                  <tr>
                    {rowSelection && (
                      <th className="px-5">
                        <input type="checkbox" onChange={selectRowsChange} />
                      </th>
                    )}
                    {columns.map((column, index) => (
                      <th
                        key={column.title + index}
                        scope="col"
                        className={classNames(
                          "px-[4rem] py-[1.6rem] capitalize text-[12px] leading-[1.8rem] font-medium text-left text-[#9CA3AF]",
                          thClassName
                        )}
                      >
                        {column.title}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="relative min-h-[30rem] w-full bg-[#202020] divide-y divide-[#848484] ">
                  {isLoading && (
                    <tr className="absolute w-full left-0 h-[300px] p-8">
                      {[1, 2, 3, 4, 5, 9, 11, 12].map((item) => (
                        <td
                          className="animate-pulse relative h-14 block bg-[#282828] mb-4 w-full"
                          key={item}
                        ></td>
                      ))}
                    </tr>
                  )}

                  {!isLoading && data.length > 0 ? (
                    data.map((entry, entryIndex) => {
                      return (
                        <tr
                          key={entry?.id || entryIndex}
                          className="odd:bg-[#202020] even:bg-[#202020] hover:bg-[#171717] "
                        >
                          {rowSelection && (
                            <td className=" px-5 py-7 flex shrink-0 flex-1 items-center justify-center ">
                              <input
                                type="checkbox"
                                ref={(node) => {
                                  const map = getMap();

                                  if (node) {
                                    map?.set(`${entryIndex}`, node);
                                  } else {
                                    map?.delete(`${entryIndex}`);
                                  }
                                }}
                                data-value={entryIndex}
                                onChange={(e) => onChange(e, entryIndex)}
                              />
                            </td>
                          )}
                          {columns.map(
                            ({ Cell, field, title }, columnIndex) => (
                              <td
                                key={title + columnIndex}
                                className={classNames(
                                  "px-[4rem] py-[1.6rem]  font-medium  text-[1.4rem] leading-[2.1rem]  text-white whitespace-nowrap",
                                  tdClassName
                                )}
                              >
                                {Cell ? (
                                  <Cell entry={entry} />
                                ) : (
                                  (entry[field] as ReactNode)
                                )}
                              </td>
                            )
                          )}
                        </tr>
                      );
                    })
                  ) : (
                    <>
                      {!isLoading && (
                        <div className=" left-0 w-full absolute p-8 text-center flex flex-col items-center  text-[18px] justify-center text-gray-500 h-80">
                          <div className="h-14 block mb-4 w-full">
                            No Entries Found
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </tbody>
              </table>

              {!isLoading && data.length ? (
                <PaginatedTable
                  totalItems={totalItems}
                  currentPage={currentPage}
                  pageSize={pageSize}
                  onPageChange={onPageChange}
                  onPageSizeChange={onPageSizeChange}
                />
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const PaginatedTable = ({
  totalItems = 10,
  currentPage = 1,
  pageSize = 10,
  onPageChange,
  onPageSizeChange,
}: {
  totalItems?: number;
  currentPage?: number;
  pageSize?: number;
  onPageChange: (size: number) => void;
  onPageSizeChange: (size: number) => void;
}) => {
  const onPageChangeHandler = (page: number) => {
    // setCurrentPage(page);

    onPageChange(page);
  };

  const onPageSizeChangeHandler = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    // setPageSize(Number(event.target.value));
    // setCurrentPage(1); // Reset to the first page when page size changes
    onPageSizeChange(Number(event.target.value));
    onPageChange(1);
  };

  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  return (
    <div className="flex items-center justify-between bg-[#202020] border-t border-[#848484] px-[2rem] py-[1.3rem] ">
      <div className="flex gap-[1rem] items-center">
        <div className="flex items-center space-x-2">
          <span className="text-[#9CA3AF] text-[12px] leading-[1.8rem]">
            Rows per page:
          </span>
          <select
            value={pageSize}
            onChange={onPageSizeChangeHandler}
            className="border border-[#848484]  text-[12px] leading-[1.8rem] text-[#9CA3AF] bg-[#202020] transparent rounded-md  h-[3.4rem] w-[6.4rem]"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </div>

        <div className="text-[12px] leading-[1.8rem] text-white">
          {startItem}-{endItem} of {totalItems}
        </div>
      </div>

      <div className="flex items-center justify-center space-x-4">
        <Pagination
          current={currentPage}
          total={totalItems}
          pageSize={pageSize}
          onChange={onPageChangeHandler}
          //showSizeChanger={true}
          className=" items-center space-x-0  justify-center "
          itemRender={(current, type, element) => {
            if (type === "prev") {
              return (
                <span
                  className={classNames(
                    " inline-block px-[1.2rem]  rounded-[4px]  bg-transparent text-[#9CA3AF] border border-[#848484] "
                  )}
                >
                  Previous
                </span>
              );
            }
            if (type === "next") {
              return (
                <span
                  className={classNames(
                    " inline-block px-[1.2rem]   bg-transparent text-[#9CA3AF] border border-[#848484] rounded-[4px]"
                  )}
                >
                  Next
                </span>
              );
            }
          }}
        />
      </div>
    </div>
  );
};
