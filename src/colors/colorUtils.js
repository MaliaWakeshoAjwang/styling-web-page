// src/colors/colorUtils.js

/**
 * Flattens the palette object into a list of { label, hex } pairs,
 * with unique hex values, labeled by group and color name.
 * 
 * Example result: [
 *   { label: "utility - primary text", hex: "#123456" },
 *   { label: "brand - primary", hex: "#abcdef" },
 *   ...
 * ]
 */
export function getAllColorsFromPalette(palette) {
    const colorSet = new Map();
  
    // Loop through both themes if available
    ["light", "dark"].forEach(themeKey => {
      if (palette[themeKey]) {
        Object.entries(palette[themeKey]).forEach(([group, colors]) => {
          colors.forEach(({ name, hex }) => {
            // Use group + name as unique label
            const key = `${group} - ${name}`;
            // Avoid duplicates by hex value
            if (!colorSet.has(key)) {
              colorSet.set(key, { label: key, hex });
            }
          });
        });
      }
    });
  
    // Remove duplicates by hex (so each color is unique)
    const uniqueByHex = Array.from(
      colorSet.values().reduce((map, obj) => map.set(obj.hex, obj), new Map()).values()
    );
  
    return uniqueByHex;
  }