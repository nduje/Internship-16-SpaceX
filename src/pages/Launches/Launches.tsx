import { useMemo, useState } from "react";
import { useFetch } from "hooks/useFetch";
import Loading from "components/Loading/Loading";
import styles from "./Launches.module.css";
import LaunchesList from "components/LaunchesList/LaunchesList";
import Pagination from "components/Pagination/Pagination";
import type { Launch } from "types/Launch";

type LaunchesResponse = {
    docs: Launch[];
    totalDocs: number;
};

const Launches = () => {
    const [currentPage, setCurrentPage] = useState(1);

    const launchesPerPage = 10;

    const options = useMemo(
        () => ({
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                query: {},
                options: {
                    page: currentPage,
                    limit: launchesPerPage,
                },
            }),
        }),
        [currentPage, launchesPerPage],
    );

    const { data, loading, error } = useFetch<LaunchesResponse>(
        "https://api.spacexdata.com/v5/launches/query",
        options,
    );

    if (loading)
        return (
            <div className={styles.container}>
                <Loading />
            </div>
        );

    if (error) return <p className={styles.info}>{error}</p>;
    if (!data) return null;

    return (
        <section className={styles.container}>
            <h1 className={styles.title}>Launches</h1>

            <LaunchesList currentLaunches={data.docs} />

            <Pagination
                totalLaunches={data.totalDocs}
                launchesPerPage={launchesPerPage}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            />
        </section>
    );
};

export default Launches;
