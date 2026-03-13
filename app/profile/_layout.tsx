import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function ProfileLayout() {
    return (
        <>
            <StatusBar style="light" />
            <Stack
                screenOptions={{
                    headerShown: false,
                    animation: "slide_from_right",
                }}
            >
                <Stack.Screen name="edit-profile" />
                <Stack.Screen name="notifications" />
                <Stack.Screen name="security" />
                <Stack.Screen name="devices" />
                <Stack.Screen name="help-center" />
                <Stack.Screen name="terms" />
            </Stack>
        </>
    );
}
