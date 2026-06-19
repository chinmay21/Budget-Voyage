import NavLink from "./NavLink";

export default function Navbar() {
    return (
        <nav
            style={{
                backgroundColor: "#212842",
                width: "100%",
                padding: "0 2.5rem",
                boxShadow: "0 2px 12px rgba(0,0,0,0.25)",
                position: "sticky",
                top: 0,
                zIndex: 50,
            }}
        >
            <div
                style={{
                    display: "flex",
                    height: "64px",
                    alignItems: "center",
                    justifyContent: "space-between",
                    maxWidth: "1280px",
                    margin: "0 auto",
                }}
            >
                {/* Logo */}
                <div
                    style={{
                        marginTop: "10px"
                    }}
                >
                    <img
                        src="/asset/logo.png"
                        loading="lazy"
                        alt="logo"
                        width={100}
                        height={100}
                        style={{ objectFit: "contain" }}
                    />
                </div>

                {/* Nav Links */}
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "2rem",
                    }}
                >
                    <NavLink href="/plan-trip">Plan Trip</NavLink>
                    <NavLink href="https://digitalheroesco.com" isExternal>
                        Built for Digital Heroes
                    </NavLink>
                </div>
            </div>
        </nav>
    );
}