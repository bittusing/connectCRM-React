// api.ts
import axios, { AxiosError } from "axios";
import { NavigateFunction } from "react-router-dom";
import { BASE_URL } from "./UrlProvider";
import { LocalStorage } from "../utils/localStorage";
import { toast } from "react-toastify";
import { ApiResponse, ApiConfig, ApiMethods } from "../types/api";

export const getAuthAPI = async <T>(
  endPoint: string,
  Token: string = "",
  navigate?: NavigateFunction,
  params: Record<string, any> = {}
): Promise<ApiResponse<T>> => {
  const config: ApiConfig = {
    method: "get",
    url: `${BASE_URL}${endPoint}`,
    headers: {
      "Content-Type": "application/json",
      timeout: 10000,
      Authorization: Token || "",
    },
    params,
  };

  try {
    const response = await axios.request<T>(config);
    return { data: response?.data };
  } catch (error) {
    const axiosError = error as AxiosError;
    if (axiosError.response?.status === 401) {
      console.error("Error 401: Unauthorized");
      LocalStorage.ClearStorage();
      navigate?.("/");
    }
    return { error: axiosError.message };
  }
};

export const postAuthAPI = async <T>(
  body: any,
  endPoint: string,
  Token: string = "",
//   navigate: NavigateFunction | null = null
): Promise<ApiResponse<T>> => {
  const config: ApiConfig = {
    method: "post",
    maxBodyLength: Infinity,
    url: `${BASE_URL}${endPoint}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: Token || "",
    },
    data: JSON.stringify(body),
  };

  try {
    const response = await axios.request<T>(config);
    return { data: response?.data };
  } catch (error) {
    const axiosError = error as AxiosError<{ message: string }>;
    console.log(error);
    if (axiosError.response?.status === 401) {
      console.error("Error 401: Unauthorized");
      LocalStorage.ClearStorage();
      window.location.href = "/login";
    }
    toast.error(axiosError.response?.data?.message);
    return { error: axiosError.message || "" };
  }
};

export const postAuthAPI1 = async <T>(
  body: any,
  endPoint: string,
  Token: string = "",
  navigate: NavigateFunction | null = null
): Promise<ApiResponse<T>> => {
  const config: ApiConfig = {
    method: "post",
    maxBodyLength: Infinity,
    url: `${BASE_URL}${endPoint}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: Token || "",
    },
    data: body,
  };

  try {
    const response = await axios.request<T>(config);
    return { data: response?.data };
  } catch (error) {
    const axiosError = error as AxiosError<{ data: string }>;
    console.log(error);
    if (axiosError.response?.status === 401) {
      console.error("Error 401: Unauthorized");
      LocalStorage.ClearStorage();
      navigate?.("/");
    }
    toast.error(axiosError.response?.data?.data);
    return { error: axiosError.message };
  }
};

export const DeleteAuthAPI = async <T>(
  id: string | number,
  endPoint: string,
  Token: string = "",
  navigate?: NavigateFunction
): Promise<ApiResponse<T>> => {
  const config: ApiConfig = {
    method: "delete",
    maxBodyLength: Infinity,
    url: `${BASE_URL}${endPoint}/${id}`,
    headers: {
      Authorization: Token || "",
    },
    data: "",
  };

  try {
    const response = await axios.request<T>(config);
    return { data: response?.data };
  } catch (error) {
    const axiosError = error as AxiosError;
    if (axiosError.response?.status === 401) {
      console.error("Error 401: Unauthorized");
      LocalStorage.ClearStorage();
      navigate?.("/");
    }
    return { error: axiosError.message };
  }
};

export const updateAuthAPI = async <T>(
  body: any,
  id: string | number | null,
  endPoint: string,
  Token: string = "",
  navigate?: NavigateFunction
): Promise<ApiResponse<T>> => {
  const config: ApiConfig = {
    method: "put",
    maxBodyLength: Infinity,
    url:
      id !== null ? `${BASE_URL}${endPoint}/${id}` : `${BASE_URL}${endPoint}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: Token || "",
    },
    data: JSON.stringify(body),
  };

  try {
    const response = await axios.request<T>(config);
    return { data: response?.data };
  } catch (error) {
    const axiosError = error as AxiosError;
    if (axiosError.response?.status === 401) {
      console.error("Error 401: Unauthorized");
      LocalStorage.ClearStorage();
      navigate?.("/");
    }
    return { error: axiosError.message };
  }
};

export const PutAuthAPI = async <T>(
  body: any | null,
  id: string,
  endPoint: string,
  Token: string = "",
  navigate?: NavigateFunction
): Promise<ApiResponse<T>> => {
  const config: ApiConfig = {
    method: "put",
    maxBodyLength: Infinity,
    url: `${BASE_URL}${endPoint}/${id}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: Token || "",
    },
  };

  if (body !== null) {
    config.data = JSON.stringify(body);
  }

  try {
    const response = await axios.request<T>(config);
    return { data: response?.data };
  } catch (error) {
    const axiosError = error as AxiosError;
    if (axiosError.response?.status === 401) {
      console.error("Error 401: Unauthorized");
      LocalStorage.ClearStorage();
      navigate?.("/");
    } else {
      alert("error.response && error.response.status === 401");
    }
    return { error: axiosError.message };
  }
};

export const networkErrorAlert = (callback: () => void) => {
  // Implementation here if needed
};

export const API: ApiMethods = {
  getAuthAPI,
  postAuthAPI,
  postAuthAPI1,
  DeleteAuthAPI,
  updateAuthAPI,
  PutAuthAPI,
};
