import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import { useTheme } from "../../../components/ui/ThemeProvider";

export default function CookiePolicy() {
    const router = useRouter();
    const { colors } = useTheme();

    return (
        <SafeAreaView
            style={[styles.container, { backgroundColor: colors.background }]}
            edges={["top"]}
        >
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={() => router.back()}
                    style={[
                        styles.backButton,
                        { backgroundColor: colors.surfaceHighlight },
                    ]}
                >
                    <ArrowLeft size={22} color={colors.text} />
                </TouchableOpacity>

                <Text style={[styles.headerTitle, { color: colors.text }]}>
                    Cookie Policy
                </Text>

                <View style={{ width: 44 }} />
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                <Text style={[styles.updated, { color: colors.textMuted }]}>
                    Last updated: Dec 15, 2025
                </Text>

                <Text style={[styles.sectionTitle, { color: colors.text }]}>
                    What Are Cookies
                </Text>

                <Text style={[styles.text, { color: colors.textSecondary }]}>
                    Cookies are small data files stored on your device when you
                    use applications or websites. They help remember your
                    preferences, login status, and other information to improve
                    the overall user experience.
                </Text>

                <Text style={[styles.sectionTitle, { color: colors.text }]}>
                    Why We Use Cookies
                </Text>

                <Text style={[styles.text, { color: colors.textSecondary }]}>
                    VaultBank uses cookies and similar technologies to ensure
                    the application works correctly, improve security, analyze
                    user behavior, and enhance the performance of our services.
                </Text>

                <Text style={[styles.sectionTitle, { color: colors.text }]}>
                    Types of Cookies We Use
                </Text>

                <Text style={[styles.text, { color: colors.textSecondary }]}>
                    We use essential cookies for authentication and account
                    access, security cookies to prevent fraud and unauthorized
                    access, and analytics cookies to understand how users
                    interact with our platform.
                </Text>

                <Text style={[styles.sectionTitle, { color: colors.text }]}>
                    Managing Cookies
                </Text>

                <Text style={[styles.text, { color: colors.textSecondary }]}>
                    Users can control or disable cookies through their device or
                    browser settings. However, disabling certain cookies may
                    affect the functionality of some services within the
                    application.
                </Text>

                <Text style={[styles.sectionTitle, { color: colors.text }]}>
                    Policy Updates
                </Text>

                <Text style={[styles.text, { color: colors.textSecondary }]}>
                    VaultBank may update this Cookie Policy periodically to
                    reflect changes in technology, regulations, or our services.
                    Updates will be indicated by a revised "Last Updated" date.
                </Text>
            </ScrollView>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    container: { flex: 1 },

    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        paddingVertical: 12,
    },

    backButton: {
        width: 44,
        height: 44,
        borderRadius: 14,
        justifyContent: "center",
        alignItems: "center",
    },

    headerTitle: {
        fontSize: 18,
        fontWeight: "700",
    },

    content: {
        padding: 20,
        paddingBottom: 40,
    },

    updated: {
        fontSize: 13,
        marginBottom: 20,
    },

    sectionTitle: {
        fontSize: 16,
        fontWeight: "700",
        marginTop: 20,
        marginBottom: 8,
    },

    text: {
        fontSize: 14,
        lineHeight: 20,
    },
});
