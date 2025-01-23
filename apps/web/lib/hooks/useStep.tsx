"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

export const useSetStep = (tabName: string = "step") => {
  const router = useRouter();
  const searchParams = useSearchParams().toString();
  const pathname = usePathname();
  const setStep = (newStep: string = "1") => {
    const _searchParams = new URLSearchParams(searchParams ?? undefined);
    _searchParams.set(tabName, newStep.toString());
    router.replace(`${pathname}?${_searchParams.toString()}`);
  };
  return setStep;
};
