import Countdown from "../../components/Countdown/Countdown";
import styles from "./Home.module.css";

const Home = () => {
    return (
        <section className={styles.container}>
            <Countdown />
        </section>
    );
};

export default Home;
