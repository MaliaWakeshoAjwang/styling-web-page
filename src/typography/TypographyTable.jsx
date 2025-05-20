import React from "react";
import { TYPOGRAPHY_STYLES } from "./typographyData";

export default function TypographyTable({ typography, setTypography }) {
  const handleChange = (idx, field, value) => {
    setTypography(prev =>
      prev.map((row, i) => i === idx ? { ...row, [field]: value } : row)
    );
  };

  return (
    <table className="min-w-full border border-gray-200">
      <thead>
        <tr className="bg-gray-100">
          <th className="py-2 px-3 border">Style Name</th>
          <th className="py-2 px-3 border">Font Size</th>
          <th className="py-2 px-3 border">Font Weight</th>
          <th className="py-2 px-3 border">Color</th>
          <th className="py-2 px-3 border">Example</th>
        </tr>
      </thead>
      <tbody>
        {typography.map((style, idx) => (
          <tr key={style.name}>
            <td className="py-2 px-3 border bg-gray-50 font-semibold">{style.name}</td>
            <td className="py-2 px-3 border">
              <input
                type="number"
                value={style.fontSize}
                onChange={e => handleChange(idx, "fontSize", parseInt(e.target.value, 10))}
                className="border rounded px-2 py-1 w-16"
              />
            </td>
            <td className="py-2 px-3 border">
              <input
                type="number"
                value={style.fontWeight}
                onChange={e => handleChange(idx, "fontWeight", parseInt(e.target.value, 10))}
                className="border rounded px-2 py-1 w-16"
              />
            </td>
            <td className="py-2 px-3 border">
              <input
                type="color"
                value={style.color}
                onChange={e => handleChange(idx, "color", e.target.value)}
                className="w-8 h-8"
              />
            </td>
            <td className="py-2 px-3 border" style={{
              fontSize: style.fontSize,
              fontWeight: style.fontWeight,
              color: style.color
            }}>
              Example
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}