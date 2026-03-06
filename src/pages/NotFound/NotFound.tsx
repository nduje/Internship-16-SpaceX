import Button from "components/Button/Button";
import styles from "./NotFound.module.css";

const NotFound = () => {
    return (
        <section className={styles.container}>
            <h2 className={styles.message}>Houston, we have a</h2>
            <h1 className={styles.status}>404</h1>
            <Button url="/" message="Go back to homepage" />
        </section>
    );
};

export default NotFound;
