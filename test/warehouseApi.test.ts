import { apiGetAll } from "../src/api/warehoseApi";
import axios from "axios";
import ProductInterface from "../src/model/ProductInterface";

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

describe("apiGetAll", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
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

    localStorage.setItem("token", mockToken);
    mockedAxios.get.mockResolvedValueOnce({
      status: 200,
      data: mockProducts,
    });

    const result = await apiGetAll();

    expect(localStorage.getItem).toHaveBeenCalledWith("token");
    expect(mockedAxios.get).toHaveBeenCalledWith(`${API_BASE_URL}/warehouse`, {
      headers: {
        Authorization: `Bearer ${mockToken}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      withCredentials: true,
    });
    expect(result).toEqual(mockProducts);
  });

  it("should return empty array when no token is available", async () => {
    localStorage.setItem("token", "");
    mockedAxios.get.mockResolvedValueOnce({
      status: 200,
      data: [],
    });

    const result = await apiGetAll();

    expect(localStorage.getItem).toHaveBeenCalledWith("token");
    expect(mockedAxios.get).toHaveBeenCalledWith(`${API_BASE_URL}/warehouse`, {
      headers: {
        Authorization: "Bearer ",
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      withCredentials: true,
    });
    expect(result).toEqual([]);
  });

  it("should return empty array on unsuccessful fetch", async () => {
    const mockAxiosResponse = {
      status: 404,
      data: null,
    };

    mockedAxios.get.mockResolvedValue(mockAxiosResponse);

    const result = await apiGetAll();

    expect(result).toEqual([]);
  });

  it("should handle network error", async () => {
    localStorage.setItem("token", mockToken);
    const error = new Error("Network error");
    mockedAxios.get.mockRejectedValueOnce(error);

    await expect(apiGetAll()).rejects.toThrow("Network error");
  });

  afterEach(() => {
    mockedAxios.get.mockClear();
  });
});
