import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { 
  ArrowLeft, 
  Smartphone, 
  Laptop, 
  Tablet,
  Monitor,
  Check,
  LogOut,
  MapPin
} from 'lucide-react-native';

import { useTheme } from '../../components/ui/ThemeProvider';

interface Device {
  id: string;
  name: string;
  type: 'phone' | 'laptop' | 'tablet' | 'desktop';
  location: string;
  lastActive: string;
  isCurrent: boolean;
}

export default function DevicesScreen() {
  const router = useRouter();
  const { colors } = useTheme();

  const devices: Device[] = [
    {
      id: '1',
      name: 'iPhone 15 Pro',
      type: 'phone',
      location: 'New York, USA',
      lastActive: 'Active now',
      isCurrent: true,
    },
    {
      id: '2',
      name: 'MacBook Pro',
      type: 'laptop',
      location: 'New York, USA',
      lastActive: '2 hours ago',
      isCurrent: false,
    },
    {
      id: '3',
      name: 'iPad Air',
      type: 'tablet',
      location: 'San Francisco, USA',
      lastActive: '3 days ago',
      isCurrent: false,
    },
    {
      id: '4',
      name: 'Chrome Browser',
      type: 'desktop',
      location: 'Los Angeles, USA',
      lastActive: '1 week ago',
      isCurrent: false,
    },
  ];

  const getDeviceIcon = (type: string) => {
    switch (type) {
      case 'phone': return Smartphone;
      case 'laptop': return Laptop;
      case 'tablet': return Tablet;
      case 'desktop': return Monitor;
      default: return Smartphone;
    }
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
        <Text style={[styles.headerTitle, { color: colors.text }]}>Device Management</Text>
        <View style={{ width: 44 }} />
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Current Device Banner */}
        <View style={[styles.currentBanner, { backgroundColor: colors.primary + '15' }]}>
          <View style={[styles.currentIcon, { backgroundColor: colors.primary + '30' }]}>
            <Smartphone size={28} color={colors.primary} />
          </View>
          <View style={styles.currentText}>
            <Text style={[styles.currentTitle, { color: colors.text }]}>
              Current Device
            </Text>
            <Text style={[styles.currentSubtitle, { color: colors.primary }]}>
              You're logged in here
            </Text>
          </View>
        </View>

        {/* Devices List */}
        <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>
          CONNECTED DEVICES
        </Text>
        
        <View style={[styles.devicesCard, { backgroundColor: colors.surface }]}>
          {devices.map((device, index) => {
            const DeviceIcon = getDeviceIcon(device.type);
            return (
              <View 
                key={device.id}
                style={[
                  styles.deviceItem,
                  index < devices.length - 1 && { borderBottomWidth: 1, borderBottomColor: colors.border }
                ]}
              >
                <View style={[styles.deviceIcon, { 
                  backgroundColor: device.isCurrent ? colors.primary + '20' : colors.surfaceHighlight 
                }]}>
                  <DeviceIcon 
                    size={22} 
                    color={device.isCurrent ? colors.primary : colors.textSecondary} 
                  />
                </View>
                
                <View style={styles.deviceInfo}>
                  <View style={styles.deviceHeader}>
                    <Text style={[styles.deviceName, { color: colors.text }]}>
                      {device.name}
                    </Text>
                    {device.isCurrent && (
                      <View style={[styles.currentBadge, { backgroundColor: colors.success }]}>
                        <Check size={12} color="#FFFFFF" />
                      </View>
                    )}
                  </View>
                  
                  <View style={styles.deviceDetails}>
                    <View style={styles.locationRow}>
                      <MapPin size={12} color={colors.textMuted} />
                      <Text style={[styles.locationText, { color: colors.textMuted }]}>
                        {device.location}
                      </Text>
                    </View>
                    <Text style={[styles.lastActive, { 
                      color: device.isCurrent ? colors.success : colors.textMuted 
                    }]}>
                      {device.lastActive}
                    </Text>
                  </View>
                </View>
                
                {!device.isCurrent && (
                  <TouchableOpacity 
                    style={[styles.logoutButton, { backgroundColor: colors.danger + '15' }]}
                    activeOpacity={0.7}
                  >
                    <LogOut size={18} color={colors.danger} />
                  </TouchableOpacity>
                )}
              </View>
            );
          })}
        </View>

        {/* Security Info */}
        <View style={[styles.securityCard, { backgroundColor: colors.surface }]}>
          <Text style={[styles.securityTitle, { color: colors.text }]}>
            Security Recommendations
          </Text>
          <View style={styles.securityItem}>
            <View style={[styles.securityDot, { backgroundColor: colors.success }]} />
            <Text style={[styles.securityText, { color: colors.textSecondary }]}>
              Review and remove unfamiliar devices
            </Text>
          </View>
          <View style={styles.securityItem}>
            <View style={[styles.securityDot, { backgroundColor: colors.success }]} />
            <Text style={[styles.securityText, { color: colors.textSecondary }]}>
              Enable 2FA for additional protection
            </Text>
          </View>
          <View style={styles.securityItem}>
            <View style={[styles.securityDot, { backgroundColor: colors.warning }]} />
            <Text style={[styles.securityText, { color: colors.textSecondary }]}>
              Log out from devices you no longer use
            </Text>
          </View>
        </View>

        {/* Logout All Button */}
        <TouchableOpacity 
          style={[styles.logoutAllButton, { backgroundColor: colors.danger + '15' }]}
          activeOpacity={0.8}
        >
          <LogOut size={20} color={colors.danger} />
          <Text style={[styles.logoutAllText, { color: colors.danger }]}>
            Log Out All Other Devices
          </Text>
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
  currentBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderRadius: 20,
    marginBottom: 24,
  },
  currentIcon: {
    width: 56,
    height: 56,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  currentText: {
    marginLeft: 16,
  },
  currentTitle: {
    fontSize: 17,
    fontWeight: '700',
  },
  currentSubtitle: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.5,
    marginBottom: 10,
    marginLeft: 4,
  },
  devicesCard: {
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 24,
  },
  deviceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  deviceIcon: {
    width: 48,
    height: 48,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deviceInfo: {
    flex: 1,
    marginLeft: 14,
  },
  deviceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  deviceName: {
    fontSize: 15,
    fontWeight: '700',
  },
  currentBadge: {
    width: 18,
    height: 18,
    borderRadius: 9,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  deviceDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    fontSize: 12,
    marginLeft: 4,
    marginRight: 12,
  },
  lastActive: {
    fontSize: 12,
    fontWeight: '500',
  },
  logoutButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  securityCard: {
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
  },
  securityTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 16,
  },
  securityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  securityDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 12,
  },
  securityText: {
    fontSize: 14,
    flex: 1,
  },
  logoutAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 16,
  },
  logoutAllText: {
    fontSize: 15,
    fontWeight: '700',
    marginLeft: 10,
  },
});
