
import React, { FC, useEffect } from 'react';
import { View, Text } from 'react-native';
import { TransactionStackParamList } from '../../types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ScrollView } from 'react-native-gesture-handler';

type TransactionDetailScreenProps = NativeStackScreenProps<TransactionStackParamList, 'TransactionDetail'>;

const TransactionDetailScreen: FC<TransactionDetailScreenProps> = ({ route, navigation }: TransactionDetailScreenProps) => {
    const { txData, txId } = route.params;
    const data = JSON.parse(txData);
    useEffect(() => {
        navigation.setOptions({ title: txId });
    }, [])
    return (
        <ScrollView className='bg-white'>
            <View className='px-4 py-3 flex gap-4'>
                <View className='flex flex-row justify-between'>
                    <Text>
                        Transaction ID
                    </Text>
                    <Text className='max-w-[50%]' numberOfLines={1}>
                        {txId}
                    </Text>
                </View>

                <View className='flex flex-row justify-between'>
                    <Text>
                        Block Hash
                    </Text>
                    <Text className='max-w-[50%]' numberOfLines={1}>
                        {data.blockData.blockHash}
                    </Text>
                </View>

                <View className='flex flex-row justify-between'>
                    <Text>
                        Validation Code
                    </Text>
                    <Text>
                        {data.txData.validationCode}
                    </Text>
                </View>

                {
                    Object.entries(data.txData.decodedTransactionEnvelope).map(([k, v], i: any) => (
                        <View className='flex flex-row justify-between' key={i}>
                            <Text>
                                {k}
                            </Text>
                            <Text className='max-w-[50%]' numberOfLines={1}>
                                {typeof v === 'object' ? JSON.stringify(v) : v === null || v === undefined || v === '' ? '-' : v as string}
                            </Text>
                        </View>
                    ))
                }

            </View>
        </ScrollView>
    )
}
export default TransactionDetailScreen;