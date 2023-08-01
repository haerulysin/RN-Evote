import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { FC, useEffect, useState } from 'react'
import { Alert, Text, View, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-root-toast';
import { TransactionStackParamList } from '../../types';
import { StorageKey } from '../../types/enum';
import { FlatList, RefreshControl, ScrollView } from 'react-native-gesture-handler';
import { AntDesign } from '@expo/vector-icons';
import { GetJobData, GetTXData } from '../../utils/RESTApi';

type Props = NativeStackScreenProps<TransactionStackParamList, 'TransactionList'>;

type TransactionType = {
  txData: object | any;
  blockData: object | any;
}

const TransactionListScreen: FC<Props> = ({ route, navigation }: Props) => {
  const [toastVisible, setToastVisible] = useState<boolean>(false);
  const [TXIdList, setTXIdList] = useState<Array<any>>([]);
  const [TXData, setTXData] = useState<TransactionType[]>([]);
  const [refreshing, setRefreshing] = React.useState(false);

  const showToast = () => {
    let toast = Toast.show("Test Toast");
  }

  const getTxList = () => {
    AsyncStorage.getItem(StorageKey.TXList)
      .then(r => setTXIdList(JSON.parse(r as string)))
      .catch(e => Alert.alert("ERROR", e))
  }

  useEffect(() => {
    getTxList();
    return () => setTXData([]);
  }, []);

  const getTxDataList = () => {
    TXIdList.map((txId: string) => {
      GetTXData(txId).then(r => { setTXData(prev => ({ ...prev, [txId]: r.data })) });
    });
  }

  useEffect(() => {
    if (TXIdList.length > 0) {
      getTxDataList();
    }
  }, [TXIdList]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      getTxDataList();
    }, 3000);
  }, []);

  const onPressCard = (txId: string, txData: string) => {
    navigation.navigate('TransactionDetail', { txId, txData })
  }
  return (
    <View className='mt-3'>

      <ScrollView
        refreshControl={
          <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
        }
      >

        {Object.entries(TXData).map(([k, v], i: any) => (

          <TouchableOpacity key={k} onPress={() => navigation.navigate('TransactionDetail', { txId: k, txData: JSON.stringify(v) })}>
            <View className='bg-white flex flex-row rounded-md justify-between align-middle py-4 px-2 mx-2 mb-2'>
              <View className='max-w-[80%]'>
                <Text numberOfLines={1} className='font-medium text-sm'>{k}</Text>
                <Text numberOfLines={1} className='text-xs'>
                  Block : {v.blockData.blockHash}
                </Text>
              </View>
              <View className='align-middleflex justify-center'>
                <AntDesign name="right" size={24} color="grey" />
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

    </View>
  )
}

export default TransactionListScreen;