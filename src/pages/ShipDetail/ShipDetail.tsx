import { Link, useParams } from "react-router-dom";
import { useFetch } from "hooks/useFetch";
import styles from "./ShipDetail.module.css";
import Button from "components/Button/Button";
import Loading from "components/Loading/Loading";
import type { Ship } from "types/Ship";
import logo from "assets/icons/spacex-logo.svg";
import { useTheme } from "hooks/useTheme";

const ShipDetail = () => {
    const { theme } = useTheme();

    const id = useParams().id;

    const {
        data: ship,
        loading,
        error,
    } = useFetch<Ship>(id ? `https://api.spacexdata.com/v4/ships/${id}` : null);

    if (!id) return <p>No ship ID provided.</p>;
    if (loading)
        return (
            <div
                className={`${styles.container} ${theme === "light" ? "" : styles.dark}`}
            >
                <Loading />
            </div>
        );
    if (error || !ship)
        return (
            <p
                className={`${styles.info} ${theme === "light" ? "" : styles.info_dark}`}
            >
                {error}
            </p>
        );

    return (
        <section
            className={`${styles.container} ${theme === "light" ? "" : styles.dark}`}
        >
            <div className={styles.image_container}>
                <img
                    src={ship.image ? ship.image : logo}
                    alt={ship.name}
                    className={`${styles.image} ${ship.image ? "" : styles.missing_image}`}
                />
            </div>
            <div className={styles.info_container}>
                <h2 className={styles.name}>Name: {ship.name}</h2>
                {ship.type !== null ? (
                    <p className={styles.detail}>
                        <strong>Type:</strong> {ship.type}
                    </p>
                ) : (
                    ""
                )}
                {ship.roles && ship.roles.length > 0 ? (
                    <p className={styles.detail}>
                        <strong>Roles:</strong> {ship.roles.join(", ")}
                    </p>
                ) : (
                    ""
                )}
                {ship.launches && ship.launches.length > 0 ? (
                    <p className={styles.detail}>
                        <strong>Launches:</strong>{" "}
                        {ship.launches.map((f, i) => (
                            <span key={f}>
                                <Link
                                    to={`/launches/${f}`}
                                    className={styles.link}
                                >
                                    {f}
                                </Link>
                                {i < ship.launches.length - 1 && ", "}
                            </span>
                        ))}
                    </p>
                ) : (
                    ""
                )}
                <p className={styles.detail}>
                    <strong>Link:</strong>{" "}
                    <a href={ship.link} className={styles.link}>
                        {ship.legacy_id}
                    </a>
                </p>
            </div>
            <div className={styles.metadata}>
                <p>Legacy ID: {ship.legacy_id ? ship.legacy_id : "N/A"}</p>
                <p>Home Port: {ship.home_port ? ship.home_port : "N/A"}</p>
                <p>
                    Activity Status:{" "}
                    <label
                        className={
                            ship.active ? styles.active : styles.inactive
                        }
                    >
                        {ship.active ? "Active" : "Inactive"}
                    </label>
                </p>
            </div>
            <div className={styles.button_container}>
                <Button goBack message="Go back" />
            </div>
        </section>
    );
};

export default ShipDetail;
