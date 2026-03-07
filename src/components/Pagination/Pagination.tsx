import { useTheme } from "hooks/useTheme";
import styles from "./Pagination.module.css";

type PaginationProps = {
    totalLaunches: number;
    launchesPerPage: number;
    currentPage: number;
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
};

const Pagination = ({
    totalLaunches,
    launchesPerPage,
    currentPage,
    setCurrentPage,
}: PaginationProps) => {
    const { theme } = useTheme();

    const totalPages = Math.ceil(totalLaunches / launchesPerPage);

    if (totalPages === 0) return null;

    const pages = [];

    for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
    }

    const goPrevious = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const goNext = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    return (
        <div className={styles.container}>
            <button
                onClick={goPrevious}
                className={`${styles.button} ${currentPage === 1 ? styles.hidden : ""} ${styles.function_button} ${theme === "light" ? "" : styles.dark}`}
            >
                Previous
            </button>
            {pages.map((page) => (
                <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`${styles.button} ${page === currentPage ? styles.active : ""} ${styles.number_button} ${theme === "light" ? "" : styles.dark}`}
                >
                    {page}
                </button>
            ))}
            <button
                onClick={goNext}
                className={`${styles.button} ${currentPage === totalPages ? styles.hidden : ""} ${styles.function_button} ${theme === "light" ? "" : styles.dark}`}
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;
