import { View, Text, StyleSheet, Animated } from "react-native";
import { useEffect, useRef } from "react";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { InteractionManager } from "react-native";
import { Colors } from "../constants/colors";

export default function SplashScreen() {
    const router = useRouter();
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const scaleAnim = useRef(new Animated.Value(0.8)).current;
    const slideAnim = useRef(new Animated.Value(50)).current;

    useEffect(() => {
        // Animate in
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 800,
                useNativeDriver: true,
            }),
            Animated.timing(scaleAnim, {
                toValue: 1,
                duration: 800,
                useNativeDriver: true,
            }),
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 800,
                useNativeDriver: true,
            }),
        ]).start();

        // Navigate to onboarding after 2.5 seconds
        const timer = setTimeout(() => {
            router.replace("/onboarding");
        }, 2500);

        return () => clearTimeout(timer);
    }, []);

    const colors = Colors.dark;

    return (
        <SafeAreaView
            style={[styles.container, { backgroundColor: colors.background }]}
        >
            {/* Background Gradient Effect */}
            <View style={styles.backgroundEffect}>
                <View
                    style={[styles.glow1, { backgroundColor: colors.primary }]}
                />
                <View
                    style={[styles.glow2, { backgroundColor: colors.accent }]}
                />
            </View>

            {/* Content */}
            <Animated.View
                style={[
                    styles.content,
                    {
                        opacity: fadeAnim,
                        transform: [
                            { scale: scaleAnim },
                            { translateY: slideAnim },
                        ],
                    },
                ]}
            >
                {/* Logo */}
                <View style={styles.logoContainer}>
                    <View
                        style={[
                            styles.logo,
                            { backgroundColor: colors.primary },
                        ]}
                    >
                        <Text style={styles.logoText}>V</Text>
                    </View>
                </View>

                {/* Brand Name */}
                <Text style={[styles.brandName, { color: colors.text }]}>
                    VaultBank
                </Text>
                <Text style={[styles.tagline, { color: colors.textSecondary }]}>
                    Banking, Reimagined
                </Text>

                {/* Loading Indicator */}
                <View style={styles.loadingContainer}>
                    <View style={styles.loadingDots}>
                        <Animated.View
                            style={[
                                styles.dot,
                                { backgroundColor: colors.primary },
                                styles.dot1,
                            ]}
                        />
                        <Animated.View
                            style={[
                                styles.dot,
                                { backgroundColor: colors.primary },
                                styles.dot2,
                            ]}
                        />
                        <Animated.View
                            style={[
                                styles.dot,
                                { backgroundColor: colors.primary },
                                styles.dot3,
                            ]}
                        />
                    </View>
                </View>
            </Animated.View>

            {/* Version */}
            <Text style={[styles.version, { color: colors.textMuted }]}>
                Version 2.1.0
            </Text>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    backgroundEffect: {
        ...StyleSheet.absoluteFillObject,
        overflow: "hidden",
    },
    glow1: {
        position: "absolute",
        top: -100,
        right: -100,
        width: 400,
        height: 400,
        borderRadius: 200,
        opacity: 0.15,
    },
    glow2: {
        position: "absolute",
        bottom: -150,
        left: -150,
        width: 300,
        height: 300,
        borderRadius: 150,
        opacity: 0.1,
    },
    content: {
        alignItems: "center",
    },
    logoContainer: {
        marginBottom: 24,
    },
    logo: {
        width: 120,
        height: 120,
        borderRadius: 32,
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#10B981",
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.3,
        shadowRadius: 20,
        elevation: 10,
    },
    logoText: {
        fontSize: 56,
        fontWeight: "800",
        color: "#FFFFFF",
    },
    brandName: {
        fontSize: 36,
        fontWeight: "800",
        letterSpacing: -0.5,
    },
    tagline: {
        fontSize: 16,
        marginTop: 8,
        letterSpacing: 0.5,
    },
    loadingContainer: {
        marginTop: 48,
    },
    loadingDots: {
        flexDirection: "row",
        gap: 8,
    },
    dot: {
        width: 10,
        height: 10,
        borderRadius: 5,
    },
    dot1: {
        opacity: 0.4,
    },
    dot2: {
        opacity: 0.7,
    },
    dot3: {
        opacity: 1,
    },
    version: {
        position: "absolute",
        bottom: 40,
        fontSize: 13,
    },
});
