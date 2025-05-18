import { palette } from "./palette";

export function getAllColorsFromPalette(palette) {
    const colorSet = new Map();

    ["light", "dark"].forEach((theme) => {
        Object.entries(palette[theme]).forEach(([group, colors]) => {
            colors.forEach(({ name, hex }) => {
                // Use group + name to ensure uniqueness in label
                const key = `${group} - ${name}`;
                if (!colorSet.has(key)) {
                    colorSet.set(key, { label: `${group} - ${name}`, hex });
                }
            });
        });
    });

    // Remove duplicates based on hex
    const uniqueByHex = Array.from(
        colorSet.values().reduce((map, obj) => map.set(obj.hex, obj), new Map()).values()
    );

    return uniqueByHex;
}