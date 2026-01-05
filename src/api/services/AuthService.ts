import { API_CONFIG } from "@/config/api";
import { apiClient } from "../client";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  password: string;
  email?: string;
  role?: string;
}

export interface AuthResponse {
  token: string;
}

class AuthService {
  private registerEndpoint = API_CONFIG.endpoints.auth.register;
  private loginEndpoint = API_CONFIG.endpoints.auth.login;

  async Login(credentials: LoginRequest): Promise<string> {
    const response = await apiClient.post<AuthResponse | string>(
      this.loginEndpoint,
      credentials
    );

    let token = "";

    if (typeof response === "string") {
      token = response;
    } else if (
      response &&
      typeof response === "object" &&
      "token" in response
    ) {
      token = response.token;
    }

    if (!token) {
      throw new Error("No se recibió un token válido del servidor");
    }

    localStorage.setItem("token", token);

    return token;
  }

  async Register(data: RegisterRequest): Promise<void> {
    await apiClient.post(this.registerEndpoint, data);
  }

  logout() {
    localStorage.removeItem("token");
    window.location.href = "/login";
  }

  getToken(): string | null {
    return localStorage.getItem("token");
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}

export const authService = new AuthService();
