// packages
import React, { useEffect, useState } from "react";
import { Image } from "expo-image";
import { MaterialIcons, FontAwesome5, Ionicons } from "@expo/vector-icons";
import { Box, FlatList, Stack, Text, View } from "native-base";

// hooks
import { useToast } from "@hooks/toast.hook";

// services
import {
  getForestWeatherByLocation,
  getForestWeatherByCityName,
} from "@service/index";

// utils
import { getCurrentLocation } from "@utils/get-current-location";
import { verifyIfHasLocationPermission } from "@utils/verify-location-permission";
import { getWeatherIcon } from "@utils/get-weather-icon";

// models
import { WeatherData as WeatherDataResponse } from "@models/weather-data.model";

// components
import { SearchBox } from "@components/SearchBox";
import { WeatherCard } from "@components/WeatherCard";
import { HomeSkeleton } from "./skeleton";

interface WeatherData extends WeatherDataResponse {
  weatherImageUrl: string;
}

export function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [forecast, setForecast] = useState<WeatherData[]>([] as WeatherData[]);
  const toast = useToast();

  async function getWeatherData() {
    setIsLoading(true);
    const hasPermission = await verifyIfHasLocationPermission();

    if (hasPermission) {
      const location = await getCurrentLocation();

      if (location) {
        const {
          coords: { latitude, longitude },
        } = location;

        try {
          const forecast = await getForestWeatherByLocation({
            latitude,
            longitude,
            interval: 5,
          });

          const forecastDataWithImageUrl = forecast.map((item) => {
            const weatherImageUrl = getWeatherIcon({
              icon: item.weather[0].icon,
              size: "4x",
            });

            return {
              ...item,
              weatherImageUrl,
            };
          });
          setForecast(forecastDataWithImageUrl);
        } catch (error) {
          toast.show(
            <View
              backgroundColor="error.500"
              paddingX={5}
              paddingY={2}
              rounded={4}
            >
              <Text color="light.white">
                Ocorreu um erro ao tentar buscar a previsão da sua cidade
              </Text>
            </View>
          );
        } finally {
          setIsLoading(false);
        }
      }
    }
  }

  async function getForecastByCityName(cityName: string) {
    if (cityName.length) {
      setIsLoading(true);

      try {
        const forecastData = await getForestWeatherByCityName({
          cityName,
          interval: 5,
        });

        const forecastDataWithImageUrl = forecastData.map((item) => {
          const weatherImageUrl = getWeatherIcon({
            icon: item.weather[0].icon,
            size: "2x",
          });

          return {
            ...item,
            weatherImageUrl,
          };
        });

        setForecast(forecastDataWithImageUrl);
      } catch (error) {
        setForecast(forecast);

        toast.show(
          <View
            backgroundColor="error.500"
            paddingX={5}
            paddingY={2}
            rounded={4}
          >
            <Text color="light.white">
              Ocorreu um erro na busca dessa cidade. Por favor, verifique o nome
              digitado
            </Text>
          </View>
        );
      } finally {
        setIsLoading(false);
      }
    } else {
      await getWeatherData();
    }
  }

  useEffect(() => {
    getWeatherData();
  }, []);

  return (
    <View
      flex={1}
      height="full"
      width="full"
      backgroundColor="light.primary"
      padding={4}
      marginTop={8}
    >
      <View justifyContent="space-between" flex={1}>
        <View flexDirection="row" alignItems="center" alignSelf="flex-start">
          <MaterialIcons name="location-pin" size={24} />

          <SearchBox getData={getForecastByCityName} />
        </View>

        {isLoading ? (
          <HomeSkeleton />
        ) : (
          <>
            <View alignItems="center" flex={1} justifyContent="center">
              <Image
                source={forecast[0].weatherImageUrl}
                contentFit="cover"
                style={{ width: 184, height: 184 }}
              />

              <Text fontSize="xl">{forecast[0].weather[0].main}</Text>
              <Text fontSize="xl">{forecast[0].weather[0].description}</Text>
              <Text fontSize="4xl">{forecast[0].main.temp} ºC</Text>

              <View flexDirection="row" alignItems="center">
                <View flexDirection="row" alignItems="center">
                  <FontAwesome5 name="wind" size={24} color="black" />
                  <Text fontSize="xl" marginLeft={2}>
                    {(forecast[0].wind.speed * 3.6).toFixed(2)} km/h
                  </Text>
                </View>
                <View flexDirection="row" alignItems="center" marginLeft={4}>
                  <Ionicons name="water-outline" size={24} color="black" />
                  <Text fontSize="xl" marginLeft={2}>
                    {forecast[0].main.humidity}%
                  </Text>
                </View>
              </View>
            </View>
            <View paddingBottom={4}>
              <Text marginBottom={2} color="light.text">
                Previsão para os próximos dias
              </Text>

              <FlatList
                data={forecast}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item, index) => String(index)}
                horizontal
                renderItem={({ item, index }) => (
                  <WeatherCard key={index} {...item} />
                )}
              />
            </View>
          </>
        )}
      </View>
    </View>
  );
}
