import AccordionDemo from "./faq-accordion";

export const Faq = () => {
  return (
    <div className="bg-[#171717] relative">
      <figure className="absolute top-[401.78px] left-[4rem]">
        <img src="/images/rocketleft.png" />
      </figure>

      <div className="flex items-center flex-col mt-[9rem] gap-[4.4rem]">
        <h4 className="font-bold text-[4.8rem] text-center leading-[5.4rem] text-white">
          Frequently Asked <br />
          Questions
        </h4>

        <div>
          <AccordionDemo />
        </div>
      </div>

      {/* <span className="absolute top-[401.78px] right-0">
        <RocketRight />
      </span> */}
      <figure className="absolute top-[401.78px] right-[4rem]">
        <img src="/images/rocketright.png" />
      </figure>
    </div>
  );
};
