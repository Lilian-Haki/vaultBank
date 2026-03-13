import { Tabs } from "expo-router";
import { Home, Wallet, CreditCard, User } from "lucide-react-native";
import {
    Home01Icon,
    Wallet01Icon,
    UserIcon,
    CreditCardIcon,
} from "@hugeicons/core-free-icons";
import React from "react";
import { View, StyleSheet } from "react-native";
import { HugeiconsIcon } from "@hugeicons/react-native";
import { Colors } from "../../constants/colors";

function TabBarIcon({
    Icon,
    color,
    focused,
}: {
    Icon: typeof Home;
    color: string;
    focused: boolean;
}) {
    return (
        <View
            style={[
                styles.iconContainer,
                focused && styles.iconContainerFocused,
            ]}
        >
            <Icon size={24} color={color} strokeWidth={focused ? 2.5 : 2} />
        </View>
    );
}

export default function TabLayout() {
    const colors = Colors.dark;

    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: colors.primary,
                tabBarInactiveTintColor: colors.textMuted,
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: colors.surface,
                    borderTopWidth: 0,
                    elevation: 0,
                    shadowColor: "transparent",
                },
                tabBarLabelStyle: {
                    fontSize: 12,
                    fontWeight: "600",
                    marginTop: 4,
                },
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: "Home",
                    tabBarIcon: ({ color }) => (
                        <HugeiconsIcon icon={Home01Icon} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="accounts"
                options={{
                    title: "Accounts",
                    tabBarIcon: ({ color }) => (
                        <HugeiconsIcon icon={Wallet01Icon} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="cards"
                options={{
                    title: "Cards",
                    tabBarIcon: ({ color }) => (
                        <HugeiconsIcon color={color} icon={CreditCardIcon} />
                    ),
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: "Profile",
                    tabBarIcon: ({ color }) => (
                        <HugeiconsIcon color={color} icon={UserIcon} />
                    ),
                }}
            />
        </Tabs>
    );
}

const styles = StyleSheet.create({
    iconContainer: {
        padding: 8,
        borderRadius: 12,
    },
    iconContainerFocused: {
        backgroundColor: "rgba(16, 185, 129, 0.15)",
    },
});
