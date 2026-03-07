import type { Ship } from "types/Ship";
import { Link } from "react-router-dom";
import styles from "./ShipsList.module.css";
import ShipCard from "components/ShipCard/ShipCard";
import { useTheme } from "hooks/useTheme";

interface ShipsListProps {
    currentShips: Ship[];
}

const ShipsList = ({ currentShips }: ShipsListProps) => {
    const { theme } = useTheme();

    return (
        <div
            className={`${styles.container} ${theme === "light" ? "" : styles.dark}`}
        >
            {currentShips.map((ship) => (
                <Link
                    to={`/ships/${ship.id}`}
                    key={ship.id}
                    className={styles.ship_link}
                >
                    <ShipCard ship={ship} />
                </Link>
            ))}
        </div>
    );
};

export default ShipsList;
