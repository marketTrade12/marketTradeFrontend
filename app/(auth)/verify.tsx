import { useLocalSearchParams, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useRef, useState } from 'react';
import {
    ActivityIndicator,
    Animated,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { MASTER_OTP, useAuthStore, verifyOtp } from '../../utils/authStore';

export default function VerifyOtp() {
  const { phoneNumber } = useLocalSearchParams<{ phoneNumber: string }>();
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [timeLeft, setTimeLeft] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);
  
  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  
  // Refs for OTP inputs
  const inputRefs = useRef<Array<TextInput | null>>([]);
  
  // Create refs for each input field
  for (let i = 0; i < 6; i++) {
    if (!inputRefs.current[i]) {
      inputRefs.current[i] = null;
    }
  }

  // Start the animation when component mounts
  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();

    // Auto-fill master OTP for development
    setTimeout(() => {
      autoFillOtp(MASTER_OTP);
    }, 1500);

    // Start countdown timer
    const interval = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(interval);
          setCanResend(true);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);
  
  // Function to auto-fill OTP
  const autoFillOtp = (code: string) => {
    setOtp(code);
    // Set values in each input
    for (let i = 0; i < code.length && i < 6; i++) {
      if (inputRefs.current[i]) {
        inputRefs.current[i]?.setNativeProps({ text: code[i] });
      }
    }
  };

  const handleVerify = async () => {
    if (!otp || otp.length !== 6) {
      setError('Please enter a valid 6-digit OTP');
      return;
    }

    try {
      setLoading(true);
      const success = await verifyOtp(phoneNumber || '', otp);
      
      if (success) {
        // Set user as logged in
        setUser({
          phoneNumber: phoneNumber || '',
          isLoggedIn: true,
        });
        
        // Navigate to home screen
        router.replace('/(tabs)');
      } else {
        setError('Invalid OTP. Please try again.');
      }
    } catch (error) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (!canResend) return;

    // Reset timer and resend flag
    setTimeLeft(30);
    setCanResend(false);
    setError('');

    // Start timer again
    const interval = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(interval);
          setCanResend(true);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    // Auto-fill master OTP again for development
    setTimeout(() => {
      autoFillOtp(MASTER_OTP);
    }, 1500);
  };

  const handleOtpChange = (text: string, index: number) => {
    // Create a new OTP string with the new digit
    const newOtp = otp.split('');
    newOtp[index] = text.slice(-1); // Get last character in case multiple digits are pasted
    const updatedOtp = newOtp.join('');
    setOtp(updatedOtp);
    setError('');
    
    // Auto-focus next input
    if (text && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };
  
  const handleKeyPress = (e: any, index: number) => {
    // Handle backspace
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
    >
      <StatusBar style="light" />
      
      <Animated.View 
        style={[
          styles.card, 
          { 
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }]
          }
        ]}
      >
        <Text style={styles.title}>Verify OTP</Text>
        <Text style={styles.subtitle}>
          Enter the 6-digit code sent to {'\n'}
          <Text style={styles.phoneText}>+91 {phoneNumber}</Text>
        </Text>
        
        <View style={styles.otpContainer}>
          {[0, 1, 2, 3, 4, 5].map((index) => (
            <TextInput
              key={index}
              ref={(ref) => {
                inputRefs.current[index] = ref;
              }}
              style={[styles.otpInput, otp[index] ? styles.otpInputFilled : null]}
              keyboardType="number-pad"
              maxLength={1}
              onChangeText={(text) => handleOtpChange(text, index)}
              onKeyPress={(e) => handleKeyPress(e, index)}
              value={otp[index] || ''}
              autoFocus={index === 0}
            />
          ))}
        </View>
        
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
        
        <TouchableOpacity 
          style={[
            styles.button,
            (otp.length !== 6 || loading) && styles.buttonDisabled
          ]} 
          onPress={handleVerify}
          disabled={otp.length !== 6 || loading}
        >
          {loading ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={styles.buttonText}>Verify & Continue</Text>
          )}
        </TouchableOpacity>
        
        <View style={styles.resendContainer}>
          <Text style={styles.resendText}>
            Didn't receive the code?{' '}
          </Text>
          {canResend ? (
            <TouchableOpacity onPress={handleResendOtp}>
              <Text style={styles.resendLink}>Resend OTP</Text>
            </TouchableOpacity>
          ) : (
            <Text style={styles.timerText}>Resend in {timeLeft}s</Text>
          )}
        </View>
      </Animated.View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  card: {
    width: '100%',
    backgroundColor: '#1E1E1E',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#CCCCCC',
    marginBottom: 32,
    textAlign: 'center',
    lineHeight: 24,
  },
  phoneText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 24,
  },
  otpInput: {
    backgroundColor: '#2A2A2A',
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    height: 50,
    width: 45,
    borderRadius: 8,
    textAlign: 'center',
  },
  otpInputFilled: {
    borderColor: '#4A80F0',
    borderWidth: 2,
  },
  otpInputFocused: {
    borderColor: '#4A80F0',
    borderWidth: 2,
  },
  button: {
    backgroundColor: '#4A80F0',
    width: '100%',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#4A80F080',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorText: {
    color: '#FF5252',
    marginBottom: 16,
    alignSelf: 'flex-start',
  },
  resendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 24,
  },
  resendText: {
    color: '#AAAAAA',
    fontSize: 14,
  },
  resendLink: {
    color: '#4A80F0',
    fontSize: 14,
    fontWeight: 'bold',
  },
  timerText: {
    color: '#AAAAAA',
    fontSize: 14,
  },
}); 