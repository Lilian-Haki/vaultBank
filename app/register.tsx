import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    Alert,
    ScrollView,
} from "react-native";
import { useState, useCallback } from "react";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Eye, EyeOff, Fingerprint, ChevronLeft } from "lucide-react-native";

import { Colors } from "../constants/colors";

export default function Register() {
    const router = useRouter();
    const colors = Colors.dark;
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [focusedInput, setFocusedInput] = useState<string | null>(null);

    const handleLogin = useCallback(async () => {
        if (!email || !password) {
            Alert.alert("Error", "Please enter both email and password");
            return;
        }

        setIsLoading(true);

        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
            router.replace("/accounts"); // Changed from '/(tabs)' to '/accounts'
        }, 1500);
    }, [email, password, router]);

    const handleBiometricLogin = useCallback(() => {
        Alert.alert(
            "Biometric Login",
            "Touch ID / Face ID authentication would be triggered here",
        );
    }, []);

    return (
        <SafeAreaView
            style={[styles.container, { backgroundColor: colors.background }]}
            edges={["top"]}
        >
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.keyboardView}
            >
                <ScrollView>
                    {/* Content */}
                    <View style={styles.content}>
                        {/* Welcome Text */}
                        <View style={styles.welcomeContainer}>
                            <Text
                                style={[
                                    styles.welcomeTitle,
                                    { color: colors.text },
                                ]}
                            >
                                Don&apos;t have an account?
                            </Text>
                            <Text
                                style={[
                                    styles.welcomeSubtitle,
                                    { color: colors.textSecondary },
                                ]}
                            >
                                Create an account and start banking with us!
                            </Text>
                        </View>

                        {/* Form */}
                        <View style={styles.form}>
                            {/* FirstName */}
                            <View style={styles.inputContainer}>
                                <Text
                                    style={[
                                        styles.inputLabel,
                                        { color: colors.textSecondary },
                                    ]}
                                >
                                    First Name
                                </Text>
                                <View
                                    style={[
                                        styles.inputWrapper,
                                        { backgroundColor: colors.surface },
                                        focusedInput === "firstName" && {
                                            borderColor: colors.primary,
                                            borderWidth: 1,
                                        },
                                    ]}
                                >
                                    <TextInput
                                        style={[
                                            styles.input,
                                            { color: colors.text },
                                        ]}
                                        placeholder="Enter first name"
                                        placeholderTextColor={colors.textMuted}
                                        keyboardType="default"
                                        autoCapitalize="none"
                                        // value={firstName}
                                        // onChangeText={setFirstName}
                                        onFocus={() =>
                                            setFocusedInput("firstName")
                                        }
                                        onBlur={() => setFocusedInput(null)}
                                    />
                                </View>
                            </View>
                            {/* LastName */}
                            <View style={styles.inputContainer}>
                                <Text
                                    style={[
                                        styles.inputLabel,
                                        { color: colors.textSecondary },
                                    ]}
                                >
                                    Last Name
                                </Text>
                                <View
                                    style={[
                                        styles.inputWrapper,
                                        { backgroundColor: colors.surface },
                                        focusedInput === "lastName" && {
                                            borderColor: colors.primary,
                                            borderWidth: 1,
                                        },
                                    ]}
                                >
                                    <TextInput
                                        style={[
                                            styles.input,
                                            { color: colors.text },
                                        ]}
                                        placeholder="Enter last name"
                                        placeholderTextColor={colors.textMuted}
                                        keyboardType="default"
                                        autoCapitalize="none"
                                        // value={lastName}
                                        // onChangeText={setLastName}
                                        onFocus={() =>
                                            setFocusedInput("lastName")
                                        }
                                        onBlur={() => setFocusedInput(null)}
                                    />
                                </View>
                            </View>
                            {/* Email Input */}
                            <View style={styles.inputContainer}>
                                <Text
                                    style={[
                                        styles.inputLabel,
                                        { color: colors.textSecondary },
                                    ]}
                                >
                                    Email Address
                                </Text>
                                <View
                                    style={[
                                        styles.inputWrapper,
                                        { backgroundColor: colors.surface },
                                        focusedInput === "email" && {
                                            borderColor: colors.primary,
                                            borderWidth: 1,
                                        },
                                    ]}
                                >
                                    <TextInput
                                        style={[
                                            styles.input,
                                            { color: colors.text },
                                        ]}
                                        placeholder="Enter your email"
                                        placeholderTextColor={colors.textMuted}
                                        keyboardType="email-address"
                                        autoCapitalize="none"
                                        value={email}
                                        onChangeText={setEmail}
                                        onFocus={() => setFocusedInput("email")}
                                        onBlur={() => setFocusedInput(null)}
                                    />
                                </View>
                            </View>
                            {/* PhoneNumber */}
                            <View style={styles.inputContainer}>
                                <Text
                                    style={[
                                        styles.inputLabel,
                                        { color: colors.textSecondary },
                                    ]}
                                >
                                    Phone Number
                                </Text>
                                <View
                                    style={[
                                        styles.inputWrapper,
                                        { backgroundColor: colors.surface },
                                        focusedInput === "phoneNumber" && {
                                            borderColor: colors.primary,
                                            borderWidth: 1,
                                        },
                                    ]}
                                >
                                    <TextInput
                                        style={[
                                            styles.input,
                                            { color: colors.text },
                                        ]}
                                        placeholder="Enter phone number"
                                        placeholderTextColor={colors.textMuted}
                                        keyboardType="phone-pad"
                                        autoCapitalize="none"
                                        // value={phoneNumber}
                                        // onChangeText={setPhoneNumber}
                                        onFocus={() =>
                                            setFocusedInput("phoneNumber")
                                        }
                                        onBlur={() => setFocusedInput(null)}
                                    />
                                </View>
                            </View>

                            {/* Password */}
                            <View style={styles.inputContainer}>
                                <Text
                                    style={[
                                        styles.inputLabel,
                                        { color: colors.textSecondary },
                                    ]}
                                >
                                    Password
                                </Text>
                                <View
                                    style={[
                                        styles.inputWrapper,
                                        { backgroundColor: colors.surface },
                                        focusedInput === "password" && {
                                            borderColor: colors.primary,
                                            borderWidth: 1,
                                        },
                                    ]}
                                >
                                    <TextInput
                                        style={[
                                            styles.input,
                                            { color: colors.text },
                                        ]}
                                        placeholder="Enter your password"
                                        placeholderTextColor={colors.textMuted}
                                        secureTextEntry={!showPassword}
                                        value={password}
                                        onChangeText={setPassword}
                                        onFocus={() =>
                                            setFocusedInput("password")
                                        }
                                        onBlur={() => setFocusedInput(null)}
                                    />
                                    <TouchableOpacity
                                        onPress={() =>
                                            setShowPassword(!showPassword)
                                        }
                                        style={styles.eyeButton}
                                    >
                                        {showPassword ? (
                                            <EyeOff
                                                size={20}
                                                color={colors.textSecondary}
                                            />
                                        ) : (
                                            <Eye
                                                size={20}
                                                color={colors.textSecondary}
                                            />
                                        )}
                                    </TouchableOpacity>
                                </View>
                            </View>
                            {/* ConfirmPassword */}
                            <View style={styles.inputContainer}>
                                <Text
                                    style={[
                                        styles.inputLabel,
                                        { color: colors.textSecondary },
                                    ]}
                                >
                                    Password
                                </Text>
                                <View
                                    style={[
                                        styles.inputWrapper,
                                        { backgroundColor: colors.surface },
                                        focusedInput === "confirmPassword" && {
                                            borderColor: colors.primary,
                                            borderWidth: 1,
                                        },
                                    ]}
                                >
                                    <TextInput
                                        style={[
                                            styles.input,
                                            { color: colors.text },
                                        ]}
                                        placeholder="Confirm your password"
                                        placeholderTextColor={colors.textMuted}
                                        secureTextEntry={!showPassword}
                                        // value={confirmPassword}
                                        // onChangeText={setConfirmPassword}
                                        onFocus={() =>
                                            setFocusedInput("confirmPassword")
                                        }
                                        onBlur={() => setFocusedInput(null)}
                                    />
                                    <TouchableOpacity
                                        onPress={() =>
                                            setShowPassword(!showPassword)
                                        }
                                        style={styles.eyeButton}
                                    >
                                        {showPassword ? (
                                            <EyeOff
                                                size={20}
                                                color={colors.textSecondary}
                                            />
                                        ) : (
                                            <Eye
                                                size={20}
                                                color={colors.textSecondary}
                                            />
                                        )}
                                    </TouchableOpacity>
                                </View>
                            </View>

                            {/* Login Button */}
                            <TouchableOpacity
                                style={[
                                    styles.loginButton,
                                    {
                                        backgroundColor: isLoading
                                            ? colors.surfaceHighlight
                                            : colors.primary,
                                    },
                                ]}
                                onPress={handleLogin}
                                disabled={isLoading}
                                activeOpacity={0.8}
                            >
                                <Text style={styles.loginButtonText}>
                                    {isLoading
                                        ? "Creating Account..."
                                        : "Create Account"}
                                </Text>
                            </TouchableOpacity>

                        </View>
                    </View>

                    {/* Footer */}
                    <View style={styles.footer}>
                        <Text
                            style={[
                                styles.footerText,
                                { color: colors.textSecondary },
                            ]}
                        >
                            Already have an account?
                        </Text>
                        <TouchableOpacity onPress={() => router.push("/login")}>
                            <Text
                                style={[
                                    styles.footerLink,
                                    { color: colors.primary },
                                ]}
                            >
                                Login
                            </Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    keyboardView: {
        flex: 1,
    },
    header: {
        paddingHorizontal: 20,
        paddingVertical: 8,
    },
    backButton: {
        width: 44,
        height: 44,
        justifyContent: "center",
    },
    content: {
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: 40,
    },
    ScrollView: {
        paddingBottom: 60,
    },

    welcomeContainer: {
        marginBottom: 32,
    },
    welcomeTitle: {
        fontSize: 32,
        fontWeight: "800",
    },
    welcomeSubtitle: {
        fontSize: 16,
        marginTop: 8,
    },
    form: {
        gap: 20,
    },
    inputContainer: {
        gap: 8,
    },
    inputLabel: {
        fontSize: 14,
        fontWeight: "600",
    },
    inputWrapper: {
        flexDirection: "row",
        alignItems: "center",
        borderRadius: 16,
        paddingHorizontal: 16,
        height: 56,
    },
    input: {
        flex: 1,
        fontSize: 16,
        fontWeight: "500",
    },
    eyeButton: {
        padding: 8,
    },
    forgotPassword: {
        alignSelf: "flex-end",
    },
    forgotPasswordText: {
        fontSize: 14,
        fontWeight: "600",
    },
    loginButton: {
        height: 56,
        borderRadius: 16,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 8,
    },
    loginButtonText: {
        color: "#FFFFFF",
        fontSize: 17,
        fontWeight: "700",
    },
    biometricButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 12,
        height: 56,
        borderRadius: 16,
        borderWidth: 1.5,
        marginTop: 8,
    },
    biometricText: {
        fontSize: 15,
        fontWeight: "600",
    },
    footer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 4,
        paddingVertical: 24,
        marginBottom: 40,
    },
    footerText: {
        fontSize: 15,
    },
    footerLink: {
        fontSize: 15,
        fontWeight: "700",
    },
});
