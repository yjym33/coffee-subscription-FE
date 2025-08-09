import axios from "axios";

// 브라우저/서버 환경 모두에서 안전하게 동작하도록 분기
const isBrowser = typeof window !== "undefined";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// 인증 토큰을 헤더에 넣는 요청 인터셉터
api.interceptors.request.use(
  (config) => {
    if (isBrowser) {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers = {
          ...(config.headers || {}),
          Authorization: `Bearer ${token}`,
        } as Record<string, string>;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 공통 에러 처리 인터셉터 (401 시 세션 정리)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401 && isBrowser) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

// 타입 정의
interface AuthSignupPayload {
  email: string;
  password: string;
  name: string;
  address?: string;
}

interface AuthSigninPayload {
  email: string;
  password: string;
}

interface AuthSigninResponse {
  token: string;
  email: string;
  name: string;
}

// 인증 관련 간단 헬퍼
export const auth = {
  signup: async (data: AuthSignupPayload) => {
    const response = await api.post("/auth/signup", data);
    return response.data;
  },

  signin: async (data: AuthSigninPayload) => {
    const response = await api.post("/auth/signin", data);
    if (isBrowser) {
      const signin: AuthSigninResponse = response.data as AuthSigninResponse;
      if (signin?.token) {
        localStorage.setItem("token", signin.token);
      }
      localStorage.setItem(
        "user",
        JSON.stringify({ email: signin.email, name: signin.name })
      );
    }
    return response.data;
  },

  signout: () => {
    if (isBrowser) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
  },

  getCurrentUser: () => {
    if (!isBrowser) return null;
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  },

  isAuthenticated: () => {
    if (!isBrowser) return false;
    return !!localStorage.getItem("token");
  },
};

export default api;
