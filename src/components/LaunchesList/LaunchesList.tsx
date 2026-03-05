import type { Launch } from "../../types/Launch";
import styles from "./LaunchesList.module.css";

interface LaunchesListProps {
    currentLaunches: Launch[];
}

const LaunchesList = ({ currentLaunches }: LaunchesListProps) => {
    return (
        <div className={styles.container}>
            {currentLaunches.map((launch) => (
                <p key={launch.id}>{launch.name}</p>
            ))}
        </div>
    );
};

export default LaunchesList;
