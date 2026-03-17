import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { X, Download, Share2, FileText, HelpCircle } from 'lucide-react-native';

import { useTheme } from '../components/ui/ThemeProvider';
import { mockTransactions } from '../constants/mockData';

export default function TransactionDetailsScreen() {
  const router = useRouter();
  const { colors } = useTheme();
  const { id } = useLocalSearchParams<{ id: string }>();

  const transaction = mockTransactions.find(tx => tx.id === id);
  if (!transaction) {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Transaction not found</Text>
      </SafeAreaView>
    );
  }

  const isIncome = transaction.type === "income";

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={["top"]}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Transaction</Text>
        <TouchableOpacity 
          style={[styles.closeButton, { backgroundColor: colors.surfaceHighlight }]} 
          onPress={() => router.back()}
        >
          <X size={24} color={colors.text} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Amount Section */}
        <View style={[styles.amountCard, { backgroundColor: colors.surface }]}>
          <View style={[styles.iconContainer, { backgroundColor: isIncome ? `${colors.success}20` : `${colors.primary}20` }]}>
            <Text style={[styles.iconText, { color: isIncome ? colors.success : colors.primary }]}>
              {transaction.title[0]}
            </Text>
          </View>
          <Text style={[styles.merchant, { color: colors.text }]}>{transaction.title}</Text>
          <Text style={[styles.category, { color: colors.textSecondary }]}>{transaction.category}</Text>
          <Text style={[styles.amount, { color: isIncome ? colors.success : colors.text }]}>
            {isIncome ? "+" : "-"}{transaction.amount.toLocaleString("en-US", { style: "currency", currency: "USD" })}
          </Text>
          <View style={[styles.statusBadge, { backgroundColor: isIncome ? `${colors.success}20` : `${colors.primary}20` }]}>
            <Text style={[styles.statusText, { color: isIncome ? colors.success : colors.primary }]}>Completed</Text>
          </View>
        </View>

        {/* Details */}
        <View style={[styles.detailsCard, { backgroundColor: colors.surface }]}>
          <View style={styles.detailRow}>
            <Text style={[styles.detailLabel, { color: colors.textSecondary }]}>Transaction ID</Text>
            <Text style={[styles.detailValue, { color: colors.text }]}>{transaction.id}</Text>
          </View>
          <View style={[styles.detailRow, { borderTopColor: colors.border }]}>
            <Text style={[styles.detailLabel, { color: colors.textSecondary }]}>Date & Time</Text>
            <Text style={[styles.detailValue, { color: colors.text }]}>{transaction.date}</Text>
          </View>
          <View style={[styles.detailRow, { borderTopColor: colors.border }]}>
            <Text style={[styles.detailLabel, { color: colors.textSecondary }]}>Payment Method</Text>
            <Text style={[styles.detailValue, { color: colors.text }]}>{transaction.type === "income" ? "Bank Deposit" : "Visa •••• 4582"}</Text>
          </View>
          <View style={[styles.detailRow, { borderTopColor: colors.border }]}>
            <Text style={[styles.detailLabel, { color: colors.textSecondary }]}>Description</Text>
            <Text style={[styles.detailValue, { color: colors.text }]}>{transaction.subtitle}</Text>
          </View>
        </View>

        {/* Actions */}
        <View style={styles.actionsContainer}>
          <TouchableOpacity style={[styles.actionBtn, { backgroundColor: colors.surface }]}>
            <Download size={22} color={colors.text} />
            <Text style={[styles.actionText, { color: colors.text }]}>Download Receipt</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={[styles.actionBtn, { backgroundColor: colors.surface }]}>
            <Share2 size={22} color={colors.text} />
            <Text style={[styles.actionText, { color: colors.text }]}>Share</Text>
          </TouchableOpacity>
        </View>

        {/* Help */}
        <TouchableOpacity style={[styles.helpCard, { backgroundColor: colors.surface }]}>
          <View style={styles.helpContent}>
            <FileText size={22} color={colors.primary} />
            <View style={styles.helpTextContainer}>
              <Text style={[styles.helpTitle, { color: colors.text }]}>Report an Issue</Text>
              <Text style={[styles.helpSubtitle, { color: colors.textMuted }]}>Something wrong with this transaction?</Text>
            </View>
          </View>
          <HelpCircle size={20} color={colors.textMuted} />
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  amountCard: {
    borderRadius: 24,
    padding: 28,
    alignItems: 'center',
  },
  iconContainer: {
    width: 72,
    height: 72,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  iconText: {
    fontSize: 32,
    fontWeight: '700',
  },
  merchant: {
    fontSize: 22,
    fontWeight: '700',
  },
  category: {
    fontSize: 15,
    marginTop: 4,
  },
  amount: {
    fontSize: 36,
    fontWeight: '800',
    marginTop: 20,
  },
  statusBadge: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginTop: 16,
  },
  statusText: {
    fontSize: 14,
    fontWeight: '700',
  },
  detailsCard: {
    borderRadius: 20,
    overflow: 'hidden',
    marginTop: 20,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderTopWidth: 1,
  },
  detailLabel: {
    fontSize: 15,
  },
  detailValue: {
    fontSize: 15,
    fontWeight: '600',
  },
  actionsContainer: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 20,
  },
  actionBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    paddingVertical: 16,
    borderRadius: 16,
  },
  actionText: {
    fontSize: 14,
    fontWeight: '600',
  },
  helpCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    borderRadius: 16,
    marginTop: 20,
  },
  helpContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  helpTextContainer: {
    gap: 2,
  },
  helpTitle: {
    fontSize: 15,
    fontWeight: '600',
  },
  helpSubtitle: {
    fontSize: 13,
  },
});
