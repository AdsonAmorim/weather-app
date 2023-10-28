import axios from "axios";

type Config = {
  headers?: Record<string, string>;
  baseUrl?: string;
  params?: Record<string, string | undefined>;
};

export function baseApiFactory(config?: Config) {
  const api = axios.create({
    baseURL: config?.baseUrl ?? "/",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...(config?.headers && config?.headers),
    },
  });

  api.interceptors.request.use((requestConfig) => {
    requestConfig.params = requestConfig.params ?? {};

    const keys = Object.keys(config?.params as {});
    const hasParams = !!keys.length;

    if (hasParams) {
      keys.forEach((key) => {
        requestConfig.params[key] = config?.params?.[key];
      });
    }

    return requestConfig;
  });

  return api;
}
