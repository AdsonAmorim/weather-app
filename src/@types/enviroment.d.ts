export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      EXPO_PUBLIC_API_KEY_OPEN_WEATHER: string;
    }
  }
}
