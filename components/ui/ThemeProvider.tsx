import React, { createContext, useContext, useState, useEffect } from "react";
import { Appearance } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ThemeContext = createContext<any>(null);

const lightColors = {
    background: "#FFFFFF",
    surface: "#F5F5F5",
    surfaceHighlight: "#E0E0E0",
    text: "#111111",
    textSecondary: "#555555",
    textMuted: "#888888",
    primary: "#4F46E5",
    success: "#22C55E",
    border: "#DDDDDD",
};

const darkColors = {
    background: "#111111",
    surface: "#1A1A1A",
    surfaceHighlight: "#222222",
    text: "#FFFFFF",
    textSecondary: "#CCCCCC",
    textMuted: "#AAAAAA",
    primary: "#8B5CF6",
    success: "#22C55E",
    border: "#333333",
};

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
    const [theme, setTheme] = useState<"light" | "dark">("dark");

    useEffect(() => {
        // Load theme from storage or system preference
        (async () => {
            const storedTheme = await AsyncStorage.getItem("app_theme");
            if (storedTheme === "light" || storedTheme === "dark") {
                setTheme(storedTheme);
            } else {
                const colorScheme = Appearance.getColorScheme();
                setTheme(colorScheme === "light" ? "light" : "dark");
            }
        })();
    }, []);

    const toggleTheme = async () => {
        const newTheme = theme === "dark" ? "light" : "dark";
        setTheme(newTheme);
        await AsyncStorage.setItem("app_theme", newTheme);
    };

    const colors = theme === "dark" ? darkColors : lightColors;

    return (
        <ThemeContext.Provider value={{ theme, colors, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);
