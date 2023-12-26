import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { DropdownList } from ".";

describe("ComboboxList", () => {
  const mockOptions = [
    {
      label: "Group 1",
      options: [
        { key: "1", value: "Option 1" },
        { key: "2", value: "Option 2" },
      ],
    },
    {
      label: "Group 2",
      options: [{ key: "3", value: "Option 3" }],
    },
  ];

  const mockActiveOption = { key: "1", value: "Option 1" };

  it("renders options correctly", () => {
    const setActiveOption = jest.fn();
    const setIsOpen = jest.fn();

    const { getByText } = render(
      <DropdownList
        options={mockOptions}
        isOpen={true}
        setActiveOption={setActiveOption}
        activeOption={mockActiveOption}
        setIsOpen={setIsOpen}
      />
    );

    expect(getByText("Option 1")).toBeInTheDocument();
    expect(getByText("Option 2")).toBeInTheDocument();
    expect(getByText("Option 3")).toBeInTheDocument();
  });

  it("calls setActiveOption and setIsOpen on option click", () => {
    const setActiveOption = jest.fn();
    const setIsOpen = jest.fn();

    const { getByText } = render(
      <DropdownList
        options={mockOptions}
        isOpen={true}
        setActiveOption={setActiveOption}
        activeOption={mockActiveOption}
        setIsOpen={setIsOpen}
      />
    );

    fireEvent.click(getByText("Option 2"));

    expect(setActiveOption).toHaveBeenCalledWith({
      key: "2",
      value: "Option 2",
    });
    expect(setIsOpen).toHaveBeenCalledWith(false);
  });
});
