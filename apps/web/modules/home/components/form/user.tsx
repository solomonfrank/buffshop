"use client";
import { Button, InputField, Label, showToast } from "@buff/ui";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import {
  ServerResponse,
  useJoinWaitlist,
  WaitListType,
} from "~/home/api/join-waitlist";

const CreatorInputSchema = z.object({
  fullName: z.string().min(3, "Full name is required"),
  referral: z.string().optional(),
  email: z.string().min(2, "Email is required").email("Enter a valid email"),
});

type CreatorInput = z.infer<typeof CreatorInputSchema>;

const options = [
  { id: "selling", label: "Selling", value: "selling" },
  { id: "teaching", label: "Teaching", value: "teaching" },
];
export const User = ({
  userType,
  handleOpenSuccessDrawer,
}: {
  userType: string;
  handleOpenSuccessDrawer: (data: Record<string, string>) => void;
}) => {
  const query = useSearchParams();
  const router = useRouter();

  const referralCode = query.get("referralCode");
  const methods = useForm<CreatorInput>({
    resolver: zodResolver(CreatorInputSchema),
    mode: "onChange",
    defaultValues: {
      referral: referralCode || "",
    },
  });

  const onSuccess = (response: ServerResponse) => {
    showToast(response.message, "success");
    router.push(
      `/wait-list?rank=${response.data.rank}&referral_code=${response.data?.referral_code}&referrals_needed=${response.data?.referrals_needed}`
    );
  };

  const onError = (errorResponse: any) => {
    const serverError = JSON.parse(errorResponse.message);
    showToast(serverError.message, "error");
  };

  const joinwaitlist = useJoinWaitlist({
    onSuccess,
    onError,
  });

  const {
    handleSubmit,

    formState: { errors },
  } = methods;

  const onSubmit = (data: CreatorInput) => {
    const payload: WaitListType = {
      name: data.fullName,
      email: data.email,
      referral: data.referral || "",
      user_type: userType,
      product_category: "",
    };

    joinwaitlist.mutate(payload);
  };
  return (
    <div>
      <div>
        <h3 className="text-[2.7rem] leading-[3.2rem] font-bold mb-[8px]">
          Discover, Learn, Play.
        </h3>
        <p className="text-[#848484] text-[1.4rem] leading-[2rem] font-medium mb-[2.4rem]">
          Get early access to exclusive products and
          <br /> content before anyone else.
        </p>
      </div>

      <div>
        <FormProvider {...methods}>
          <form
            className="flex flex-col gap-[2.4rem]"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div>
              <Controller
                control={methods.control}
                name="fullName"
                render={({ field: { value, onChange } }) => (
                  <>
                    <Label className="text-[1rem] uppercase font-medium leading-[1.6rem] text-[#B8B8B8]">
                      Name
                    </Label>
                    <InputField
                      containerClassName="border-none"
                      name="fullName"
                      type="text"
                      placeholder="Enter your name"
                      value={value}
                      onChange={onChange}
                      className="w-full  overflow-hidden   rounded-[12px] border border-[#333333] bg-transparent  p-4 h-[4.8rem] placeholder:text-[14px] font-medium text-white text-[12px] leading-[2.4rem]"
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
                    <Label className="text-[1rem] uppercase font-medium leading-[1.6rem] text-[#B8B8B8]">
                      Email
                    </Label>
                    <InputField
                      containerClassName="border-none"
                      name="email"
                      type="text"
                      placeholder="Enter email address"
                      value={value}
                      onChange={onChange}
                      className="w-full  overflow-hidden  font-medium  rounded-[12px] border border-[#333333] bg-transparent  p-4 h-[4.8rem] placeholder:text-[14px] text-white text-[12px] leading-[2.4rem]"
                    />
                  </>
                )}
              />
            </div>

            <div>
              <Controller
                control={methods.control}
                name="referral"
                render={({ field: { value, onChange } }) => (
                  <>
                    <Label className="text-[1rem] uppercase font-medium leading-[1.6rem] text-[#B8B8B8]">
                      Referral code (optional)
                    </Label>
                    <InputField
                      name="referral"
                      type="text"
                      placeholder="Enter referral code"
                      value={value}
                      onChange={onChange}
                      className="w-full  overflow-hidden  font-medium  rounded-[12px] border border-[#333333] bg-transparent  p-4 h-[4.8rem] placeholder:text-[14px] text-white text-[12px] leading-[2.4rem]"
                    />
                  </>
                )}
              />
            </div>

            <Button
              type="submit"
              variant="primary"
              size="large"
              loading={joinwaitlist.isPending}
              disabled={joinwaitlist.isPending}
              className="bg-brand-default h rounded-[12px] text-[1.4rem] font-medium leading-[2rem]  h-[4.8rem] text-brand  border-brand w-full hover:text-brand"
            >
              Join the Waitlist
            </Button>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};
