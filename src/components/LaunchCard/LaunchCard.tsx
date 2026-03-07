import type { Launch } from "types/Launch";
import styles from "./LaunchCard.module.css";
import logo from "assets/icons/spacex-logo.svg";
import { useTheme } from "hooks/useTheme";

interface LaunchCardProps {
    launch: Launch;
}

const LaunchCard = ({ launch }: LaunchCardProps) => {
    const { theme } = useTheme();

    return (
        <div
            className={`${styles.container} ${theme === "light" ? "" : styles.dark}`}
        >
            <img
                src={launch.links.patch.small ? launch.links.patch.small : logo}
                alt={launch.name}
                className={styles.patch}
            />
            <h2 className={styles.name}>{launch.name}</h2>
            <p className={styles.details}>{launch.details}</p>
            <div className={styles.metadata}>
                <p>Launch No.: {launch.flight_number}</p>
                <p>
                    Launch Time:{" "}
                    {new Date(launch.date_utc).toLocaleString("HR-hr")}
                </p>
            </div>
        </div>
    );
};

export default LaunchCard;
