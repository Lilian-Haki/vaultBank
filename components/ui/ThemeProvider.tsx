import React, { createContext, useContext, useMemo } from "react";
import { Colors, ThemeColors } from "../../constants/colors";

interface ThemeContextType {
    colors: ThemeColors;
    isDark: boolean;
}

const ThemeContext = createContext<ThemeContextType>({
    colors: Colors.dark,
    isDark: true,
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const value = useMemo(
        () => ({
            isDark: true,
            colors: Colors.dark,
        }),
        [],
    );

    return (
        <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
    );
}

export function useTheme() {
    return useContext(ThemeContext);
}
