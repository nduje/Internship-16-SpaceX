import Countdown from "components/Countdown/Countdown";
import CompanyInfo from "components/CompanyInfo/CompanyInfo";
import styles from "./Home.module.css";

const Home = () => {
    return (
        <section className={styles.container}>
            <Countdown />
            <CompanyInfo />
        </section>
    );
};

export default Home;
