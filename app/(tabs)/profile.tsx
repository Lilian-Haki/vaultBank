import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { 
  ChevronRight, 
  Shield, 
  Bell, 
  HelpCircle, 
  FileText, 
  LogOut,
  Moon,
  Globe,
  Smartphone
} from 'lucide-react-native';
import { memo } from 'react';

import { useTheme } from '../../components/ui/ThemeProvider';
import { mockUser } from '../../constants/mockData';

interface MenuItem {
  icon: typeof Shield;
  label: string;
  value?: string;
  hasArrow?: boolean;
  danger?: boolean;
}

const MenuSection = memo(({ title, items, colors }: { title?: string; items: MenuItem[]; colors: any }) => (
  <View style={styles.menuSection}>
    {title && (
      <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>{title}</Text>
    )}
    <View style={[styles.menuCard, { backgroundColor: colors.surface }]}>
      {items.map((item, index) => (
        <TouchableOpacity 
          key={index}
          style={[
            styles.menuItem,
            index < items.length - 1 && { borderBottomWidth: 1, borderBottomColor: colors.border }
          ]}
          activeOpacity={0.7}
        >
          <View style={[styles.menuIcon, { backgroundColor: colors.surfaceHighlight }]}>
            <item.icon size={20} color={item.danger ? colors.danger : colors.primary} />
          </View>
          <Text style={[
            styles.menuLabel, 
            { color: item.danger ? colors.danger : colors.text }
          ]}>
            {item.label}
          </Text>
          {item.value && (
            <Text style={[styles.menuValue, { color: colors.textMuted }]}>{item.value}</Text>
          )}
          {item.hasArrow !== false && (
            <ChevronRight size={18} color={colors.textMuted} />
          )}
        </TouchableOpacity>
      ))}
    </View>
  </View>
));

export default function ProfileScreen() {
  const { colors } = useTheme();

  const generalItems: MenuItem[] = [
    { icon: Bell, label: 'Notifications', value: 'On', hasArrow: true },
    { icon: Moon, label: 'Dark Mode', value: 'On', hasArrow: true },
    { icon: Globe, label: 'Language', value: 'English', hasArrow: true },
  ];

  const securityItems: MenuItem[] = [
    { icon: Shield, label: 'Security', hasArrow: true },
    { icon: Smartphone, label: 'Device Management', hasArrow: true },
  ];

  const supportItems: MenuItem[] = [
    { icon: HelpCircle, label: 'Help Center', hasArrow: true },
    { icon: FileText, label: 'Terms & Privacy', hasArrow: true },
  ];

  const accountItems: MenuItem[] = [
    { icon: LogOut, label: 'Log Out', danger: true, hasArrow: false },
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            <Image source={{ uri: mockUser.avatar }} style={styles.avatar} />
            <View style={[styles.verifiedBadge, { backgroundColor: colors.success }]}>
              <Text style={styles.verifiedText}>✓</Text>
            </View>
          </View>
          <Text style={[styles.userName, { color: colors.text }]}>{mockUser.name}</Text>
          <Text style={[styles.userEmail, { color: colors.textSecondary }]}>{mockUser.email}</Text>
          <TouchableOpacity 
            style={[styles.editButton, { backgroundColor: colors.surfaceHighlight }]}
            activeOpacity={0.7}
          >
            <Text style={[styles.editButtonText, { color: colors.primary }]}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        {/* Stats */}
        <View style={[styles.statsCard, { backgroundColor: colors.surface }]}>
          <View style={styles.statItem}>
            <Text style={[styles.statValue, { color: colors.text }]}>12</Text>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Accounts</Text>
          </View>
          <View style={[styles.statDivider, { backgroundColor: colors.border }]} />
          <View style={styles.statItem}>
            <Text style={[styles.statValue, { color: colors.text }]}>4</Text>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Cards</Text>
          </View>
          <View style={[styles.statDivider, { backgroundColor: colors.border }]} />
          <View style={styles.statItem}>
            <Text style={[styles.statValue, { color: colors.text }]}>$197K</Text>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Balance</Text>
          </View>
        </View>

        {/* Menu Sections */}
        <MenuSection title="General" items={generalItems} colors={colors} />
        <MenuSection title="Security" items={securityItems} colors={colors} />
        <MenuSection title="Support" items={supportItems} colors={colors} />
        <MenuSection items={accountItems} colors={colors} />

        {/* App Version */}
        <Text style={[styles.versionText, { color: colors.textMuted }]}>
          VaultBank v2.1.0
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  profileHeader: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  avatarContainer: {
    position: 'relative',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  verifiedBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#0A0A0F',
  },
  verifiedText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  userName: {
    fontSize: 24,
    fontWeight: '800',
    marginTop: 16,
  },
  userEmail: {
    fontSize: 15,
    marginTop: 4,
  },
  editButton: {
    marginTop: 16,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  editButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  statsCard: {
    flexDirection: 'row',
    borderRadius: 20,
    padding: 20,
    marginBottom: 28,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statDivider: {
    width: 1,
    height: 40,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '800',
  },
  statLabel: {
    fontSize: 13,
    marginTop: 4,
  },
  menuSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 10,
    marginLeft: 4,
  },
  menuCard: {
    borderRadius: 20,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  menuIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuLabel: {
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
    marginLeft: 14,
  },
  menuValue: {
    fontSize: 14,
    marginRight: 8,
  },
  versionText: {
    textAlign: 'center',
    fontSize: 13,
    marginTop: 8,
    marginBottom: 20,
  },
});
