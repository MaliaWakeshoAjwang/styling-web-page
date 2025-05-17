import React, { useState } from "react";

export default function Tabs({ tabs }){

    const [active, setActive] = useState(0);

    return(

        <div>

            <div className="flex border-b mb-6">
                
                {
                    tabs.map(
                        (tab, idx) => (
                            <button
                                key={tab.label}
                                className={`py-2 px-4 font-semibold ${
                                    active == idx
                                    ? "border-b-2 border-blue-500 text-blue-600"
                                    : "text-gray-500"
                                }`}
                                onClick={
                                    () => setActive(idx)
                                }
                            >
                                {tab.label}
                            </button>
                        )
                    )
                }

            </div>

        </div>

    );
}