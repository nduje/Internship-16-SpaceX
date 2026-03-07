import type { Launch } from "types/Launch";
import { Link } from "react-router-dom";
import LaunchCard from "components/LaunchCard/LaunchCard";
import styles from "./LaunchesList.module.css";
import { useTheme } from "hooks/useTheme";

interface LaunchesListProps {
    currentLaunches: Launch[];
}

const LaunchesList = ({ currentLaunches }: LaunchesListProps) => {
    const { theme } = useTheme();

    return (
        <div
            className={`${styles.container} ${theme === "light" ? "" : styles.dark}`}
        >
            {currentLaunches.map((launch) => (
                <Link
                    to={`/launches/${launch.id}`}
                    key={launch.id}
                    className={styles.launch_link}
                >
                    <LaunchCard launch={launch} />
                </Link>
            ))}
        </div>
    );
};

export default LaunchesList;
