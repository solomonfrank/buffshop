import { InputField } from "@buff/ui";
import * as Checkbox from "@radix-ui/react-checkbox";
// import { CheckIcon } from "lucide-react";
import React from "react";

type CategoryType = {
  id: string;
  label: string;
  checked: boolean;
};

type SocialLinkType = {
  id: number;
  url: string;
};

const ProductCategories = () => {
  const [categories, setCategories] = React.useState<CategoryType[]>([
    { id: "action", label: "Action", checked: true },
    { id: "adventure", label: "Adventure", checked: true },
    { id: "rpg", label: "Role-Playing Games (RPG)", checked: false },
    { id: "simulation", label: "Simulation", checked: false },
    { id: "strategy", label: "Strategy", checked: false },
    { id: "sports", label: "Sports", checked: false },
    { id: "fighting", label: "Fighting", checked: false },
    { id: "puzzle", label: "Puzzle", checked: false },
    { id: "racing", label: "Racing", checked: true },
    { id: "horror", label: "Horror", checked: false },
    { id: "party", label: "Party Games", checked: true },
    { id: "casual", label: "Casual", checked: false },
    { id: "sandbox", label: "Sandbox", checked: false },
    { id: "music", label: "Music/Rhythm", checked: false },
    { id: "educational", label: "Educational Games", checked: true },
    { id: "card", label: "Card Games", checked: false },
    { id: "vr", label: "Virtual Reality (VR)", checked: false },
    { id: "ar", label: "Augmented Reality (AR)", checked: false },
    { id: "indie", label: "Indie Games", checked: false },
  ]);

  const [socialLinks, setSocialLinks] = React.useState<SocialLinkType[]>([
    { id: 1, url: "instagram.com/legendgames" },
    { id: 2, url: "facebook.com/legendgames007" },
  ]);

  const handleCategoryChange = (categoryId: string) => {
    setCategories(
      categories.map((cat) =>
        cat.id === categoryId ? { ...cat, checked: !cat.checked } : cat
      )
    );
  };

  const handleDeleteLink = (id: number) => {
    setSocialLinks((links) => links.filter((link) => link.id !== id));
  };

  const addNewLink = () => {
    const newId = Math.max(0, ...socialLinks.map((link) => link.id)) + 1;
    setSocialLinks([...socialLinks, { id: newId, url: "" }]);
  };

  return (
    <div>
      <div className="mb-8">
        <h3 className=" mb-[2rem] text-[16px] leading-[24px] text-[#848484] border-b border-[#848484]">
          Product Categories
        </h3>
        <div className="grid grid-cols-2 gap-x-8 gap-y-6">
          {categories.map((category) => (
            <div key={category.id} className="flex items-center gap-5">
              <Checkbox.Root
                //   className="h-6 w-6 rounded-full relative"
                checked={category.checked}
                onCheckedChange={() => handleCategoryChange(category.id)}
                id={category.id}
              >
                {category.checked ? (
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M11.625 1.125C9.5483 1.125 7.51823 1.74081 5.79152 2.89457C4.0648 4.04832 2.71899 5.6882 1.92427 7.60682C1.12955 9.52545 0.921614 11.6366 1.32676 13.6734C1.7319 15.7102 2.73193 17.5812 4.20038 19.0496C5.66883 20.5181 7.53975 21.5181 9.57655 21.9232C11.6134 22.3284 13.7246 22.1205 15.6432 21.3257C17.5618 20.531 19.2017 19.1852 20.3554 17.4585C21.5092 15.7318 22.125 13.7017 22.125 11.625C22.125 8.84023 21.0188 6.16951 19.0496 4.20038C17.0805 2.23125 14.4098 1.125 11.625 1.125ZM17.3276 7.59879L10.7886 15.0755C10.7547 15.1141 10.7129 15.1451 10.6661 15.1663C10.6193 15.1875 10.5685 15.1986 10.5171 15.1986C10.4375 15.1994 10.3599 15.174 10.2962 15.1262L5.97673 11.8024C5.93893 11.7734 5.90721 11.7372 5.88339 11.696C5.85956 11.6547 5.8441 11.6092 5.83788 11.5619C5.83166 11.5147 5.83481 11.4667 5.84714 11.4207C5.85947 11.3746 5.88074 11.3315 5.90975 11.2937C5.93875 11.2559 5.97492 11.2242 6.01618 11.2004C6.05744 11.1765 6.10299 11.1611 6.15023 11.1549C6.19746 11.1486 6.24546 11.1518 6.29149 11.1641C6.33751 11.1764 6.38065 11.1977 6.41845 11.2267L10.4664 14.3441L16.7809 7.10276C16.8122 7.06686 16.8504 7.03749 16.8931 7.01634C16.9358 6.99518 16.9823 6.98265 17.0299 6.97945C17.0775 6.97626 17.1252 6.98247 17.1704 6.99772C17.2156 7.01298 17.2573 7.03698 17.2932 7.06836C17.3291 7.09974 17.3585 7.13789 17.3796 7.18062C17.4008 7.22335 17.4133 7.26983 17.4165 7.3174C17.4197 7.36497 17.4135 7.41271 17.3982 7.45789C17.383 7.50306 17.359 7.54479 17.3276 7.58069V7.59879Z"
                      fill="#FFBE0A"
                    />
                  </svg>
                ) : (
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="12" cy="12" r="11.5" stroke="#848484" />
                  </svg>
                )}
                {/* <div
                  className={`absolute inset-0 rounded-full border ${
                    category.checked
                      ? "bg-yellow-500 border-yellow-500"
                      : "border-gray-600 bg-transparent"
                  }`}
                /> */}
              </Checkbox.Root>
              <label
                className="ml-2 text-[16px] leading-[24px]"
                htmlFor={category.id}
              >
                {category.label}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className=" mb-[2rem] text-[16px] leading-[24px] text-[#848484] border-b border-[#848484]">
          Business Social Media Links
        </h3>
        {socialLinks.map((link) => (
          <div key={link.id} className="flex relative  mb-[12px] gap-[20px]">
            <div className="w-[80%]">
              <InputField
                name="name"
                labelProps={{ className: "text-[#B8B8B8]" }}
                type="text"
                onChange={(e) => {
                  setSocialLinks((links) =>
                    links.map((l) =>
                      l.id === link.id ? { ...l, url: e.target.value } : l
                    )
                  );
                }}
                value={link.url}
                className=" w-full p-4 rounded-lg  h-[4.8rem] placeholder:text-[14px]  text-[16px]"
              />
            </div>

            <span
              className="absolute  cursor-pointer flex right-[70px] top-[10px] items-center justify-center mt-[1px]"
              onClick={() => handleDeleteLink(link.id)}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="12" cy="12" r="12" fill="#E12827" />
                <path
                  d="M17 7.6665L16.7321 12.004M7 7.6665L7.40307 14.3497C7.5063 16.0613 7.55792 16.9171 7.98579 17.5325C8.19733 17.8368 8.46987 18.0936 8.78603 18.2866C9.23357 18.5598 9.78739 18.6419 10.6667 18.6665"
                  stroke="white"
                  stroke-width="1.25"
                  stroke-linecap="round"
                />
                <path
                  d="M17.3346 14L12.668 18.6663M17.3346 18.6667L12.668 14.0003"
                  stroke="white"
                  stroke-width="1.25"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M6 7.66683H18M14.7038 7.66683L14.2487 6.72798C13.9464 6.10434 13.7952 5.79251 13.5345 5.59804C13.4767 5.5549 13.4154 5.51652 13.3513 5.4833C13.0626 5.3335 12.7161 5.3335 12.023 5.3335C11.3125 5.3335 10.9573 5.3335 10.6638 5.48958C10.5987 5.52417 10.5367 5.5641 10.4782 5.60894C10.2144 5.8113 10.0671 6.13453 9.77241 6.781L9.36861 7.66683"
                  stroke="white"
                  stroke-width="1.25"
                  stroke-linecap="round"
                />
              </svg>
            </span>
          </div>
        ))}
        <button
          onClick={addNewLink}
          className="text-[12px] text-[#848484] leading-[24px] mt-2"
        >
          + Add New Business Social Media Link
        </button>
      </div>
    </div>
  );
};

export default ProductCategories;
