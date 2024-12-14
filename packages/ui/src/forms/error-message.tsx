"use client";

import { useFormContext } from "react-hook-form";
import { MdOutlineWarning } from "react-icons/md";

export const ErrorMessageComponent = ({ message }: { message: string }) => {
  return (
    <div className="text-red-900 flex space-x-1 gap-1 text-left text-[10px] mt-1">
      <span className="flex items-center">
        <MdOutlineWarning className="text-red-900" />
      </span>
      <span>{message}</span>
    </div>
  );
};

type ErrorMessageProps = {
  fieldName: string;
};

export const ErrorMessage = ({ fieldName }: ErrorMessageProps) => {
  const method = useFormContext();

  if (!method) return null;
  const { formState } = method;

  const error = formState.errors[fieldName];

  if (error?.message) {
    return <ErrorMessageComponent message={error.message as string} />;
  }

  if (error && !error?.message) {
    {
      return Object.keys(error).map((rule, idx) => {
        const ruleObj = error[rule as keyof typeof error] as {
          message: string;
        };

        return (
          <div
            key={idx}
            className="text-red-900 flex space-x-1 text-center text-[10px] mt-1"
          >
            <span className="flex items-center">
              <MdOutlineWarning className="text-red-900 h-5 w-5" />
            </span>
            <span>{ruleObj?.message ?? ""}</span>
          </div>
        );
      });
    }
  }
};
