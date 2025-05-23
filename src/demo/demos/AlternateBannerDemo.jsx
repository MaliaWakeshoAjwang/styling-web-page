// src/demo/demos/BrandAlternateBannerDemo.jsx
import { getColor, getType } from "../demoUtils";

export default function AlternateBannerDemo({ palette, styles, fonts }) {
  return (
    <div
      style={{
        background: getColor(palette, "brand", "alternate"),
        borderRadius: 13,
        padding: "36px 0",
        margin: "40px auto 0",
        textAlign: "center",
        maxWidth: 700,
        color: getColor(palette, "utility", "primary text"),
      }}
    >
      <div
        style={{
          ...getType(styles, "Headline Small"),
          fontFamily: fonts.primaryFont,
          marginBottom: 8,
        }}
      >
        Try our new feature!
      </div>
      <div
        style={{
          ...getType(styles, "Label Small"),
          fontFamily: fonts.secondaryFont,
        }}
      >
        This banner uses the Brand Alternate color from your palette.
      </div>
    </div>
  );
}