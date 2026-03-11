import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { ArrowUpRight, ArrowDownLeft, ChevronRight, TrendingUp, PiggyBank, Briefcase } from 'lucide-react-native';
import { memo, useCallback } from 'react';

import { useTheme } from '../../components/ui/ThemeProvider';
import { mockAccounts, mockTransactions, Account, Transaction } from '../../constants/mockData';

const AccountCard = memo(({ account, colors }: { account: Account; colors: any }) => {
  const getIcon = useCallback(() => {
    switch (account.type) {
      case 'savings': return PiggyBank;
      case 'investment': return TrendingUp;
      default: return Briefcase;
    }
  }, [account.type]);

  const Icon = getIcon();

  return (
    <TouchableOpacity 
      style={[styles.accountCard, { backgroundColor: colors.surface }]}
      activeOpacity={0.8}
    >
      <View style={styles.accountHeader}>
        <View style={[styles.accountIcon, { backgroundColor: colors.surfaceHighlight }]}>
          <Icon size={24} color={colors.primary} />
        </View>
        <View style={styles.accountInfo}>
          <Text style={[styles.accountName, { color: colors.text }]}>{account.name}</Text>
          <Text style={[styles.accountNumber, { color: colors.textMuted }]}>{account.number}</Text>
        </View>
        <ChevronRight size={20} color={colors.textMuted} />
      </View>
      <View style={styles.accountBalance}>
        <Text style={[styles.balanceLabel, { color: colors.textSecondary }]}>Available Balance</Text>
        <Text style={[styles.balanceAmount, { color: colors.text }]}>
          {account.balance.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
        </Text>
      </View>
      <View style={[styles.accountProgress, { backgroundColor: colors.surfaceHighlight }]}>
        <View style={[styles.progressBar, { backgroundColor: colors.primary, width: '75%' }]} />
      </View>
    </TouchableOpacity>
  );
});

const TransactionItem = memo(({ item, colors }: { item: Transaction; colors: any }) => (
  <TouchableOpacity 
    style={[styles.transactionItem, { borderBottomColor: colors.border }]}
    activeOpacity={0.7}
  >
    <View style={[styles.transactionIcon, { backgroundColor: colors.surfaceHighlight }]}>
      <Text style={styles.transactionIconText}>{item.title[0]}</Text>
    </View>
    <View style={styles.transactionInfo}>
      <Text style={[styles.transactionTitle, { color: colors.text }]}>{item.title}</Text>
      <Text style={[styles.transactionSubtitle, { color: colors.textMuted }]}>{item.date}</Text>
    </View>
    <View style={styles.transactionRight}>
      <Text style={[
        styles.transactionAmount, 
        { color: item.type === 'income' ? colors.success : colors.text }
      ]}>
        {item.type === 'income' ? '+' : '-'}{item.amount.toLocaleString('en-US', { 
          style: 'currency', 
          currency: 'USD' 
        })}
      </Text>
      {item.type === 'income' ? (
        <ArrowUpRight size={14} color={colors.success} />
      ) : (
        <ArrowDownLeft size={14} color={colors.danger} />
      )}
    </View>
  </TouchableOpacity>
));

export default function AccountsScreen() {
  const { colors } = useTheme();

  const totalBalance = mockAccounts.reduce((sum, acc) => sum + acc.balance, 0);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: colors.text }]}>My Accounts</Text>
        <View style={[styles.totalBadge, { backgroundColor: colors.surfaceHighlight }]}>
          <Text style={[styles.totalBadgeText, { color: colors.primary }]}>
            {totalBalance.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })}
          </Text>
        </View>
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Accounts List */}
        <View style={styles.accountsContainer}>
          {mockAccounts.map((account) => (
            <AccountCard key={account.id} account={account} colors={colors} />
          ))}
        </View>

        {/* Add Account Button */}
        <TouchableOpacity 
          style={[styles.addButton, { borderColor: colors.border }]}
          activeOpacity={0.7}
        >
          <Text style={[styles.addButtonText, { color: colors.primary }]}>+ Add New Account</Text>
        </TouchableOpacity>

        {/* All Transactions */}
        <View style={styles.transactionsSection}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>All Transactions</Text>
          <View style={[styles.transactionsCard, { backgroundColor: colors.surface }]}>
            {mockTransactions.map((item) => (
              <TransactionItem key={item.id} item={item} colors={colors} />
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '800',
  },
  totalBadge: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
  },
  totalBadgeText: {
    fontSize: 14,
    fontWeight: '700',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  accountsContainer: {
    gap: 16,
  },
  accountCard: {
    borderRadius: 24,
    padding: 20,
  },
  accountHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  accountIcon: {
    width: 50,
    height: 50,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  accountInfo: {
    flex: 1,
    marginLeft: 14,
  },
  accountName: {
    fontSize: 16,
    fontWeight: '700',
  },
  accountNumber: {
    fontSize: 13,
    marginTop: 3,
  },
  accountBalance: {
    marginTop: 20,
  },
  balanceLabel: {
    fontSize: 13,
  },
  balanceAmount: {
    fontSize: 26,
    fontWeight: '800',
    marginTop: 4,
  },
  accountProgress: {
    height: 4,
    borderRadius: 2,
    marginTop: 16,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    borderRadius: 2,
  },
  addButton: {
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderRadius: 16,
    paddingVertical: 18,
    alignItems: 'center',
    marginTop: 16,
  },
  addButtonText: {
    fontSize: 15,
    fontWeight: '600',
  },
  transactionsSection: {
    marginTop: 28,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 16,
  },
  transactionsCard: {
    borderRadius: 20,
    paddingHorizontal: 4,
  },
  transactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
  },
  transactionIcon: {
    width: 48,
    height: 48,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  transactionIconText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  transactionInfo: {
    flex: 1,
    marginLeft: 14,
  },
  transactionTitle: {
    fontSize: 15,
    fontWeight: '600',
  },
  transactionSubtitle: {
    fontSize: 13,
    marginTop: 3,
  },
  transactionRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  transactionAmount: {
    fontSize: 15,
    fontWeight: '700',
  },
});
