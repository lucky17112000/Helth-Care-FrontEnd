import { ApiResponse } from "@/types/api.types";
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
const httpGet = async <TData>(
  endpoint: string,
  options?: ApiRequestResponse,
): Promise<ApiResponse<TData>> => {
  try {
    const instance = axiosInstance();
    const response = await axiosInstance().get<ApiResponse<TData>>(endpoint, {
      params: options?.params,
      headers: options?.headers,
    });
    return response.data;
  } catch (error) {
    console.error("HTTP GET request failed:", error);
    throw error;
  }
};

//!SECTION for post
const httpPost = async <TData>(
  endpoint: string,
  data: unknown,
  options?: ApiRequestResponse,
): Promise<ApiResponse<TData>> => {
  try {
    const response = await axiosInstance().post<ApiResponse<TData>>(
      endpoint,
      data,
      {
        params: options?.params,
        headers: options?.headers,
      },
    );
    return response.data;
  } catch (error) {
    console.error("HTTP POST request failed:", error);
    throw error;
  }
};
//!SECTION for put
const httpPut = async <TData>(
  endpoint: string,
  data: unknown,
  options?: ApiRequestResponse,
): Promise<ApiResponse<TData>> => {
  try {
    const response = await axiosInstance().put<ApiResponse<TData>>(
      endpoint,
      data,
      {
        params: options?.params,
        headers: options?.headers,
      },
    );
    return response.data;
  } catch (error) {
    console.error("HTTP PUT request failed:", error);
    throw error;
  }
};
//!SECTION for delete
const httpDelete = async <TData>(
  endpoint: string,
  options?: ApiRequestResponse,
): Promise<ApiResponse<TData>> => {
  try {
    const response = await axiosInstance().delete<ApiResponse<TData>>(
      endpoint,
      {
        params: options?.params,
        headers: options?.headers,
      },
    );
    return response.data;
  } catch (error) {
    console.error("HTTP DELETE request failed:", error);
    throw error;
  }
};
//!SECTION for patch
const httpPatch = async <TData>(
  endpoint: string,
  data: unknown,
  options?: ApiRequestResponse,
): Promise<ApiResponse<TData>> => {
  try {
    const response = await axiosInstance().patch<ApiResponse<TData>>(
      endpoint,
      data,
      {
        params: options?.params,
        headers: options?.headers,
      },
    );
    return response.data;
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
