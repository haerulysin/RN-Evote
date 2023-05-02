import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AntDesign, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { View, Text, Button, ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

//Screen
import ProfileScreens from './src/screens/ProfileScreens';
import ElectionDetailScreen from './src/screens/ElectionDetailScreen';
import ElectionVotingScreen from './src/screens/ElectionVotingScreen';
import ElectionScreens from './src/screens/ElectionScreens';

//HeaderBar
import { DefaultHeaderBar, FragmentCardHeaderBar, FragmentHeaderBar } from './src/components/HeaderBar'
import ElectionVotingConfirmationScreen from './src/screens/ElectionVotingConfirmationScreen';
import ElectionVotingSuccessScreen from './src/screens/ElectionVotingSuccessScreen';

const Tab = createBottomTabNavigator();
const TabOpts = { headerShown: false, tabBarShowLabel: false }
const Stack = createNativeStackNavigator();
export default function Navigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
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


            </Stack.Navigator>
        </NavigationContainer>
    )
}

function TabNavigator() {
    return (
        <Tab.Navigator>
            <Tab.Screen
                name='Homes'
                component={ElectionStackScreen}
                options={{
                    ...TabOpts,
                    tabBarIcon: ({ color, size }) => (
                        <AntDesign name='home' size={size} color={color} />
                    )
                }}

            />
            <Tab.Screen
                name='Profile'
                component={ProfileScreens}
                options={{
                    ...TabOpts,
                    tabBarIcon: ({ color, size }) => (
                        <AntDesign name='user' size={size} color={color} />
                    )
                }}
            />
        </Tab.Navigator>
    )
}

const ElectionStack = createNativeStackNavigator();
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




