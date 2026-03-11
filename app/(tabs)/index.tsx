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
    Bell,
    ArrowUpRight,
    ArrowDownLeft,
    Eye,
    EyeOff,
    ChevronRight,
    Wallet,
} from "lucide-react-native";
import { useState, useCallback, memo } from "react";

import { useTheme } from "../../components/ui/ThemeProvider";
import {
    mockAccounts,
    mockTransactions,
    quickActions,
    mockUser,
    Transaction,
} from "../../constants/mockData";

const ActionButton = memo(
    ({
        icon: Icon,
        label,
        onPress,
        colors,
    }: {
        icon: typeof Wallet;
        label: string;
        onPress: () => void;
        colors: any;
    }) => (
        <TouchableOpacity
            style={styles.actionButton}
            onPress={onPress}
            activeOpacity={0.7}
        >
            <View
                style={[
                    styles.actionIconContainer,
                    { backgroundColor: colors.surfaceHighlight },
                ]}
            >
                <Icon size={22} color={colors.primary} />
            </View>
            <Text style={[styles.actionLabel, { color: colors.textSecondary }]}>
                {label}
            </Text>
        </TouchableOpacity>
    ),
);

const TransactionItem = memo(
    ({ item, colors }: { item: Transaction; colors: any }) => (
        <TouchableOpacity
            style={[
                styles.transactionItem,
                { borderBottomColor: colors.border },
            ]}
            activeOpacity={0.7}
        >
            <View
                style={[
                    styles.transactionIcon,
                    { backgroundColor: colors.surfaceHighlight },
                ]}
            >
                <Text style={styles.transactionIconText}>{item.title[0]}</Text>
            </View>
            <View style={styles.transactionInfo}>
                <Text style={[styles.transactionTitle, { color: colors.text }]}>
                    {item.title}
                </Text>
                <Text
                    style={[
                        styles.transactionSubtitle,
                        { color: colors.textMuted },
                    ]}
                >
                    {item.date}
                </Text>
            </View>
            <Text
                style={[
                    styles.transactionAmount,
                    {
                        color:
                            item.type === "income"
                                ? colors.success
                                : colors.text,
                    },
                ]}
            >
                {item.type === "income" ? "+" : "-"}
                {item.amount.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                })}
            </Text>
        </TouchableOpacity>
    ),
);

export default function HomeScreen() {
    const { colors } = useTheme();
    const router = useRouter();
    const [balanceVisible, setBalanceVisible] = useState(true);

    const totalBalance = mockAccounts.reduce(
        (sum, acc) => sum + acc.balance,
        0,
    );

    const toggleBalance = useCallback(() => {
        setBalanceVisible((prev) => !prev);
    }, []);

    const renderQuickActions = useCallback(
        () => (
            <View style={styles.actionsContainer}>
                {quickActions.map((action) => (
                    <ActionButton
                        key={action.id}
                        icon={Wallet}
                        label={action.name}
                        onPress={() => router.push("/transfer")}
                        colors={colors}
                    />
                ))}
            </View>
        ),
        [colors, router],
    );

    return (
        <SafeAreaView
            style={[styles.container, { backgroundColor: colors.background }]}
            edges={["top"]}
        >
            {/* Header */}
            <View style={styles.header}>
                <View style={styles.headerLeft}>
                    <View
                        style={[
                            styles.avatar,
                            { backgroundColor: colors.primary },
                        ]}
                    >
                        <Text style={styles.avatarText}>
                            {mockUser.name[0]}
                        </Text>
                    </View>
                    <View>
                        <Text
                            style={[
                                styles.greeting,
                                { color: colors.textSecondary },
                            ]}
                        >
                            Good morning,
                        </Text>
                        <Text style={[styles.userName, { color: colors.text }]}>
                            {mockUser.name.split(" ")[0]}
                        </Text>
                    </View>
                </View>
                <TouchableOpacity
                    style={[
                        styles.notificationBtn,
                        { backgroundColor: colors.surfaceHighlight },
                    ]}
                    activeOpacity={0.7}
                >
                    <Bell size={22} color={colors.text} />
                    <View
                        style={[
                            styles.notificationBadge,
                            { backgroundColor: colors.danger },
                        ]}
                    />
                </TouchableOpacity>
            </View>

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {/* Balance Card */}
                <View
                    style={[
                        styles.balanceCard,
                        { backgroundColor: colors.surface },
                    ]}
                >
                    <View style={styles.balanceHeader}>
                        <Text
                            style={[
                                styles.balanceLabel,
                                { color: colors.textSecondary },
                            ]}
                        >
                            Total Balance
                        </Text>
                        <TouchableOpacity
                            onPress={toggleBalance}
                            activeOpacity={0.7}
                        >
                            {balanceVisible ? (
                                <EyeOff
                                    size={20}
                                    color={colors.textSecondary}
                                />
                            ) : (
                                <Eye size={20} color={colors.textSecondary} />
                            )}
                        </TouchableOpacity>
                    </View>
                    <Text
                        style={[styles.balanceAmount, { color: colors.text }]}
                    >
                        {balanceVisible
                            ? totalBalance.toLocaleString("en-US", {
                                  style: "currency",
                                  currency: "USD",
                              })
                            : "••••••"}
                    </Text>

                    {/* Mini Stats */}
                    <View style={styles.miniStats}>
                        <View style={styles.statItem}>
                            <ArrowUpRight size={16} color={colors.success} />
                            <Text
                                style={[
                                    styles.statLabel,
                                    { color: colors.textMuted },
                                ]}
                            >
                                Income
                            </Text>
                            <Text
                                style={[
                                    styles.statValue,
                                    { color: colors.success },
                                ]}
                            >
                                +$8,420
                            </Text>
                        </View>
                        <View
                            style={[
                                styles.statDivider,
                                { backgroundColor: colors.border },
                            ]}
                        />
                        <View style={styles.statItem}>
                            <ArrowDownLeft size={16} color={colors.danger} />
                            <Text
                                style={[
                                    styles.statLabel,
                                    { color: colors.textMuted },
                                ]}
                            >
                                Expense
                            </Text>
                            <Text
                                style={[
                                    styles.statValue,
                                    { color: colors.danger },
                                ]}
                            >
                                -$2,845
                            </Text>
                        </View>
                    </View>
                </View>

                {/* Quick Actions */}
                {renderQuickActions()}

                {/* Recent Transactions */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Text
                            style={[
                                styles.sectionTitle,
                                { color: colors.text },
                            ]}
                        >
                            Recent Transactions
                        </Text>
                        <TouchableOpacity
                            style={styles.seeAllBtn}
                            onPress={() => router.push("/accounts")}
                            activeOpacity={0.7}
                        >
                            <Text
                                style={[
                                    styles.seeAllText,
                                    { color: colors.primary },
                                ]}
                            >
                                See All
                            </Text>
                            <ChevronRight size={16} color={colors.primary} />
                        </TouchableOpacity>
                    </View>
                    <View
                        style={[
                            styles.transactionsCard,
                            { backgroundColor: colors.surface },
                        ]}
                    >
                        {mockTransactions.slice(0, 5).map((item) => (
                            <TransactionItem
                                key={item.id}
                                item={item}
                                colors={colors}
                            />
                        ))}
                    </View>
                </View>
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
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingVertical: 16,
    },
    headerLeft: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
    },
    avatar: {
        width: 44,
        height: 44,
        borderRadius: 22,
        justifyContent: "center",
        alignItems: "center",
    },
    avatarText: {
        color: "#FFFFFF",
        fontSize: 18,
        fontWeight: "700",
    },
    greeting: {
        fontSize: 13,
    },
    userName: {
        fontSize: 17,
        fontWeight: "700",
    },
    notificationBtn: {
        width: 44,
        height: 44,
        borderRadius: 22,
        justifyContent: "center",
        alignItems: "center",
    },
    notificationBadge: {
        position: "absolute",
        top: 10,
        right: 10,
        width: 8,
        height: 8,
        borderRadius: 4,
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingBottom: 100,
    },
    balanceCard: {
        borderRadius: 24,
        padding: 24,
        marginTop: 8,
    },
    balanceHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    balanceLabel: {
        fontSize: 15,
        fontWeight: "500",
    },
    balanceAmount: {
        fontSize: 36,
        fontWeight: "800",
        marginTop: 12,
    },
    miniStats: {
        flexDirection: "row",
        marginTop: 24,
        paddingTop: 20,
        borderTopWidth: 1,
        borderTopColor: "rgba(255,255,255,0.05)",
    },
    statItem: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },
    statDivider: {
        width: 1,
        height: 30,
    },
    statLabel: {
        fontSize: 12,
    },
    statValue: {
        fontSize: 14,
        fontWeight: "700",
    },
    actionsContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 24,
    },
    actionButton: {
        alignItems: "center",
        gap: 8,
    },
    actionIconContainer: {
        width: 56,
        height: 56,
        borderRadius: 16,
        justifyContent: "center",
        alignItems: "center",
    },
    actionLabel: {
        fontSize: 12,
        fontWeight: "600",
    },
    section: {
        marginTop: 28,
    },
    sectionHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 16,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: "700",
    },
    seeAllBtn: {
        flexDirection: "row",
        alignItems: "center",
        gap: 2,
    },
    seeAllText: {
        fontSize: 14,
        fontWeight: "600",
    },
    transactionsCard: {
        borderRadius: 20,
        paddingHorizontal: 4,
    },
    transactionItem: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 14,
        paddingHorizontal: 16,
        borderBottomWidth: 1,
    },
    transactionIcon: {
        width: 48,
        height: 48,
        borderRadius: 14,
        justifyContent: "center",
        alignItems: "center",
    },
    transactionIconText: {
        fontSize: 18,
        fontWeight: "700",
        color: "#FFFFFF",
    },
    transactionInfo: {
        flex: 1,
        marginLeft: 14,
    },
    transactionTitle: {
        fontSize: 15,
        fontWeight: "600",
    },
    transactionSubtitle: {
        fontSize: 13,
        marginTop: 3,
    },
    transactionAmount: {
        fontSize: 15,
        fontWeight: "700",
    },
});
