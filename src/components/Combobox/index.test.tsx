// Combobox.test.js
import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Combobox } from "."; // Ajuste o caminho conforme necessário

describe("Combobox", () => {
  const mockOptions = [
    {
      label: "Group 1",
      options: [
        { key: "1", value: "Option 1" },
        { key: "2", value: "Option 2" },
      ],
    },
  ];

  it("renders and toggles the dropdown list", () => {
    render(<Combobox options={mockOptions} />);
    expect(screen.getByText("Select your option")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Select your option"));

    expect(screen.getByText("Option 1")).toBeInTheDocument();
    expect(screen.getByText("Option 2")).toBeInTheDocument();
  });
});
