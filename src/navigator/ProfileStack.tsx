
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SettingScreen from '../screens/profile/SettingScreen';
import React, { } from 'react';
const ProfileStack = createNativeStackNavigator();
export const ProfileStackScreen = () => (
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