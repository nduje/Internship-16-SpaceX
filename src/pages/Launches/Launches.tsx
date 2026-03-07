import { useEffect, useMemo, useState } from "react";
import { useFetch } from "hooks/useFetch";
import Loading from "components/Loading/Loading";
import styles from "./Launches.module.css";
import LaunchesList from "components/LaunchesList/LaunchesList";
import Pagination from "components/Pagination/Pagination";
import type { Launch } from "types/Launch";
import { useTheme } from "hooks/useTheme";
import { useSearchParams } from "react-router-dom";
import Search from "components/Search/Search";

type LaunchesResponse = {
    docs: Launch[];
    totalDocs: number;
};

const Launches = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchParams, setSearchParams] = useSearchParams();

    const searchQuery = searchParams.get("q") || "";

    const { theme } = useTheme();
    const launchesPerPage = 10;

    const options = useMemo(() => {
        const queryBody: any = {};

        if (searchQuery) {
            queryBody.name = { $regex: searchQuery, $options: "i" };
        }

        return {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                query: queryBody,
                options: {
                    page: currentPage,
                    limit: launchesPerPage,
                },
            }),
        };
    }, [currentPage, launchesPerPage, searchQuery]);

    useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery]);

    const { data, loading, error } = useFetch<LaunchesResponse>(
        "https://api.spacexdata.com/v5/launches/query",
        options,
    );

    return (
        <section
            className={`${styles.container} ${theme === "light" ? "" : styles.dark}`}
        >
            <h1
                className={`${styles.title} ${theme === "light" ? "" : styles.dark}`}
            >
                Launches
            </h1>

            <Search
                value={searchQuery}
                onChange={(newQuery: string) =>
                    setSearchParams(newQuery ? { q: newQuery } : {})
                }
                type="launches"
            />

            {loading && <Loading />}

            <LaunchesList currentLaunches={data?.docs || []} />

            {data?.totalDocs ? (
                <Pagination
                    totalLaunches={data.totalDocs}
                    launchesPerPage={launchesPerPage}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />
            ) : (
                !loading && (
                    <p
                        className={`${styles.info} ${theme === "light" ? "" : styles.dark}`}
                    >
                        No results found
                    </p>
                )
            )}

            {error && (
                <p
                    className={`${styles.info} ${theme === "light" ? "" : styles.dark}`}
                >
                    {error}
                </p>
            )}
        </section>
    );
};

export default Launches;
