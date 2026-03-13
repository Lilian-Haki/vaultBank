import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { ArrowLeft, Bell, MessageSquare, CreditCard, TrendingUp, Shield } from 'lucide-react-native';
import { useState } from 'react';

import { useTheme } from '../../components/ui/ThemeProvider';

interface NotificationSetting {
  id: string;
  icon: typeof Bell;
  title: string;
  description: string;
  enabled: boolean;
}

export default function NotificationsScreen() {
  const router = useRouter();
  const { colors } = useTheme();
  
  const [settings, setSettings] = useState<NotificationSetting[]>([
    {
      id: 'push',
      icon: Bell,
      title: 'Push Notifications',
      description: 'Receive push notifications on your device',
      enabled: true,
    },
    {
      id: 'transactions',
      icon: CreditCard,
      title: 'Transaction Alerts',
      description: 'Get notified about all transactions',
      enabled: true,
    },
    {
      id: 'marketing',
      icon: TrendingUp,
      title: 'Marketing & Promotions',
      description: 'Receive offers and promotional content',
      enabled: false,
    },
    {
      id: 'security',
      icon: Shield,
      title: 'Security Alerts',
      description: 'Important security notifications',
      enabled: true,
    },
    {
      id: 'messages',
      icon: MessageSquare,
      title: 'Messages',
      description: 'New messages and updates',
      enabled: true,
    },
  ]);

  const toggleSetting = (id: string) => {
    setSettings(settings.map(s => 
      s.id === id ? { ...s, enabled: !s.enabled } : s
    ));
  };

  const allEnabled = settings.every(s => s.enabled);

  const toggleAll = () => {
    setSettings(settings.map(s => ({ ...s, enabled: !allEnabled })));
  };

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
        <Text style={[styles.headerTitle, { color: colors.text }]}>Notifications</Text>
        <View style={{ width: 44 }} />
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Master Toggle */}
        <View style={[styles.masterCard, { backgroundColor: colors.surface }]}>
          <View style={styles.masterContent}>
            <View style={[styles.masterIcon, { backgroundColor: colors.primary + '20' }]}>
              <Bell size={24} color={colors.primary} />
            </View>
            <View style={styles.masterText}>
              <Text style={[styles.masterTitle, { color: colors.text }]}>Enable Notifications</Text>
              <Text style={[styles.masterSubtitle, { color: colors.textMuted }]}>
                Turn all notifications on/off
              </Text>
            </View>
          </View>
          <Switch
            value={allEnabled}
            onValueChange={toggleAll}
            trackColor={{ false: colors.border, true: colors.primary + '80' }}
            thumbColor={allEnabled ? colors.primary : colors.textMuted}
          />
        </View>

        {/* Individual Settings */}
        <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>
          NOTIFICATION TYPES
        </Text>
        
        <View style={[styles.settingsCard, { backgroundColor: colors.surface }]}>
          {settings.map((setting, index) => (
            <View key={setting.id}>
              <View style={styles.settingItem}>
                <View style={[styles.settingIcon, { backgroundColor: colors.surfaceHighlight }]}>
                  <setting.icon size={20} color={colors.primary} />
                </View>
                <View style={styles.settingContent}>
                  <Text style={[styles.settingTitle, { color: colors.text }]}>
                    {setting.title}
                  </Text>
                  <Text style={[styles.settingDescription, { color: colors.textMuted }]}>
                    {setting.description}
                  </Text>
                </View>
                <Switch
                  value={setting.enabled}
                  onValueChange={() => toggleSetting(setting.id)}
                  trackColor={{ false: colors.border, true: colors.primary + '80' }}
                  thumbColor={setting.enabled ? colors.primary : colors.textMuted}
                />
              </View>
              {index < settings.length - 1 && (
                <View style={[styles.divider, { backgroundColor: colors.border }]} />
              )}
            </View>
          ))}
        </View>

        {/* Quiet Hours */}
        <TouchableOpacity 
          style={[styles.quietHoursCard, { backgroundColor: colors.surface }]}
          activeOpacity={0.8}
        >
          <View style={styles.quietHoursContent}>
            <View style={[styles.quietHoursIcon, { backgroundColor: colors.accent + '20' }]}>
              <Text style={[styles.moonIcon, { color: colors.accent }]}>🌙</Text>
            </View>
            <View style={styles.quietHoursText}>
              <Text style={[styles.quietHoursTitle, { color: colors.text }]}>Quiet Hours</Text>
              <Text style={[styles.quietHoursSubtitle, { color: colors.textMuted }]}>
                10:00 PM - 7:00 AM
              </Text>
            </View>
          </View>
          <View style={[styles.badge, { backgroundColor: colors.primary }]}>
            <Text style={styles.badgeText}>Active</Text>
          </View>
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
  masterCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 20,
    marginBottom: 24,
  },
  masterContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  masterIcon: {
    width: 48,
    height: 48,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  masterText: {
    marginLeft: 14,
  },
  masterTitle: {
    fontSize: 16,
    fontWeight: '700',
  },
  masterSubtitle: {
    fontSize: 13,
    marginTop: 2,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.5,
    marginBottom: 10,
    marginLeft: 4,
  },
  settingsCard: {
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 24,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  settingIcon: {
    width: 44,
    height: 44,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  settingContent: {
    flex: 1,
    marginLeft: 14,
    marginRight: 12,
  },
  settingTitle: {
    fontSize: 15,
    fontWeight: '600',
  },
  settingDescription: {
    fontSize: 13,
    marginTop: 2,
  },
  divider: {
    height: 1,
    marginLeft: 74,
  },
  quietHoursCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 20,
  },
  quietHoursContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quietHoursIcon: {
    width: 48,
    height: 48,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  moonIcon: {
    fontSize: 22,
  },
  quietHoursText: {
    marginLeft: 14,
  },
  quietHoursTitle: {
    fontSize: 15,
    fontWeight: '700',
  },
  quietHoursSubtitle: {
    fontSize: 13,
    marginTop: 2,
  },
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
});
