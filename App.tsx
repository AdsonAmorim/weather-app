import { Alert, SafeAreaView, Dimensions } from "react-native";
import { StatusBar } from "expo-status-bar";
import Constants from "expo-constants";
import { NativeBaseProvider } from "native-base";
import { Inter_400Regular } from "@expo-google-fonts/inter";
import { useFonts } from "expo-font";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { theme } from "@styles/index";
import { Home } from "./src/pages/Home";

import * as Location from "expo-location";
import { useEffect } from "react";

export default function App() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
  });

  useEffect(() => {
    async function requestLocation() {
      const location = await Location.requestForegroundPermissionsAsync();

      if (location.status !== "granted") {
        Alert.alert(
          "Para usar nosso app é necessário conceder permissões de localzização"
        );
      }
    }
    requestLocation();
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <NativeBaseProvider theme={theme}>
      <StatusBar backgroundColor="#FFFFFF" style="dark" />
      <SafeAreaView
        style={{
          flex: 1,
          marginTop: `${Constants.statusBarHeight + 5}px`,
        }}
      >
        <KeyboardAwareScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{
            height: Dimensions.get("window").height + Constants.statusBarHeight,
          }}
          extraHeight={200}
          automaticallyAdjustContentInsets={false}
        >
          <Home />
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </NativeBaseProvider>
  );
}
