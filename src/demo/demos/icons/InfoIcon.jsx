// src/components/InfoIcon.jsx
import { getColor, getType } from "../../demoUtils";

export default function InfoIcon({
  palette,
  styles,
  fonts,
  size = 32,
  style = {},
  ...props
}) {
  const infoColor = getColor(palette, "semantic", "info");
  const bgColor = getColor(palette, "utility", "secondary bg");
  const type = getType(styles, "Label Small");
  return (
    <div
      style={{
        position: "relative",
        width: size,
        height: size,
        display: "inline-block",
        ...style,
      }}
      {...props}
    >
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ display: "block" }}>
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={size / 2 - 1}
          fill={bgColor}
        />
        {/* Info color ring */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={size / 2 - 2.5}
          stroke={infoColor}
          strokeWidth={2}
          fill="none"
        />
      </svg>
      {/* HTML question mark, centered */}
      <span
        style={{
          ...type,
          color: infoColor,
          fontFamily: type.fontFamily,
          fontWeight: type.fontWeight,
          fontSize: type.fontSize,
          lineHeight: 1,
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -56%)",
          pointerEvents: "none",
          userSelect: "none",
        }}
      >
        ?
      </span>
    </div>
  );
}