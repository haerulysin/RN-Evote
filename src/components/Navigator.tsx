import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AntDesign } from '@expo/vector-icons';
import ElectionDetailScreen from '../screens/election/ElectionDetailScreen';
import ElectionVotingScreen from '../screens/election/ElectionVotingScreen';
import ElectionScreens from '../screens/election/ElectionScreens';
import { DefaultHeaderBar, DefaultHeaderTitle, FragmentHeaderBar } from './HeaderBar'
import ElectionVotingConfirmationScreen from '../screens/election/ElectionVotingConfirmationScreen';
import ElectionVotingSuccessScreen from '../screens/election/ElectionVotingFinalizeScreen';
import SettingScreen from '../screens/profile/SettingScreen';
import SettingShowCertScreen from '../screens/profile/SettingShowCertScreen';
import LandingScreen from '../screens/LandingScreen';
import LoginLandingScreen from '../screens/authpage/LoginLandingScreen';
import LoginScreen from '../screens/authpage/LoginScreen';
import RegisterScreen from '../screens/authpage/RegisterScreen';
import React, { } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ElectionStackParamList, RootStackParamList } from '../types';
import { AuthContext } from '../context/AuthContext';

const Tab = createBottomTabNavigator();
const TabOpts = { headerShown: false, tabBarShowLabel: false }
const Stack = createStackNavigator<RootStackParamList>();;
export default function Navigator() {
    const authContext = React.useContext(AuthContext) as any;
    return (
        <NavigationContainer>
            < Stack.Navigator>
                {authContext.uid === null ? (
                    <Stack.Group>
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
                    </Stack.Group>
                ) : (
                    <Stack.Group>
                        <Stack.Screen name='Home' component={TabNavigator}
                            options={{
                                headerShown: false
                            }}
                        />
                        <Stack.Screen name='Profile' component={TabNavigator} />


                        <Stack.Screen
                            name='SettingShowCertificate'
                            component={SettingShowCertScreen}
                            options={{
                                title: 'Certificate & Private Key',
                                headerTitleAlign: 'center',
                                headerBackTitleVisible: false,
                            }}
                        />
                    </Stack.Group>
                )}
            </Stack.Navigator>
        </NavigationContainer >
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
                component={ElectionDetailScreen}
                options={{
                    header: (props) => <FragmentHeaderBar {...props} />

                }}

            />

            <ElectionStack.Screen
                name='ElectionVoting'
                component={ElectionVotingScreen}
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

            <ElectionStack.Screen
                name='ElectionVotingFinalize'
                component={ElectionVotingSuccessScreen}
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


