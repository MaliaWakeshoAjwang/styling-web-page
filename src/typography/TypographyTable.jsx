import { getColorsFromTheme } from "../colors/colorUtils";

export default function TypographyTable({
  typography, setTypography,
  primaryFont,
  secondaryFont,
  palette,
}) {
  const paletteColors = getColorsFromTheme(palette.light);

  const handleChange = (idx, field, value) => {
    setTypography(prev =>
      prev.map((row, i) => i === idx ? { ...row, [field]: value } : row)
    );
  };

  const getActualFontFamily = (fontFamily) => {
    if (fontFamily === "Primary Family") return primaryFont;
    if (fontFamily === "Secondary Family") return secondaryFont;
    return fontFamily;
  };

  if (!Array.isArray(typography)) {
    return <div className="text-red-600">Typography data is invalid.</div>;
  }

  return (
    <table className="min-w-full border border-gray-200 text-sm">
      <thead>
        <tr className="bg-gray-100">
          <th className="py-2 px-3 border">Style Name</th>
          <th className="py-2 px-3 border">Font Size</th>
          <th className="py-2 px-3 border">Letter Spacing</th>
          <th className="py-2 px-3 border">Line Height</th>
          <th className="py-2 px-3 border">Italics</th>
          <th className="py-2 px-3 border">Font Weight</th>
          <th className="py-2 px-3 border">Color</th>
          <th className="py-2 px-3 border">Font Family</th>
          <th className="py-2 px-3 border">Example</th>
        </tr>
      </thead>
      <tbody>
        {typography.map((style, idx) => (
          <tr key={style.name}>
            <td className="py-2 px-3 border bg-gray-50 font-semibold">{style.name}</td>
            <td className="py-2 px-3 border">
              <input
                type="number"
                value={style.fontSize}
                min={8}
                max={96}
                onChange={e => handleChange(idx, "fontSize", parseInt(e.target.value, 10))}
                className="border rounded px-2 py-1 w-16"
              />
            </td>
            <td className="py-2 px-3 border">
              <input
                type="number"
                step="0.01"
                value={style.letterSpacing}
                onChange={e => handleChange(idx, "letterSpacing", parseFloat(e.target.value))}
                className="border rounded px-2 py-1 w-16"
              />
            </td>
            <td className="py-2 px-3 border">
              <input
                type="number"
                step="0.01"
                value={style.lineHeight}
                onChange={e => handleChange(idx, "lineHeight", parseFloat(e.target.value))}
                className="border rounded px-2 py-1 w-16"
              />
            </td>
            <td className="py-2 px-3 border text-center">
              <input
                type="checkbox"
                checked={!!style.italic}
                onChange={e => handleChange(idx, "italic", e.target.checked)}
              />
            </td>
            <td className="py-2 px-3 border">
              <input
                type="number"
                value={style.fontWeight}
                min={100}
                max={900}
                step={100}
                onChange={e => handleChange(idx, "fontWeight", parseInt(e.target.value, 10))}
                className="border rounded px-2 py-1 w-16"
              />
            </td>
            <td className="py-2 px-3 border">
              <select
                value={style.color}
                onChange={e => handleChange(idx, "color", e.target.value)}
                className="border rounded px-2 py-1"
                style={{ minWidth: 125 }}
              >
                {paletteColors.map(opt => (
                  <option key={opt.name} value={opt.hex}>
                    {opt.name}
                  </option>
                ))}
              </select>
              <span
                style={{
                  display: "inline-block",
                  width: 22,
                  height: 22,
                  borderRadius: 4,
                  background: style.color,
                  border: "1px solid #ccc",
                  marginLeft: 7,
                  verticalAlign: "middle"
                }}
              />
            </td>
            <td className="py-2 px-3 border">
              <select
                value={style.fontFamily}
                onChange={e => handleChange(idx, "fontFamily", e.target.value)}
                className="border rounded px-2 py-1"
              >
                <option value="Primary Family">Primary Family</option>
                <option value="Secondary Family">Secondary Family</option>
              </select>
            </td>
            <td
              className="py-2 px-3 border"
              style={{
                fontSize: style.fontSize,
                fontWeight: style.fontWeight,
                letterSpacing: `${style.letterSpacing}px`,
                lineHeight: style.lineHeight,
                fontStyle: style.italic ? "italic" : "normal",
                color: style.color,
                fontFamily: getActualFontFamily(style.fontFamily),
              }}
            >
              {style.example}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}