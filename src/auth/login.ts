
export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResult {
  success: boolean;
  userId?: string;
  error?: string;
}

export function login(input: LoginRequest): LoginResult {
  if (!input.email || !input.password) {
    return {
      success: false,
      error: "Email and password are required",
    };
  }

  if (!input.email.includes("@")) {
    return {
      success: false,
      error: "Invalid email address",
    };
  }

  // Simulated authentication for integration testing.
  // Never use this implementation in production.
  return {
    success: true,
    userId: input.email.toLowerCase(),
  };
}
