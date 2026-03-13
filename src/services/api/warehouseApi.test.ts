import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import axios from "axios";
import { apiGetAll } from "./warehouseApi";
import IProduct from "../../types/models/IProduct";

vi.mock("axios");
vi.mock("../../config/api.config", () => ({
  API_BASE_URL: "https://warehouse-liart.vercel.app",
}));

const mockStorage: { [key: string]: string } = {};
const mockLocalStorage = {
  getItem: vi.fn((key: string) => mockStorage[key] || null),
  setItem: vi.fn((key: string, value: string) => {
    mockStorage[key] = value;
  }),
  clear: vi.fn(() => {
    Object.keys(mockStorage).forEach((key) => delete mockStorage[key]);
  }),
};

vi.stubGlobal("localStorage", mockLocalStorage);

const API_BASE_URL = "https://warehouse-liart.vercel.app";
const mockToken = "mock-token";

describe("apiGetAll", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockLocalStorage.clear();
  });

  it("should successfully fetch products", async () => {
    const mockProducts: IProduct[] = [
      {
        _id: "1",
        title: "Test Product",
        quantity: 10,
        supplyStatus: true,
        storageLocation: "A1",
      },
    ];

    mockLocalStorage.setItem("token", mockToken);
    vi.mocked(axios.get).mockResolvedValueOnce({
      status: 200,
      data: mockProducts,
    });

    const result = await apiGetAll();

    expect(mockLocalStorage.getItem).toHaveBeenCalledWith("token");
    expect(axios.get).toHaveBeenCalledWith(`${API_BASE_URL}/warehouse`, {
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
    mockStorage["token"] = "";
    vi.mocked(axios.get).mockResolvedValueOnce({
      status: 200,
      data: [],
    });

    const result = await apiGetAll();

    expect(mockLocalStorage.getItem).toHaveBeenCalledWith("token");
    expect(axios.get).toHaveBeenCalledWith(`${API_BASE_URL}/warehouse`, {
      headers: {
        Authorization: "Bearer null",
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

    vi.mocked(axios.get).mockResolvedValue(mockAxiosResponse);

    const result = await apiGetAll();

    expect(result).toEqual([]);
  });

  it("should handle network error", async () => {
    mockLocalStorage.setItem("token", mockToken);
    const error = new Error("Network error");
    vi.mocked(axios.get).mockRejectedValueOnce(error);

    await expect(apiGetAll()).rejects.toThrowError("Network error");
  });

  afterEach(() => {
    vi.mocked(axios.get).mockClear();
  });
});
