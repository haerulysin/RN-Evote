import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AntDesign, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { View, Text, Button, ImageBackground } from 'react-native';


//Screen
import ElectionDetailScreen from './src/screens/election/ElectionDetailScreen';
import ElectionVotingScreen from './src/screens/election/ElectionVotingScreen';
import ElectionScreens from './src/screens/election/ElectionScreens';


//HeaderBar
import { DefaultHeaderBar, DefaultHeaderTitle, FragmentCardHeaderBar, FragmentHeaderBar } from './src/components/HeaderBar'
import ElectionVotingConfirmationScreen from './src/screens/election/ElectionVotingConfirmationScreen';
import ElectionVotingSuccessScreen from './src/screens/election/ElectionVotingSuccessScreen';
import SettingScreen from './src/screens/profile/SettingScreen';
import SettingShowCertScreen from './src/screens/profile/SettingShowCertScreen';
import LandingScreen from './src/screens/LandingScreen';
import LoginLandingScreen from './src/screens/authpage/LoginLandingScreen';
import LoginScreen from './src/screens/authpage/LoginScreen';
import RegisterScreen from './src/screens/authpage/RegisterScreen';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ElectionStackParamList, RootStackParamList } from './src/types';

const Tab = createBottomTabNavigator();
const TabOpts = { headerShown: false, tabBarShowLabel: false }
const Stack = createStackNavigator<RootStackParamList>();;
export default function Navigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName='Register'
            // screenOptions={{
            //     cardStyle:{backgroundColor:'#fff'}
            // }}
            >
                <Stack.Screen name='Home' component={TabNavigator}
                    options={{
                        headerShown: false
                    }}
                />
                <Stack.Screen name='Profile' component={TabNavigator} />
                <Stack.Screen
                    name='ElectionVotingSuccess'
                    component={ElectionVotingSuccessScreen}
                    options={{
                        headerShown: false
                    }}
                />

                <Stack.Screen
                    name='SettingShowCertificate'
                    component={SettingShowCertScreen}
                    options={{
                        title: 'Certificate & Private Key',
                        headerTitleAlign: 'center',
                        headerBackTitleVisible: false,
                    }}
                />

                {/* LandingScreen */}
                <Stack.Screen
                    name='LandingPage'
                    component={LandingScreen}
                    options={{
                        headerTitle: () => <DefaultHeaderTitle />,
                        headerTitleAlign: 'center',
                        headerShadowVisible: false,

                    }}
                />

                <Stack.Screen
                    name='LoginLanding'
                    component={LoginLandingScreen}
                    options={{
                        // headerBackTitleVisible: true,
                        headerTitle: () => <DefaultHeaderTitle />,
                        headerTitleAlign: 'center',
                        headerShadowVisible: false,

                    }}
                />

                <Stack.Screen
                    name='Login'
                    component={LoginScreen}
                    options={{
                        headerTitle: () => <DefaultHeaderTitle />,
                        headerBackTitleVisible: false,
                        headerTitleAlign: 'center',
                        headerShadowVisible: false,

                    }}

                />

                <Stack.Screen
                    name='Register'
                    component={RegisterScreen}
                    options={{
                        headerTitle: () => <DefaultHeaderTitle />,
                        headerBackTitleVisible: false,
                        headerTitleAlign: 'center',
                        headerShadowVisible: false,
                        // headerBackVisible:false,

                    }}

                />


            </Stack.Navigator>
        </NavigationContainer>
    )
}

function TabNavigator() {
    return (
        <Tab.Navigator

        >

            <Tab.Screen
                name='Blocks'
                component={ProfileStackScreen}
                options={{
                    ...TabOpts,
                    tabBarActiveTintColor: '#25AAE1',
                    tabBarIcon: ({ color, size }) => (
                        <AntDesign name="CodeSandbox" size={size} color={color} />
                    )


                }}
            />

            <Tab.Screen
                name='Elections'
                component={ElectionStackScreen}
                options={{
                    ...TabOpts,
                    tabBarActiveTintColor: '#25AAE1',
                    tabBarIcon: ({ color, size }) => (
                        <AntDesign name='home' size={size} color={color} />
                    ),
                }}

            />
            <Tab.Screen
                name='Settings'
                component={ProfileStackScreen}
                options={{
                    ...TabOpts,
                    tabBarActiveTintColor: '#25AAE1',
                    tabBarIcon: ({ color, size }) => (
                        <AntDesign name="setting" size={size} color={color} />
                    )
                }}
            />
        </Tab.Navigator>
    )
}

const ElectionStack = createStackNavigator<ElectionStackParamList>();
const ElectionStackScreen = () => {
    return (
        <ElectionStack.Navigator initialRouteName='Election' >
            <ElectionStack.Screen
                name='Election'
                component={ElectionScreens}
                options={{
                    header: (props) => <DefaultHeaderBar {...props} />
                }}
            />

            <ElectionStack.Screen
                name='ElectionDetail'
                // component={ElectionDetailScreen}
                component={ElectionDetailScreen}
                options={{
                    header: (props) => <FragmentHeaderBar {...props} />

                }}

            />

            <ElectionStack.Screen
                name='ElectionVoting'
                component={ElectionVotingScreen}
                options={{
                    header: (props) => <FragmentCardHeaderBar {...props} />
                }}
            />

            <ElectionStack.Screen
                name='ElectionVotingConfirmation'
                component={ElectionVotingConfirmationScreen}
                options={{
                    header: (props) => (
                        <FragmentHeaderBar
                            {...props}
                            backTitle='Cancel'
                        />
                    )
                }}
            />

        </ElectionStack.Navigator>
    )
}

export const ProfileStack = createNativeStackNavigator();
const ProfileStackScreen = () => (
    <ProfileStack.Navigator>
        <ProfileStack.Screen
            name='Setting'
            component={SettingScreen}
            options={({ navigation, route }) => ({
                headerTitleAlign: 'center',
                // headerLeft: () => (<Text className='text-bluechain' onPress={navigation.goBack}>Cancel</Text>)
            })}
        />

    </ProfileStack.Navigator>
)


