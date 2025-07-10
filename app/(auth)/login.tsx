import Icon from "@/components/ui/Icon";
import { useTheme } from "@/hooks/useThemeColor";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useMemo, useState } from "react";
import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuthStore } from "../../utils/authStore";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const theme = useTheme();
  const setUser = useAuthStore((state) => state.setUser);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Set user in auth store
      setUser({
        id: "1",
        email: email,
        name: "John Doe",
        isLoggedIn: true,
      });

      router.replace("/(tabs)");
    } catch (error) {
      Alert.alert("Error", "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  const dynamicStyles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          flex: 1,
          backgroundColor: theme.colors.background,
        },
        content: {
          flex: 1,
          justifyContent: "center",
          paddingHorizontal: theme.spacing.lg,
        },
        title: {
          fontSize: theme.typography.h1.fontSize,
          fontWeight: theme.typography.h1.fontWeight,
          fontFamily: theme.typography.h1.fontFamily,
          color: theme.colors.text,
          textAlign: "center",
          marginBottom: theme.spacing.sm,
        },
        subtitle: {
          fontSize: theme.typography.body1.fontSize,
          fontFamily: theme.typography.body1.fontFamily,
          color: theme.colors.textSecondary,
          textAlign: "center",
          marginBottom: theme.spacing.xl,
        },
        inputContainer: {
          marginBottom: theme.spacing.md,
        },
        label: {
          fontSize: theme.typography.body1.fontSize,
          fontWeight: theme.typography.body1.fontWeight,
          fontFamily: theme.typography.body1.fontFamily,
          color: theme.colors.text,
          marginBottom: theme.spacing.xs,
        },
        inputWrapper: {
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: theme.colors.surface,
          borderRadius: theme.borderRadius.md,
          borderWidth: 1,
          borderColor: theme.colors.border,
          paddingHorizontal: theme.spacing.md,
          minHeight: 52,
        },
        input: {
          flex: 1,
          fontSize: theme.typography.body1.fontSize,
          fontFamily: theme.typography.body1.fontFamily,
          color: theme.colors.text,
          paddingVertical: theme.spacing.sm,
        },
        eyeButton: {
          padding: theme.spacing.xs,
        },
        loginButton: {
          backgroundColor: theme.colors.primary,
          borderRadius: theme.borderRadius.md,
          paddingVertical: theme.spacing.md,
          alignItems: "center",
          marginTop: theme.spacing.lg,
          ...theme.shadows.medium,
        },
        loginButtonDisabled: {
          backgroundColor: theme.colors.disabled,
        },
        loginButtonText: {
          fontSize: theme.typography.button.fontSize,
          fontWeight: theme.typography.button.fontWeight,
          fontFamily: theme.typography.button.fontFamily,
          color: theme.colors.textInverse,
        },
        forgotPasswordContainer: {
          alignItems: "center",
          marginTop: theme.spacing.lg,
        },
        forgotPasswordText: {
          fontSize: theme.typography.body2.fontSize,
          fontFamily: theme.typography.body2.fontFamily,
          color: theme.colors.primary,
        },
        signupContainer: {
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          marginTop: theme.spacing.xl,
        },
        signupText: {
          fontSize: theme.typography.body1.fontSize,
          fontFamily: theme.typography.body1.fontFamily,
          color: theme.colors.textSecondary,
        },
        signupLink: {
          fontSize: theme.typography.body1.fontSize,
          fontWeight: theme.typography.body1.fontWeight,
          fontFamily: theme.typography.body1.fontFamily,
          color: theme.colors.primary,
          marginLeft: theme.spacing.xs,
        },
      }),
    [theme]
  );

  return (
    <SafeAreaView style={dynamicStyles.container}>
      <StatusBar
        style={theme.isLight ? "dark" : "light"}
        backgroundColor={theme.colors.background}
      />

      <View style={dynamicStyles.content}>
        <Text style={dynamicStyles.title}>Welcome Back</Text>
        <Text style={dynamicStyles.subtitle}>
          Sign in to your account to continue trading
        </Text>

        <View style={dynamicStyles.inputContainer}>
          <Text style={dynamicStyles.label}>Email</Text>
          <View style={dynamicStyles.inputWrapper}>
            <TextInput
              style={dynamicStyles.input}
              value={email}
              onChangeText={setEmail}
              placeholder="Enter your email"
              placeholderTextColor={theme.colors.textMuted}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>
        </View>

        <View style={dynamicStyles.inputContainer}>
          <Text style={dynamicStyles.label}>Password</Text>
          <View style={dynamicStyles.inputWrapper}>
            <TextInput
              style={dynamicStyles.input}
              value={password}
              onChangeText={setPassword}
              placeholder="Enter your password"
              placeholderTextColor={theme.colors.textMuted}
              secureTextEntry={!showPassword}
              autoCapitalize="none"
              autoCorrect={false}
            />
            <TouchableOpacity
              style={dynamicStyles.eyeButton}
              onPress={() => setShowPassword(!showPassword)}
            >
              <Icon
                name={showPassword ? "eye-off" : "eye"}
                set="feather"
                size={20}
                color={theme.colors.textMuted}
              />
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity
          style={[
            dynamicStyles.loginButton,
            loading && dynamicStyles.loginButtonDisabled,
          ]}
          onPress={handleLogin}
          disabled={loading}
        >
          <Text style={dynamicStyles.loginButtonText}>
            {loading ? "Signing In..." : "Sign In"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={dynamicStyles.forgotPasswordContainer}>
          <Text style={dynamicStyles.forgotPasswordText}>
            Forgot your password?
          </Text>
        </TouchableOpacity>

        <View style={dynamicStyles.signupContainer}>
          <Text style={dynamicStyles.signupText}>Don't have an account?</Text>
          <Pressable onPress={() => router.push("/(auth)/verify")}>
            <Text style={dynamicStyles.signupLink}>Sign Up</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}
