import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
if (!API_BASE_URL) {
  throw new Error("API_BASE_URL is not defined");
}
const axiosInstance = () => {
  const instance = axios.create({
    baseURL: API_BASE_URL,
    timeout: 30000,
    headers: {
      "Content-Type": "application/json",
    },
  });
  return instance;
};
export interface ApiRequestResponse {
  params?: Record<string, unknown>;
  headers?: Record<string, string>;
}
const httpGet = async (endpoint: string, options?: ApiRequestResponse) => {
  try {
    const response = await axiosInstance().get(endpoint, {
      params: options?.params,
      headers: options?.headers,
    });
    return response;
  } catch (error) {
    console.error("HTTP GET request failed:", error);
  }
};
const httpPost = async (
  endpoint: string,
  data: unknown,
  options?: ApiRequestResponse,
) => {
  try {
    const response = await axiosInstance().post(endpoint, data, {
      params: options?.params,
      headers: options?.headers,
    });
    return response;
  } catch (error) {
    console.error("HTTP POST request failed:", error);
    throw error;
  }
};
const httpPut = async (
  endpoint: string,
  data: unknown,
  options?: ApiRequestResponse,
) => {
  try {
    const response = await axiosInstance().put(endpoint, data, {
      params: options?.params,
      headers: options?.headers,
    });
    return response;
  } catch (error) {
    console.error("HTTP PUT request failed:", error);
    throw error;
  }
};
const httpDelete = async (endpoint: string, options?: ApiRequestResponse) => {
  try {
    const response = await axiosInstance().delete(endpoint, {
      params: options?.params,
      headers: options?.headers,
    });
    return response;
  } catch (error) {
    console.error("HTTP DELETE request failed:", error);
    throw error;
  }
};
const httpPatch = async (
  endpoint: string,
  data: unknown,
  options?: ApiRequestResponse,
) => {
  try {
    const response = await axiosInstance().patch(endpoint, data, {
      params: options?.params,
      headers: options?.headers,
    });
    return response;
  } catch (error) {
    console.error("HTTP PATCH request failed:", error);
    throw error;
  }
};

export const httpClient = {
  get: httpGet,
  post: httpPost,
  put: httpPut,
  delete: httpDelete,
  patch: httpPatch,
};
