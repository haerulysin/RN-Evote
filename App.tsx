import { NativeWindStyleSheet } from "nativewind";
import { SafeAreaProvider } from 'react-native-safe-area-context';

import Navigator from './Navigator';
import React from "react";
NativeWindStyleSheet.setOutput({
  default: "native",
});

export default function App() {
  return (
    <SafeAreaProvider>
        <Navigator />
    </SafeAreaProvider>
  );
}