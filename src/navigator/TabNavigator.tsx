import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import React, { } from 'react';
import { ElectionStackScreen } from './ElectionStack';
import { ProfileStackScreen } from './ProfileStack';
import TransactionStackScreen from './TransactionStack';

const Tab = createBottomTabNavigator();
const TabOpts = { headerShown: false, tabBarShowLabel: false }
const TabNavigator = () => {
    return (
        <Tab.Navigator
            initialRouteName='Elections'
        >
            <Tab.Screen
                name='Transaction'
                component={TransactionStackScreen}
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
                options={({ route }) => ({
                    ...TabOpts,
                    tabBarActiveTintColor: '#25AAE1',
                    tabBarIcon: ({ color, size }) => (
                        <AntDesign name='home' size={size} color={color} />
                    ),
                    tabBarStyle: ((route) => {
                        const routeName = getFocusedRouteNameFromRoute(route) ?? ""
                        if (routeName === 'ElectionVotingFinalize') {
                            return { display: "none" }
                        }
                        return
                    })(route),
                })}
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

export default TabNavigator;