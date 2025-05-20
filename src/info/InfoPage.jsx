// src/info/InfoPage.jsx

import React from "react";
import { PALETTE_STYLES as palette } from "../colors/colorData";
import { getAllColorsFromPalette } from "../colors/colorUtils";
import { COLOR_USE_CASES } from "../colors/colorData";
import { TYPOGRAPHY_STYLES, TYPOGRAPHY_USE_CASES } from "../typography/TypographyData";

export default function InfoPage() {
  // Get all colors from both light and dark palettes (no duplicates)
  const allColors = getAllColorsFromPalette(palette);

  return (
    <div className="max-w-8xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">Design System: Roles & Use Cases</h1>
      <div className="flex flex-col lg:flex-row gap-10">
        {/* Colors Section */}
        <section className="flex-1 bg-white rounded-xl shadow p-4 overflow-auto">
          <h2 className="text-xl font-semibold mb-4">Colors</h2>
          <table className="min-w-full border border-gray-200 text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-2 border">Swatch</th>
                <th className="p-2 border">Role</th>
                <th className="p-2 border">Use Case</th>
              </tr>
            </thead>
            <tbody>
              {allColors.map(c => (
                <tr key={c.label}>
                  <td className="border p-2">
                    <span
                      style={{
                        background: c.hex,
                        display: "inline-block",
                        width: 24,
                        height: 24,
                        borderRadius: 4,
                        border: "1px solid #ccc",
                      }}
                      title={c.hex}
                    />
                  </td>
                  <td className="border p-2 font-medium">{c.label}</td>
                  <td className="border p-2">
                    {COLOR_USE_CASES[c.label] || "No description."}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
        {/* Typography Section */}
        <section className="flex-1 bg-white rounded-xl shadow p-4 overflow-auto">
          <h2 className="text-xl font-semibold mb-4">Typography</h2>
          <table className="min-w-full border border-gray-200 text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-2 border">Style Name</th>
                <th className="p-2 border">Use Case</th>
              </tr>
            </thead>
            <tbody>
              {TYPOGRAPHY_STYLES.map(style => (
                <tr key={style.name}>
                  <td className="border p-2 font-medium">{style.name}</td>
                  <td className="border p-2">
                    {TYPOGRAPHY_USE_CASES[style.name] || "No description."}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>
    </div>
  );
}