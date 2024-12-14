import { FunctionComponent } from "react";
import { BackButton } from "./back-button";
import { Heading } from "./heading";

interface PageHeaderProps {
  headingText?: string;
  backPath: string;
  onBackButtonClick: () => void;
}

export const PageHeader: FunctionComponent<PageHeaderProps> = ({
  headingText,
  backPath,
  onBackButtonClick,
}) => {
  return (
    <section className=' relative flex sm:flex-row flex-col gap-y-12 items-center justify-center mb-[3.1rem] mt-[5rem]'>
      {backPath && (
        <BackButton
          buttonText='Go back'
          onClick={onBackButtonClick}
          className='text-solid'
        />
      )}

      {headingText ? (
        <Heading headingText={headingText} />
      ) : (
        <div className='animate-pulse relative h-14 block bg-gray-300 mb-4 w-1/3'></div>
      )}
    </section>
  );
};
