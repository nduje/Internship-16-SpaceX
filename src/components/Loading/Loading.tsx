import styles from "./Loading.module.css";

const Loading = () => {
    return (
        <div className={styles.container}>
            <div className={styles.moon}>
                <div className={`${styles.crater} ${styles.crater1}`}></div>
                <div className={`${styles.crater} ${styles.crater2}`}></div>
                <div className={`${styles.crater} ${styles.crater3}`}></div>
                <div className={`${styles.crater} ${styles.crater4}`}></div>
                <div className={`${styles.crater} ${styles.crater5}`}></div>
                <div className={styles.shadow}></div>
            </div>

            <div className={styles.orbit}>
                <div className={styles.rocket}>
                    <div className={styles.window}></div>
                    <div className={styles.fire}></div>
                    <div className={styles.gas}></div>
                    <div className={styles.gas}></div>
                    <div className={styles.gas}></div>
                    <div className={styles.gas}></div>
                    <div className={styles.gas}></div>
                    <div className={styles.gas}></div>
                    <div className={styles.gas}></div>
                </div>
            </div>
        </div>
    );
};

export default Loading;
