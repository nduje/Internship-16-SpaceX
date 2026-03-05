import { useEffect, useState } from "react";
import { useFetch } from "../../hooks/useFetch";
import Loading from "../Loading/Loading";
import styles from "./Countdown.module.css";

type Launch = {
    date_utc: string;
};

type TimeLeft = {
    years: number;
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
};

const Countdown = () => {
    const { data, loading, error } = useFetch<Launch>(
        "https://api.spacexdata.com/v4/launches/next",
    );

    const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);

    useEffect(() => {
        if (!data?.date_utc) return;

        const target = new Date(data.date_utc).getTime();

        const calculate = () => {
            const diff = Date.now() - target;

            return {
                years: Math.floor(diff / (1000 * 60 * 60 * 24 * 365)),
                days: Math.floor((diff / (1000 * 60 * 60 * 24)) % 365),
                hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((diff / (1000 * 60)) % 60),
                seconds: Math.floor((diff / 1000) % 60),
            };
        };

        setTimeLeft(calculate());

        const interval = setInterval(() => {
            setTimeLeft(calculate());
        }, 1000);

        return () => clearInterval(interval);
    }, [data]);

    if (loading)
        return (
            <div className={styles.container}>
                <Loading />
            </div>
        );
    if (error) return <p className={styles.error}>{error}</p>;
    if (!timeLeft) return null;

    return (
        <article className={styles.container}>
            <div className={styles.title}>Duration since last launch:</div>
            <div className={styles.countdown}>
                <span>{timeLeft.years}y</span> <span>{timeLeft.days}d</span>{" "}
                <span>{timeLeft.hours}h</span> <span>{timeLeft.minutes}m</span>{" "}
                <span>{timeLeft.seconds}s</span>
            </div>
        </article>
    );
};

export default Countdown;
