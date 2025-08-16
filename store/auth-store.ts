import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { auth } from "@/lib/services/api";

interface User {
  id: string;
  email: string;
  name: string;
  isAdmin?: boolean;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,

      login: async (email: string, password: string) => {
        set({ isLoading: true });
        try {
          // API를 통한 실제 로그인 호출
          const response = await auth.signin({ email, password });

          // API 응답으로부터 사용자 정보 구성
          const user: User = {
            id: response.id || "1", // API 응답에 id가 없으면 기본값
            email: response.email,
            name: response.name,
            isAdmin: email.includes("admin"), // 임시: 이메일에 admin이 포함되면 관리자
          };

          set({
            user,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      logout: () => {
        // API 로그아웃 호출
        auth.signout();

        // 스토어 상태 초기화
        set({
          user: null,
          isAuthenticated: false,
        });
      },

      setUser: (user) => {
        set({
          user,
          isAuthenticated: !!user,
        });
      },

      setLoading: (loading) => {
        set({ isLoading: loading });
      },
    }),
    {
      name: "auth-storage",
      // SSR 안전한 localStorage 접근
      storage: createJSONStorage(() =>
        typeof window !== "undefined"
          ? localStorage
          : (undefined as unknown as Storage)
      ),
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
