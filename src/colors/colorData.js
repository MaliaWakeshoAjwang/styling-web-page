export const PALETTE_STYLES = {
    light: {
      brand: [
        { name: "primary", hex: "#1a73e8" },
        { name: "secondary", hex: "#185abc" },
        { name: "tertiary", hex: "#34a853" },
        { name: "alternate", hex: "#fbbc04" }
      ],
      utility: [
        { name: "primary text", hex: "#202124" },
        { name: "secondary text", hex: "#5f6368" },
        { name: "primary bg", hex: "#fff" },
        { name: "secondary bg", hex: "#f1f3f4" }
      ],
      accent: [
        { name: "accent 1", hex: "#ea4335" },
        { name: "accent 2", hex: "#fbbc04" },
        { name: "accent 3", hex: "#34a853" },
        { name: "accent 4", hex: "#4285f4" }
      ],
      semantic: [
        { name: "success", hex: "#34a853" },
        { name: "error", hex: "#ea4335" },
        { name: "warning", hex: "#fbbc04" },
        { name: "info", hex: "#4285f4" }
      ]
    },
    dark: {
      brand: [
        { name: "primary", hex: "#8ab4f8" },
        { name: "secondary", hex: "#5e97f6" },
        { name: "tertiary", hex: "#81c995" },
        { name: "alternate", hex: "#ffe082" }
      ],
      utility: [
        { name: "primary text", hex: "#e8eaed" },
        { name: "secondary text", hex: "#bdc1c6" },
        { name: "primary bg", hex: "#202124" },
        { name: "secondary bg", hex: "#303134" }
      ],
      accent: [
        { name: "accent 1", hex: "#f28b82" },
        { name: "accent 2", hex: "#fbbc04" },
        { name: "accent 3", hex: "#ccff90" },
        { name: "accent 4", hex: "#aecbfa" }
      ],
      semantic: [
        { name: "success", hex: "#81c995" },
        { name: "error", hex: "#f28b82" },
        { name: "warning", hex: "#ffe082" },
        { name: "info", hex: "#aecbfa" }
      ]
    }
  };

  // src/colors/colorUseCases.js

export const COLOR_USE_CASES = {
  // Brand Colors
  "brand - primary": "Main brand color, used for primary actions and highlights.",
  "brand - secondary": "Secondary brand color, used for secondary actions or accents.",
  "brand - tertiary": "Tertiary brand color, used for less prominent accents.",
  "brand - alternate": "Alternate brand color, used as an optional accent or for specific highlights.",
  // Utility Colors
  "utility - primary text": "Main body and heading text color, ensures maximum readability.",
  "utility - secondary text": "Secondary, muted, or descriptive text color.",
  "utility - primary bg": "Main background color for pages and cards.",
  "utility - secondary bg": "Background color for panels, input fields, or contrast sections.",
  // Accent Colors
  "accent - accent 1": "Used for links, highlights, or information badges.",
  "accent - accent 2": "Used for hover states or secondary accents.",
  "accent - accent 3": "Used for notification or decorative accents.",
  "accent - accent 4": "Used for data visualization or subtle highlights.",
  // Semantic Colors
  "semantic - success": "Used to indicate success or confirmation (e.g., checkmark backgrounds, success messages).",
  "semantic - error": "Used to indicate errors or critical states (e.g., error messages, invalid input).",
  "semantic - warning": "Used to indicate warnings or potentially harmful actions (e.g., warning banners).",
  "semantic - info": "Used to indicate informational or neutral states (e.g., info banners, notifications)."
};