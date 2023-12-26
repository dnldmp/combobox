import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { MdOutlineMailOutline } from "react-icons/md";
import { DropdownList, OptionGroups } from "../DropdownList";

interface ComboboxProps {
  options: OptionGroups[];
}

export function Combobox({ options }: ComboboxProps) {
  const [activeOption, setActiveOption] = useState({
    key: "select-your-option",
    value: "Select your option",
  });
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div
        className="w-full max-w-xs p-3 border-gray-400 border rounded-md flex-row flex items-center justify-between cursor-pointer"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <div className="flex flex-row items-center">
          <MdOutlineMailOutline className="text-xl" />
          <span className="ml-2">{activeOption.value}</span>
        </div>

        <IoIosArrowDown />
      </div>

      <DropdownList
        options={options}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        setActiveOption={setActiveOption}
        activeOption={activeOption}
      />
    </>
  );
}
