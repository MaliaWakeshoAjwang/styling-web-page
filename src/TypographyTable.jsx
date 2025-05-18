import React, { useState, useEffect } from "react";
import {
    FONT_WEIGHTS,
    ALIGNMENTS,
    TYPOGRAPHY_STYLES,
} from "./typographyData";
import WebFont from "webfontloader";
import GoogleFontPicker from "./GoogleFontPicker";

export default function TypographyTable({
    colorOptions,
    primaryFont,
    setPrimaryFont,
    secondaryFont,
    setSecondaryFont,
    googleFontsList
}) {
    const [rows, setRows] = useState(TYPOGRAPHY_STYLES);

    const handleChange = (idx, field, value) => {
        setRows(prev =>
            prev.map((row, i) =>
                i === idx ? { ...row, [field]: value } : row
            )
        );
    };

    // Load the chosen font when changed
    const loadFont = font => {

        if (!font) return;

        WebFont.load({
            google: {
                families: [font],
            },
        });

    };

    // Helper: Find font object from API list by name
    const findFontObj = (fontName) => googleFontsList?.find(f => f.family === fontName);

    // Ensure selected font is loaded
    React.useEffect(() => {
        loadFont(primaryFont);
    }, [primaryFont]);

    React.useEffect(() => {
        loadFont(secondaryFont);
    }, [secondaryFont]);

    // This ensures that "Primary Family" or "Secondary Family" uses the selected fonts
    const getActualFontFamily = (fontFamily) => {
        if (fontFamily === "Primary Family") return primaryFont;
        if (fontFamily === "Secondary Family") return secondaryFont;
        return fontFamily;
    };

    // Helper: Get supported weights for a font (from API data)
    const getSupportedWeights = (fontFamily) => {
        const actualFamily = getActualFontFamily(fontFamily);
        const font = findFontObj(actualFamily);
        if (!font) {
            console.warn("Font not found in API list:", actualFamily, googleFontsList.map(f => f.family));
            return [400, 700];
        }
        // Google API "variants" might include things like "italic", "regular", "700italic"
        // Only use numeric variants
        return font.variants.map(v => {
            // Convert "regular" to 400
            if (v === "regular") return 400;
            if (!isNaN(Number(v))) return Number(v);
            if (v.endsWith("italic")) return Number(v.replace("italic", ""));
            return null;
        }).filter(w => w && !isNaN(w));
    };

    // Dynamically load all used fonts and weights
    useEffect(() => {
        const familyWeightMap = {};
        rows.forEach(row => {
            const family = getActualFontFamily(row.fontFamily);
            if (!familyWeightMap[family]) familyWeightMap[family] = new Set();
            familyWeightMap[family].add(row.fontWeight);
        });
        const families = Object.entries(familyWeightMap).map(
            ([family, weightsSet]) => `${family}:${Array.from(weightsSet).join(",")}`
        );
        if (families.length > 0) {
            WebFont.load({ google: { families } });
        }
        setRows((prevRows) =>
            prevRows.map((row) => {
              const weights = getSupportedWeights(row.fontFamily);
              if (!weights.includes(row.fontWeight)) {
                // Find closest available weight
                let closest = weights[0];
                let minDiff = Math.abs(row.fontWeight - closest);
                for (let w of weights) {
                  let diff = Math.abs(row.fontWeight - w);
                  if (diff < minDiff) {
                    minDiff = diff;
                    closest = w;
                  }
                }
                // Only update if it's actually different
                return { ...row, fontWeight: closest };
              }
              return row;
            })
          );
    }, [rows, primaryFont, secondaryFont, googleFontsList]);

    return (
        <div className="overflow-x-auto">
            {/* Font pickers above the table */}
            <div className="flex gap-8 mb-6 items-center">
                <div>
                    <GoogleFontPicker
                        value={primaryFont}
                        onChange={setPrimaryFont}
                        label="Primary Font Family"
                    />
                </div>
                <div>
                    <GoogleFontPicker
                        value={secondaryFont}
                        onChange={setSecondaryFont}
                        label="Secondary Font Family"
                    />
                </div>
            </div>

            <table className="min-w-full border border-gray-200">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="py-2 px-3 border">Style Name</th>
                        <th className="py-2 px-3 border">Alignment</th>
                        <th className="py-2 px-3 border">Font Size</th>
                        <th className="py-2 px-3 border">Letter Spacing</th>
                        <th className="py-2 px-3 border">Italics</th>
                        <th className="py-2 px-3 border">Font Weight</th>
                        <th className="py-2 px-3 border">Color</th>
                        <th className="py-2 px-3 border">Font Family</th>
                        <th className="py-2 px-3 border">Example</th>
                    </tr>
                </thead>
                <tbody>
                    {rows.map((style, idx) => {
                        const actualFont = getActualFontFamily(style.fontFamily);
                        const weights = getSupportedWeights(style.fontFamily);
                        return (
                            <tr key={style.name}>
                                {/* Style name (not editable) */}
                                <td className="py-2 px-3 border bg-gray-50 font-semibold">{style.name}</td>

                                {/* Alignment */}
                                <td className="py-2 px-3 border">
                                    <select
                                        value={style.alignment}
                                        onChange={(e) => handleChange(idx, "alignment", e.target.value)}
                                        className="border rounded px-2 py-1"
                                    >
                                        {ALIGNMENTS.map((opt) => (
                                            <option value={opt.value} key={opt.value}>{opt.label}</option>
                                        ))}
                                    </select>
                                </td>

                                {/* Font size */}
                                <td className="py-2 px-3 border">
                                    <input
                                        type="number"
                                        className="border rounded px-2 py-1 w-16"
                                        value={style.fontSize}
                                        onChange={(e) => handleChange(idx, "fontSize", parseInt(e.target.value, 10))}
                                        min={8}
                                        max={96}
                                    />
                                </td>

                                {/* Letter Spacing */}
                                <td className="py-2 px-3 border">
                                    <input
                                        type="number"
                                        step="0.01"
                                        className="border rounded px-2 py-1 w-20"
                                        value={style.letterSpacing ?? 0}
                                        onChange={e => handleChange(idx, "letterSpacing", parseFloat(e.target.value))}
                                        min={-5}
                                        max={5}
                                    />
                                </td>

                                {/* Italics */}
                                <td className="py-2 px-3 border">
                                    <input
                                        type="checkbox"
                                        checked={!!style.italic}
                                        onChange={e => handleChange(idx, "italic", e.target.checked)}
                                    />
                                </td>

                                {/* Font weight */}
                                <td className="py-2 px-3 border">
                                    <select
                                        value={style.fontWeight}
                                        onChange={(e) => handleChange(idx, "fontWeight", parseInt(e.target.value, 10))}
                                        className="border rounded px-2 py-1"
                                    >
                                        {FONT_WEIGHTS.map(fw => {
                                            const supported = weights.includes(fw.value);
                                            return (
                                                <option
                                                    value={fw.value}
                                                    key={fw.value}
                                                    disabled={!supported}
                                                    title={ supported ? fw.label : `${fw.label} not available for this font`}
                                                    style={{ color: supported ? "inherit" : "#aaa" }}
                                                >
                                                    {fw.label}
                                                </option>
                                            );
                                        })}
                                    </select>
                                </td>

                                {/* Color (from palette) */}
                                <td className="py-2 px-3 border">
                                    <select
                                        value={style.color}
                                        onChange={(e) => handleChange(idx, "color", e.target.value)}
                                        className="border rounded px-2 py-1"
                                    >
                                        {colorOptions.map(opt => (
                                            <option value={opt.hex} key={opt.hex}>{opt.label}</option>
                                        ))}
                                    </select>
                                </td>

                                {/* Font family (choose between Primary/Secondary) */}
                                <td className="py-2 px-3 border">
                                    <select
                                        value={actualFont}
                                        onChange={(e) => handleChange(idx, "fontFamily", e.target.value)}
                                        className="border rounded px-2 py-1"
                                    >
                                        <option value="Primary Family">Primary Family</option>
                                        <option value="Secondary Family">Secondary Family</option>
                                    </select>
                                </td>

                                {/* Example */}
                                <td
                                    className="py-2 px-3 border"
                                    style={{
                                        textAlign: style.alignment,
                                        fontSize: `${style.fontSize}px`,
                                        letterSpacing: `${style.letterSpacing ?? 0}px`,
                                        fontStyle: style.italic ? "italic" : "normal",
                                        fontWeight: style.fontWeight,
                                        fontFamily: getActualFontFamily(style.fontFamily),
                                        color: style.color,
                                    }}
                                >
                                    example
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}