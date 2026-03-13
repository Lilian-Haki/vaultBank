import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { 
  ArrowLeft, 
  Shield, 
  Fingerprint, 
  Key, 
  Smartphone,
  ChevronRight,
  Lock,
  Eye,
  EyeOff
} from 'lucide-react-native';
import { useState } from 'react';

import { useTheme } from '../../components/ui/ThemeProvider';

export default function SecurityScreen() {
  const router = useRouter();
  const { colors } = useTheme();
  
  const [biometricEnabled, setBiometricEnabled] = useState(true);
  const [hideBalance, setHideBalance] = useState(false);
  const [transactionPin, setTransactionPin] = useState(true);

  const securityOptions = [
    {
      id: 'password',
      icon: Key,
      title: 'Change Password',
      subtitle: 'Last changed 2 months ago',
      hasArrow: true,
    },
    {
      id: 'pin',
      icon: Lock,
      title: 'Change PIN',
      subtitle: '****',
      hasArrow: true,
    },
    {
      id: '2fa',
      icon: Shield,
      title: 'Two-Factor Authentication',
      subtitle: 'Enabled',
      hasArrow: true,
      badge: 'Active',
    },
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => router.back()}
          style={[styles.backButton, { backgroundColor: colors.surfaceHighlight }]}
          activeOpacity={0.7}
        >
          <ArrowLeft size={22} color={colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Security</Text>
        <View style={{ width: 44 }} />
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Security Score */}
        <View style={[styles.scoreCard, { backgroundColor: colors.primary + '15' }]}>
          <View style={styles.scoreContent}>
            <View style={[styles.scoreIcon, { backgroundColor: colors.primary + '30' }]}>
              <Shield size={32} color={colors.primary} />
            </View>
            <View style={styles.scoreText}>
              <Text style={[styles.scoreTitle, { color: colors.text }]}>Security Score</Text>
              <Text style={[styles.scoreValue, { color: colors.primary }]}>85/100</Text>
            </View>
          </View>
          <View style={styles.scoreBar}>
            <View style={[styles.scoreProgress, { 
              backgroundColor: colors.primary, 
              width: '85%' 
            }]} />
          </View>
          <Text style={[styles.scoreHint, { color: colors.textSecondary }]}>
            Enable all security features for maximum protection
          </Text>
        </View>

        {/* Toggle Settings */}
        <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>SECURITY FEATURES</Text>
        
        <View style={[styles.toggleCard, { backgroundColor: colors.surface }]}>
          <View style={styles.toggleItem}>
            <View style={[styles.toggleIcon, { backgroundColor: colors.primary + '20' }]}>
              <Fingerprint size={20} color={colors.primary} />
            </View>
            <View style={styles.toggleContent}>
              <Text style={[styles.toggleTitle, { color: colors.text }]}>Biometric Login</Text>
              <Text style={[styles.toggleSubtitle, { color: colors.textMuted }]}>
                Use fingerprint or face ID
              </Text>
            </View>
            <Switch
              value={biometricEnabled}
              onValueChange={setBiometricEnabled}
              trackColor={{ false: colors.border, true: colors.primary + '80' }}
              thumbColor={biometricEnabled ? colors.primary : colors.textMuted}
            />
          </View>
          
          <View style={[styles.divider, { backgroundColor: colors.border }]} />
          
          <View style={styles.toggleItem}>
            <View style={[styles.toggleIcon, { backgroundColor: colors.accent + '20' }]}>
              {hideBalance ? (
                <EyeOff size={20} color={colors.accent} />
              ) : (
                <Eye size={20} color={colors.accent} />
              )}
            </View>
            <View style={styles.toggleContent}>
              <Text style={[styles.toggleTitle, { color: colors.text }]}>Hide Balance</Text>
              <Text style={[styles.toggleSubtitle, { color: colors.textMuted }]}>
                Mask balance amounts
              </Text>
            </View>
            <Switch
              value={hideBalance}
              onValueChange={setHideBalance}
              trackColor={{ false: colors.border, true: colors.primary + '80' }}
              thumbColor={hideBalance ? colors.primary : colors.textMuted}
            />
          </View>
          
          <View style={[styles.divider, { backgroundColor: colors.border }]} />
          
          <View style={styles.toggleItem}>
            <View style={[styles.toggleIcon, { backgroundColor: colors.info + '20' }]}>
              <Smartphone size={20} color={colors.info} />
            </View>
            <View style={styles.toggleContent}>
              <Text style={[styles.toggleTitle, { color: colors.text }]}>Transaction PIN</Text>
              <Text style={[styles.toggleSubtitle, { color: colors.textMuted }]}>
                Require PIN for transactions
              </Text>
            </View>
            <Switch
              value={transactionPin}
              onValueChange={setTransactionPin}
              trackColor={{ false: colors.border, true: colors.primary + '80' }}
              thumbColor={transactionPin ? colors.primary : colors.textMuted}
            />
          </View>
        </View>

        {/* Security Options */}
        <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>SECURITY SETTINGS</Text>
        
        <View style={[styles.optionsCard, { backgroundColor: colors.surface }]}>
          {securityOptions.map((option, index) => (
            <TouchableOpacity 
              key={option.id}
              style={[
                styles.optionItem,
                index < securityOptions.length - 1 && { borderBottomWidth: 1, borderBottomColor: colors.border }
              ]}
              activeOpacity={0.7}
            >
              <View style={[styles.optionIcon, { backgroundColor: colors.surfaceHighlight }]}>
                <option.icon size={20} color={colors.primary} />
              </View>
              <View style={styles.optionContent}>
                <Text style={[styles.optionTitle, { color: colors.text }]}>{option.title}</Text>
                <Text style={[styles.optionSubtitle, { color: colors.textMuted }]}>
                  {option.subtitle}
                </Text>
              </View>
              {option.badge ? (
                <View style={[styles.badge, { backgroundColor: colors.success }]}>
                  <Text style={styles.badgeText}>{option.badge}</Text>
                </View>
              ) : null}
              <ChevronRight size={18} color={colors.textMuted} />
            </TouchableOpacity>
          ))}
        </View>

        {/* Security Tips */}
        <View style={[styles.tipsCard, { backgroundColor: colors.surface }]}>
          <View style={styles.tipsHeader}>
            <Text style={[styles.tipsTitle, { color: colors.text }]}>Security Tips</Text>
          </View>
          <View style={styles.tipItem}>
            <View style={[styles.tipDot, { backgroundColor: colors.primary }]} />
            <Text style={[styles.tipText, { color: colors.textSecondary }]}>
              Never share your PIN or password
            </Text>
          </View>
          <View style={styles.tipItem}>
            <View style={[styles.tipDot, { backgroundColor: colors.primary }]} />
            <Text style={[styles.tipText, { color: colors.textSecondary }]}>
              Enable biometric login for extra security
            </Text>
          </View>
          <View style={styles.tipItem}>
            <View style={[styles.tipDot, { backgroundColor: colors.primary }]} />
            <Text style={[styles.tipText, { color: colors.textSecondary }]}>
              Review your account activity regularly
            </Text>
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
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  scoreCard: {
    borderRadius: 24,
    padding: 20,
    marginBottom: 24,
  },
  scoreContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  scoreIcon: {
    width: 56,
    height: 56,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scoreText: {
    marginLeft: 16,
  },
  scoreTitle: {
    fontSize: 15,
    fontWeight: '600',
  },
  scoreValue: {
    fontSize: 28,
    fontWeight: '800',
    marginTop: 4,
  },
  scoreBar: {
    height: 8,
    backgroundColor: 'rgba(0,0,0,0.2)',
    borderRadius: 4,
    marginBottom: 12,
  },
  scoreProgress: {
    height: '100%',
    borderRadius: 4,
  },
  scoreHint: {
    fontSize: 13,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.5,
    marginBottom: 10,
    marginLeft: 4,
  },
  toggleCard: {
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 24,
  },
  toggleItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  toggleIcon: {
    width: 44,
    height: 44,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  toggleContent: {
    flex: 1,
    marginLeft: 14,
  },
  toggleTitle: {
    fontSize: 15,
    fontWeight: '600',
  },
  toggleSubtitle: {
    fontSize: 13,
    marginTop: 2,
  },
  divider: {
    height: 1,
    marginLeft: 74,
  },
  optionsCard: {
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 24,
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  optionIcon: {
    width: 44,
    height: 44,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionContent: {
    flex: 1,
    marginLeft: 14,
    marginRight: 12,
  },
  optionTitle: {
    fontSize: 15,
    fontWeight: '600',
  },
  optionSubtitle: {
    fontSize: 13,
    marginTop: 2,
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
    marginRight: 8,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
  },
  tipsCard: {
    borderRadius: 20,
    padding: 20,
  },
  tipsHeader: {
    marginBottom: 16,
  },
  tipsTitle: {
    fontSize: 16,
    fontWeight: '700',
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  tipDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 12,
  },
  tipText: {
    fontSize: 14,
    flex: 1,
  },
});
