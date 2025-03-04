import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Auth } from "@/src/feature/authentication/domain/entity/auth";
import { User } from "@/src/feature/authentication/domain/entity/user";

interface AuthState {
  isLoading: boolean;
  token: Auth | null;
  user: User | null;
  setIsLoading: (isLoading: boolean) => void;
  setToken: (token: Auth) => void;
  setUser: (user: User) => void;
  logout: () => void;
}

export const useAuthState = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      isLoading: false,
      setIsLoading: (isLoading: boolean) => set({ isLoading }),
      setToken: (token) => set({ token }),
      setUser: (user) => set({ user }),
      logout: () => set({ token: null, user: null }),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => AsyncStorage), // Use AsyncStorage for React Native
    }
  )
);