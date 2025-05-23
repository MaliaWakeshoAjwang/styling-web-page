import { useState } from "react";
import { getColor, getType } from "../demoUtils";
import InfoIcon from "./icons/InfoIcon";
import SubmitButton from "./components/SubmitButton";

const TABS = [
  { key: "success", label: "Success" },
  { key: "error", label: "Error" },
  { key: "warning", label: "Warning" },
  { key: "info", label: "Info" },
];

export default function SemanticFormDemo({ palette, styles, fonts }) {
  const [input, setInput] = useState("");
  const [message, setMessage] = useState("");
  const [activeTab, setActiveTab] = useState("success");
  const [showTooltip, setShowTooltip] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (activeTab === "error" && !input) {
      setMessage("This field is required.");
    } else if (activeTab === "success") {
      setMessage("Form submitted successfully!");
    } else if (activeTab === "warning") {
      setMessage("Warning: Please check your input.");
    }
  };

  const messageColor = getColor(palette, "semantic", activeTab);

  return (
    <div
      style={{
        background: getColor(palette, "utility", "primary bg"),
        borderRadius: 14,
        maxWidth: 420,
        margin: "0 auto",
        padding: 32,
        boxShadow: "0 2px 10px rgba(0,0,0,0.04)",
      }}
    >
      {/* Tabs */}
      <div style={{ display: "flex", gap: 8, marginBottom: 24 }}>
        {TABS.map(tab => (
          <button
            key={tab.key}
            type="button"
            style={{
              ...getType(styles, "Label Small"),
              background: activeTab === tab.key
                ? getColor(palette, "semantic", tab.key)
                : getColor(palette, "utility", "secondary bg"),
              color: getColor(palette, "utility", "primary text"),
              border: "none",
              borderRadius: 5,
              padding: "7px 16px",
              fontFamily: fonts.secondaryFont,
              fontWeight: 600,
              cursor: "pointer",
              boxShadow: activeTab === tab.key ? "0 0 0 2px #3332" : undefined,
            }}
            onClick={() => {
              setActiveTab(tab.key);
              setMessage("");
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {/* Headline */}
      <div
        style={{
          ...getType(styles, "Headline Medium"),
          fontFamily: fonts.primaryFont,
          marginBottom: 18,
        }}
      >
        Contact Form
      </div>
      {/* Form */}
      <form onSubmit={handleSubmit} style={{ marginBottom: 16 }}>
        <label
          style={{
            ...getType(styles, "Label Small"),
            fontFamily: fonts.secondaryFont,
            display: "block",
            marginBottom: 8,
          }}
        >
          Your Email
        </label>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
          <input
            type="email"
            value={input}
            onChange={e => {
              setInput(e.target.value);
              setMessage("");
            }}
            style={{
              flex: 1,
              padding: "10px 12px",
              border: `1.5px solid ${getColor(palette, "utility", "primary text")}`,
              borderRadius: 6,
              fontFamily: fonts.secondaryFont,
              fontSize: 15,
            }}
            placeholder="you@example.com"
            disabled={activeTab === "info"}
          />
          {activeTab === "info" && (
            <div
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
              style={{ position: "relative", cursor: "pointer", marginLeft: 2 }}
            >
              <InfoIcon palette={palette} styles={styles} fonts={fonts} size={22} />
              {showTooltip && (
                <div
                  style={{
                    position: "absolute",
                    left: 26,
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: getColor(palette, "utility", "secondary bg"),
                    color: getColor(palette, "semantic", "info"),
                    ...getType(styles, "Title Small"),
                    padding: "12px 16px",
                    borderRadius: 8,
                    boxShadow: "0 4px 16px rgba(0,0,0,0.07)",
                    fontFamily: fonts.secondaryFont,
                    zIndex: 2,
                    minWidth: 150,
                    whiteSpace: "pre-line",
                  }}
                >
                  This is an info message! Here you can provide extra information to help your user.
                </div>
              )}
            </div>
          )}
        </div>
        <SubmitButton
          palette={palette}
          styles={styles}
          fonts={fonts}
          disabled={activeTab === "info"}
        >
          Submit
        </SubmitButton>
        {activeTab === "info" && (
          <div
            style={{
              ...getType(styles, "Title Small"),
              color: getColor(palette, "semantic", "info"),
              marginTop: 8,
              fontFamily: fonts.secondaryFont,
            }}
          >
            On this page, hover over the info icon to see how an info message is displayed.
          </div>
        )}
      </form>
      {/* Message */}
      {message && (
        <div
          style={{
            ...getType(styles, "Title Small"),
            fontFamily: fonts.secondaryFont,
            color: messageColor,
            minHeight: 22,
            marginTop: 8,
          }}
        >
          {message}
        </div>
      )}
    </div>
  );
}