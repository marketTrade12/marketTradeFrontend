import Icon from "@/components/ui/Icon";
import { useTheme } from "@/hooks/useThemeColor";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useMemo, useRef, useState } from "react";
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

export default function VerifyScreen() {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [phoneNumber] = useState("+1 (555) 123-4567"); // Mock phone number
  const inputRefs = useRef<TextInput[]>([]);
  const router = useRouter();
  const theme = useTheme();
  const setUser = useAuthStore((state) => state.setUser);

  const handleCodeChange = (text: string, index: number) => {
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);

    // Auto-focus next input
    if (text && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = async () => {
    const verificationCode = code.join("");
    if (verificationCode.length !== 6) {
      Alert.alert("Error", "Please enter the complete verification code");
      return;
    }

    setLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Set user in auth store
      setUser({
        id: "1",
        email: "user@example.com",
        name: "John Doe",
        isLoggedIn: true,
      });

      // Navigate to main app
      router.replace("/(tabs)");
    } catch (error) {
      Alert.alert("Error", "Invalid verification code");
    } finally {
      setLoading(false);
    }
  };

  const handleResendCode = async () => {
    try {
      // Simulate resend API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      Alert.alert("Success", "Verification code has been resent");
    } catch (error) {
      Alert.alert("Error", "Failed to resend code");
    }
  };

  const dynamicStyles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          flex: 1,
          backgroundColor: theme.colors.background,
        },
        header: {
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: theme.spacing.md,
          paddingTop: theme.spacing.lg,
          paddingBottom: theme.spacing.md,
        },
        backButton: {
          width: 40,
          height: 40,
          borderRadius: theme.borderRadius.lg,
          backgroundColor: theme.colors.surface,
          alignItems: "center",
          justifyContent: "center",
        },
        content: {
          flex: 1,
          paddingHorizontal: theme.spacing.lg,
          paddingTop: theme.spacing.xl,
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
          lineHeight: theme.typography.body1.lineHeight,
          marginBottom: theme.spacing.xs,
        },
        phoneNumber: {
          fontSize: theme.typography.body1.fontSize,
          fontWeight: theme.typography.body1.fontWeight,
          fontFamily: theme.typography.body1.fontFamily,
          color: theme.colors.text,
          textAlign: "center",
          marginBottom: theme.spacing.xl,
        },
        codeContainer: {
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: theme.spacing.xl,
          paddingHorizontal: theme.spacing.md,
        },
        codeInput: {
          width: 50,
          height: 50,
          borderRadius: theme.borderRadius.md,
          backgroundColor: theme.colors.surface,
          borderWidth: 2,
          borderColor: theme.colors.border,
          textAlign: "center",
          fontSize: theme.typography.h3.fontSize,
          fontWeight: theme.typography.h3.fontWeight,
          fontFamily: theme.typography.h3.fontFamily,
          color: theme.colors.text,
        },
        codeInputFocused: {
          borderColor: theme.colors.primary,
        },
        verifyButton: {
          backgroundColor: theme.colors.primary,
          borderRadius: theme.borderRadius.md,
          paddingVertical: theme.spacing.md,
          alignItems: "center",
          marginBottom: theme.spacing.lg,
          ...theme.shadows.medium,
        },
        verifyButtonDisabled: {
          backgroundColor: theme.colors.disabled,
        },
        verifyButtonText: {
          fontSize: theme.typography.button.fontSize,
          fontWeight: theme.typography.button.fontWeight,
          fontFamily: theme.typography.button.fontFamily,
          color: theme.colors.textInverse,
        },
        resendContainer: {
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        },
        resendText: {
          fontSize: theme.typography.body2.fontSize,
          fontFamily: theme.typography.body2.fontFamily,
          color: theme.colors.textSecondary,
        },
        resendButton: {
          marginLeft: theme.spacing.xs,
        },
        resendButtonText: {
          fontSize: theme.typography.body2.fontSize,
          fontWeight: theme.typography.body2.fontWeight,
          fontFamily: theme.typography.body2.fontFamily,
          color: theme.colors.primary,
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

      {/* Header */}
      <View style={dynamicStyles.header}>
        <TouchableOpacity
          style={dynamicStyles.backButton}
          onPress={() => router.back()}
        >
          <Icon
            name="arrow-left"
            set="feather"
            size={20}
            color={theme.colors.text}
          />
        </TouchableOpacity>
      </View>

      <View style={dynamicStyles.content}>
        <Text style={dynamicStyles.title}>Verify Your Phone</Text>
        <Text style={dynamicStyles.subtitle}>
          We've sent a 6-digit verification code to
        </Text>
        <Text style={dynamicStyles.phoneNumber}>{phoneNumber}</Text>

        {/* Verification Code Input */}
        <View style={dynamicStyles.codeContainer}>
          {code.map((digit, index) => (
            <TextInput
              key={index}
              style={[
                dynamicStyles.codeInput,
                digit && dynamicStyles.codeInputFocused,
              ]}
              value={digit}
              onChangeText={(text) => handleCodeChange(text, index)}
              onKeyPress={(e) => handleKeyPress(e, index)}
              ref={(ref) => {
                if (ref) inputRefs.current[index] = ref;
              }}
              keyboardType="numeric"
              maxLength={1}
              selectTextOnFocus
            />
          ))}
        </View>

        {/* Verify Button */}
        <TouchableOpacity
          style={[
            dynamicStyles.verifyButton,
            (loading || code.join("").length !== 6) &&
              dynamicStyles.verifyButtonDisabled,
          ]}
          onPress={handleVerify}
          disabled={loading || code.join("").length !== 6}
        >
          <Text style={dynamicStyles.verifyButtonText}>
            {loading ? "Verifying..." : "Verify"}
          </Text>
        </TouchableOpacity>

        {/* Resend Code */}
        <View style={dynamicStyles.resendContainer}>
          <Text style={dynamicStyles.resendText}>Didn't receive a code?</Text>
          <Pressable
            style={dynamicStyles.resendButton}
            onPress={handleResendCode}
          >
            <Text style={dynamicStyles.resendButtonText}>Resend</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}
