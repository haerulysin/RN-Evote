import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { FC, useEffect } from 'react'
import { Text } from 'react-native';
import { TransactionStackParamList } from '../../types';
import AsyncStorage from '@react-native-async-storage/async-storage';

type TransactionListScreenProps = NativeStackScreenProps<TransactionStackParamList, 'TransactionListScreen'>;

const TransactionListScreen: FC<TransactionListScreenProps> = ({ }: TransactionListScreenProps) => {


  useEffect(() => {

    const x = async () => {
      const keys = await AsyncStorage.getAllKeys();
      const result = await AsyncStorage.multiGet(keys);
      // result.map((req: any) => console.log(JSON.parse(req)))
    }

    x();

  }, [])

  return (
    <Text>
      TransactionListScreen
    </Text>
  )
}

export default TransactionListScreen;