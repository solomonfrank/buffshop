"use client";
import { Button, InputField, Label, NumberInput } from "@buff/ui";
import { zodResolver } from "@hookform/resolvers/zod";

import { ErrorMessageProps } from "_types";
import classNames from "classnames";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { useProfileStore } from "store/use-edit";
import { z } from "zod";
import { ProfileInputSchema, ProfileUpdateInput } from "../api/update-profile";

export const loginScheme = z.object({
  password: z.string().trim().min(1, { message: "Password is required" }),
  email: z.string().trim().email({ message: "Invalid email address" }),
});

export const EditProfileForm = () => {
  const [isChecked, setIsChecked] = useState<boolean | "indeterminate">(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams?.get("redirectTo");
  const updateUserDetail = useProfileStore((state) => state.updateUserDetail);

  const methods = useForm<ProfileUpdateInput>({
    resolver: zodResolver(ProfileInputSchema),
    mode: "onChange",
  });

  const { register, handleSubmit, formState } = methods;

  const onSubmit = (data: unknown) => {};

  return (
    <FormProvider {...methods}>
      <form
        className="w-full block mb-[1.6rem]"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="mb-[2.4rem]">
          <div className="space-y-4">
            <div>
              <Controller
                control={methods.control}
                name="phone"
                render={({ field: { value, onChange } }) => (
                  <>
                    <Label className="text-[1rem] leading-[16px] inline-block text-[#B8B8B8]">
                      Phone Number
                    </Label>
                    <NumberInput
                      name="phone"
                      placeholder="Enter phone number"
                      thousandSeparator={false}
                      maxLength={11}
                      allowLeadingZeros={true}
                      onChange={(e) => {
                        const value = e.target.value.replace(/,/g, "");
                        onChange(value);
                      }}
                      value={value}
                      allowNegative={false}
                      className=" w-full p-4  h-[4.8rem] placeholder:text-[14px] placeholder:text-[#848484]  text-[16px]"
                    />
                  </>
                )}
              />
            </div>
            <div>
              <Controller
                control={methods.control}
                name="name"
                render={({ field: { value, onChange } }) => (
                  <>
                    <InputField
                      label="Name"
                      value={value}
                      name="name"
                      onChange={onChange}
                      labelProps={{ className: "text-[#B8B8B8]" }}
                      type="text"
                      placeholder="Enter fullname"
                      containerClassName="mb-3"
                      className=" w-full p-4 rounded-lg  h-[4.8rem] placeholder:text-[14px]  text-[16px]"
                    />
                  </>
                )}
              />
            </div>

            <div>
              <Controller
                control={methods.control}
                name="email"
                render={({ field: { value, onChange } }) => (
                  <>
                    <InputField
                      label="Email"
                      name="email"
                      labelProps={{ className: "text-[#B8B8B8]" }}
                      type="email"
                      readOnly
                      placeholder="Enter email address"
                      containerClassName="mb-3"
                      onChange={onChange}
                      value={value}
                      className=" w-full p-4 rounded-lg  h-[4.8rem] placeholder:text-[14px]  text-[16px]"
                    />
                  </>
                )}
              />
            </div>

            <div>
              <Controller
                control={methods.control}
                name="address"
                render={({ field: { value, onChange } }) => (
                  <>
                    <InputField
                      label="contact address"
                      name="business_name"
                      labelProps={{ className: "text-[#B8B8B8]" }}
                      type="text"
                      placeholder="Enter business name"
                      containerClassName="mb-3"
                      className=" w-full p-4 rounded-lg  h-[4.8rem] placeholder:text-[14px]  text-[16px]"
                      onChange={onChange}
                      value={value}
                    />
                  </>
                )}
              />
            </div>
          </div>
        </div>

        <Button
          type="submit"
          variant="danger"
          size="large"
          prefixIcon={
            <svg
              width="21"
              height="20"
              viewBox="0 0 21 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.1887 3.83757L15.0137 3.01258C15.6972 2.32914 16.8053 2.32914 17.4887 3.01258C18.1721 3.69603 18.1721 4.80411 17.4887 5.48756L16.6637 6.31255M14.1887 3.83757L8.63929 9.387C8.21636 9.81 7.91634 10.3398 7.77128 10.9201L7.16797 13.3333L9.58122 12.73C10.1615 12.585 10.6913 12.2849 11.1143 11.862L16.6637 6.31255M14.1887 3.83757L16.6637 6.31255"
                stroke="#171717"
                stroke-width="1.5"
                stroke-linejoin="round"
              />
              <path
                d="M16.3333 11.25C16.3333 13.9895 16.3333 15.3593 15.5767 16.2813C15.4382 16.45 15.2834 16.6048 15.1146 16.7433C14.1927 17.5 12.8228 17.5 10.0833 17.5H9.66667C6.52397 17.5 4.95263 17.5 3.97632 16.5236C3.00002 15.5474 3 13.976 3 10.8333V10.4166C3 7.67706 3 6.30728 3.75662 5.38533C3.89514 5.21654 4.04992 5.06177 4.2187 4.92324C5.14066 4.16663 6.51043 4.16663 9.25 4.16663"
                stroke="#171717"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          }
          className={classNames(
            "rounded-[12px] opacity-30",
            formState.isValid
              ? "bg-brand-default text-brand hover:bg-brand-default opacity-100 "
              : "cursor-not-allowed",
            "w-full"
            // login.isPending && "opacity-60"
          )}
        >
          Edit Details
        </Button>

        {/* {login.isPending && <Loader loading={login.isPending} />} */}
      </form>
    </FormProvider>
  );
};

export const ErrorMessage = ({ message, code }: ErrorMessageProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const timerId = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (ref.current) {
      timerId.current = setTimeout(() => {
        if (ref.current) {
          ref.current.style.display = "none";
        }
      }, 9000);
    }

    () => {
      clearTimeout(timerId.current);
    };
  }, []);
  return (
    <div
      ref={ref}
      className="rounded-md my-7  p-5 bg-red-100 text-red-900 text-[14px] font-medium"
    >
      {message}
    </div>
  );
};
