// src/demo/demoUtils.js

/**
 * Get a color value from the palette
 * @param {Object} palette - Color palette object
 * @param {string} group - Color group (e.g. "brand", "utility")
 * @param {string} name - Name of color (e.g. "primary bg")
 * @param {string} theme - "light" or "dark"
 * @returns {string} Hex color
 */
export function getColor(palette, group, name, theme = "light") {
  const arr = palette?.[theme]?.[group] || [];
  const color = arr.find(c => c.name === name);
  return color ? color.hex : "#000";
}

/**
 * Get a typography style by name
 * @param {Array} styles - Typography styles array
 * @param {string} name - Style name (e.g. "Display Large")
 * @returns {Object} Style object or empty
 */
export function getType(styles, name) {
  return (styles || []).find(t => t.name === name) || {};
}

export function hexToRgba(hex, alpha = 0.06) {
  hex = hex.replace("#", "");
  if (hex.length === 3) hex = hex.split("").map(x => x + x).join("");
  const num = parseInt(hex, 16);
  const r = (num >> 16) & 255;
  const g = (num >> 8) & 255;
  const b = num & 255;
  return `rgba(${r},${g},${b},${alpha})`;
}

export function font(type, fonts = {}) {
  const fontFamily =
    fonts[type.fontFamily === "Primary Family" ? "primaryFont" : "secondaryFont"];
  return {
    ...type,
    fontStyle: type.italic ? "italic" : "normal",
    fontFamily,
  };
}