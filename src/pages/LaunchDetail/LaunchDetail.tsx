import { useNavigate, useParams } from "react-router-dom";
import { useFetch } from "hooks/useFetch";
import styles from "./LaunchDetail.module.css";
import Button from "components/Button/Button";
import Loading from "components/Loading/Loading";
import type { Launch } from "types/Launch";
import type { Rocket } from "types/Rocket";

const LaunchDetail = () => {
    const id = useParams().id;

    const {
        data: launch,
        loading: launchLoading,
        error: launchError,
    } = useFetch<Launch>(
        id ? `https://api.spacexdata.com/v5/launches/${id}` : null,
    );

    const {
        data: rocket,
        loading: rocketLoading,
        error: rocketError,
    } = useFetch<Rocket>(
        launch
            ? `https://api.spacexdata.com/v4/rockets/${launch.rocket}`
            : null,
    );

    if (!id) return <p>No launch ID provided.</p>;
    if (launchLoading)
        return (
            <div className={styles.container}>
                <Loading />
            </div>
        );
    if (launchError || !launch) return <p>{launchError}</p>;

    console.log(launch.failures);

    return (
        <section className={styles.container}>
            <div className={styles.patch_container}>
                <img
                    src={launch.links.patch.large}
                    alt={launch.name}
                    className={styles.patch}
                />
            </div>
            <div className={styles.info_container}>
                <h2 className={styles.name}>Name: {launch.name}</h2>
                {rocketError ? (
                    <span className={styles.detail}>{rocketError}</span>
                ) : rocketLoading ? (
                    <Loading />
                ) : (
                    <p className={styles.detail}>
                        <strong>Rocket:</strong> {rocket?.name}
                    </p>
                )}
                {launch.details !== null ? (
                    <p className={styles.detail}>
                        <strong>Details:</strong> {launch.details}
                    </p>
                ) : (
                    ""
                )}
                {launch.failures && launch.failures.length > 0 ? (
                    <p className={styles.detail}>
                        <strong>Failures:</strong>{" "}
                        {launch.failures.map((f) => f.reason).join(", ")}
                    </p>
                ) : (
                    ""
                )}
                <p className={styles.detail}>
                    <strong>Youtube:</strong>{" "}
                    <a href={launch.links.webcast} className={styles.link}>
                        {launch.links.webcast}
                    </a>
                </p>
            </div>
            <div className={styles.metadata}>
                {" "}
                <p>Launch No.: {launch.flight_number}</p>
                <p>
                    Launch Time:{" "}
                    {new Date(launch.date_utc).toLocaleString("HR-hr")}
                </p>
            </div>
            <div className={styles.button_container}>
                <Button url={"/launches"} message="Go back" />
            </div>
        </section>
    );
};

export default LaunchDetail;
