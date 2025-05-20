import React from "react";

export default function Tabs({ tabs, selected = 0, onChange }) {
  const [active, setActive] = React.useState(selected);
  React.useEffect(() => { setActive(selected); }, [selected]);
  return (
    <div>
      <div className="flex border-b mb-6">
        {tabs.map((tab, idx) => (
          <button
            key={tab.label}
            className={`py-2 px-4 font-semibold ${
              active === idx ? "border-b-2 border-blue-500 text-blue-600" : "text-gray-500"
            }`}
            onClick={() => { setActive(idx); onChange && onChange(idx); }}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div>{tabs[active]?.content}</div>
    </div>
  );
}