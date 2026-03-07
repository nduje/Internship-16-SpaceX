import { createContext, useState, type PropsWithChildren } from "react";

type ThemeContextType = {
    isLight: boolean;
    toggleTheme: () => void;
};

export const ThemeContext = createContext<ThemeContextType | undefined>(
    undefined,
);

const ThemeProvider = ({ children }: PropsWithChildren) => {
    const [isLight, setIsLight] = useState(true);

    const toggleTheme = () => {
        setIsLight((prev) => !prev);
    };

    return (
        <ThemeContext.Provider value={{ isLight, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export default ThemeProvider;
