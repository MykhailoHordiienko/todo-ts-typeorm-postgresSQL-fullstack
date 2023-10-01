import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import localStorageService from './localStorage.service';

interface ApiResponse<T> extends AxiosResponse {
  data: T;
}

export default class HttpService {
  private baseUrl: string;

  private fetchingService: AxiosInstance = axios;

  private apiVersion: string;

  constructor(
    baseUrl = process.env.REACT_APP_SERVER_URL || '',
    apiVersion = process.env.REACT_APP_API_VERSION || ''
  ) {
    this.baseUrl = baseUrl;
    this.apiVersion = apiVersion;
  }

  private getFullApiUrl(url: string) {
    return `${this.baseUrl}/${this.apiVersion}/${url}`;
  }

  private populateTokenToHeaderConfig(): Record<string, string> {
    const token = localStorageService.get<string | null>('token');
    if (token === null) return {};
    return {
      Authorization: token
    };
  }

  private extractUrlAndDataFromConfig(config: AxiosRequestConfig): AxiosRequestConfig {
    const { data, url, ...configWithoutDataAndUrl } = config;
    return configWithoutDataAndUrl;
  }

  private getConfigWithAuth(config: AxiosRequestConfig, withAuth: boolean): AxiosRequestConfig {
    if (withAuth) {
      return {
        ...config,
        headers: {
          ...config.headers,
          ...this.populateTokenToHeaderConfig()
        }
      };
    }
    return config;
  }

  get<T>(config: AxiosRequestConfig, withAuth = false): Promise<ApiResponse<T>> {
    const updatedConfig = this.getConfigWithAuth(config, withAuth);
    return this.fetchingService.get<T>(
      this.getFullApiUrl(updatedConfig.url as string),
      this.extractUrlAndDataFromConfig(updatedConfig)
    );
  }

  put<T>(config: AxiosRequestConfig, withAuth = false): Promise<ApiResponse<T>> {
    const updatedConfig = this.getConfigWithAuth(config, withAuth);
    return this.fetchingService.put<T>(
      this.getFullApiUrl(updatedConfig.url as string),
      updatedConfig.data,
      this.extractUrlAndDataFromConfig(updatedConfig)
    );
  }

  post<T>(config: AxiosRequestConfig, withAuth = false): Promise<ApiResponse<T>> {
    const updatedConfig = this.getConfigWithAuth(config, withAuth);
    return this.fetchingService.post<T>(
      this.getFullApiUrl(updatedConfig.url as string),
      updatedConfig.data,
      this.extractUrlAndDataFromConfig(updatedConfig)
    );
  }

  delete<T>(config: AxiosRequestConfig, withAuth = false): Promise<ApiResponse<T>> {
    const updatedConfig = this.getConfigWithAuth(config, withAuth);
    return this.fetchingService.delete<T>(
      this.getFullApiUrl(updatedConfig.url as string),
      updatedConfig
    );
  }
}
