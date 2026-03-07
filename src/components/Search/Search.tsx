import { useTheme } from "hooks/useTheme";
import styles from "./Search.module.css";

type SearchProps = {
    value: string;
    onChange: (newQuery: string) => void;
    type: string;
};

const Search = ({ value, onChange, type }: SearchProps) => {
    const { theme } = useTheme();

    return (
        <input
            type="text"
            placeholder={`Search ${type}...`}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className={`${styles.search} ${theme === "light" ? "" : styles.dark}`}
        />
    );
};
export default Search;
