// TypographyPage.jsx
import TypographyTable from "./TypographyTable";
import GoogleFontPicker from "./GoogleFontPicker";

export default function TypographyPage({
  typography, setTypography,
  primaryFont, setPrimaryFont,
  secondaryFont, setSecondaryFont,
  palette,
}) {
  return (
    <div>
      <div className="flex gap-4 mb-6">
        <GoogleFontPicker value={primaryFont} onChange={setPrimaryFont} label="Primary Font" />
        <GoogleFontPicker value={secondaryFont} onChange={setSecondaryFont} label="Secondary Font" />
      </div>
      {Array.isArray(typography) ? (
        <TypographyTable
          typography={typography}
          setTypography={setTypography}
          primaryFont={primaryFont}
          secondaryFont={secondaryFont}
          palette={palette}
        />
      ) : (
        <div style={{ color: "red" }}>Typography data is invalid.</div>
      )}
    </div>
  );
}