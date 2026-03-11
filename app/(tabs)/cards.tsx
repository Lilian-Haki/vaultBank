import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Plus, Eye, EyeOff, Lock, Settings2 } from 'lucide-react-native';
import { useState, useCallback, memo } from 'react';

import { useTheme } from '../../components/ui/ThemeProvider';
import { mockCards, Card } from '../../constants/mockData';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width - 40;
const CARD_HEIGHT = CARD_WIDTH * 0.6;

const CardComponent = memo(({ card, visible }: { card: Card; visible: boolean }) => {
  return (
    <View style={[styles.cardContainer, { backgroundColor: card.color }]}>
      <View style={styles.cardOverlay}>
        {/* Card Header */}
        <View style={styles.cardHeader}>
          <View style={styles.cardChip}>
            <View style={styles.chipInner} />
          </View>
          <Text style={styles.cardBrand}>{card.brand.toUpperCase()}</Text>
        </View>

        {/* Card Number */}
        <View style={styles.cardNumber}>
          <Text style={styles.cardNumberText}>
            {visible ? card.number : '•••• •••• •••• ' + card.number.slice(-4)}
          </Text>
        </View>

        {/* Card Footer */}
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

      {/* Gradient Overlay */}
      <View style={[styles.gradientOverlay, { backgroundColor: card.color }]}>
        <View style={styles.gradient1} />
        <View style={styles.gradient2} />
      </View>
    </View>
  );
});

const CardActions = memo(({ card, colors }: { card: Card; colors: any }) => {
  const isCredit = card.type === 'credit';
  const usedPercentage = isCredit ? (card.balance / card.limit) * 100 : 0;

  return (
    <View style={[styles.cardActions, { backgroundColor: colors.surface }]}>
      <View style={styles.balanceRow}>
        <View>
          <Text style={[styles.actionLabel, { color: colors.textSecondary }]}>
            {isCredit ? 'Current Balance' : 'Available'}
          </Text>
          <Text style={[styles.actionValue, { color: colors.text }]}>
            ${card.balance.toLocaleString()}
          </Text>
        </View>
        {isCredit && (
          <View style={{ alignItems: 'flex-end' }}>
            <Text style={[styles.actionLabel, { color: colors.textSecondary }]}>Credit Limit</Text>
            <Text style={[styles.actionValue, { color: colors.text }]}>
              ${card.limit.toLocaleString()}
            </Text>
          </View>
        )}
      </View>

      {isCredit && (
        <View style={styles.progressContainer}>
          <View style={[styles.progressBar, { backgroundColor: colors.surfaceHighlight }]}>
            <View 
              style={[
                styles.progressFill, 
                { 
                  backgroundColor: usedPercentage > 80 ? colors.danger : colors.primary,
                  width: `${usedPercentage}%` 
                }
              ]} 
            />
          </View>
          <Text style={[styles.progressText, { color: colors.textMuted }]}>
            {usedPercentage.toFixed(0)}% used
          </Text>
        </View>
      )}

      <View style={styles.actionButtons}>
        <TouchableOpacity style={[styles.actionBtn, { backgroundColor: colors.surfaceHighlight }]}>
          <Settings2 size={20} color={colors.text} />
          <Text style={[styles.actionBtnText, { color: colors.text }]}>Settings</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionBtn, { backgroundColor: colors.surfaceHighlight }]}>
          <Lock size={20} color={colors.text} />
          <Text style={[styles.actionBtnText, { color: colors.text }]}>Freeze</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
});

export default function CardsScreen() {
  const { colors } = useTheme();

  const [visible, setVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const toggleVisibility = useCallback(() => {
    setVisible(prev => !prev);
  }, []);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: colors.text }]}>My Cards</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity 
            style={[styles.iconBtn, { backgroundColor: colors.surfaceHighlight }]} 
            onPress={toggleVisibility}
          >
            {visible ? <EyeOff size={20} color={colors.text} /> : <Eye size={20} color={colors.text} />}
          </TouchableOpacity>
          <TouchableOpacity style={[styles.iconBtn, { backgroundColor: colors.primary }]}>
            <Plus size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Cards Carousel */}
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={(e) => {
            const index = Math.round(e.nativeEvent.contentOffset.x / (CARD_WIDTH + 20));
            setActiveIndex(index);
          }}
          contentContainerStyle={styles.cardsCarousel}
        >
          {mockCards.map((card) => (
            <CardComponent key={card.id} card={card} visible={visible} />
          ))}
        </ScrollView>

        {/* Pagination Dots */}
        <View style={styles.pagination}>
          {mockCards.map((_, index) => (
            <View 
              key={index}
              style={[
                styles.dot,
                { 
                  backgroundColor: index === activeIndex ? colors.primary : colors.surfaceHighlight,
                  width: index === activeIndex ? 24 : 8,
                }
              ]}
            />
          ))}
        </View>

        {/* Active Card Actions */}
        <CardActions card={mockCards[activeIndex]} colors={colors} />

        {/* Card Benefits */}
        <View style={styles.benefitsSection}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Card Benefits</Text>
          <View style={[styles.benefitsCard, { backgroundColor: colors.surface }]}>
            {[
              { title: 'Cashback', desc: '2% on all purchases', icon: '💰' },
              { title: 'Travel Insurance', desc: 'Included with credit card', icon: '✈️' },
              { title: 'Lounge Access', desc: 'Airport lounges worldwide', icon: '☕' },
            ].map((benefit, index) => (
              <View key={index} style={[styles.benefitItem, index < 2 && { borderBottomWidth: 1, borderBottomColor: colors.border }]}>
                <Text style={styles.benefitIcon}>{benefit.icon}</Text>
                <View style={styles.benefitContent}>
                  <Text style={[styles.benefitTitle, { color: colors.text }]}>{benefit.title}</Text>
                  <Text style={[styles.benefitDesc, { color: colors.textSecondary }]}>{benefit.desc}</Text>
                </View>
              </View>
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
  headerActions: {
    flexDirection: 'row',
    gap: 12,
  },
  iconBtn: {
    width: 44,
    height: 44,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContent: {
    paddingBottom: 100,
  },
  cardsCarousel: {
    paddingHorizontal: 20,
    gap: 20,
  },
  cardContainer: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: 24,
    overflow: 'hidden',
    position: 'relative',
  },
  cardOverlay: {
    flex: 1,
    padding: 24,
    zIndex: 10,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardChip: {
    width: 48,
    height: 36,
    backgroundColor: '#F0C040',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chipInner: {
    width: 32,
    height: 24,
    borderWidth: 1.5,
    borderColor: '#C9A030',
    borderRadius: 4,
  },
  cardBrand: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
    opacity: 0.9,
  },
  cardNumber: {
    marginTop: 40,
  },
  cardNumberText: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '600',
    letterSpacing: 2,
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
    letterSpacing: 0.5,
  },
  cardValue: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    marginTop: 4,
  },
  gradientOverlay: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.3,
  },
  gradient1: {
    position: 'absolute',
    top: -50,
    right: -50,
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  gradient2: {
    position: 'absolute',
    bottom: -80,
    left: -80,
    width: 250,
    height: 250,
    borderRadius: 125,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    marginTop: 20,
  },
  dot: {
    height: 8,
    borderRadius: 4,
  },
  cardActions: {
    marginHorizontal: 20,
    marginTop: 24,
    borderRadius: 24,
    padding: 20,
  },
  balanceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionLabel: {
    fontSize: 13,
  },
  actionValue: {
    fontSize: 22,
    fontWeight: '800',
    marginTop: 4,
  },
  progressContainer: {
    marginTop: 16,
  },
  progressBar: {
    height: 6,
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  progressText: {
    fontSize: 12,
    marginTop: 6,
    textAlign: 'right',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 20,
  },
  actionBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 14,
    borderRadius: 14,
  },
  actionBtnText: {
    fontSize: 14,
    fontWeight: '600',
  },
  benefitsSection: {
    marginTop: 28,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 16,
  },
  benefitsCard: {
    borderRadius: 20,
    overflow: 'hidden',
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  benefitIcon: {
    fontSize: 28,
    marginRight: 14,
  },
  benefitContent: {
    flex: 1,
  },
  benefitTitle: {
    fontSize: 15,
    fontWeight: '600',
  },
  benefitDesc: {
    fontSize: 13,
    marginTop: 2,
  },
});
