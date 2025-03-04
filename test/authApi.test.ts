/// <reference types="jest" />
import { apiLogin } from "../src/api/authApi";
import axios from "axios";
import LoginResponseInterface from "../src/model/LoginResponseInterface";

// Mock axios
jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

// Mock localStorage
const mockLocalStorage = (() => {
  let store: { [key: string]: string } = {};
  return {
    getItem: jest.fn((key: string) => store[key]),
    setItem: jest.fn((key: string, value: string) => {
      store[key] = value;
    }),
    clear: jest.fn(() => {
      store = {};
    }),
  };
})();
Object.defineProperty(window, "localStorage", { value: mockLocalStorage });

const API_BASE_URL = "https://warehouse-liart.vercel.app";
const mockToken = "mock-token";

describe("apiLogin", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    console.log = jest.fn();
    console.error = jest.fn();
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

    mockedAxios.post.mockResolvedValueOnce({
      status: 200,
      data: mockLoginResponse,
    });

    const result = await apiLogin({
      email: "test@test.com",
      password: "password123",
    });

    expect(mockedAxios.post).toHaveBeenCalledWith(
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

    mockedAxios.post.mockResolvedValue(mockAxiosResponse);

    const result = await apiLogin({
      email: "test@test.com",
      password: "wrong",
    });

    expect(result).toBe(false);
  });

  it("should handle login error", async () => {
    const error = new Error("Network error");
    mockedAxios.post.mockRejectedValue(error);

    await expect(
      apiLogin({
        email: "test@test.com",
        password: "password123",
      })
    ).rejects.toThrow("Network error");
  });
});
