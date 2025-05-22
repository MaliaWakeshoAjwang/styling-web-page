// src/demo/demos/BannerExampleDemo.jsx
import { getColor, getType } from "../demoUtils";

export default function BannerExampleDemo({ palette, styles, fonts }) {
  return (
    <div
      style={{
        background: getColor(palette, "brand", "tertiary"),
        color: getColor(palette, "utility", "primary text"),
        borderRadius: 10,
        padding: "36px 24px",
        textAlign: "center",
        margin: "0 auto",
        maxWidth: 800,
      }}
    >
      <div
        style={{
          ...getType(styles, "Display Medium"),
          fontFamily: fonts.primaryFont,
          fontWeight: 700,
          fontSize: 36,
          letterSpacing: 0.5,
          marginBottom: 6,
          color: getColor(palette, "utility", "primary text"),
        }}
      >
        Design for everyone
      </div>
      <div
        style={{
          ...getType(styles, "Body Medium"),
          fontFamily: fonts.secondaryFont,
        }}
      >
        This is a banner using your brand tertiary color and display medium typography.
      </div>
    </div>
  );
}