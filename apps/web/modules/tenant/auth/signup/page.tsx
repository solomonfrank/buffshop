"use client";

import { SignupForm } from "./page-form";

type SignupFlowProps = {
  // stepProps: StepProps;
  nextStep: (index: number) => void;
};

export const SignupFlow = ({ nextStep }: SignupFlowProps) => {
  return (
    <div>
      <SignupForm onClick={nextStep} />
    </div>
  );
};
