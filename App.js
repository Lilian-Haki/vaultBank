// App.js
import { ExpoRoot } from "expo-router";
import { ThemeProvider } from "./components/ui/ThemeProvider";

export default function App() {
    const ctx = require.context("./app");
    return <ExpoRoot context={ctx} />;
}
