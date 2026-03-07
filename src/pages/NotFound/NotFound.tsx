import Button from "components/Button/Button";
import styles from "./NotFound.module.css";
import { useTheme } from "hooks/useTheme";

const NotFound = () => {
    const { theme } = useTheme();

    return (
        <section className={styles.container}>
            <h2
                className={`${styles.message} ${theme === "light" ? "" : styles.dark}`}
            >
                Houston, we have a
            </h2>
            <h1
                className={`${styles.status} ${theme === "light" ? "" : styles.dark}`}
            >
                404
            </h1>
            <Button url="/" message="Go back to homepage" />
        </section>
    );
};

export default NotFound;
