import { useState } from "react";
import { getColor, getType, hexToRgba, font } from "./demoUtils";
import InfoIcon from "./demos/icons/InfoIcon";
import SubmitButton from "./demos/components/SubmitButton";

const NAV_LINKS = [
    { label: "Dashboard", active: true },
    { label: "Projects" },
    { label: "Team" },
    { label: "Settings" }
];

const TABS = [
    { key: "success", label: "Success" },
    { key: "error", label: "Error" },
    { key: "warning", label: "Warning" },
    { key: "info", label: "Info" },
];

export default function WebsiteDemoPage({ palette, styles, fonts }) {
    const [tab, setTab] = useState("success");
    const [input, setInput] = useState("");
    const [msg, setMsg] = useState("");
    const [showTooltip, setShowTooltip] = useState(false);
    const [showNotification, setShowNotification] = useState(false);

    // For nav coloring, use brand/utility except for hover or active
    const navLinkStyle = (active) => ({
        ...font(getType(styles, "Title Medium"), fonts),
        color: active ? getColor(palette, "brand", "alternate") : getColor(palette, "utility", "primary text"),
        padding: "3px 0"
    });

    return (
        <div style={{
            background: getColor(palette, "utility", "primary bg"),
            padding: "0",
            position: "relative",
        }}>

            {/* HEADER */}
            <header style={{
                background: getColor(palette, "brand", "primary"),
                boxShadow: `0 2px 18px ${hexToRgba(getColor(palette, "brand", "primary"), 0.08)}`
            }}>
                <div style={{
                    maxWidth: 1100,
                    margin: "0 auto",
                    height: 72,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "0 32px"
                }}>
                    <div style={{
                        ...font(getType(styles, "Display Small"), fonts),
                        color: getColor(palette, "brand", "alternate"),
                        letterSpacing: 0.5
                    }}>
                        Acme Studio
                    </div>

                    <nav style={{ display: "flex", gap: 38 }}>
                        {NAV_LINKS.map(l =>
                            <a href="#" style={navLinkStyle(l.active)} key={l.label} onClick={e => e.preventDefault()}>
                                {l.label}
                            </a>
                        )}
                    </nav>
                </div>
            </header>

            {/* MAIN CONTENT */}
            <main style={{ maxWidth: "90%", margin: "0 auto", padding: "48px 0 0 0" }}>

                {showNotification && (
                    <div style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        background: getColor(palette, "accent", "accent 3"),
                        borderRadius: 8,
                        padding: "12px 18px",
                        marginBottom: 28,
                    }}>
                        <span style={{
                            width: 12,
                            height: 12,
                            borderRadius: 3,
                            display: "inline-block",
                            marginRight: 8,
                            background: getColor(palette, "utility", "primary bg"),
                            border: `2px solid ${getColor(palette, "utility", "primary text")}`,
                        }}/>
                        
                        <div style={{
                            ...font(getType(styles, "Label Medium"), fonts),
                            color: getColor(palette, "utility", "primary text"),
                            fontWeight: 700,
                        }}
                        >
                        You have a new message!
                        </div>
                    </div>
                )}

                <div style={{
                    color: getColor(palette, "utility", "primary text"),
                    padding: 32,
                    borderRadius: 12,
                }}>

                    <h1 style={{
                        ...font(getType(styles, "Display Large"),fonts),
                        marginBottom: 12,
                    }}>
                        Welcome to Your App!
                    </h1>

                    <p style={{
                        ...font(getType(styles, "Body Large"), fonts),
                        color: getColor(palette, "utility", "secondary text"),
                    }}>
                        This is a demo landing page using your design system.<br />
                        Every color and text style here is mapped to its intended use case.
                    </p>
                    <div style={{ display: "flex", gap: 18 }}>
                        <button
                            style={{
                                ...font(getType(styles, "Label Large"),fonts),
                                background: getColor(palette, "brand", "primary"),
                                color: getColor(palette, "utility", "primary text"),
                                border: "none",
                                borderRadius: 6,
                                padding: "12px 24px",
                                marginTop: 32,
                                cursor: "pointer",
                            }}
                        >
                            Get Started
                        </button>
                        {/* Secondary Button */}
                        <button
                            style={{
                                ...font(getType(styles, "Label Large"),fonts),
                                background: getColor(palette, "brand", "secondary"),
                                color: getColor(palette, "utility", "primary text"),
                                border: "none",
                                borderRadius: 6,
                                padding: "12px 24px",
                                marginTop: 32,
                                cursor: "pointer",
                            }}
                            onClick={() => setShowNotification((v) => !v)}
                        >
                            {showNotification ? "Hide Notification" : "Show Notification"}
                        </button>
                    </div>
                </div>
                    
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        gap: 32,
                        marginTop: 36,
                        marginBottom: 32,
                        justifyContent: "center",
                    }}
                >
                    {/* Welcome Card */}
                    <div style={{
                        flex: 1,
                        background: getColor(palette, "utility", "secondary bg"),
                        borderRadius: 18,
                        boxShadow: `0 2px 12px ${hexToRgba(getColor(palette, "utility", "primary text"), 0.04)}`,
                        padding: "38px 36px 32px 36px",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        border: `1.5px solid ${getColor(palette, "brand", "secondary")}`,
                        minWidth: 280,
                        maxWidth: 420,
                    }}>

                        <div>
                            <div style={{
                                ...font(getType(styles, "Headline Large"),fonts),
                                marginBottom: 6,
                            }}>
                                Welcome, Malia!
                            </div>
                            
                            <div style={{
                                ...font(getType(styles, "Body Medium"),fonts),
                                color: getColor(palette, "utility", "secondary text"),
                                marginBottom: 18,
                                maxWidth: 350,
                            }}>
                                Your workspace is ready. Explore the dashboard below to see your status and recent activity.
                            </div>
                        </div>
                    </div>

                    {/* Progress Card */}
                    <div style={{
                        flex: 1,
                        background: getColor(palette, "utility", "secondary bg"),
                        borderRadius: 18,
                        boxShadow: `0 2px 12px ${hexToRgba(getColor(palette, "utility", "primary text"), 0.04)}`,
                        padding: "38px 36px 32px 36px",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        border: `1.5px solid ${getColor(palette, "accent", "accent 4")}`,
                        minWidth: 280,
                        maxWidth: 420,
                    }}>

                        <div style={{
                            ...font(getType(styles, "Headline Large"),fonts),
                            width: 60,
                            height: 60,
                            borderRadius: 12,
                            color: getColor(palette, "accent", "accent 4"),
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            marginBottom: 8,
                        }}>
                            72%
                        </div>

                        <div style={{
                            ...font(getType(styles, "Headline Small"),fonts),
                            marginBottom: 2,
                        }}>
                            Project Completion
                        </div>

                        <div style={{
                            ...font(getType(styles, "Label Small"),fonts),
                            color: getColor(palette, "utility", "secondary text"),
                            opacity: 0.85,
                            textAlign: "center",
                            fontWeight: 400,
                        }}>
                            You're making great progress!
                        </div>
                    </div>
                </div>

                <div
                    style={{
                        margin: "16px 0 24px 0",
                        background: getColor(palette, "utility", "secondary bg"),
                        borderRadius: 12,
                        padding: 24,
                        border: `2.5px solid ${getColor(palette, "accent", "accent 2")}`,
                        cursor: "pointer",
                    }}
                    onMouseEnter={e =>
                        (e.currentTarget.style.boxShadow = `0 2px 18px 0 ${getColor(palette, "accent", "accent 2")}66`)
                    }
                    onMouseLeave={e =>
                        (e.currentTarget.style.boxShadow=`0 1px 5px ${hexToRgba(getColor(palette, "utility", "secondary text"), 0.07)}`)
                    }
                >
                    <div style={{
                        ...font(getType(styles, "Headline Medium"),fonts),
                        marginBottom: 3
                    }}>
                        Special Offer
                    </div>

                    <div style={{
                        ...font(getType(styles, "Body Medium"),fonts),
                        opacity: 0.85
                    }}>
                        Get 50% off your next purchase!
                    </div>
                </div>

                {/* brand tertiary */}
                <div style={{
                    background: getColor(palette, "brand", "tertiary"),
                    color: getColor(palette, "utility", "primary text"),
                    borderRadius: 10,
                    padding: "36px 24px",
                    textAlign: "center",
                    margin: 16,
                }}>
                    <div style={{
                        ...font(getType(styles, "Display Medium"),fonts),
                        marginBottom: 6,
                        color: getColor(palette, "utility", "primary text"),
                    }}>
                        Design for everyone
                    </div>

                    <div style={{
                        ...font(getType(styles, "Body Medium"),fonts),
                    }}>
                        This is a banner using your brand tertiary color and display medium typography.
                    </div>
                </div>

                <div style={{ marginTop: 38, marginBottom: 32 }}>
                    {/* Large Title */}
                    <div style={{
                        ...font(getType(styles, "Title Large"),fonts),
                        marginBottom: 4,
                    }}>
                        Ready to Get Started?
                    </div>

                    {/* Medium Title */}
                    <div style={{
                        ...font(getType(styles, "Title Medium"),fonts),
                        marginBottom: 10,
                        color: getColor(palette, "utility", "secondary text"),
                    }}>
                        Discover all the features your workspace offers.
                    </div>

                    {/* Paragraph with accent 1 link */}
                    <div style={{
                        ...font(getType(styles, "Body Medium"),fonts),
                        color: getColor(palette, "utility", "primary text"),
                    }}
                    >
                        Explore our documentation to learn more about how to use your dashboard, customize your preferences, and collaborate with your team.&nbsp;
                    <a
                        href="#"
                        style={{
                            color: getColor(palette, "accent", "accent 1"),
                            textDecoration: "underline",
                            fontWeight: 600,
                            cursor: "pointer",
                        }}
                        onClick={e => e.preventDefault()}
                    >
                        Read the Docs
                    </a>
                    .
                    </div>
                </div>

                {/* Form section */}
                <section style={{
                    margin: "0 auto",
                    background: getColor(palette, "utility", "secondary bg"),
                    borderRadius: 16,
                    padding: "38px 36px 32px 36px",
                    maxWidth: 630,
                    boxShadow: `0 4px 28px ${hexToRgba(getColor(palette, "brand", "primary"), 0.07)}`,
                }}>
                    <div style={{
                        ...font(getType(styles, "Headline Medium"),fonts),
                        marginBottom: 20,
                        color: getColor(palette, "utility", "primary text"),
                    }}>
                        Contact Us
                    </div>

                    {/* Tabs */}
                    <div style={{ display: "flex", gap: 12, marginBottom: 22 }}>
                        {TABS.map(tabObj => (
                            <button
                                key={tabObj.key}
                                type="button"
                                style={{
                                    ...font(getType(styles, "Label Small"),fonts),
                                    background: tab === tabObj.key
                                    ? getColor(palette, "semantic", tabObj.key)
                                    : getColor(palette, "utility", "primary bg"),
                                    color: getColor(palette, "utility", "primary text"),
                                    borderRadius: 7,
                                    padding: "8px 18px",
                                    fontWeight: 700,
                                    cursor: "pointer",
                                    transition: "all 0.12s"
                                }}
                                onClick={() => { setTab(tabObj.key); setMsg(""); }}
                            >
                                {tabObj.label}
                            </button>
                        ))}
                    </div>

                    {/* FORM */}
                    <form onSubmit={e => {
                        e.preventDefault();
                        if (tab === "error" && !input) setMsg("This field is required.");
                        else if (tab === "success") setMsg("Form submitted successfully!");
                        else if (tab === "warning") setMsg("Warning: Please check your input.");
                    }}>
                        <label style={{
                            ...font(getType(styles, "Label Small"),fonts),
                            display: "block",
                            marginBottom: 10,
                        }}>
                            Your Email
                        </label>

                        <div style={{
                            display: "flex", alignItems: "center", gap: 8, marginBottom: 14
                        }}>
                            <input
                                type="email"
                                value={input}
                                onChange={e => { setInput(e.target.value); setMsg(""); }}
                                style={{
                                    flex: 1,
                                    padding: "13px 15px",
                                    border: `1.5px solid ${getColor(palette, "utility", "primary text")}`,
                                    borderRadius: 8,
                                    fontSize: 16,
                                    background: getColor(palette, "utility", "primary bg"),
                                    outline: "none",
                                }}
                                placeholder="you@example.com"
                                disabled={tab === "info"}
                            />

                            {/* Info icon for info tab */}
                            {tab === "info" && (
                                <div
                                    onMouseEnter={() => setShowTooltip(true)}
                                    onMouseLeave={() => setShowTooltip(false)}
                                    style={{ position: "relative", cursor: "pointer" }}
                                >

                                    <InfoIcon palette={palette} styles={styles} fonts={fonts} size={24} />

                                    {showTooltip && (
                                        <div
                                            style={{
                                                position: "absolute",
                                                left: 28,
                                                top: "50%",
                                                transform: "translateY(-50%)",
                                                background: getColor(palette, "utility", "secondary bg"),
                                                color: getColor(palette, "semantic", "info"),
                                                ...font(getType(styles, "Title Small"),fonts),
                                                padding: "12px 16px",
                                                borderRadius: 9,
                                                zIndex: 2,
                                                minWidth: 160,
                                                whiteSpace: "pre-line",
                                            }}
                                        >
                                            This is an info message! Here you can provide extra information to help your user.
                                        </div>
                                    )}

                                </div>
                            )}
                        </div>
                        <SubmitButton
                            palette={palette}
                            styles={styles}
                            fonts={fonts}
                            disabled={tab === "info"}
                            style={{ minWidth: 110, marginTop: 8 }}
                        >
                            Submit
                        </SubmitButton>

                        {tab === "info" && (
                            <div style={{
                                ...font(getType(styles, "Title Small"),fonts),
                                color: getColor(palette, "semantic", "info"),
                                marginTop: 12,
                            }}>
                                On this page, hover over the info icon to see how an info message is displayed.
                            </div>
                        )}

                        {msg && (
                            <div style={{
                                ...font(getType(styles, "Title Small"),fonts),
                                color: getColor(palette, "semantic", tab),
                                marginTop: 13,
                                minHeight: 22,
                            }}>
                                {msg}
                            </div>
                        )}
                    </form>
                </section>

            </main>

            {/* FOOTER */}
            <footer style={{
                marginTop: 60,
                marginBottom: 15,
                padding: "34px 0 0 0",
                borderTop: `1.5px solid ${getColor(palette, "utility", "secondary bg")}`,
                background: getColor(palette, "utility", "primary bg"),
                color: getColor(palette, "utility", "secondary text"),
                textAlign: "center",
            }}>
                <div style={{
                    ...font(getType(styles, "Body Small"),fonts),
                    paddingBottom: 16
                }}>
                    &copy; {new Date().getFullYear()} Acme Studio &mdash; All rights reserved.
                </div>
            </footer>
        </div>
    );
}