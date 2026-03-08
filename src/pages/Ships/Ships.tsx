import { useEffect, useMemo, useRef, useState } from "react";
import { useFetch } from "hooks/useFetch";
import Loading from "components/Loading/Loading";
import styles from "./Ships.module.css";
import ShipsList from "components/ShipsList/ShipsList";
import { useTheme } from "hooks/useTheme";
import { useSearchParams } from "react-router-dom";
import Search from "components/Search/Search";
import type { Ship } from "types/Ship";

type ShipsResponse = {
    docs: Ship[];
    totalDocs: number;
};

const Ships = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const searchQuery = searchParams.get("search") || "";
    const { theme } = useTheme();

    const shipsPerPage = 5;
    const [currentPage, setCurrentPage] = useState(1);
    const [ships, setShips] = useState<Ship[]>([]);

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
                options: { page: currentPage, limit: shipsPerPage },
            }),
        };
    }, [searchQuery, currentPage]);

    useEffect(() => {
        setShips([]);
        setCurrentPage(1);
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [searchQuery]);

    const { data, loading, error } = useFetch<ShipsResponse>(
        "https://api.spacexdata.com/v4/ships/query",
        options,
    );

    useEffect(() => {
        if (data?.docs.length) {
            setShips((prev) =>
                currentPage === 1 ? data.docs : [...prev, ...data.docs],
            );
        }
    }, [data]);

    const observer = useRef<IntersectionObserver | null>(null);
    const lastShipRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (loading) return;
        if (observer.current) observer.current.disconnect();

        observer.current = new IntersectionObserver((entries) => {
            if (
                entries[0].isIntersecting &&
                data &&
                ships.length < data.totalDocs
            ) {
                setCurrentPage((prev) => prev + 1);
            }
        });

        if (lastShipRef.current) observer.current.observe(lastShipRef.current);
    }, [loading, data, ships]);

    return (
        <section
            className={`${styles.container} ${theme === "light" ? "" : styles.dark}`}
        >
            <h1
                className={`${styles.title} ${theme === "light" ? "" : styles.dark}`}
            >
                Ships
            </h1>

            <Search
                value={searchQuery}
                onChange={(newQuery: string) =>
                    setSearchParams(newQuery ? { search: newQuery } : {})
                }
                type="ships"
            />

            <ShipsList currentShips={ships} />

            {loading && <Loading />}

            {!loading && !ships.length && !error && <p>No ships found</p>}

            {error && (
                <p
                    className={`${styles.info} ${theme === "light" ? "" : styles.dark}`}
                >
                    {error}
                </p>
            )}

            <div ref={lastShipRef} />
        </section>
    );
};

export default Ships;
