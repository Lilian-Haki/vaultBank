import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { 
  ArrowLeft, 
  Search, 
  MessageCircle, 
  Phone, 
  Mail,
  ChevronRight,
  FileQuestion,
  Shield,
  CreditCard,
  RefreshCw
} from 'lucide-react-native';
import { useState } from 'react';

import { useTheme } from '../../components/ui/ThemeProvider';

interface FAQCategory {
  id: string;
  icon: typeof FileQuestion;
  title: string;
  description: string;
}

interface ContactOption {
  id: string;
  icon: typeof Phone;
  title: string;
  subtitle: string;
  action: string;
}

export default function HelpCenterScreen() {
  const router = useRouter();
  const { colors } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');

  const categories: FAQCategory[] = [
    {
      id: 'account',
      icon: FileQuestion,
      title: 'Account & Profile',
      description: 'Manage your account settings',
    },
    {
      id: 'payments',
      icon: CreditCard,
      title: 'Payments & Transfers',
      description: 'Send and receive money',
    },
    {
      id: 'security',
      icon: Shield,
      title: 'Security & Privacy',
      description: 'Keep your account safe',
    },
    {
      id: 'transactions',
      icon: RefreshCw,
      title: 'Transactions',
      description: 'View and manage transactions',
    },
  ];

  const contactOptions: ContactOption[] = [
    {
      id: 'chat',
      icon: MessageCircle,
      title: 'Live Chat',
      subtitle: 'Get instant help',
      action: 'Start Chat',
    },
    {
      id: 'phone',
      icon: Phone,
      title: 'Phone Support',
      subtitle: '+1 (800) 123-4567',
      action: 'Call Now',
    },
    {
      id: 'email',
      icon: Mail,
      title: 'Email Support',
      subtitle: 'support@vaultbank.com',
      action: 'Send Email',
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
        <Text style={[styles.headerTitle, { color: colors.text }]}>Help Center</Text>
        <View style={{ width: 44 }} />
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Search Bar */}
        <View style={[styles.searchContainer, { backgroundColor: colors.surface }]}>
          <Search size={20} color={colors.textMuted} />
          <TextInput
            style={[styles.searchInput, { color: colors.text }]}
            placeholder="Search for help..."
            placeholderTextColor={colors.textMuted}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          {['Forgot PIN', 'Card Issues', 'Dispute'].map((action, index) => (
            <TouchableOpacity 
              key={index}
              style={[styles.quickActionChip, { backgroundColor: colors.surface }]}
              activeOpacity={0.7}
            >
              <Text style={[styles.quickActionText, { color: colors.text }]}>{action}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* FAQ Categories */}
        <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>
          FAQ CATEGORIES
        </Text>
        
        <View style={[styles.categoriesCard, { backgroundColor: colors.surface }]}>
          {categories.map((category, index) => (
            <TouchableOpacity 
              key={category.id}
              style={[
                styles.categoryItem,
                index < categories.length - 1 && { borderBottomWidth: 1, borderBottomColor: colors.border }
              ]}
              activeOpacity={0.7}
            >
              <View style={[styles.categoryIcon, { backgroundColor: colors.surfaceHighlight }]}>
                <category.icon size={20} color={colors.primary} />
              </View>
              <View style={styles.categoryContent}>
                <Text style={[styles.categoryTitle, { color: colors.text }]}>
                  {category.title}
                </Text>
                <Text style={[styles.categoryDescription, { color: colors.textMuted }]}>
                  {category.description}
                </Text>
              </View>
              <ChevronRight size={18} color={colors.textMuted} />
            </TouchableOpacity>
          ))}
        </View>

        {/* Contact Options */}
        <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>
          CONTACT US
        </Text>
        
        <View style={styles.contactGrid}>
          {contactOptions.map((option) => (
            <TouchableOpacity 
              key={option.id}
              style={[styles.contactCard, { backgroundColor: colors.surface }]}
              activeOpacity={0.8}
            >
              <View style={[styles.contactIcon, { backgroundColor: colors.primary + '20' }]}>
                <option.icon size={24} color={colors.primary} />
              </View>
              <Text style={[styles.contactTitle, { color: colors.text }]}>
                {option.title}
              </Text>
              <Text style={[styles.contactSubtitle, { color: colors.textMuted }]}>
                {option.subtitle}
              </Text>
              <View style={[styles.contactAction, { backgroundColor: colors.primary + '15' }]}>
                <Text style={[styles.contactActionText, { color: colors.primary }]}>
                  {option.action}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Support Hours */}
        <View style={[styles.hoursCard, { backgroundColor: colors.surface }]}>
          <Text style={[styles.hoursTitle, { color: colors.text }]}>Support Hours</Text>
          <View style={styles.hoursRow}>
            <Text style={[styles.hoursDay, { color: colors.textSecondary }]}>Mon - Fri</Text>
            <Text style={[styles.hoursTime, { color: colors.text }]}>24/7</Text>
          </View>
          <View style={styles.hoursRow}>
            <Text style={[styles.hoursDay, { color: colors.textSecondary }]}>Sat - Sun</Text>
            <Text style={[styles.hoursTime, { color: colors.text }]}>24/7</Text>
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 16,
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 15,
    fontWeight: '500',
  },
  quickActions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 24,
  },
  quickActionChip: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
  },
  quickActionText: {
    fontSize: 14,
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.5,
    marginBottom: 10,
    marginLeft: 4,
  },
  categoriesCard: {
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 24,
  },
  categoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  categoryIcon: {
    width: 48,
    height: 48,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryContent: {
    flex: 1,
    marginLeft: 14,
    marginRight: 12,
  },
  categoryTitle: {
    fontSize: 15,
    fontWeight: '700',
  },
  categoryDescription: {
    fontSize: 13,
    marginTop: 2,
  },
  contactGrid: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  contactCard: {
    flex: 1,
    borderRadius: 20,
    padding: 16,
    alignItems: 'center',
  },
  contactIcon: {
    width: 48,
    height: 48,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  contactTitle: {
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 4,
  },
  contactSubtitle: {
    fontSize: 11,
    marginBottom: 12,
    textAlign: 'center',
  },
  contactAction: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
  },
  contactActionText: {
    fontSize: 11,
    fontWeight: '700',
  },
  hoursCard: {
    borderRadius: 20,
    padding: 20,
  },
  hoursTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 16,
  },
  hoursRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  hoursDay: {
    fontSize: 14,
  },
  hoursTime: {
    fontSize: 14,
    fontWeight: '600',
  },
});
