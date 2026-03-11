import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useState, useCallback } from 'react';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { X, ChevronRight, Wallet, Building2, User } from 'lucide-react-native';

import { useTheme } from '../components/ui/ThemeProvider';
import { mockAccounts } from '../constants/mockData';

interface TransferMethod {
  id: string;
  name: string;
  icon: typeof Wallet;
  description: string;
}

const transferMethods: TransferMethod[] = [
  { id: '1', name: 'Bank Transfer', icon: Building2, description: 'Send to another bank account' },
  { id: '2', name: 'Internal Transfer', icon: Wallet, description: 'Between your accounts' },
  { id: '3', name: 'Send to Contact', icon: User, description: 'Send to saved contacts' },
];

const quickAmounts = [50, 100, 200, 500, 1000];

export default function TransferScreen() {
  const router = useRouter();
  const { colors } = useTheme();
  const [amount, setAmount] = useState('');
  const [selectedMethod, setSelectedMethod] = useState<string>('1');
  const [recipient, setRecipient] = useState('');
  const [note, setNote] = useState('');

  const handleAmountPress = useCallback((value: number) => {
    setAmount(value.toString());
  }, []);

  const handleTransfer = useCallback(() => {
    if (!amount || parseFloat(amount) <= 0) {
      Alert.alert('Error', 'Please enter a valid amount');
      return;
    }
    if (!recipient) {
      Alert.alert('Error', 'Please enter recipient details');
      return;
    }

    Alert.alert(
      'Confirm Transfer',
      `Send $${amount} to ${recipient}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Confirm', 
          onPress: () => {
            Alert.alert('Success', 'Transfer completed successfully!');
            router.back();
          }
        },
      ]
    );
  }, [amount, recipient, router]);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Send Money</Text>
        <TouchableOpacity 
          style={[styles.closeButton, { backgroundColor: colors.surfaceHighlight }]} 
          onPress={() => router.back()}
        >
          <X size={24} color={colors.text} />
        </TouchableOpacity>
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Amount Section */}
        <View style={[styles.amountCard, { backgroundColor: colors.surface }]}>
          <Text style={[styles.amountLabel, { color: colors.textSecondary }]}>
            Enter Amount
          </Text>
          <View style={styles.amountInputContainer}>
            <Text style={[styles.currencySymbol, { color: colors.text }]}>$</Text>
            <TextInput
              style={[styles.amountInput, { color: colors.text }]}
              value={amount}
              onChangeText={setAmount}
              keyboardType="decimal-pad"
              placeholder="0.00"
              placeholderTextColor={colors.textMuted}
              maxLength={10}
            />
          </View>
          <Text style={[styles.balanceText, { color: colors.textMuted }]}>
            Available: {mockAccounts[0].balance.toLocaleString('en-US', { 
              style: 'currency', 
              currency: 'USD' 
            })}
          </Text>
        </View>

        {/* Quick Amounts */}
        <View style={styles.quickAmountsContainer}>
          {quickAmounts.map((value) => (
            <TouchableOpacity
              key={value}
              style={[
                styles.quickAmountBtn,
                { backgroundColor: amount === value.toString() ? colors.primary : colors.surface },
              ]}
              onPress={() => handleAmountPress(value)}
            >
              <Text style={[
                styles.quickAmountText,
                { color: amount === value.toString() ? '#FFFFFF' : colors.text }
              ]}>
                ${value}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Transfer Method */}
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Transfer Method</Text>
        <View style={[styles.methodsCard, { backgroundColor: colors.surface }]}>
          {transferMethods.map((method) => {
            const Icon = method.icon;
            const isSelected = selectedMethod === method.id;
            
            return (
              <TouchableOpacity
                key={method.id}
                style={[
                  styles.methodItem,
                  { borderBottomColor: colors.border },
                  isSelected && { backgroundColor: colors.surfaceHighlight }
                ]}
                onPress={() => setSelectedMethod(method.id)}
              >
                <View style={[styles.methodIcon, { backgroundColor: isSelected ? colors.primary : colors.surfaceHighlight }]}>
                  <Icon size={22} color={isSelected ? '#FFFFFF' : colors.primary} />
                </View>
                <View style={styles.methodInfo}>
                  <Text style={[styles.methodName, { color: colors.text }]}>
                    {method.name}
                  </Text>
                  <Text style={[styles.methodDesc, { color: colors.textMuted }]}>
                    {method.description}
                  </Text>
                </View>
                <View style={[
                  styles.radioBtn,
                  { borderColor: isSelected ? colors.primary : colors.border },
                  isSelected && { backgroundColor: colors.primary }
                ]}>
                  {isSelected && <View style={styles.radioInner} />}
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Recipient */}
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Recipient</Text>
        <View style={[styles.inputCard, { backgroundColor: colors.surface }]}>
          <TextInput
            style={[styles.textInput, { color: colors.text }]}
            value={recipient}
            onChangeText={setRecipient}
            placeholder="Account number or email"
            placeholderTextColor={colors.textMuted}
          />
        </View>

        {/* Note */}
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Note (Optional)</Text>
        <View style={[styles.inputCard, { backgroundColor: colors.surface }]}>
          <TextInput
            style={[styles.textInput, { color: colors.text }]}
            value={note}
            onChangeText={setNote}
            placeholder="Add a note..."
            placeholderTextColor={colors.textMuted}
            multiline
            numberOfLines={2}
          />
        </View>

        {/* Transfer Button */}
        <TouchableOpacity
          style={[
            styles.transferButton,
            { backgroundColor: colors.primary },
            (!amount || !recipient) && { opacity: 0.5 }
          ]}
          onPress={handleTransfer}
          disabled={!amount || !recipient}
        >
          <Text style={styles.transferButtonText}>Send Money</Text>
          <ChevronRight size={20} color="#FFFFFF" />
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
    padding: 24,
    alignItems: 'center',
  },
  amountLabel: {
    fontSize: 15,
    fontWeight: '600',
  },
  amountInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
  },
  currencySymbol: {
    fontSize: 40,
    fontWeight: '600',
    marginRight: 8,
  },
  amountInput: {
    fontSize: 48,
    fontWeight: '800',
    minWidth: 150,
    textAlign: 'center',
  },
  balanceText: {
    fontSize: 14,
    marginTop: 12,
  },
  quickAmountsContainer: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 20,
    marginBottom: 28,
  },
  quickAmountBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  quickAmountText: {
    fontSize: 14,
    fontWeight: '700',
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '700',
    marginBottom: 12,
    marginTop: 8,
  },
  methodsCard: {
    borderRadius: 20,
    overflow: 'hidden',
  },
  methodItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
  },
  methodIcon: {
    width: 44,
    height: 44,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  methodInfo: {
    flex: 1,
    marginLeft: 14,
  },
  methodName: {
    fontSize: 15,
    fontWeight: '600',
  },
  methodDesc: {
    fontSize: 13,
    marginTop: 2,
  },
  radioBtn: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#FFFFFF',
  },
  inputCard: {
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  textInput: {
    fontSize: 16,
    fontWeight: '500',
  },
  transferButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 32,
    paddingVertical: 18,
    borderRadius: 16,
  },
  transferButtonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '700',
  },
});
