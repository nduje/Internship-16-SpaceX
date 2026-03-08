import { useTheme } from "hooks/useTheme";
import styles from "./LaunchFilter.module.css";

type Option = { label: string; value: string };

interface LaunchFilterProps {
    options: Option[];
    value?: string;
    onChange?: (value: string) => void;
}

const LaunchFilter = ({ options, value, onChange }: LaunchFilterProps) => {
    const { theme } = useTheme();

    return (
        <select
            value={value || ""}
            onChange={(e) => onChange?.(e.target.value)}
            className={`${styles.dropdown} ${theme === "dark" ? styles.dark : ""}`}
        >
            {options.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    );
};

export default LaunchFilter;
