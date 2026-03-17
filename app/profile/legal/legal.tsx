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

export default function LegalDisclosures() {
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
                    Legal Disclosures
                </Text>

                <View style={{ width: 44 }} />
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                <Text style={[styles.updated, { color: colors.textMuted }]}>
                    Last updated: Nov 20, 2025
                </Text>

                <Text style={[styles.sectionTitle, { color: colors.text }]}>
                    Company Information
                </Text>

                <Text style={[styles.text, { color: colors.textSecondary }]}>
                    VaultBank is operated by VaultBank Technologies and provides
                    digital financial services through its mobile application
                    and related platforms.
                </Text>

                <Text style={[styles.sectionTitle, { color: colors.text }]}>
                    Regulatory Compliance
                </Text>

                <Text style={[styles.text, { color: colors.textSecondary }]}>
                    VaultBank complies with applicable financial regulations and
                    consumer protection laws. We operate under relevant legal
                    frameworks that govern digital financial services.
                </Text>

                <Text style={[styles.sectionTitle, { color: colors.text }]}>
                    Fraud Prevention
                </Text>

                <Text style={[styles.text, { color: colors.textSecondary }]}>
                    VaultBank monitors transactions and account activity to
                    detect and prevent fraud, unauthorized access, or suspicious
                    behavior. Accounts may be temporarily restricted if
                    suspicious activity is detected.
                </Text>

                <Text style={[styles.sectionTitle, { color: colors.text }]}>
                    Intellectual Property
                </Text>

                <Text style={[styles.text, { color: colors.textSecondary }]}>
                    All content, trademarks, software, and design elements
                    within the VaultBank application are the property of
                    VaultBank Technologies or its licensors and are protected by
                    applicable intellectual property laws.
                </Text>

                <Text style={[styles.sectionTitle, { color: colors.text }]}>
                    Limitation of Liability
                </Text>

                <Text style={[styles.text, { color: colors.textSecondary }]}>
                    VaultBank shall not be liable for indirect, incidental, or
                    consequential damages resulting from the use or inability to
                    use our services except where required by applicable law.
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
