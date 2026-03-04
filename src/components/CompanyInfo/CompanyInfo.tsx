import { useFetch } from "../../hooks/useFetch";
import Loading from "../Loading/Loading";
import styles from "./CompanyInfo.module.css";

type Info = {
    headquarters: {
        address: string;
        city: string;
        state: string;
    };
    links: {
        website: string;
        flickr: string;
        twitter: string;
        elon_twitter: string;
    };
    name: string;
    founder: string;
    founded: number;
    employees: number;
    vehicles: number;
    launch_sites: number;
    test_sites: number;
    ceo: string;
    cto: string;
    coo: string;
    cto_propulsion: string;
    valuation: number;
    summary: string;
    id: string;
};

const CompanyInfo = () => {
    const { data, loading, error } = useFetch<Info>(
        "https://api.spacexdata.com/v4/company",
    );

    if (loading) return <Loading />;
    if (error) return <p className={styles.info}>{error}</p>;
    if (!data) return null;

    return (
        <article className={styles.container}>
            <div className={styles.row}>
                <h2 className={styles.title}>{data.name}</h2>
                <p className={styles.summary}>{data.summary}</p>
            </div>

            <div className={styles.left}>
                <h3 className={styles.subtitle}>Founder & Leadership</h3>
                <p className={styles.info}>
                    <strong>Founder:</strong> {data.founder}
                </p>
                <p className={styles.info}>
                    <strong>CEO:</strong> {data.ceo}
                </p>
                <p className={styles.info}>
                    <strong>COO:</strong> {data.coo}
                </p>
                <p className={styles.info}>
                    <strong>CTO:</strong> {data.cto}
                </p>
                <p className={styles.info}>
                    <strong>CTO Propulsion:</strong> {data.cto_propulsion}
                </p>
            </div>

            <div className={styles.right}>
                <h3 className={styles.subtitle}>Headquarters</h3>
                <p className={styles.info}>
                    {data.headquarters.address}, {data.headquarters.city},{" "}
                    {data.headquarters.state}
                </p>

                <h3 className={styles.subtitle}>Stats</h3>
                <p className={styles.info}>
                    <strong>Founded:</strong> {data.founded}
                </p>
                <p className={styles.info}>
                    <strong>Employees:</strong> {data.employees}
                </p>
                <p className={styles.info}>
                    <strong>Valuation:</strong> $
                    {data.valuation.toLocaleString()}
                </p>
            </div>

            <div className={`${styles.row} ${styles.link_container}`}>
                <a href={data.links.website} className={styles.link}>
                    Website
                </a>
                <a href={data.links.flickr} className={styles.link}>
                    Flickr
                </a>
                <a href={data.links.twitter} className={styles.link}>
                    Twitter
                </a>
            </div>
        </article>
    );
};

export default CompanyInfo;
