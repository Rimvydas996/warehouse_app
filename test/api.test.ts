/// <reference types="jest" />
import { apiLogin, apiGetAll } from "../src/api/api";
import axios from "axios";
import LoginResponseInterface from "../src/model/LoginResponseInterface";
import ProductInterface from "../src/model/ProductInterface";
import UserInterface from "../src/model/UserInterface";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

const mockToken = "mock-token";
const baseURL = "https://warehouse-liart.vercel.app";

const defaultHeaders = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

const mockUser: UserInterface = {
  _id: "1",
  email: "test@test.com",
  role: "admin",
  premission: [],
  createdAt: new Date(),
  updatedAt: new Date(),
};

describe("apiLogin", () => {
  const originalConsoleLog = console.log;
  const originalConsoleError = console.error;

  beforeAll(() => {
    console.log = jest.fn();
    console.error = jest.fn();
  });

  afterAll(() => {
    console.log = originalConsoleLog;
    console.error = originalConsoleError;
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should successfully login user", async () => {
    const mockLoginResponse: LoginResponseInterface = {
      token: mockToken,
      user: mockUser,
    };
    const mockAxiosResponse = {
      status: 200,
      data: mockLoginResponse,
    };
    const loginData = {
      email: "test@test.com",
      password: "password123",
    };

    mockedAxios.post.mockResolvedValue(mockAxiosResponse);

    const result = await apiLogin(loginData);

    expect(mockedAxios.post).toHaveBeenCalledWith(`${baseURL}/auth/login`, loginData, {
      headers: defaultHeaders,
      withCredentials: true,
    });
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

describe("apiGetAll", () => {
  const originalConsoleLog = console.log;
  const originalConsoleError = console.error;

  beforeAll(() => {
    console.log = jest.fn();
    console.error = jest.fn();
  });

  afterAll(() => {
    console.log = originalConsoleLog;
    console.error = originalConsoleError;
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should successfully fetch products", async () => {
    const mockProducts: ProductInterface[] = [
      {
        _id: "1",
        title: "Test Product",
        quantity: 10,
        supplyStatus: true,
        storageLocation: "A1",
      },
    ];
    const mockAxiosResponse = {
      status: 200,
      data: mockProducts,
    };

    mockedAxios.get.mockResolvedValue(mockAxiosResponse);

    const result = await apiGetAll(mockToken);

    expect(mockedAxios.get).toHaveBeenCalledWith(`${baseURL}/warehouse`, {
      headers: {
        ...defaultHeaders,
        Authorization: `Bearer ${mockToken}`,
      },
      withCredentials: true,
    });
    expect(result).toEqual(mockProducts);
  });

  it("should return empty array on unsuccessful fetch", async () => {
    const mockAxiosResponse = {
      status: 404,
      data: null,
    };

    mockedAxios.get.mockResolvedValue(mockAxiosResponse);

    const result = await apiGetAll(mockToken);

    expect(result).toEqual([]);
  });

  it("should handle network error", async () => {
    const error = new Error("Network error");
    mockedAxios.get.mockRejectedValue(error);

    await expect(apiGetAll(mockToken)).rejects.toThrow("Network error");
  });
});
