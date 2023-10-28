import { baseApiFactory } from "./base-api";

const baseUrl = "https://api.openweathermap.org/data/2.5/";
const appId = process.env.EXPO_PUBLIC_API_KEY_OPEN_WEATHER;

const api = baseApiFactory({ baseUrl, params: { appid: appId } });

export { api };
