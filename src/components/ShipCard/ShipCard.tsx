import type { Ship } from "types/Ship";
import logo from "assets/icons/spacex-logo.svg";
import styles from "./ShipCard.module.css";
import { useTheme } from "hooks/useTheme";

interface ShipCardProps {
    ship: Ship;
}

const ShipCard = ({ ship }: ShipCardProps) => {
    const { theme } = useTheme();

    return (
        <div
            className={`${styles.container} ${theme === "light" ? "" : styles.dark}`}
        >
            <img
                src={ship.image ? ship.image : logo}
                alt={ship.name}
                className={`${styles.image} ${ship.image ? "" : styles.missing_image}`}
            />
            <h2 className={styles.name}>{ship.name}</h2>
            <p className={styles.details}>
                <strong>Type:</strong> {ship.type}
            </p>
            <p className={styles.details}>
                <strong>Roles:</strong> {ship.roles.join(", ")}
            </p>
            <div className={styles.metadata}>
                <p>Legacy ID: {ship.legacy_id ? ship.legacy_id : "N/A"}</p>
                <p>Home Port: {ship.home_port ? ship.home_port : "N/A"}</p>
                <p>
                    Activity Status:{" "}
                    <label
                        className={
                            ship.active ? styles.active : styles.inactive
                        }
                    >
                        {ship.active ? "Active" : "Inactive"}
                    </label>
                </p>
            </div>
        </div>
    );
};

export default ShipCard;
