import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Animated } from 'react-native';
import { useState, useRef, useCallback } from 'react';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronRight, Shield, Zap, Globe } from 'lucide-react-native';

import { Colors } from '../constants/colors';



interface OnboardingSlide {
  id: number;
  icon: typeof Shield;
  title: string;
  description: string;
  color: string;
}

const slides: OnboardingSlide[] = [
  {
    id: 1,
    icon: Shield,
    title: 'Secure Banking',
    description: 'Your money is protected with bank-grade security and 256-bit encryption.',
    color: '#10B981',
  },
  {
    id: 2,
    icon: Zap,
    title: 'Instant Transfers',
    description: 'Send and receive money instantly, anytime, anywhere in the world.',
    color: '#F59E0B',
  },
  {
    id: 3,
    icon: Globe,
    title: 'Global Access',
    description: 'Access your accounts from anywhere with real-time notifications.',
    color: '#3B82F6',
  },
];

export default function OnboardingScreen() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const colors = Colors.dark;

  const handleNext = useCallback(() => {
    if (currentIndex < slides.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      router.replace('/login');
    }
  }, [currentIndex, router]);

  const handleSkip = useCallback(() => {
    router.replace('/login');
  }, [router]);

  const currentSlide = slides[currentIndex];
  const Icon = currentSlide.icon;

  // Animation values
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const animateSlide = useCallback((index: number) => {
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
    setCurrentIndex(index);
  }, [fadeAnim]);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Skip Button */}
      <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
        <Text style={[styles.skipText, { color: colors.textSecondary }]}>Skip</Text>
      </TouchableOpacity>

      {/* Main Content */}
      <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
        {/* Icon Container */}
        <View style={[styles.iconContainer, { backgroundColor: `${currentSlide.color}20` }]}>
          <Icon size={64} color={currentSlide.color} strokeWidth={1.5} />
        </View>

        {/* Title */}
        <Text style={[styles.title, { color: colors.text }]}>
          {currentSlide.title}
        </Text>

        {/* Description */}
        <Text style={[styles.description, { color: colors.textSecondary }]}>
          {currentSlide.description}
        </Text>
      </Animated.View>

      {/* Progress Indicators */}
      <View style={styles.pagination}>
        {slides.map((_, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => animateSlide(index)}
            style={[
              styles.paginationDot,
              {
                backgroundColor: index === currentIndex ? colors.primary : colors.surfaceHighlight,
                width: index === currentIndex ? 32 : 8,
              },
            ]}
          />
        ))}
      </View>

      {/* Next Button */}
      <TouchableOpacity
        style={[styles.nextButton, { backgroundColor: colors.primary }]}
        onPress={handleNext}
        activeOpacity={0.8}
      >
        <Text style={styles.nextButtonText}>
          {currentIndex === slides.length - 1 ? 'Get Started' : 'Continue'}
        </Text>
        <ChevronRight size={20} color="#FFFFFF" />
      </TouchableOpacity>

      {/* Bottom Indicators */}
      <View style={styles.pageIndicator}>
        <Text style={[styles.pageText, { color: colors.textMuted }]}>
          {currentIndex + 1} / {slides.length}
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  skipButton: {
    position: 'absolute',
    top: 20,
    right: 24,
    zIndex: 10,
    padding: 8,
  },
  skipText: {
    fontSize: 16,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  iconContainer: {
    width: 140,
    height: 140,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 16,
  },
  description: {
    fontSize: 17,
    textAlign: 'center',
    lineHeight: 26,
    paddingHorizontal: 8,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 40,
  },
  paginationDot: {
    height: 8,
    borderRadius: 4,
    // transitionProperty: 'width',
    // transitionDuration: '300ms',
  },
  nextButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginHorizontal: 24,
    paddingVertical: 18,
    borderRadius: 16,
    marginBottom: 24,
  },
  nextButtonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '700',
  },
  pageIndicator: {
    alignItems: 'center',
    marginBottom: 20,
  },
  pageText: {
    fontSize: 14,
    fontWeight: '500',
  },
});

