import { getColor, getType, hexToRgba } from "../demoUtils";

// Helper to inline style fontFamily fallback
const font = (type, fonts) => ({
  ...type,
  fontFamily: fonts?.[type.fontFamily === "Primary Family" ? "primaryFont" : "secondaryFont"] || type.fontFamily || "sans-serif"
});

export default function AccentColorsDemo({ palette, styles, fonts }) {
  return (
    <div
      style={{
        background: getColor(palette, "utility", "primary bg"),
        minHeight: 480,
        borderRadius: 14,
        maxWidth: 650,
        margin: "40px auto",
        padding: 36,
      }}
    >
      {/* Page title */}
      <div style={{ ...font(getType(styles, "Display Small"), fonts), marginBottom: 8 }}>
        Welcome, User!
      </div>

      {/* Link styled as Accent 1 */}
      <a
        href="#"
        style={{
          ...font(getType(styles, "Title Medium"), fonts),
          color: getColor(palette, "accent", "accent 1"),
          textDecoration: "underline",
          marginBottom: 32,
          display: "inline-block",
        }}
        onClick={e => e.preventDefault()}
      >
        View Account Settings
      </a>

      {/* Hover card using Accent 2 */}
      <div
        style={{
          margin: "28px 0 24px 0",
          background: getColor(palette, "utility", "secondary bg"),
          borderRadius: 12,
          padding: 24,
          border: `2.5px solid ${getColor(palette, "accent", "accent 2")}`,
          cursor: "pointer",
        }}
        onMouseEnter={e =>
          (e.currentTarget.style.boxShadow = `0 2px 18px 0 ${getColor(palette, "accent", "accent 2")}66`)
        }
        onMouseLeave={e =>
          (e.currentTarget.style.boxShadow=`0 1px 5px ${hexToRgba(getColor(palette, "utility", "secondary text"), 0.07)}`)
        }
      >
        <div style={{ ...font(getType(styles, "Headline Medium"), fonts), marginBottom: 3 }}>
          Special Offer
        </div>
        <div style={{ ...font(getType(styles, "Body Medium"), fonts), opacity: 0.85 }}>
          Get 50% off your next purchase!
        </div>
      </div>

      {/* Notification using Accent 3 */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          background: getColor(palette, "accent", "accent 3"),
          borderRadius: 8,
          padding: "12px 18px",
          marginBottom: 28,
        }}
      >
        <span
          style={{
            width: 12,
            height: 12,
            borderRadius: 3,
            display: "inline-block",
            marginRight: 8,
          }}
        />
        <div style={{ ...font(getType(styles, "Label Small"), fonts), color: getColor(palette, "utility", "primary text"), fontWeight: 700 }}>
          You have a new message!
        </div>
      </div>

      {/* Data visualization with Accent 4 */}
      <div
        style={{
          marginTop: 16,
          display: "flex",
          alignItems: "center",
          gap: 18,
        }}
      >
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: 7,
            background: getColor(palette, "accent", "accent 4"),
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 700,
            color: getColor(palette, "utility", "primary text"),
            ...font(getType(styles, "Title Large"), fonts),
          }}
        >
          72%
        </div>
        <div>
          <div
            style={{
              ...font(getType(styles, "Title Small"), fonts),
              color: getColor(palette, "utility", "primary text"),
            }}
          >
            Project Completion
          </div>
          <div
            style={{
              ...font(getType(styles, "Label Small"), fonts),
              color: getColor(palette, "utility", "secondary text"),
              opacity: 0.85,
            }}
          >
            Used for data visualization or subtle highlights.
          </div>
        </div>
      </div>
    </div>
  );
}