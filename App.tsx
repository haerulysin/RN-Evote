import { NativeWindStyleSheet } from "nativewind";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { RootSiblingParent } from 'react-native-root-siblings';
import Navigator from './src/navigator/Navigator';
import React from "react";
import { AuthContextProvider } from "./src/context/AuthContext";

NativeWindStyleSheet.setOutput({
  default: "native",
});

export default function App() {
  return (
    <RootSiblingParent>
      <SafeAreaProvider>
        <AuthContextProvider>
          <Navigator />
        </AuthContextProvider>
      </SafeAreaProvider>
    </RootSiblingParent>

  );
}