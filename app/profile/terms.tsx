import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import {
    ArrowLeft,
    FileText,
    Shield,
    Eye,
    ChevronRight,
    Scale,
    Cookie,
} from "lucide-react-native";

import { useTheme } from "../../components/ui/ThemeProvider";

export default function TermsScreen() {
    const router = useRouter();
    const { colors } = useTheme();

    const legalDocuments = [
        {
            id: "terms",
            icon: FileText,
            title: "Terms of Service",
            subtitle: "Last updated: Jan 1, 2026",
            description:
                "The agreement between you and VaultBank governing your use of our services.",
        },
        {
            id: "privacy",
            icon: Eye,
            title: "Privacy Policy",
            subtitle: "Last updated: Jan 1, 2026",
            description:
                "How we collect, use, and protect your personal information.",
        },
        {
            id: "cookies",
            icon: Cookie,
            title: "Cookie Policy",
            subtitle: "Last updated: Dec 15, 2025",
            description:
                "Information about how we use cookies and similar technologies.",
        },
        {
            id: "legal",
            icon: Scale,
            title: "Legal Disclosures",
            subtitle: "Last updated: Nov 20, 2025",
            description:
                "Important legal information and regulatory disclosures.",
        },
    ];

    return (
        <SafeAreaView
            style={[styles.container, { backgroundColor: colors.background }]}
            edges={["top"]}
        >
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={() => router.back()}
                    style={[
                        styles.backButton,
                        { backgroundColor: colors.surfaceHighlight },
                    ]}
                    activeOpacity={0.7}
                >
                    <ArrowLeft size={22} color={colors.text} />
                </TouchableOpacity>
                <Text style={[styles.headerTitle, { color: colors.text }]}>
                    Terms & Privacy
                </Text>
                <View style={{ width: 44 }} />
            </View>

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {/* Security Banner */}
                <View
                    style={[
                        styles.securityBanner,
                        { backgroundColor: colors.primary + "15" },
                    ]}
                >
                    <View
                        style={[
                            styles.securityIcon,
                            { backgroundColor: colors.primary + "30" },
                        ]}
                    >
                        <Shield size={32} color={colors.primary} />
                    </View>
                    <View style={styles.securityText}>
                        <Text
                            style={[
                                styles.securityTitle,
                                { color: colors.text },
                            ]}
                        >
                            Your Privacy Matters
                        </Text>
                        <Text
                            style={[
                                styles.securitySubtitle,
                                { color: colors.textSecondary },
                            ]}
                        >
                            We protect your data with bank-level security
                        </Text>
                    </View>
                </View>

                {/* Legal Documents */}
                <Text
                    style={[
                        styles.sectionTitle,
                        { color: colors.textSecondary },
                    ]}
                >
                    LEGAL DOCUMENTS
                </Text>

                <View
                    style={[
                        styles.documentsCard,
                        { backgroundColor: colors.surface },
                    ]}
                >
                    {legalDocuments.map((doc, index) => (
                        <TouchableOpacity
                            key={doc.id}
                            style={[
                                styles.documentItem,
                                index < legalDocuments.length - 1 && {
                                    borderBottomWidth: 1,
                                    borderBottomColor: colors.border,
                                },
                            ]}
                            activeOpacity={0.7}
                            onPress={() =>
                                router.push(`/profile/legal/${doc.id}`)
                            }
                        >
                            <View
                                style={[
                                    styles.documentIcon,
                                    {
                                        backgroundColor:
                                            colors.surfaceHighlight,
                                    },
                                ]}
                            >
                                <doc.icon size={20} color={colors.primary} />
                            </View>

                            <View style={styles.documentContent}>
                                <Text
                                    style={[
                                        styles.documentTitle,
                                        { color: colors.text },
                                    ]}
                                >
                                    {doc.title}
                                </Text>

                                <Text
                                    style={[
                                        styles.documentSubtitle,
                                        { color: colors.textMuted },
                                    ]}
                                >
                                    {doc.subtitle}
                                </Text>

                                {/* Description text now visible */}
                                <Text
                                    style={[
                                        styles.documentDescription,
                                        { color: colors.textSecondary },
                                    ]}
                                >
                                    {doc.description}
                                </Text>
                            </View>

                            <ChevronRight size={18} color={colors.textMuted} />
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Summary Section */}
                <View
                    style={[
                        styles.summaryCard,
                        { backgroundColor: colors.surface },
                    ]}
                >
                    <Text style={[styles.summaryTitle, { color: colors.text }]}>
                        Privacy Summary
                    </Text>

                    <View style={styles.summaryItem}>
                        <View
                            style={[
                                styles.summaryDot,
                                { backgroundColor: colors.success },
                            ]}
                        />
                        <View style={styles.summaryContent}>
                            <Text
                                style={[
                                    styles.summaryItemTitle,
                                    { color: colors.text },
                                ]}
                            >
                                Data Encryption
                            </Text>
                            <Text
                                style={[
                                    styles.summaryItemText,
                                    { color: colors.textSecondary },
                                ]}
                            >
                                All your data is encrypted using AES-256
                                encryption
                            </Text>
                        </View>
                    </View>

                    <View style={styles.summaryItem}>
                        <View
                            style={[
                                styles.summaryDot,
                                { backgroundColor: colors.success },
                            ]}
                        />
                        <View style={styles.summaryContent}>
                            <Text
                                style={[
                                    styles.summaryItemTitle,
                                    { color: colors.text },
                                ]}
                            >
                                No Data Selling
                            </Text>
                            <Text
                                style={[
                                    styles.summaryItemText,
                                    { color: colors.textSecondary },
                                ]}
                            >
                                We never sell your personal information to third
                                parties
                            </Text>
                        </View>
                    </View>

                    <View style={styles.summaryItem}>
                        <View
                            style={[
                                styles.summaryDot,
                                { backgroundColor: colors.success },
                            ]}
                        />
                        <View style={styles.summaryContent}>
                            <Text
                                style={[
                                    styles.summaryItemTitle,
                                    { color: colors.text },
                                ]}
                            >
                                Transparency
                            </Text>
                            <Text
                                style={[
                                    styles.summaryItemText,
                                    { color: colors.textSecondary },
                                ]}
                            >
                                Clear information about how we use your data
                            </Text>
                        </View>
                    </View>
                </View>

                {/* Contact Section */}
                <View
                    style={[
                        styles.contactCard,
                        { backgroundColor: colors.surface },
                    ]}
                >
                    <Text style={[styles.contactTitle, { color: colors.text }]}>
                        Questions about our policies?
                    </Text>
                    <Text
                        style={[
                            styles.contactText,
                            { color: colors.textSecondary },
                        ]}
                    >
                        Contact our privacy team at privacy@vaultbank.com
                    </Text>
                    <TouchableOpacity
                        style={[
                            styles.contactButton,
                            { backgroundColor: colors.primary },
                        ]}
                        activeOpacity={0.8}
                    >
                        <Text style={styles.contactButtonText}>
                            Contact Privacy Team
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* Version Info */}
                <Text style={[styles.versionText, { color: colors.textMuted }]}>
                    App Version 2.1.0 • Build 2026.03.12
                </Text>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
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
    scrollContent: {
        paddingHorizontal: 20,
        paddingBottom: 40,
    },
    securityBanner: {
        flexDirection: "row",
        alignItems: "center",
        padding: 20,
        borderRadius: 20,
        marginBottom: 24,
    },
    securityIcon: {
        width: 56,
        height: 56,
        borderRadius: 18,
        justifyContent: "center",
        alignItems: "center",
    },
    securityText: {
        marginLeft: 16,
        flex: 1,
    },
    securityTitle: {
        fontSize: 17,
        fontWeight: "700",
    },
    securitySubtitle: {
        fontSize: 14,
        marginTop: 4,
    },
    sectionTitle: {
        fontSize: 12,
        fontWeight: "700",
        letterSpacing: 0.5,
        marginBottom: 10,
        marginLeft: 4,
    },
    documentsCard: {
        borderRadius: 20,
        overflow: "hidden",
        marginBottom: 24,
    },
    documentItem: {
        flexDirection: "row",
        alignItems: "center",
        padding: 16,
    },
    documentIcon: {
        width: 48,
        height: 48,
        borderRadius: 14,
        justifyContent: "center",
        alignItems: "center",
    },
    documentContent: {
        flex: 1,
        marginLeft: 14,
        marginRight: 12,
    },
    documentTitle: {
        fontSize: 15,
        fontWeight: "700",
    },
    documentSubtitle: {
        fontSize: 13,
        marginTop: 2,
    },
    summaryCard: {
        borderRadius: 20,
        padding: 20,
        marginBottom: 24,
    },
    summaryTitle: {
        fontSize: 16,
        fontWeight: "700",
        marginBottom: 16,
    },
    summaryItem: {
        flexDirection: "row",
        marginBottom: 16,
    },
    summaryDot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        marginTop: 5,
        marginRight: 12,
    },
    summaryContent: {
        flex: 1,
    },
    summaryItemTitle: {
        fontSize: 14,
        fontWeight: "700",
        marginBottom: 2,
    },
    summaryItemText: {
        fontSize: 13,
        lineHeight: 18,
    },
    contactCard: {
        borderRadius: 20,
        padding: 20,
        marginBottom: 20,
    },
    contactTitle: {
        fontSize: 16,
        fontWeight: "700",
        marginBottom: 8,
    },
    contactText: {
        fontSize: 14,
        marginBottom: 16,
    },
    contactButton: {
        paddingVertical: 14,
        borderRadius: 14,
        alignItems: "center",
    },
    contactButtonText: {
        color: "#FFFFFF",
        fontSize: 15,
        fontWeight: "700",
    },
    versionText: {
        textAlign: "center",
        fontSize: 13,
    },
    documentDescription: {
        fontSize: 12,
        marginTop: 4,
        lineHeight: 16,
    },
});
