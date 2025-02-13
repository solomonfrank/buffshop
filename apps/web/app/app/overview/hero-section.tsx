import { Button } from "@buff/ui";

const HeroSection = () => {
  return (
    <section className="flex w-full gap-[22px] relative h-[479px]">
      <div className="flex  pt-[45px] gap-[42px] flex-col basis-[calc(33.33%-14.67px)]  relative">
        <div>
          <h5 className=" mb-[12px] text-[44px] leading-[34px] tracking-[0.38px] font-thin">
            Discover and enjoy the ultimate gaming experience.
          </h5>
          <Button
            variant="danger"
            className="h-[4rem] w-[189px] rounded-[8px] border-none"
            suffixIcon={
              <svg
                width="21"
                height="20"
                viewBox="0 0 21 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14.25 6.25L5.5 15"
                  stroke="#171717"
                  stroke-width="1.25"
                  stroke-linecap="round"
                />
                <path
                  d="M7.16602 5.15659C7.16602 5.15659 13.8726 4.59124 14.8903 5.60899C15.9082 6.62674 15.3427 13.3333 15.3427 13.3333"
                  stroke="#171717"
                  stroke-width="1.25"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            }
          >
            View all categories
          </Button>
        </div>
        <figure className="w-full h-[232px] relative rounded-[4rem] overflow-hidden">
          <img
            src="/images/masksmall.png"
            className="w-full absolute h-full object-cover"
          />
          <img
            src="/images/hero-car.png"
            className="w-full h-full object-cover z-10 "
          />
          <div className="absolute flex flex-col justify-center bottom-[15%] left-10 w-full">
            <h1 className="text-white text-[44px] leading-[34px] tracking-[0.38px] font-medium">
              Racing
            </h1>
            <p className="text-[12px] leading-[20px] font-thin w-[221px]">
              Experience the rush of the open road with our immersive racing
              games.
            </p>

            <Button
              variant="icon"
              className="w-[82px] absolute  right-[10%] h-[82px] rounded-full bg-[#FFBE0A] border-none outline-none"
            >
              <svg
                width="48"
                height="48"
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M33 15L12 36"
                  stroke="#141B34"
                  stroke-width="1.5"
                  stroke-linecap="round"
                />
                <path
                  d="M16 12.3758C16 12.3758 32.0958 11.019 34.5384 13.4616C36.9812 15.9042 35.624 32 35.624 32"
                  stroke="#141B34"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </Button>
          </div>
        </figure>
      </div>
      <div className="flex  gap-[42px] flex-col basis-[calc(33.33%-14.67px)]  relative">
        <figure className="w-full h-full relative rounded-[4rem] overflow-hidden">
          <img
            src="/images/maskp.png"
            className="w-full absolute h-full object-cover"
          />
          <img
            src="/images/hero-ac.png"
            className="w-full h-full object-cover z-10 "
          />
          <div className="absolute flex flex-col justify-center bottom-[15%] left-10 w-full">
            <h1 className="text-white text-[44px] leading-[34px] tracking-[0.38px] font-medium">
              Action
            </h1>
            <p className="text-[12px] leading-[20px] font-thin w-[221px]">
              Find fast-paced shooters, thrilling adventures, and intense
              combat.
            </p>

            <Button
              variant="icon"
              className="w-[82px] absolute  right-[10%] h-[82px] rounded-full bg-[#FFBE0A] border-none outline-none"
            >
              <svg
                width="48"
                height="48"
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M33 15L12 36"
                  stroke="#141B34"
                  stroke-width="1.5"
                  stroke-linecap="round"
                />
                <path
                  d="M16 12.3758C16 12.3758 32.0958 11.019 34.5384 13.4616C36.9812 15.9042 35.624 32 35.624 32"
                  stroke="#141B34"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </Button>
          </div>
        </figure>
      </div>
      <div className="flex  gap-[42px] flex-col basis-[calc(33.33%-14.67px)]  relative">
        <figure className="w-full h-full relative rounded-[4rem] overflow-hidden">
          <img
            src="/images/maskp.png"
            className="w-full absolute h-full object-cover"
          />
          <img
            src="/images/hero-ac2.png"
            className="w-full h-full object-cover z-10 "
          />
          <div className="absolute flex flex-col justify-center bottom-[15%] left-10 w-full">
            <h1 className="text-white text-[44px] leading-[34px] tracking-[0.38px] font-medium">
              Adventure
            </h1>
            <p className="text-[12px] leading-[20px] font-thin w-[221px]">
              Embark on epic quests, explore fantastical worlds, and uncover
              hidden secrets.
            </p>

            <Button
              variant="icon"
              className="w-[82px] absolute  right-[10%] h-[82px] rounded-full bg-[#FFBE0A] border-none outline-none"
            >
              <svg
                width="48"
                height="48"
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M33 15L12 36"
                  stroke="#141B34"
                  stroke-width="1.5"
                  stroke-linecap="round"
                />
                <path
                  d="M16 12.3758C16 12.3758 32.0958 11.019 34.5384 13.4616C36.9812 15.9042 35.624 32 35.624 32"
                  stroke="#141B34"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </Button>
          </div>
        </figure>
      </div>
    </section>
  );
};

export default HeroSection;
