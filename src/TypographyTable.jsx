import React, { useState } from "react";
import {
    FONT_FAMILIES,
    FONT_WEIGHTS,
    ALIGNMENTS,
    TYPOGRAPHY_STYLES,
} from "./typographyData";
import Select from "react-select";
import WebFont from "webfontloader";
import { GOOGLE_FONTS } from "./fonts";
import GoogleFontPicker from "./GoogleFontPicker";

export default function TypographyTable({
    colorOptions,
    primaryFont,
    setPrimaryFont,
    secondaryFont,
    setSecondaryFont,
    fontFamilyOptions
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
                        <th className="py-2 px-3 border">Font Weight</th>
                        <th className="py-2 px-3 border">Color</th>
                        <th className="py-2 px-3 border">Font Family</th>
                        <th className="py-2 px-3 border">Example</th>
                    </tr>
                </thead>
                <tbody>
                    {rows.map((style, idx) => (
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

                            {/* Font weight */}
                            <td className="py-2 px-3 border">
                                <select
                                    value={style.fontWeight}
                                    onChange={(e) => handleChange(idx, "fontWeight", parseInt(e.target.value, 10))}
                                    className="border rounded px-2 py-1"
                                >
                                    {FONT_WEIGHTS.map(opt => (
                                        <option value={opt.value} key={opt.value}>{opt.label}</option>
                                    ))}
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
                                    value={style.fontFamily}
                                    onChange={(e) => handleChange(idx, "fontFamily", e.target.value)}
                                    className="border rounded px-2 py-1"
                                >
                                    {fontFamilyOptions.map(opt => (
                                        <option value={opt.value} key={opt.value}>{opt.label}</option>
                                    ))}
                                </select>
                            </td>

                            {/* Example */}
                            <td
                                className="py-2 px-3 border"
                                style={{
                                    textAlign: style.alignment,
                                    fontSize: `${style.fontSize}px`,
                                    fontWeight: style.fontWeight,
                                    fontFamily: getActualFontFamily(style.fontFamily),
                                    color: style.color,
                                }}
                            >
                                example
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}