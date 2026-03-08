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
import LaunchFilter from "components/LaunchFilter/LaunchFilter";
import withDropdown from "components/Dropdown/withDropdown";

const LaunchFilterWithDropdown = withDropdown(LaunchFilter);

type LaunchesResponse = {
    docs: Launch[];
    totalDocs: number;
};

const Launches = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchParams, setSearchParams] = useSearchParams();

    const searchQuery = searchParams.get("q") || "";
    const statusFilter = searchParams.get("status") || "all";

    const { theme } = useTheme();
    const launchesPerPage = 10;

    const options = useMemo(() => {
        const queryBody: any = {};

        if (searchQuery) {
            queryBody.name = { $regex: searchQuery, $options: "i" };
        }

        if (statusFilter === "success") {
            queryBody.success = true;
        }

        if (statusFilter === "failed") {
            queryBody.success = false;
        }

        if (statusFilter === "upcoming") {
            queryBody.upcoming = true;
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
    }, [currentPage, launchesPerPage, searchQuery, statusFilter]);

    useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery, statusFilter]);

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

            <div className={styles.filter_container}>
                {" "}
                <Search
                    value={searchQuery}
                    onChange={(newQuery: string) =>
                        setSearchParams((prev) => {
                            const status = prev.get("status");
                            const newParams: any = {};
                            if (newQuery) newParams.q = newQuery;
                            if (status) newParams.status = status;
                            return newParams;
                        })
                    }
                    type="launches"
                />
                <LaunchFilterWithDropdown
                    options={[
                        { label: "All missions", value: "all" },
                        { label: "Successful", value: "success" },
                        { label: "Failed", value: "failed" },
                        { label: "Upcoming", value: "upcoming" },
                    ]}
                />
            </div>

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
