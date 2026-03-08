import { useEffect, useState, type PropsWithChildren } from "react";
import { useTheme } from "hooks/useTheme";
import { Link, NavLink, useLocation } from "react-router-dom";
import styles from "./Layout.module.css";
import logo from "assets/icons/spacex-logo.svg";
import light from "assets/icons/light.svg";
import dark from "assets/icons/dark.svg";

const Layout = ({ children }: PropsWithChildren) => {
    const { theme, toggleTheme } = useTheme();
    const [menuOpen, setMenuOpen] = useState<Boolean>(false);
    const location = useLocation();

    useEffect(() => {
        document.body.setAttribute("data-theme", theme);

        const main = document.querySelector("main");

        if (main) {
            main.setAttribute("data-theme", theme);
        }
    }, [theme]);

    useEffect(() => {
        document.body.style.overflow = menuOpen ? "hidden" : "auto";
    }, [menuOpen]);

    useEffect(() => {
        setMenuOpen(false);
    }, [location.pathname]);

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <Link to="/" className={styles.logo_container}>
                    <img src={logo} className={styles.logo} />
                </Link>

                <div className={styles.buttons_container}>
                    <img
                        src={theme === "light" ? light : dark}
                        className={`${styles.theme} ${styles.hidden_mobile}`}
                        onClick={() => toggleTheme()}
                    />
                    <button
                        className={`${styles.hamburger} ${menuOpen ? styles.open : ""}`}
                        onClick={() => setMenuOpen((prev) => !prev)}
                    />
                </div>

                <nav className={`${styles.nav} ${menuOpen ? styles.open : ""}`}>
                    <NavLink to="/" className={styles.navLink}>
                        Home
                    </NavLink>
                    <NavLink to="/launches" className={styles.navLink}>
                        Launches
                    </NavLink>
                    <NavLink to="/ships" className={styles.navLink}>
                        Ships
                    </NavLink>
                    <img
                        src={theme === "light" ? light : dark}
                        className={`${styles.theme} ${styles.hidden_desktop}`}
                        onClick={() => toggleTheme()}
                    />
                </nav>
            </header>
            <main className={styles.main}>{children}</main>
        </div>
    );
};

export default Layout;
