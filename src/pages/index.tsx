import { Combobox } from "@/components/Combobox";

export default function Home() {
  const optionGroups = [
    {
      label: "Online software",
      options: [
        { value: "ADP", key: "adp" },
        { value: "Gusto", key: "gusto" },
        { value: "Paychex", key: "paychex" },
        { value: "QuickBooks Online", key: "quickbooks-online" },
        { value: "Zenefits", key: "zenefits" },
      ],
    },
    {
      label: "Desktop software",
      options: [{ value: "QuickBooks Desktop", key: "quickbooks-desktop" }],
    },
  ];

  return (
    <div className="w-full max-w-screen-xl mx-auto p-5">
      <Combobox options={optionGroups} />
    </div>
  );
}
