import { useState } from "react";
import { useFetch } from "../../hooks/useFetch";
import Loading from "../../components/Loading/Loading";
import styles from "./Launches.module.css";
import LaunchesList from "../../components/LaunchesList/LaunchesList";
import Pagination from "../../components/Pagination/Pagination";
import type { Launch } from "../../types/Launch";

const Launches = () => {
    const [currentPage, setCurrentPage] = useState(1);

    const launchesPerPage = 10;

    const { data, loading, error } = useFetch<Launch[]>(
        "https://api.spacexdata.com/v5/launches",
    );

    if (loading)
        return (
            <div className={styles.container}>
                <Loading />
            </div>
        );
    if (error) return <p className={styles.info}>{error}</p>;
    if (!data) return null;

    const lastLaunchIndex = currentPage * launchesPerPage;
    const firstLaunchIndex = lastLaunchIndex - launchesPerPage;

    const currentLaunches = data.slice(firstLaunchIndex, lastLaunchIndex);

    return (
        <section className={styles.container}>
            <h1 className={styles.title}>Launches</h1>
            <LaunchesList currentLaunches={currentLaunches} />
            <Pagination
                totalLaunches={data.length}
                launchesPerPage={launchesPerPage}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            />
        </section>
    );
};

export default Launches;
