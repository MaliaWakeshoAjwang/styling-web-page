// src/demo/demos/LandingPageDemo.jsx
import { getColor, getType } from "../demoUtils";

export default function LandingPageDemo({ palette, styles, fonts }) {
  return (
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
        ...getType(styles, "Display Large"),
        fontFamily: fonts.primaryFont,
        marginBottom: 12,
      }}>
        Welcome to Your App!
      </h1>
      <p style={{
        ...getType(styles, "Body Large"),
        fontFamily: fonts.secondaryFont,
        color: getColor(palette, "utility", "secondary text"),
      }}>
        This is a demo landing page using your design system.<br />
        Every color and text style here is mapped to its intended use case.
      </p>
      <button
        style={{
          ...getType(styles, "Label Large"),
          background: getColor(palette, "brand", "primary"),
          color: getColor(palette, "utility", "primary text"),
          border: "none",
          borderRadius: 6,
          padding: "12px 24px",
          marginTop: 32,
          cursor: "pointer",
          fontFamily: fonts.primaryFont,
        }}
      >
        Get Started
      </button>
      <footer
        style={{
          width: "100%",
          background: getColor(palette, "utility", "primary bg"),
          padding: "24px 0",
          borderTop: `1px solid ${getColor(palette, "utility", "secondary bg")}`,
          textAlign: "center",
          marginTop: 60,
        }}
      >
        <div
          style={{
            ...getType(styles, "Body Small"),
            color: getColor(palette, "utility", "secondary text"),
            fontFamily: fonts.secondaryFont,
          }}
        >
          © {new Date().getFullYear()} Your Company Name · All rights reserved.
        </div>
      </footer>
    </div>
  );
}