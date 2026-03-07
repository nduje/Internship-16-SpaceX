import { useEffect, type PropsWithChildren } from "react";
import { useTheme } from "hooks/useTheme";
import { Link, NavLink } from "react-router-dom";
import styles from "./Layout.module.css";
import logo from "assets/icons/spacex-logo.svg";
import light from "assets/icons/light.svg";
import dark from "assets/icons/dark.svg";

const Layout = ({ children }: PropsWithChildren) => {
    const { theme, toggleTheme } = useTheme();

    useEffect(() => {
        document.body.setAttribute("data-theme", theme);

        const main = document.querySelector("main");

        if (main) {
            main.setAttribute("data-theme", theme);
        }
    }, [theme]);

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <Link to="/" className={styles.logo_container}>
                    <img src={logo} className={styles.logo} />
                </Link>
                <nav className={styles.nav}>
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
                        className={styles.theme}
                        onClick={() => toggleTheme()}
                    />
                </nav>
            </header>
            <main className={styles.main}>{children}</main>
        </div>
    );
};

export default Layout;
