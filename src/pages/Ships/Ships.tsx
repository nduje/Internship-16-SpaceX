import Loading from "components/Loading/Loading";
import { useFetch } from "hooks/useFetch";
import type { Ship } from "types/Ship";
import styles from "./Ships.module.css";
import ShipsList from "components/ShipsList/ShipsList";
import { useTheme } from "hooks/useTheme";

const Ships = () => {
    const { theme } = useTheme();

    const { data, loading, error } = useFetch<Ship[]>(
        "https://api.spacexdata.com/v4/ships",
    );

    if (loading)
        return (
            <div
                className={`${styles.container} ${theme === "light" ? "" : styles.dark}`}
            >
                <Loading />
            </div>
        );
    if (error)
        return (
            <p
                className={`${styles.info} ${theme === "light" ? "" : styles.dark}`}
            >
                {error}
            </p>
        );
    if (!data) return null;

    const currentShips = data;

    return (
        <section
            className={`${styles.container} ${theme === "light" ? "" : styles.dark}`}
        >
            <h1
                className={`${styles.title} ${theme === "light" ? "" : styles.dark}`}
            >
                Ships
            </h1>
            <ShipsList currentShips={currentShips} />
        </section>
    );
};

export default Ships;
