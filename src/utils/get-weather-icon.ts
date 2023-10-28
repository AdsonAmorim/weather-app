interface GetWeatherIconParams {
  size: "2x" | "4x";
  icon: string;
}

export function getWeatherIcon({ size, icon }: GetWeatherIconParams) {
  const imageSrc = `https://openweathermap.org/img/wn/${icon}@${size}.png`;

  return imageSrc;
}
