import React, { useState, useRef, useEffect } from "react";
import { HexColorPicker } from "react-colorful";

export default function ColorSwatch({ color, onChange }){
    const [showPicker, setShowPicker] = useState(false);
    const [hex, setHex] = useState(color.hex);
    const pickerRef = useRef();

    const handleChange = (newHex) => {
        setHex(newHex);
        onChange(newHex);
    };

    // Close picker on outside click
    useEffect(

        () => {

            function handleClickOutside(event){

                if ( pickerRef.current && !pickerRef.current.contains(event.target) ) {setShowPicker(false)}

            }

            if (showPicker) {
                document.addEventListener("mousedown", handleClickOutside);
            } else {
                document.removeEventListener("mousedown", handleClickOutside);
            }

            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            };

        }, [showPicker]

    );

    return (
        <div className="flex flex-col items-center m-2">
            <div
                className="w-16 h-16 rounded-lg border cursor-pointer"
                style={{ background: hex }}
                onClick={() => setShowPicker((prev) => !prev)}
                title="Click to edit"
            />

            <input
                className="w-20 mt-1 text-center border roundedpx-1 text-sm"
                value={hex}
                onChange={(e) => handleChange(e.target.value)}
                onBlur={() => setShowPicker(false)}
                maxLength={7}
            />

            <span className="text-xs mt-1">
                {color.name}
            </span>

            {showPicker && (
                <div className="absolute z-10" ref={pickerRef}>

                    <HexColorPicker
                        color={hex}
                        onChange={handleChange}
                    />

                </div>
            )}

        </div>
    );
}