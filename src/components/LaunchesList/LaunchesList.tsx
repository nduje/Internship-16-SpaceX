import type { Launch } from "../../types/Launch";
import { Link } from "react-router-dom";
import LaunchCard from "../LaunchCard/LaunchCard";
import styles from "./LaunchesList.module.css";

interface LaunchesListProps {
    currentLaunches: Launch[];
}

const LaunchesList = ({ currentLaunches }: LaunchesListProps) => {
    return (
        <div className={styles.container}>
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
