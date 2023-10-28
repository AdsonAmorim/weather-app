import * as Location from "expo-location";

export async function verifyIfHasLocationPermission() {
  const locationPermission = await Location.getForegroundPermissionsAsync();
  const hasPermission = locationPermission.status === "granted";

  return hasPermission;
}
