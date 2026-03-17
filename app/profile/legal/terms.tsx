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

export default function TermsOfService() {
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
                    Terms of Service
                </Text>

                <View style={{ width: 44 }} />
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                <Text style={[styles.updated, { color: colors.textMuted }]}>
                    Last updated: Jan 1, 2026
                </Text>

                <Text style={[styles.sectionTitle, { color: colors.text }]}>
                    Introduction
                </Text>
                <Text style={[styles.text, { color: colors.textSecondary }]}>
                    Welcome to VaultBank. These Terms of Service govern your use
                    of the VaultBank mobile application and services. By
                    creating an account or using the application you agree to
                    comply with these terms.
                </Text>

                <Text style={[styles.sectionTitle, { color: colors.text }]}>
                    Eligibility
                </Text>
                <Text style={[styles.text, { color: colors.textSecondary }]}>
                    Users must be at least 18 years old and provide accurate
                    personal information. Accounts that violate these
                    requirements may be suspended or permanently removed.
                </Text>

                <Text style={[styles.sectionTitle, { color: colors.text }]}>
                    Account Security
                </Text>
                <Text style={[styles.text, { color: colors.textSecondary }]}>
                    You are responsible for maintaining the confidentiality of
                    your login credentials including passwords, PIN codes, and
                    biometric access. Immediately notify VaultBank if you
                    suspect unauthorized access.
                </Text>

                <Text style={[styles.sectionTitle, { color: colors.text }]}>
                    Acceptable Use
                </Text>
                <Text style={[styles.text, { color: colors.textSecondary }]}>
                    Users agree not to use VaultBank for illegal activities,
                    fraud, unauthorized system access, or malicious software
                    distribution. Violations may result in immediate account
                    suspension.
                </Text>

                <Text style={[styles.sectionTitle, { color: colors.text }]}>
                    Transactions
                </Text>
                <Text style={[styles.text, { color: colors.textSecondary }]}>
                    Transactions may be subject to verification and fraud
                    monitoring. VaultBank may delay, cancel, or investigate
                    transactions that appear suspicious or violate applicable
                    regulations.
                </Text>

                <Text style={[styles.sectionTitle, { color: colors.text }]}>
                    Termination
                </Text>
                <Text style={[styles.text, { color: colors.textSecondary }]}>
                    VaultBank may suspend or terminate accounts that violate
                    these terms or applicable laws. Users may close their
                    account at any time through account settings.
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
