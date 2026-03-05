import { useState, type PropsWithChildren } from "react";
import { Link, NavLink } from "react-router-dom";
import styles from "./Layout.module.css";
import logo from "assets/icons/spacex-logo.svg";
import light from "assets/icons/light.svg";
import dark from "assets/icons/dark.svg";

const Layout = ({ children }: PropsWithChildren) => {
    const [defaultTheme, setDefaultTheme] = useState(true);

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
                        src={defaultTheme ? light : dark}
                        className={styles.theme}
                        onClick={() => setDefaultTheme((prev) => !prev)}
                    />
                </nav>
            </header>
            <main className={styles.main}>{children}</main>
        </div>
    );
};

export default Layout;
