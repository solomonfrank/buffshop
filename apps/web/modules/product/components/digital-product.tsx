import { Button } from "@buff/ui";
import { useState } from "react";
import { useGetProducts } from "../api/get-product";
import { NoRecord } from "./no-record";

export const DigitalProduct = ({ type = "physical" }: { type: string }) => {
  const [filter, setFilter] = useState({
    currentPage: "1",
    pageSize: "10",
  });
  const products = useGetProducts({
    filter: {
      ...filter,
      PageNumber: `${filter.currentPage}`,
      PageSize: `${filter.pageSize}`,
      product_type: type,
    },
    enabled: true,
  });

  return (
    <div className="w-full">
      <div className="w-full">
        <div className="w-full flex gap-[23px] flex-wrap">
          {products.isFetching ? (
            [1, 2, 3].map((item) => (
              <div
                key={item}
                className=" basis-[calc(33.3%-15.33px)] overflow-hidden h-[40rem] rounded-[9px]"
              >
                <div className="animate-pulse relative h-[220px] block bg-[#282828] mb-4 w-full"></div>
                <div className="animate-pulse relative h-4 block bg-[#282828] mb-4 w-[80%]"></div>
                <div className="animate-pulse relative h-4 block bg-[#282828] mb-4 w-[60%]"></div>
              </div>
            ))
          ) : (
            <>
              {!products.isFetching && products.data && products.data.length ? (
                products.data.map((item) => (
                  <div className="bg-[#282828] basis-[calc(33.3%-15.33px)] overflow-hidden h-[40rem] rounded-[9px]">
                    <figure className="w-full h-[25.9rem] overflow-hidden">
                      {item.images.length ? (
                        <img
                          src={item?.images[0]!.url}
                          className="w-full object-cover h-full"
                        />
                      ) : (
                        <img
                          src="/images/prod-card.png"
                          className="w-full object-cover h-full"
                          loading="lazy"
                        />
                      )}
                    </figure>
                    <div className="w-full px-[2.2rem] py-[1.4rem]">
                      <h6 className="text-[#B8B8B8] font-medium text-[16px] leading-[2.4rem]">
                        {item.name}
                      </h6>
                      <h4 className="text-[2.4rem] leading-[2.4rem] tracking-[3%] text-white">
                        {new Intl.NumberFormat("en", {
                          style: "currency",
                          currency: "NGN",
                        }).format(Number(item.price))}
                      </h4>
                      <div className="mt-[1.6rem] text-right">
                        <Button
                          href={`/app/product-management/${item.name}`}
                          prefixIcon={
                            <svg
                              width="20"
                              height="20"
                              viewBox="0 0 20 20"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M18.3327 15C18.3327 16.1667 18.3327 16.7501 18.1056 17.1958C17.9058 17.5878 17.5872 17.9065 17.1952 18.1062C16.7495 18.3333 16.1661 18.3333 14.9993 18.3333C13.8326 18.3333 13.2492 18.3333 12.8035 18.1062C12.4115 17.9065 12.0928 17.5878 11.8931 17.1958C11.666 16.7501 11.666 16.1667 11.666 15C11.666 13.8332 11.666 13.2498 11.8931 12.8041C12.0928 12.4121 12.4115 12.0935 12.8035 11.8937C13.2492 11.6666 13.8326 11.6666 14.9993 11.6666C16.1661 11.6666 16.7495 11.6666 17.1952 11.8937C17.5872 12.0935 17.9058 12.4121 18.1056 12.8041C18.3327 13.2498 18.3327 13.8332 18.3327 15Z"
                                stroke="white"
                                stroke-width="1.25"
                              />
                              <path
                                d="M18.3327 8.33333C18.3327 9.50008 18.3327 10.0835 18.1056 10.5292C17.9058 10.9212 17.5872 11.2398 17.1952 11.4396C16.7495 11.6667 16.1661 11.6667 14.9993 11.6667C13.8326 11.6667 13.2492 11.6667 12.8035 11.4396C12.4115 11.2398 12.0928 10.9212 11.8931 10.5292C11.666 10.0835 11.666 9.50008 11.666 8.33333C11.666 7.16656 11.666 6.58317 11.8931 6.13752C12.0928 5.74552 12.4115 5.42681 12.8035 5.22707C13.2492 5 13.8326 5 14.9993 5C16.1661 5 16.7495 5 17.1952 5.22707C17.5872 5.42681 17.9058 5.74552 18.1056 6.13752C18.3327 6.58317 18.3327 7.16656 18.3327 8.33333Z"
                                stroke="white"
                                stroke-width="1.25"
                              />
                              <path
                                d="M11.6667 15C11.6667 16.1667 11.6667 16.7501 11.4396 17.1958C11.2398 17.5878 10.9212 17.9065 10.5292 18.1062C10.0835 18.3333 9.50008 18.3333 8.33333 18.3333C7.16656 18.3333 6.58317 18.3333 6.13752 18.1062C5.74552 17.9065 5.42681 17.5878 5.22707 17.1958C5 16.7501 5 16.1667 5 15C5 13.8332 5 13.2498 5.22707 12.8041C5.42681 12.4121 5.74552 12.0935 6.13752 11.8937C6.58317 11.6666 7.16656 11.6666 8.33333 11.6666C9.50008 11.6666 10.0835 11.6666 10.5292 11.8937C10.9212 12.0935 11.2398 12.4121 11.4396 12.8041C11.6667 13.2498 11.6667 13.8332 11.6667 15Z"
                                stroke="white"
                                stroke-width="1.25"
                              />
                              <path
                                d="M8.33268 4.99996C8.33268 6.16673 8.33268 6.75013 8.10562 7.19577C7.90587 7.58778 7.58717 7.90648 7.19517 8.10623C6.74952 8.33329 6.16612 8.33329 4.99935 8.33329C3.83257 8.33329 3.24918 8.33329 2.80353 8.10622C2.41153 7.90648 2.09282 7.58778 1.89308 7.19577C1.66602 6.75012 1.66602 6.16673 1.66602 4.99996C1.66602 3.83318 1.66602 3.24979 1.89308 2.80414C2.09282 2.41214 2.41153 2.09343 2.80353 1.89369C3.24918 1.66663 3.83257 1.66663 4.99935 1.66663C6.16612 1.66663 6.74952 1.66663 7.19517 1.89369C7.58717 2.09343 7.90587 2.41214 8.10562 2.80414C8.33268 3.24979 8.33268 3.83318 8.33268 4.99996Z"
                                stroke="white"
                                stroke-width="1.25"
                              />
                            </svg>
                          }
                          className="bg-[#848484] rounded-[8px] h-[4rem] w-[15.1rem] text-white text-[12px] font-medium leading-[15px] "
                        >
                          Manage Product
                        </Button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="w-full h-[300px] flex item-center justify-center flex-col">
                  <NoRecord />
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
