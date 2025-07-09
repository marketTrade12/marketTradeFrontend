import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface User {
  phoneNumber: string;
  isLoggedIn: boolean;
}

interface AuthState {
  user: User | null;
  setUser: (user: User) => void;
  logout: () => void;
  isFirstTime: boolean;
  setIsFirstTime: (isFirstTime: boolean) => void;
  _hasHydrated: boolean;
  setHasHydrated: (state: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isFirstTime: true,
      _hasHydrated: false,
      setUser: (user) => set({ user }),
      logout: () => set({ user: null }),
      setIsFirstTime: (isFirstTime) => set({ isFirstTime }),
      setHasHydrated: (state) => set({ _hasHydrated: state }),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => AsyncStorage),
      onRehydrateStorage: () => (state) => {
        if (state) {
          useAuthStore.getState().setHasHydrated(true);
        }
      },
    }
  )
);

// For development convenience - a master OTP that always works
export const MASTER_OTP = "123456";

// Phone validation helper
export const isValidIndianPhoneNumber = (phone: string): boolean => {
  const regex = /^[6-9]\d{9}$/;
  return regex.test(phone);
};

// Mock OTP sending function (in a real app, this would call an API)
export const sendOtp = async (phoneNumber: string): Promise<boolean> => {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return true;
};

// Mock OTP verification (in a real app, this would call an API)
export const verifyOtp = async (
  phoneNumber: string,
  otp: string
): Promise<boolean> => {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // In a real app, this would verify with a backend
  // For now, we'll accept any OTP for development
  return otp === MASTER_OTP;
};
