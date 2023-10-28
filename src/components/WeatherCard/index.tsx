import React from "react";
import { Image } from "expo-image";

import { VStack, Box, Divider, Text } from "native-base";
import { WeatherData as WeatherDataResponse } from "@models/weather-data.model";
import { getWeatherIcon } from "@utils/get-weather-icon";

interface WeatherData extends WeatherDataResponse {
  weatherImageUrl: string;
}

export function WeatherCard({ dt, weatherImageUrl, main }: WeatherData) {
  const weatherDate = new Date(dt * 1000).getDate();
  const weatherDay = new Date(dt * 1000);
  const isCurrentDate = weatherDate === new Date().getDate();

  return (
    <Box
      borderRadius="md"
      marginRight={3.5}
      width="120px"
      backgroundColor="light.hover"
    >
      <VStack space="1" alignItems="center" py={2}>
        <Box px="4" pt="4">
          {isCurrentDate
            ? "Today"
            : `${weatherDay.toLocaleString("en-US", {
                weekday: "short",
                day: "2-digit",
                month: "short",
              })}`}
        </Box>
        <Image
          source={weatherImageUrl}
          contentFit="cover"
          style={{ width: 72, height: 72 }}
        />
        <Text>{main.temp} ºC</Text>
      </VStack>
    </Box>
  );
}
