import axios from "axios";

const API_ENDPOINT =
  "https://lz5cdtbtci.execute-api.ap-northeast-2.amazonaws.com/assignment";

export const httpClient = (() => {
  const instance = axios.create({
    // 기본적으로 우리가 바라볼 서버의 주소
    baseURL: API_ENDPOINT,
  });

  // request interceptors
  axios.interceptors.request.use((config: any) => {
    config.headers["Content-Type"] = "application/json; charset=utf-8";
    config.headers["X-Requested-With"] = "XMLHttpRequest";
    config.headers.Accept = "application/json";
    return config;
  });

  return {
    async get<T>(url: string): Promise<T> {
      return await instance.get(url);
    },
    async post<T>(
      url: string,
      data: Record<string, string | number>
    ): Promise<T> {
      return await instance.post(url, data);
    },
  };
})();
