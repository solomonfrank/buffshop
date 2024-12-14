"use client";

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { Button, InputField, Label } from "@vms/ui";
import classNames from "classnames";
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";
import { ReactNode, useRef, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { CiFilter } from "react-icons/ci";
import { IoIosSearch } from "react-icons/io";

type TableColumn<Entry> = {
  title: string;
  field: keyof Entry;
  Cell?({ entry }: { entry: Entry }): React.ReactNode;
};

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

export const Table = <Entry extends { idx: string; id: string }>({
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
    <div className="relative">
      <div className="flex gap-8 items-center mb-[1.2rem]">
        <DropdownMenu.Root open={isOpen} onOpenChange={setIsOpen}>
          <DropdownMenu.Trigger>
            {showFilter && (
              <div className="flex gap-2 items-center justify-center">
                <span>
                  <CiFilter className="w-[1.6rem] h-[1.6rem] text-muted" />
                </span>
                <h3 className=" font-semibold text-[16px] leading-12">
                  Filter
                </h3>
              </div>
            )}
          </DropdownMenu.Trigger>

          <DropdownMenu.Portal>
            {filterChildren ? (
              filterChildren()
            ) : (
              <DropdownMenu.Content
                // sticky="always"
                side="bottom"
                align="start"
                avoidCollisions={true}
                sideOffset={2}
                className="w-[41.4rem] fixed  h-[90vh] overflow-y-auto  bg-white rounded-md p-[1rem] shadow-[0px_4px_4px_0px_#00000040] "
              >
                {filterFields && filterFields.length ? (
                  <>
                    <FormProvider {...methods}>
                      <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="space-y-4">
                          {filterFields?.map((field, index) => (
                            <div key={`${field.label}`}>
                              <Label className="font-semibold">
                                {field?.label}
                              </Label>
                              <InputField
                                type="email"
                                // name={field.label}
                                placeholder={field?.label}
                                containerClassName="mb-3"
                                {...register(field.key)}
                                className=" w-full p-4 rounded-lg  h-[4.5rem] placeholder:text-[14px] text-black text-[16px]"
                              />
                            </div>
                          ))}
                        </div>

                        <div className="flex flex-col gap-3">
                          <Button
                            variant="danger"
                            size="large"
                            className="w-full"
                            type="submit"
                          >
                            Submit
                          </Button>
                          <Button
                            onClick={() => setIsOpen(false)}
                            variant="outline"
                            size="large"
                            className="w-full"
                            type="button"
                          >
                            Cancel
                          </Button>
                        </div>
                      </form>
                    </FormProvider>
                  </>
                ) : (
                  <h2 className="text-center text-xl">No filter fields</h2>
                )}
              </DropdownMenu.Content>
            )}
          </DropdownMenu.Portal>
        </DropdownMenu.Root>

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

      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div
            className={classNames(
              "inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8 ",
              isLoading && "h-[400px]",
              !isLoading && !data.length && "h-[400px]"
            )}
          >
            <div className="overflow-hidden border-b border-gray-200 shadow sm:rounded-lg h-full">
              <table className="min-w-full divide-y divide-gray-200 ">
                <thead className="bg-brand-emphasis">
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
                          "px-6 py-3 capitalize text-[16px] font-semibold tracking-wider text-left text-default",
                          thClassName
                        )}
                      >
                        {column.title}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="relative min-h-[30rem] w-full">
                  {/* {!isLoading && !data.length ? (
                    <div className="absolute w-full left-0 h-[300px] p-8">
                      <h4 className="animate-pulse relative h-14 block bg-gray-300 s mb-4 w-full">
                        No entery
                      </h4>
                    </div>
                  ) : null} */}
                  {isLoading && (
                    <tr className="absolute w-full left-0 h-[300px] p-8">
                      {[1, 2, 3, 4, 5, 9, 11, 12].map((item) => (
                        <td
                          className="animate-pulse relative h-14 block bg-gray-300 s mb-4 w-full"
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
                          className="odd:bg-white even:bg-brand-emphasis"
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
                                  "px-6 py-7 text-[16px] leading-[19.2px] font-lato font-normal  text-default whitespace-nowrap",
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
    <div className="flex items-center justify-between bg-brand-emphasis px-[2rem] py-[1.3rem]">
      <div className="text-gray-600">
        {startItem}-{endItem} of {totalItems}
      </div>
      <div className="flex items-center justify-center space-x-4">
        <div className="flex items-center space-x-2">
          <span className="text-gray-600">Rows per page:</span>
          <select
            value={pageSize}
            onChange={onPageSizeChangeHandler}
            className="border border-gray-300 rounded-md text-gray-600"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </div>
        <Pagination
          current={currentPage}
          total={totalItems}
          pageSize={pageSize}
          onChange={onPageChangeHandler}
          showSizeChanger={true}
          className="flex items-center  space-x-2 justify-center "
          itemRender={(current, type, element) => {
            if (type === "prev") {
              return (
                <span className="px-3 py-1 bg-white text-gray-600 border border-gray-300 rounded-md">
                  {"<"}
                </span>
              );
            }
            if (type === "next") {
              return (
                <span className="px-3 py-1 bg-white text-gray-600 border border-gray-300 rounded-md">
                  {">"}
                </span>
              );
            }
            // if (type === "page") {
            //   return (
            //     <span className="text-gray-600 border-none">
            //       {currentPage}/{Math.ceil(totalItems / pageSize)}
            //     </span>
            //   );
            // }

            // <button
            //   className={`px-3 py-1 ${
            //     currentPage === current ? "text-white red" : "text-gray-600"
            //   } border border-gray-300 rounded-md`}
            //   style={{
            //     borderColor: currentPage === current ? "transparent" : "",
            //   }}
            // >
            //   {current}
            // </button>;

            return <span className="border-none bg-[red]">{element}</span>;
          }}
        />
      </div>
    </div>
  );
};
