//https://api.openweathermap.org/data/2.5/forecast?q=petrolina&cnt=5&appid=a8980d0d85102ce1fa793ebe319fb251
import { api } from "../config/weather-api";
import { WeatherData } from "@models/weather-data.model";

interface GetWeatherByLocationParams {
  cityName: string;
  interval: number;
}

type GetWeatherByLocationResponse = WeatherData[];

const getDate = (timestamp: number) => {
  return new Date(timestamp * 1000).getDate();
};

export const getForestWeatherByCityName = async ({
  cityName,
  interval,
}: GetWeatherByLocationParams): Promise<GetWeatherByLocationResponse> => {
  // cnt=40 for 5 days, because the api provides data in 3-hour interval, 8 per day
  const cnt = 8 * interval;
  console.log({ cityName });

  const response = await api.get(
    `/forecast?cnt=${cnt}&units=metric&q=${cityName.toLowerCase()}`
  );

  const listData = response.data.list as GetWeatherByLocationResponse;

  const dailyData = listData.reduce((acumulator, currentValue) => {
    const date = getDate(currentValue.dt);

    const hasCurrentDate = acumulator.find((item) => date === getDate(item.dt));

    if (!hasCurrentDate) {
      acumulator.push(currentValue);
    }

    return acumulator;
  }, [] as WeatherData[]);

  return dailyData;
};
