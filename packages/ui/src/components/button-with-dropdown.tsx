"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "./button";

interface DropdownWithButtonProps {
  buttonChildren: React.ReactNode;
  dropdownChildren: React.ReactNode;
}

export const DropdownWithButton: React.FC<DropdownWithButtonProps> = ({
  buttonChildren,
  dropdownChildren,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleButtonClick = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div>
      <Button
        prefixIcon
        variant={"primary"}
        size={"large"}
        ref={buttonRef}
        onClick={handleButtonClick}
        aria-expanded={isDropdownOpen}
        aria-haspopup='true'
        className='bg-brand-default hover:bg-brand-default text-black border-brand py-3 px-3 text-[14px] font-medium h-auto capitalize rounded-xl'
      >
        {buttonChildren}
      </Button>

      {isDropdownOpen && (
        <div ref={dropdownRef} className='relative z-50'>
          <ul
            role='menu'
            aria-labelledby='add-vote-button'
            className='dropdown shadow-lg rounded-lg bg-white absolute left-0 top-full w-full text-[14px] list-none py-2'
          >
            {dropdownChildren}
          </ul>
        </div>
      )}
    </div>
  );
};
