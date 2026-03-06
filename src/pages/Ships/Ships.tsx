import Loading from "components/Loading/Loading";
import { useFetch } from "hooks/useFetch";
import type { Ship } from "types/Ship";
import styles from "./Ships.module.css";
import ShipsList from "components/ShipsList/ShipsList";

const Ships = () => {
    const { data, loading, error } = useFetch<Ship[]>(
        "https://api.spacexdata.com/v4/ships",
    );

    if (loading)
        return (
            <div className={styles.container}>
                <Loading />
            </div>
        );
    if (error) return <p className={styles.info}>{error}</p>;
    if (!data) return null;

    const currentShips = data;

    return (
        <section className={styles.container}>
            <h1 className={styles.title}>Ships</h1>
            <ShipsList currentShips={currentShips} />
        </section>
    );
};

export default Ships;
