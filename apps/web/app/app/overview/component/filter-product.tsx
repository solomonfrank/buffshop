import { Button } from "@buff/ui";
import { RatingStars } from "~/product/components/review";

export const FilterProduct = () => {
  return (
    <div>
      <h3 className="font-bold text-[27px] leading-[32px] mb-[4rem]">
        Role-Playing Games (RPG) - 134 Products found
      </h3>
      <div className="flex flex-wrap gap-[20px]">
        {[1, 2, 3, 4].map((item) => {
          return (
            <div
              key={item}
              className="flex gap-[42px] h-[270px] flex-col basis-[calc(33.33%-13.33px)]  relative"
            >
              <figure className="w-full h-full relative  overflow-hidden">
                <img
                  src="/images/overlay.png"
                  className="w-full absolute h-[270px] object-cover"
                />
                <img
                  src="/images/samplea.png"
                  className="w-full object-cover z-10 "
                />
              </figure>

              <div className="z-30 absolute flex flex-col gap-[10px] w-[80%] mx-auto bottom-5 left-10 ">
                <h3 className="font-bold text-[24px] w-[70%] leading-[29.3px]">
                  Call Of Duty: Black Ops 3
                </h3>
                <div className="flex items-center gap-[10px]">
                  <RatingStars rating={3} className="h-[1.5rem] w-[1.5rem]" />
                  <p className="text-[#95959F] text-[8px] leading-[9.54px]">
                    19 Reviews
                  </p>
                </div>
                <div className="flex items-center gap-[10px]">
                  <h5 className="line-through text-[#95959F] text-[12px] leading-[14.32px] ">
                    ₦25,000.00
                  </h5>
                  <h5 className="text-[16px] leading-[27px] text-[#FFBE0A]">
                    ₦25,000.00
                  </h5>
                </div>
                <Button
                  variant="danger"
                  className="h-[28px] w-[133px] border-none rounded-[8px] font-medium text-[12px] leading-[15px]"
                  prefixIcon={
                    <svg
                      width="17"
                      height="16"
                      viewBox="0 0 17 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M5.83398 10.6667L11.6474 10.1822C13.4664 10.0307 13.8747 9.63333 14.0763 7.81927L14.5007 4"
                        stroke="#141B34"
                        stroke-width="1.25"
                        stroke-linecap="round"
                      />
                      <path
                        d="M4.5 4H15.1667"
                        stroke="#141B34"
                        stroke-width="1.25"
                        stroke-linecap="round"
                      />
                      <path
                        d="M4.49935 14.6667C5.23573 14.6667 5.83268 14.0697 5.83268 13.3333C5.83268 12.597 5.23573 12 4.49935 12C3.76297 12 3.16602 12.597 3.16602 13.3333C3.16602 14.0697 3.76297 14.6667 4.49935 14.6667Z"
                        stroke="#141B34"
                        stroke-width="1.25"
                      />
                      <path
                        d="M11.8333 14.6667C12.5697 14.6667 13.1667 14.0697 13.1667 13.3333C13.1667 12.597 12.5697 12 11.8333 12C11.097 12 10.5 12.597 10.5 13.3333C10.5 14.0697 11.097 14.6667 11.8333 14.6667Z"
                        stroke="#141B34"
                        stroke-width="1.25"
                      />
                      <path
                        d="M5.83398 13.3335H10.5007"
                        stroke="#141B34"
                        stroke-width="1.25"
                        stroke-linecap="round"
                      />
                      <path
                        d="M1.83398 1.3335H2.47798C3.10777 1.3335 3.65674 1.74989 3.80949 2.34345L5.793 10.0512C5.89323 10.4407 5.80745 10.8533 5.55948 11.1746L4.92207 12.0002"
                        stroke="#141B34"
                        stroke-width="1.25"
                        stroke-linecap="round"
                      />
                    </svg>
                  }
                >
                  Add to Cart
                </Button>
              </div>

              <span className="absolute right-[10%] top-[8%]">
                <svg
                  width="22"
                  height="20"
                  viewBox="0 0 22 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M18.4626 1.99415C15.7809 0.349231 13.4404 1.01211 12.0344 2.06801C11.4578 2.50096 11.1696 2.71743 11 2.71743C10.8304 2.71743 10.5422 2.50096 9.9656 2.06801C8.55962 1.01211 6.21909 0.349231 3.53744 1.99415C0.0180688 4.15294 -0.77828 11.2749 7.33953 17.2834C8.88572 18.4278 9.6588 19 11 19C12.3412 19 13.1143 18.4278 14.6605 17.2834C22.7783 11.2749 21.9819 4.15294 18.4626 1.99415Z"
                    stroke="#B8B8B8"
                    stroke-width="1.5"
                    stroke-linecap="round"
                  />
                </svg>
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
