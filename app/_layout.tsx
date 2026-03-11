import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ThemeProvider } from "../components/ui/ThemeProvider";
import { StatusBar } from "expo-status-bar";
import { LinkPreviewContextProvider } from "expo-router/build/link/preview/LinkPreviewContext";

const queryClient = new QueryClient();

export default function RootLayout() {
    useEffect(() => {
        SplashScreen.hideAsync();
    }, []);

    return (
        <QueryClientProvider client={queryClient}>
            <LinkPreviewContextProvider>
                <ThemeProvider>
                    <GestureHandlerRootView style={{ flex: 1 }}>
                        <StatusBar style="light" />
                        <Stack screenOptions={{ headerShown: false }} />
                    </GestureHandlerRootView>
                </ThemeProvider>
            </LinkPreviewContextProvider>
        </QueryClientProvider>
    );
}
