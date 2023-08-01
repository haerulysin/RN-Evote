import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { FC } from 'react'
import TransactionListScreen from '../screens/transaction/TransactionListScreen';
import { TransactionStackParamList } from '../types';
import TransactionDetailScreen from '../screens/transaction/TransactionDetailScreen';


const TransactionStack = createNativeStackNavigator<TransactionStackParamList>();
const TransactionStackScreen = () => {
    return (
        <TransactionStack.Navigator>
            <TransactionStack.Screen
                name='TransactionList'
                component={TransactionListScreen}
            />

            <TransactionStack.Screen
                name='TransactionDetail'
                component={TransactionDetailScreen}
            />
        </TransactionStack.Navigator>
    )
}
export default TransactionStackScreen;