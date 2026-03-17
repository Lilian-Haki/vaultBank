import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../../components/ui/ThemeProvider";
import { mockTransactions } from "../../constants/mockData";

export default function TransactionDetailsScreen() {
  const { id } = useLocalSearchParams();
  const { colors } = useTheme();

  const transaction = mockTransactions.find((tx) => tx.id === id);

  if (!transaction) {
    return (
      <View style={styles.center}>
        <Text>Transaction not found</Text>
      </View>
    );
  }

  const isIncome = transaction.type === "income";

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <View style={[styles.card, { backgroundColor: colors.surface }]}>
          <Text style={[styles.title, { color: colors.text }]}>
            {transaction.title}
          </Text>

          <Text style={[styles.category, { color: colors.textSecondary }]}>
            {transaction.category}
          </Text>

          <Text
            style={[
              styles.amount,
              { color: isIncome ? colors.success : colors.text },
            ]}
          >
            {isIncome ? "+" : "-"}$
            {transaction.amount.toLocaleString()}
          </Text>

          <View style={styles.row}>
            <Text style={{ color: colors.textSecondary }}>Transaction ID</Text>
            <Text style={{ color: colors.text }}>{transaction.id}</Text>
          </View>

          <View style={styles.row}>
            <Text style={{ color: colors.textSecondary }}>Date</Text>
            <Text style={{ color: colors.text }}>{transaction.date}</Text>
          </View>

          <View style={styles.row}>
            <Text style={{ color: colors.textSecondary }}>Description</Text>
            <Text style={{ color: colors.text }}>{transaction.subtitle}</Text>
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
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    padding: 24,
    borderRadius: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
  },
  category: {
    fontSize: 14,
    marginTop: 4,
  },
  amount: {
    fontSize: 32,
    fontWeight: "800",
    marginVertical: 16,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
  },
});