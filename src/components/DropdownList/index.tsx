import { useCallback, useEffect, useRef, useState } from "react";
import { FaCheck } from "react-icons/fa6";

interface ComboboxListProps {
  options: OptionGroups[];
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  activeOption: Option;
  setActiveOption: (option: Option) => void;
}

export interface OptionGroups {
  label: string;
  options: Option[];
}

export interface Option {
  key: string;
  value: string;
}

export function DropdownList({
  options,
  isOpen,
  setIsOpen,
  activeOption,
  setActiveOption,
}: ComboboxListProps) {
  const [focusedOptionIndex, setFocusedOptionIndex] = useState<number | null>(
    null
  );

  const listRef = useRef<(HTMLLIElement | null)[]>([]);
  const flatOptions = options.flatMap((group) => group.options);

  const calculateRef = (
    element: HTMLLIElement | null,
    groupIndex: number,
    optionIndex: number
  ) => {
    // creatre a global index for each option
    const globalIndex =
      options
        .slice(0, groupIndex)
        .reduce((acc, group) => acc + group.options.length, 0) + optionIndex;

    // set the element in the listRef for the global index
    listRef.current[globalIndex] = element;
  };

  const handleSelectOption = useCallback(
    (key: string, value: string) => {
      setActiveOption({ key, value });
      setIsOpen(false);
    },
    [setActiveOption, setIsOpen]
  ); // Dependências vazias significam que esta função nunca muda

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        // caluculate the next index
        setFocusedOptionIndex((prevIndex) =>
          prevIndex === null
            ? 0
            : Math.min(prevIndex + 1, flatOptions.length - 1)
        );
      } else if (e.key === "ArrowUp") {
        // caluculate the previous index
        setFocusedOptionIndex((prevIndex) =>
          prevIndex === null
            ? flatOptions.length - 1
            : Math.max(prevIndex - 1, 0)
        );
      } else if (e.key === "Enter" && focusedOptionIndex !== null) {
        // select the option
        const selectedOption = flatOptions[focusedOptionIndex];
        handleSelectOption(selectedOption.key, selectedOption.value);
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, flatOptions, focusedOptionIndex, handleSelectOption]);

  useEffect(() => {
    if (focusedOptionIndex !== null && listRef.current[focusedOptionIndex]) {
      // focus the element
      listRef.current[focusedOptionIndex]!.focus();
    }
  }, [focusedOptionIndex]);

  return (
    isOpen && (
      <div className="w-full flex flex-col p-3 max-w-xs shadow-2xl rounded-md mt-3">
        {options.map((optionGroup, groupIndex) => (
          <div key={groupIndex}>
            <h3 className="font-bold py-2 px-1 ml-6">{optionGroup.label}</h3>
            <hr />
            <ul>
              {optionGroup.options.map((option, optionIndex) => (
                <li
                  ref={(element) =>
                    calculateRef(element, groupIndex, optionIndex)
                  }
                  key={option.key}
                  className={`p-1 m-1 cursor-pointer flex flex-row items-center rounded-md hover:bg-blue-50 focus:bg-blue-50 ${
                    option.key === activeOption.key && "bg-blue-50"
                  }`}
                  tabIndex={0}
                  onClick={() => {
                    handleSelectOption(option.key, option.value);
                  }}
                >
                  <FaCheck
                    className={
                      option.key === activeOption.key ? "visible" : "invisible"
                    }
                  />
                  <span className="ml-2">{option.value}</span>
                </li>
              ))}
            </ul>
            {groupIndex !== options.length - 1 && <hr />}
          </div>
        ))}
      </div>
    )
  );
}
