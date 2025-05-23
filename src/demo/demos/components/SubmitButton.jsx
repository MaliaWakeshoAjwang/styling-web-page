import { getColor } from "../../demoUtils";

export default function SubmitButton({ palette, styles, fonts, children = "Submit", style = {}, ...props }) {
  const type = (styles || []).find(s => s.name === "Label Small") || {};

  // Font family fallback logic
  const fontFamily =
    fonts?.[type.fontFamily === "Primary Family" ? "primaryFont" : "secondaryFont"] ||
    type.fontFamily ||
    "sans-serif";

  // Set disabled styling if needed
  const isDisabled = props.disabled;

  return (
    <button
      type="submit"
      style={{
        ...type,
        background: isDisabled
          ? getColor(palette, "utility", "secondary bg")
          : getColor(palette, "brand", "primary"),
        color: isDisabled
          ? getColor(palette, "utility", "secondary text")
          : getColor(palette, "utility", "primary text"),
        border: "none",
        borderRadius: 5,
        padding: "10px 32px",
        cursor: isDisabled ? "not-allowed" : "pointer",
        fontSize: type.fontSize,
        fontFamily,
        marginTop: 5,
        boxShadow: "0 1.5px 3px 0 rgba(0,0,0,0.02)",
        transition: "background 0.12s",
        opacity: isDisabled ? 0.7 : 1,
        ...style, // allow caller to override styles like minWidth/marginTop
      }}
      {...props}
    >
      {children}
    </button>
  );
}