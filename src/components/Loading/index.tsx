import { View } from "native-base";
import { ActivityIndicator } from "react-native";

export function Loading() {
  return (
    <View flex={1} justifyContent="center">
      <ActivityIndicator size="large" color="#383761" />
    </View>
  );
}
