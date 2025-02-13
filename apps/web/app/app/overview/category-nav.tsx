// components/CategoriesNav.js
"use client";
import { CustomSelect } from "@buff/ui";
import { FaCaretRight } from "react-icons/fa";
const categories = [
  "Action",
  "Adventure",
  "Role-Playing Games (RPG)",
  "Simulation",
  "Strategy",
  "Sports",
  "Fighting",
  "Puzzle",
  "Racing",
  "Horror",
  "Party Games",
  "Casual",
  "Sandbox",
];

const CategoriesNav = () => {
  return (
    <nav className="flex items-center  bg-[#282828] overflow-hidden h-[48px] pr-[8rem]">
      <div className="bg-[#343333] relative px-[20px] w-[164px] items-center h-full text-white flex justify-end">
        <span className="text-[12px] leading-[18px]">All Categories</span>
        <span className="absolute flex items-center justify-center right-[-20%] top-0 ">
          <FaCaretRight color="#343333" size={50} />
        </span>
      </div>
      <div className="flex space-x-6 ml-[20px] mr-auto">
        {categories.map((category, index) => (
          <button
            key={index}
            className={`px-3 py-1 text-[12px] leading-[18px] font-medium border-r border-[#848484] ${
              category === "All Categories"
                ? "text-white border-b-2 border-yellow-500" // Active category
                : "text-[#B8B8B8] hover:text-white  transition"
            }`}
          >
            {category}
          </button>
        ))}
      </div>
      <div>
        <CustomSelect
          name="from"
          placeholder="View All"
          options={[
            {
              label: "Console Game",
              value: "category",
            },
            {
              label: "Console Game",
              value: "category1",
            },
          ]}
          // value={value}
          onChange={(e) => {
            //  onChange(e);
          }}
          styles={{
            menuList: (provided) => ({
              ...provided,
              color: "#fff",
              fontSize: "1.4rem",
              background: "#333333",
              ":hover": {
                borderColor: "#000",
              },
            }),
            option: (provided, state) => ({
              ...provided,
              backgroundColor: state.isSelected ? "#FFBE0A" : "#333333",
              color: "white",

              cursor: "pointer",
              "&:hover": {
                backgroundColor: state.isSelected ? "#FFBE0A" : "#333333",
              },
            }),
            singleValue: (provided) => ({
              ...provided,
              fontSize: "1.2rem",
              lineHeight: "2.4rem",
              fontWeight: 500,
              color: "#fff",
            }),
            placeholder: (provided) => ({
              ...provided,
              fontSize: "1.2rem",
            }),
            control: (provided, state) => ({
              ...provided,
              minHeight: "4rem",
              borderColor: "#171717",
              boxShadow: "none",
              borderRadius: "8px",
              background: "#171717",
              flexShrink: 0,
              color: "#fff",

              ":hover": {
                borderColor: "#171717",
              },

              ":active": {
                borderColor: "#171717",
                color: "#fff",
              },
            }),
          }}
        />
      </div>
    </nav>
  );
};

export default CategoriesNav;
