import { describe, it, expect, beforeEach, vi } from "vitest";
import { apiLogin } from "../src/api/authApi";
import axios from "axios";
import LoginResponseInterface from "../src/model/LoginResponseInterface";

// Mock axios
vi.mock("axios");

// Mock localStorage before any test runs
const mockLocalStorage = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  clear: vi.fn(),
};

// Setup localStorage mock
vi.stubGlobal("localStorage", mockLocalStorage);

const API_BASE_URL = "https://warehouse-liart.vercel.app";
const mockToken = "mock-token";

describe("apiLogin", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    console.log = vi.fn();
    console.error = vi.fn();
  });

  it("should successfully login user", async () => {
    const mockLoginResponse: LoginResponseInterface = {
      token: mockToken,
      user: {
        _id: "1",
        email: "test@test.com",
        role: "admin",
        premission: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    };

    vi.mocked(axios.post).mockResolvedValueOnce({
      status: 200,
      data: mockLoginResponse,
    });

    const result = await apiLogin({
      email: "test@test.com",
      password: "password123",
    });

    expect(axios.post).toHaveBeenCalledWith(
      `${API_BASE_URL}/auth/login`,
      {
        email: "test@test.com",
        password: "password123",
      },
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        withCredentials: true,
      }
    );
    expect(result).toEqual(mockLoginResponse);
  });

  it("should return false on unsuccessful login", async () => {
    const mockAxiosResponse = {
      status: 401,
      data: { message: "Invalid credentials" },
    };

    vi.mocked(axios.post).mockResolvedValue(mockAxiosResponse);

    const result = await apiLogin({
      email: "test@test.com",
      password: "wrong",
    });

    expect(result).toBe(false);
  });

  it("should handle login error", async () => {
    const error = new Error("Network error");
    vi.mocked(axios.post).mockRejectedValue(error);

    await expect(
      apiLogin({
        email: "test@test.com",
        password: "password123",
      })
    ).rejects.toThrowError("Network error");
  });
});
