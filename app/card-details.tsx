import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { X, Copy, Eye, EyeOff, Lock, Unlock, Trash2 } from 'lucide-react-native';
import { useState } from 'react';

import { useTheme } from '../components/ui/ThemeProvider';
import { mockCards } from '../constants/mockData';

export default function CardDetailsScreen() {
  const router = useRouter();
  const { colors } = useTheme();
  const [showDetails, setShowDetails] = useState(false);
  const [isFrozen, setIsFrozen] = useState(false);
  
  const card = mockCards[0];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Card Details</Text>
        <TouchableOpacity 
          style={[styles.closeButton, { backgroundColor: colors.surfaceHighlight }]} 
          onPress={() => router.back()}
        >
          <X size={24} color={colors.text} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Card Preview */}
        <View style={[styles.cardPreview, { backgroundColor: card.color }]}>
          <Text style={styles.cardType}>{card.brand.toUpperCase()}</Text>
          <Text style={styles.cardNumber}>
            {showDetails ? card.number : '•••• •••• •••• ' + card.number.slice(-4)}
          </Text>
          <View style={styles.cardFooter}>
            <View>
              <Text style={styles.cardLabel}>Card Holder</Text>
              <Text style={styles.cardValue}>{card.holder}</Text>
            </View>
            <View>
              <Text style={styles.cardLabel}>Expires</Text>
              <Text style={styles.cardValue}>{card.expiry}</Text>
            </View>
          </View>
        </View>

        {/* Actions */}
        <View style={[styles.actionsCard, { backgroundColor: colors.surface }]}>
          <TouchableOpacity 
            style={styles.actionItem}
            onPress={() => setShowDetails(!showDetails)}
          >
            {showDetails ? <EyeOff size={22} color={colors.text} /> : <Eye size={22} color={colors.text} />}
            <Text style={[styles.actionText, { color: colors.text }]}>
              {showDetails ? 'Hide Details' : 'Show Details'}
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionItem}>
            <Copy size={22} color={colors.text} />
            <Text style={[styles.actionText, { color: colors.text }]}>Copy Card Number</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.actionItem}
            onPress={() => setIsFrozen(!isFrozen)}
          >
            {isFrozen ? <Unlock size={22} color={colors.warning} /> : <Lock size={22} color={colors.text} />}
            <Text style={[styles.actionText, { color: isFrozen ? colors.warning : colors.text }]}>
              {isFrozen ? 'Unfreeze Card' : 'Freeze Card'}
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={[styles.actionItem, styles.dangerItem]}>
            <Trash2 size={22} color={colors.danger} />
            <Text style={[styles.actionText, { color: colors.danger }]}>Remove Card</Text>
          </TouchableOpacity>
        </View>

        {/* Limits */}
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Spending Limits</Text>
        <View style={[styles.limitsCard, { backgroundColor: colors.surface }]}>
          <View style={styles.limitRow}>
            <Text style={[styles.limitLabel, { color: colors.textSecondary }]}>Daily Limit</Text>
            <Text style={[styles.limitValue, { color: colors.text }]}>$5,000</Text>
          </View>
          <View style={[styles.limitRow, { borderTopColor: colors.border }]}>
            <Text style={[styles.limitLabel, { color: colors.textSecondary }]}>Monthly Limit</Text>
            <Text style={[styles.limitValue, { color: colors.text }]}>$50,000</Text>
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
  cardPreview: {
    height: 200,
    borderRadius: 20,
    padding: 24,
    marginBottom: 24,
  },
  cardType: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
    opacity: 0.9,
  },
  cardNumber: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '600',
    letterSpacing: 2,
    marginTop: 40,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 'auto',
  },
  cardLabel: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 11,
    textTransform: 'uppercase',
  },
  cardValue: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    marginTop: 4,
  },
  actionsCard: {
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 24,
  },
  actionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  dangerItem: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(239,68,68,0.2)',
  },
  actionText: {
    fontSize: 15,
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '700',
    marginBottom: 12,
  },
  limitsCard: {
    borderRadius: 20,
    overflow: 'hidden',
  },
  limitRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderTopWidth: 1,
  },
  limitLabel: {
    fontSize: 15,
  },
  limitValue: {
    fontSize: 15,
    fontWeight: '700',
  },
});
