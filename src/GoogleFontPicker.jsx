import React, { useEffect, useState } from "react";
import Select from "react-select";
import WebFont from "webfontloader";

const API_KEY = import.meta.env.VITE_GOOGLE_FONTS_API_KEY;
const API_URL = `https://www.googleapis.com/webfonts/v1/webfonts?key=${API_KEY}`;

export default function GoogleFontPicker({
    value,
    onChange,
    label = "Font Family"
}) {
    const [fonts, setFonts] = useState([]);

    useEffect(() => {
        fetch(API_URL).then(res => res.json()).then(data => {
            setFonts(data.items.map(f => ({
                label: f.family,
                value: f.family,
                weights: f.variants.filter(v => !isNaN(Number(v))).map(w => Number(w))
            })));
        });
    }, []);

    // Optionally: Load font when changed
    useEffect(() => {
        if (value) {
            WebFont.load({
                google: { families: [value] }
            });
        }
    }, [value]);

    return (
        <div style={{ minWidth: 250 }}>
            <label className="font-semibold mr-2">{label}:</label>
            <Select
                value={fonts.find(f => f.value === value)}
                onChange={opt => onChange(opt.value)}
                options={fonts}
                isSearchable
                placeholder="Select font"
            />
        </div>
    );
}