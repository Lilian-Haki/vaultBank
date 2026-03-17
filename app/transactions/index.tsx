import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    StyleSheet,
} from "react-native";
import { useRouter } from "expo-router";
import { mockTransactions } from "../../constants/mockData";
import { useTheme } from "../../components/ui/ThemeProvider";

export default function TransactionsScreen() {
    const router = useRouter();
    const { colors } = useTheme();

    const renderItem = ({ item }) => {
        const isIncome = item.type === "income";

        return (
            <TouchableOpacity
                style={[
                    styles.transactionCard,
                    { backgroundColor: colors.surface },
                ]}
                onPress={() => router.push(`/transactions/${item.id}`)}
            >
                <View>
                    <Text style={[styles.title, { color: colors.text }]}>
                        {item.title}
                    </Text>
                    <Text
                        style={[
                            styles.subtitle,
                            { color: colors.textSecondary },
                        ]}
                    >
                        {item.subtitle}
                    </Text>
                </View>

                <Text
                    style={[
                        styles.amount,
                        { color: isIncome ? colors.success : colors.text },
                    ]}
                >
                    {isIncome ? "+" : "-"}${item.amount.toLocaleString()}
                </Text>
            </TouchableOpacity>
        );
    };

    return (
        <View
            style={[styles.container, { backgroundColor: colors.background }]}
        >
            <FlatList
                data={mockTransactions}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                contentContainerStyle={{ padding: 20 }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    transactionCard: {
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 16,
        borderRadius: 16,
        marginBottom: 12,
    },
    title: {
        fontSize: 16,
        fontWeight: "600",
    },
    subtitle: {
        fontSize: 13,
        marginTop: 2,
    },
    amount: {
        fontSize: 16,
        fontWeight: "700",
    },
});
