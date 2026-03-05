import type { Launch } from "types/Launch";
import styles from "./LaunchCard.module.css";

interface LaunchCardProps {
    launch: Launch;
}

const LaunchCard = ({ launch }: LaunchCardProps) => {
    return (
        <div className={styles.container}>
            <img
                src={launch.links.patch.small}
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
