import { NativeWindStyleSheet } from "nativewind";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { RootSiblingParent } from "react-native-root-siblings";
import Navigator from "./src/navigator/Navigator";
import React, { useCallback, useEffect, useState } from "react";
import { AuthContextProvider } from "./src/context/AuthContext";
import LandingScreen from "./src/screens/LandingScreen";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import Entypo from "@expo/vector-icons/Entypo";
import { View, Text } from "react-native";
import * as SecureStore from "expo-secure-store";
import { pingCC } from "./src/utils/RESTApi";
NativeWindStyleSheet.setOutput({
  default: "native",
});

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [isAppReady, setIsAppReady] = useState<boolean>(false);
  useEffect(() => {
    async function prepare() {
      let isOk: boolean = false;
      try {
        await Font.loadAsync(Entypo.font);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const uid = await SecureStore.getItemAsync("uid");
        const pingAuth = await pingCC(uid as string);
        if (pingAuth.data.status === "OK" || !uid) {
          isOk = true;
        }
      } catch (e) {
        console.warn(e);
      } finally {
        setIsAppReady(isOk);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (isAppReady) {
      await SplashScreen.hideAsync();
    }
  }, [isAppReady]);

  if (!isAppReady) {
    return null;
  }
  return (
    <RootSiblingParent>
      <SafeAreaProvider>
        <AuthContextProvider>
          {/* <Navigator onReady={} /> */}

          <View className="flex-1" onLayout={onLayoutRootView}>
            <Navigator />
          </View>
        </AuthContextProvider>
      </SafeAreaProvider>
    </RootSiblingParent>
  );
}
