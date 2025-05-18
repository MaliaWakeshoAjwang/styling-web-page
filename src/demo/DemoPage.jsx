import React, { useState } from "react";
import { palette } from "../colors/palette";
import { TYPOGRAPHY_STYLES } from "../typography/typographyData";
import { COLOR_LOCATIONS, TYPOGRAPHY_LOCATIONS } from "./demoData"; 

// Helper functions to get palette colors by role
function getColor(palette, group, name, theme = "light") {
  const arr = palette[theme][group];
  const color = arr?.find(c => c.name === name);
  return color ? color.hex : "#000";
}

// Helper: get typography style by name
function getType(name) {
  return TYPOGRAPHY_STYLES.find(t => t.name === name) || {};
}

// All demo pages
const demoPages = [
  {
    label: "Landing Page",
    render: (palette, getType) => (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            background: getColor(palette, "utility", "primary bg"),
            minHeight: 500,
            color: getColor(palette, "utility", "primary text"),
            padding: 32,
          }}
        >
          <h1 style={{
            ...getType("Display Large"),
            fontFamily: "var(--font-primary)",
            marginBottom: 8,
          }}>
            Welcome to Your App!
          </h1>
          <p style={{
            ...getType("Body Large"),
            fontFamily: "var(--font-secondary)",
            color: getColor(palette, "utility", "secondary text"),
          }}>
            This is a demo landing page using your design system. <br />
            Every color and text style here is mapped to its intended use case.
          </p>
          <button
          style={{
            ...getType("Label Large"),
            background: getColor(palette, "brand", "primary"),
            color: "#fff",
            border: "none",
            borderRadius: 6,
            padding: "12px 24px",
            marginTop: 32,
            cursor: "pointer",
            fontFamily: "var(--font-primary)",
            width: "30%",
          }}
        >
          Get Started
        </button>
      
          <footer
            style={{
              width: "100%",
              background: getColor(palette, "utility", "primary bg"),
              padding: "24px 0",
              borderTop: "1px solid #eee",
              textAlign: "center",
              marginTop: "auto", // << This makes the footer stick to bottom!
            }}
          >
            <div
              style={{
                ...getType("Body Small"),
                color: getColor(palette, "utility", "secondary text"),
                fontFamily: "var(--font-secondary)",
              }}
            >
              © {new Date().getFullYear()} Your Company Name · All rights reserved.
            </div>
          </footer>
        </div>
      ),
  },
  {
    label: "Card UI",
    render: (palette, getType) => (
      <div
        style={{
          background: getColor(palette, "utility", "secondary bg"),
          minHeight: 500,
          padding: 32,
        }}
      >
        <div style={{
          maxWidth: 400,
          background: getColor(palette, "utility", "primary bg"),
          border: `1px solid ${getColor(palette, "brand", "primary")}`,
          borderRadius: 12,
          boxShadow: "0 4px 24px 0 rgba(50,50,93,0.07)",
          padding: 24,
          margin: "0 auto"
        }}>
          <h2 style={{
            ...getType("Headline Large"),
            color: getColor(palette, "brand", "primary"),
            fontFamily: "var(--font-primary)",
          }}>
            Card Headline
          </h2>
          <p style={{
            ...getType("Body Medium"),
            fontFamily: "var(--font-secondary)",
            color: getColor(palette, "utility", "secondary text"),
            margin: "12px 0",
          }}>
            This card demonstrates secondary backgrounds, primary and secondary text, and brand color for the border.
          </p>
          <button
            style={{
              ...getType("Label Large"),
              background: getColor(palette, "brand", "secondary"),
              color: "#fff",
              border: "none",
              borderRadius: 6,
              padding: "8px 20px",
              cursor: "pointer",
              fontFamily: "var(--font-primary)",
            }}
          >
            Action
          </button>
        </div>
      </div>
    ),
  },
  {
    label: "Alerts & Status",
    render: (palette, getType) => (
      <div style={{ background: getColor(palette, "utility", "primary bg"), minHeight: 400, padding: 32 }}>
        <div style={{
          marginBottom: 16,
          background: getColor(palette, "semantic", "success"),
          color: "#fff",
          padding: 16,
          borderRadius: 6,
          ...getType("Body Medium"),
          fontFamily: "var(--font-secondary)",
        }}>
          Success! This uses the semantic-success color.
        </div>
        <div style={{
          marginBottom: 16,
          background: getColor(palette, "semantic", "error"),
          color: "#fff",
          padding: 16,
          borderRadius: 6,
          ...getType("Body Medium"),
          fontFamily: "var(--font-secondary)",
        }}>
          Error! This uses the semantic-error color.
        </div>
        <div style={{
          marginBottom: 16,
          background: getColor(palette, "semantic", "warning"),
          color: "#202124",
          padding: 16,
          borderRadius: 6,
          ...getType("Body Medium"),
          fontFamily: "var(--font-secondary)",
        }}>
          Warning! This uses the semantic-warning color.
        </div>
        <div style={{
          marginBottom: 16,
          background: getColor(palette, "semantic", "info"),
          color: "#fff",
          padding: 16,
          borderRadius: 6,
          ...getType("Body Medium"),
          fontFamily: "var(--font-secondary)",
        }}>
          Info! This uses the semantic-info color.
        </div>
      </div>
    ),
  },
  // Add more demo pages as needed
];

export default function DemoPage() {
  const [selected, setSelected] = useState(0);

  // Optionally, dynamically inject CSS for font families (for demo only)
  // In real usage, your app would use CSS vars/classes and load fonts globally.

    // Flatten colors from palette.light (or use dark as needed)
    const allColors = Object.entries(palette.light).flatMap(([group, colors]) =>
    colors.map(color => ({
        label: `${group} - ${color.name}`,
        hex: color.hex,
    }))
    );

  return (
    <div>

    <div className="max-w-4xl mx-auto px-4 py-8">

      <h1 className="text-2xl font-bold mb-8">Demo Pages</h1>

      <div className="flex gap-2 mb-6">
        {demoPages.map((p, idx) => (
          <button
            key={p.label}
            className={`py-2 px-4 rounded border ${selected === idx ? "bg-blue-600 text-white" : "bg-gray-100"}`}
            onClick={() => setSelected(idx)}
          >
            {p.label}
          </button>
        ))}
      </div>

      <div className="rounded-lg shadow bg-white">
        {demoPages[selected].render(palette, getType)}
      </div>

    </div>

    <div className="max-w-8xl mx-auto px-4 py-8">

    <h1 className="text-2xl font-bold mb-8">Design System: Roles & Locations</h1>

    <div className="flex flex-col lg:flex-row gap-10">

        {/* Colors Section */}
        <section className="flex-1 bg-white rounded-xl shadow p-4 overflow-auto">

            <h2 className="text-xl font-semibold mb-4">Colors</h2>

            <table className="min-w-full border border-gray-200 text-sm">

            <thead className="bg-gray-50">
                <tr>
                <th className="p-2 border">Swatch</th>
                <th className="p-2 border">Role</th>
                <th className="p-2 border">Location</th>
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
                        {COLOR_LOCATIONS[c.label] || "Not used in demo"}
                        </td>
                    </tr>
                ))}
            </tbody>

            </table>

        </section>

        {/* Typography Section */}
        <section className="flex-1 bg-white rounded-xl shadow p-4 overflow-auto">
  <h2 className="text-xl font-semibold mb-4">Typography</h2>
  <table className="min-w-full border border-gray-200 text-sm" style={{ tableLayout: "fixed" }}>
    <thead className="bg-gray-50">
      <tr>
        <th className="p-2 border w-1/4">Style Name</th>
        <th className="p-2 border w-1/3">Location</th>
        <th className="p-2 border w-1/2">Example</th>
      </tr>
    </thead>
    <tbody>
      {TYPOGRAPHY_STYLES.map(style => {
        const info = TYPOGRAPHY_LOCATIONS[style.name] || {};
        return (
          <tr key={style.name}>
            <td className="border p-2 font-medium w-1/4">{style.name}</td>
            <td className="border p-2 w-1/3">{info.location || "—"}</td>
            <td className="border p-2 w-1/2">
              <span style={{ fontStyle: style.italic ? "italic" : "normal" }}>
                {info.example || "—"}
              </span>
            </td>
          </tr>
        );
      })}
    </tbody>
  </table>
</section>

    </div>

    </div>

    </div>

  );
}