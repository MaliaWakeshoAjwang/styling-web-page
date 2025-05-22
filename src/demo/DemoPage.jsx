// src/demo/DemoPage.jsx
import { useState } from "react";
import { PALETTE_STYLES as palette } from "../colors/colorData";
import { TYPOGRAPHY_STYLES } from "../typography/typographyData";

// Utility: get a color value from the palette
function getColor(palette, group, name, theme = "light") {
  const arr = palette[theme][group];
  const color = arr?.find(c => c.name === name);
  return color ? color.hex : "#000";
}

// Utility: get a typography style by name
function getType(name) {
  return TYPOGRAPHY_STYLES.find(t => t.name === name) || {};
}

// Demo page definitions
const demoPages = [
  {
    label: "Landing Page",
    render: (palette, getType) => (
      <div
        style={{
          background: getColor(palette, "utility", "primary bg"),
          minHeight: 500,
          color: getColor(palette, "utility", "primary text"),
          padding: 32,
          borderRadius: 12,
        }}
      >
        <h1 style={{
          ...getType("Display Large"),
          fontFamily: "var(--font-primary)",
          marginBottom: 12,
        }}>
          Welcome to Your App!
        </h1>
        <p style={{
          ...getType("Body Large"),
          fontFamily: "var(--font-secondary)",
          color: getColor(palette, "utility", "secondary text"),
        }}>
          This is a demo landing page using your design system.<br />
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
            marginTop: 60,
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
    label: "Card Example",
    render: (palette, getType) => (
      <div
        style={{
          background: getColor(palette, "utility", "secondary bg"),
          color: getColor(palette, "utility", "primary text"),
          border: `2px solid ${getColor(palette, "brand", "tertiary")}`,
          borderRadius: 16,
          padding: 40,
          maxWidth: 420,
          margin: "40px auto",
        }}
      >
        <h2 style={{
          ...getType("Headline Large"),
          fontFamily: "var(--font-primary)",
          marginBottom: 8,
        }}>Demo Card Headline</h2>
        <div
          style={{
            ...getType("Body Medium"),
            fontFamily: "var(--font-secondary)",
            marginBottom: 24,
          }}
        >
          This card demonstrates secondary backgrounds and brand color for the border. Edit your palette to see changes!
        </div>
        <button
          style={{
            ...getType("Label Medium"),
            background: getColor(palette, "brand", "secondary"),
            color: "#fff",
            border: "none",
            borderRadius: 6,
            padding: "8px 20px",
            fontFamily: "var(--font-primary)",
            fontWeight: 700,
          }}
        >
          Learn More
        </button>
      </div>
    ),
  },
  {
    label: "Banner Example",
    render: (palette, getType) => (
      <div
        style={{
          background: getColor(palette, "brand", "tertiary"),
          color: "#fff",
          borderRadius: 10,
          padding: "36px 24px",
          textAlign: "center",
          margin: "0 auto",
          maxWidth: 800,
        }}
      >
        <div
          style={{
            ...getType("Display Medium"),
            fontFamily: "var(--font-primary)",
            fontWeight: 700,
            fontSize: 36,
            letterSpacing: 0.5,
            marginBottom: 6,
            color: "#fff",
          }}
        >
          Design for everyone
        </div>
        <div
          style={{
            ...getType("Body Medium"),
            fontFamily: "var(--font-secondary)",
          }}
        >
          This is a banner using your brand tertiary color and display medium typography.
        </div>
      </div>
    ),
  },
];

export default function DemoPage() {
  const [selected, setSelected] = useState(0);

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex gap-4 mb-8">
        {demoPages.map((page, idx) => (
          <button
            key={page.label}
            onClick={() => setSelected(idx)}
            className={`px-4 py-2 rounded font-semibold transition border 
              ${selected === idx
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-gray-100 text-gray-700 border-gray-200 hover:bg-blue-100"}`}
          >
            {page.label}
          </button>
        ))}
      </div>
      <div>{demoPages[selected].render(palette, getType)}</div>
    </div>
  );
}