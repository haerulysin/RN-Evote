import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { FC } from 'react'
import TransactionListScreen from '../screens/transaction/TransactionListScreen';


const TransactionStack = createNativeStackNavigator();
const TransactionStackScreen = () => {
    return (
        <TransactionStack.Navigator>
            <TransactionStack.Screen
                name='TransactionListScreen'
                component={TransactionListScreen}
            />
        </TransactionStack.Navigator>
    )
}
export default TransactionStackScreen;