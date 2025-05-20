import React from "react";
import TypographyTable from "./TypographyTable";
import GoogleFontPicker from "./GoogleFontPicker";

export default function TypographyPage({
  typography, setTypography,
  primaryFont, setPrimaryFont,
  secondaryFont, setSecondaryFont,
}) {
  return (
    <div>
      <div className="flex gap-4 mb-6">
        <GoogleFontPicker value={primaryFont} onChange={setPrimaryFont} label="Primary Font" />
        <GoogleFontPicker value={secondaryFont} onChange={setSecondaryFont} label="Secondary Font" />
      </div>
      <TypographyTable
        typography={typography}
        setTypography={setTypography}
        primaryFont={primaryFont}
        secondaryFont={secondaryFont}
      />
    </div>
  );
}