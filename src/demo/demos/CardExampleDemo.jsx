// src/demo/demos/CardExampleDemo.jsx
import { getColor, getType } from "../demoUtils";

export default function CardExampleDemo({ palette, styles, fonts }) {
  return (
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
        ...getType(styles, "Headline Large"),
        fontFamily: fonts.primaryFont,
        marginBottom: 8,
      }}>Demo Card Headline</h2>
      <div
        style={{
          ...getType(styles, "Body Medium"),
          fontFamily: fonts.secondaryFont,
          marginBottom: 24,
        }}
      >
        This card demonstrates secondary backgrounds and brand color for the border. Edit your palette to see changes!
      </div>
      <button
        style={{
          ...getType(styles, "Label Medium"),
          background: getColor(palette, "brand", "secondary"),
          color: getColor(palette, "utility", "primary text"),
          border: "none",
          borderRadius: 6,
          padding: "8px 20px",
          fontFamily: fonts.primaryFont,
          fontWeight: 700,
        }}
      >
        Learn More
      </button>
    </div>
  );
}