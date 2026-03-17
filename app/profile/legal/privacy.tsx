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

export default function PrivacyPolicy() {
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
                    Privacy Policy
                </Text>

                <View style={{ width: 44 }} />
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                <Text style={[styles.updated, { color: colors.textMuted }]}>
                    Last updated: Jan 1, 2026
                </Text>

                <Text style={[styles.sectionTitle, { color: colors.text }]}>
                    Information We Collect
                </Text>

                <Text style={[styles.text, { color: colors.textSecondary }]}>
                    VaultBank may collect personal information including name,
                    email, phone number, device information, and account
                    activity in order to provide services securely.
                </Text>

                <Text style={[styles.sectionTitle, { color: colors.text }]}>
                    How We Use Your Data
                </Text>

                <Text style={[styles.text, { color: colors.textSecondary }]}>
                    Your information is used to manage accounts, process
                    transactions, prevent fraud, improve application
                    performance, and comply with legal obligations.
                </Text>

                <Text style={[styles.sectionTitle, { color: colors.text }]}>
                    Data Security
                </Text>

                <Text style={[styles.text, { color: colors.textSecondary }]}>
                    VaultBank uses encryption, secure authentication, and fraud
                    detection systems to protect user data from unauthorized
                    access.
                </Text>

                <Text style={[styles.sectionTitle, { color: colors.text }]}>
                    Data Sharing
                </Text>

                <Text style={[styles.text, { color: colors.textSecondary }]}>
                    VaultBank does not sell personal data. Information may only
                    be shared with trusted partners such as payment processors
                    or regulatory authorities when required by law.
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
