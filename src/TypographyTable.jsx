import React, { useState } from "react";
import {
    FONT_FAMILIES,
    FONT_WEIGHTS,
    TEXT_COLORS,
    ALIGNMENTS,
    TYPOGRAPHY_STYLES,
} from "./typographyData";

function getFontWeightLabel(value) {
    const found = FONT_WEIGHTS.find((f) => f.value === value);
    return found ? found.label : value;
}

function getFontFamilyLabel(value) {
    const found = FONT_FAMILIES.find((f) => f.value === value);
    return found ? found.label : value;
}

function getTextColorLabel(value) {
    const found = TEXT_COLORS.find((f) => f.value === value);
    return found ? found.label : value;
}

function getAlignmentLabel(value) {
    const found = ALIGNMENTS.find((f) => f.value === value);
    return found ? found.label : value;
}

export default function TypographyTable() {
    const [rows, setRows] = useState(TYPOGRAPHY_STYLES);

    const handleChange = (idx, field, value) => {
        setRows(
            (prev) => prev.map(
                (row, i) => i === idx ? { ...row, [field]: value } : row
            )
        );
    };

    return (
        <div className="overflow-x-auto">
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

                            <td className="py-2 px-3 border bg-gray-50 font-semibold">{style.name}</td>

                            <td className="py-2 px-3 border">
                                <select
                                    value={style.alignment}
                                    onChange={(e) => handleChange(idx, "alignment", e.target.value)}
                                    className="border rounded px-2 py-1"
                                >
                                    {ALIGNMENTS.map((opt) => (
                                        <option value={opt.value} key={opt.value}>
                                            {opt.label}
                                        </option>
                                    ))}
                                </select>
                            </td>

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

                            <td className="py-2 px-3 border">

                                <select
                                    value={style.fontWeight}
                                    onChange={(e) => handleChange(idx, "fontWeight", parseInt(e.target.value, 10))}
                                    className="border rounded px-2 py-1"
                                >
                                    {FONT_WEIGHTS.map(
                                        (opt) => (
                                            <option value={opt.value} key={opt.value}>
                                                {opt.label}
                                            </option>
                                    ))}
                                </select>

                            </td>

                            <td className="py-2 px-3 border">
                                <select
                                    value={style.color}
                                    onChange={(e) => handleChange(idx, "color", e.target.value)}
                                    className="border rounded px-2 py-1"
                                >
                                    {TEXT_COLORS.map((opt) => (
                                        <option value={opt.value} key={opt.value}>
                                            {opt.label}
                                        </option>
                                    ))}
                                </select>
                            </td>

                            <td className="py-2 px-3 border">
                                <select
                                    value={style.fontFamily}
                                    onChange={(e) => handleChange(idx, "fontFamily", e.target.value)}
                                    className="border rounded px-2 py-1"
                                >
                                    {FONT_FAMILIES.map((opt) => (
                                        <option value={opt.value} key={opt.value}>
                                            {opt.label}
                                        </option>
                                    ))}
                                </select>
                            </td>

                            <td
                                className="py-2 px-3 border"
                                style={{
                                    textAlign: style.alignment,
                                    fontSize: `${style.fontSize}px`,
                                    fontWeight: style.fontWeight,
                                    fontFamily: style.fontFamily,
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