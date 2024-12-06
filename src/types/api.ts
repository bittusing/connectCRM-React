// api.d.ts
import { NavigateFunction } from 'react-router-dom';
import { AxiosResponse } from 'axios';

export interface ApiResponse<T = any> {
    data?: T;
    error?: string;
}

export interface ApiConfig {
    method: string;
    url: string;
    headers: {
        'Content-Type'?: string;
        Authorization: string;
        timeout?: number;
    };
    maxBodyLength?: number;
    data?: any;
    params?: Record<string, any>;
}

export interface ApiMethods {
    getAuthAPI: <T = any>(
        endPoint: string,
        Token?: string,
        navigate?: NavigateFunction,
        params?: Record<string, any>
    ) => Promise<ApiResponse<T>>;
    
    postAuthAPI: <T = any>(
        body: any,
        endPoint: string,
        Token?: string,
        navigate?: NavigateFunction | null
    ) => Promise<ApiResponse<T>>;
    
    postAuthAPI1: <T = any>(
        body: any,
        endPoint: string,
        Token?: string,
        navigate?: NavigateFunction | null
    ) => Promise<ApiResponse<T>>;
    
    DeleteAuthAPI: <T = any>(
        id: string | number,
        endPoint: string,
        Token?: string,
        navigate?: NavigateFunction
    ) => Promise<ApiResponse<T>>;
    
    updateAuthAPI: <T = any>(
        body: any,
        id: string | number | null,
        endPoint: string,
        Token?: string,
        navigate?: NavigateFunction
    ) => Promise<ApiResponse<T>>;
    
    PutAuthAPI: <T = any>(
        body: any | null,
        id: string,
        endPoint: string,
        Token?: string,
        navigate?: NavigateFunction
    ) => Promise<ApiResponse<T>>;
}