import {
  NavigationContainer,
  getFocusedRouteNameFromRoute,
} from "@react-navigation/native";
import { DefaultHeaderTitle } from "../components/HeaderBar";
import SettingShowCertScreen from "../screens/profile/SettingShowCertScreen";
import LandingScreen from "../screens/LandingScreen";
import LoginLandingScreen from "../screens/authpage/LoginLandingScreen";
import LoginScreen from "../screens/authpage/LoginScreen";
import RegisterScreen from "../screens/authpage/RegisterScreen";
import React, { useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { RootStackParamList } from "../types";
import { AuthContext } from "../context/AuthContext";
import TabNavigator from "./TabNavigator";

const Stack = createStackNavigator<RootStackParamList>();
export default function Navigator() {
  const authContext = React.useContext(AuthContext) as any;

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {authContext.uid === null ? (
          <Stack.Group>
            <Stack.Screen
              name="LandingPage"
              component={LandingScreen}
              options={{
                headerTitle: () => <DefaultHeaderTitle />,
                headerTitleAlign: "center",
                headerShadowVisible: false,
              }}
            />
            <Stack.Screen
              name="LoginLanding"
              component={LoginLandingScreen}
              options={{
                // headerBackTitleVisible: true,
                headerTitle: () => <DefaultHeaderTitle />,
                headerTitleAlign: "center",
                headerShadowVisible: false,
              }}
            />

            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{
                headerTitle: () => <DefaultHeaderTitle />,
                headerBackTitleVisible: false,
                headerTitleAlign: "center",
                headerShadowVisible: false,
              }}
            />

            <Stack.Screen
              name="Register"
              component={RegisterScreen}
              options={{
                headerTitle: () => <DefaultHeaderTitle />,
                headerBackTitleVisible: false,
                headerTitleAlign: "center",
                headerShadowVisible: false,
                // headerBackVisible:false,
              }}
            />
          </Stack.Group>
        ) : (
          <Stack.Group>
            <Stack.Screen
              name="Home"
              component={TabNavigator}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen name="Profile" component={TabNavigator} />

            <Stack.Screen
              name="SettingShowCertificate"
              component={SettingShowCertScreen}
              options={{
                title: "Certificate & Private Key",
                headerTitleAlign: "center",
                headerBackTitleVisible: false,
              }}
            />
          </Stack.Group>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
