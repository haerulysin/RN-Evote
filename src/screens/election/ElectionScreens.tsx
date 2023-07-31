import React, { Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
import ElectionCard from '../../components/ElectionCard';
import { ScrollView, Button, View, Text, useWindowDimensions, RefreshControl, Alert } from 'react-native'
import { NavigationProp } from '@react-navigation/native';
import { Election, ElectionCardProps } from '../../types';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import * as LocalStorage from '../../utils/LocalStorage';
import { GetElectionList } from '../../utils/RESTApi';

type Props = {
  navigation: NavigationProp<any, any>
}


const renderTabBar = (props: any) => (
  <TabBar
    {...props}
    renderLabel={({ route, focused, color }) => (
      <Text style={{ color }}>{route.title}</Text>
    )}
    activeColor='#25AAE1'
    inactiveColor='#000'
    pressOpacity={0.7}
    style={{ backgroundColor: '#fff' }}
    indicatorStyle={{ backgroundColor: '#25AAE1', shadowColor: '#000' }}
    tabStyle={{ height: 41, flex: 1, justifyContent: 'center', alignItems: 'center' }}
  />
)

export default function ElectionScreens(props: Props) {
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);
  const [electionList, setElectionList] = useState<Election[]>([]);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [routes] = React.useState([
    { key: 'all', title: 'All' },
    { key: 'participated', title: 'Participated' },
    // { key: 'archived', title: 'Archived' },
  ]);

  const onRefreshData = () => {
    setRefreshing(true);
    getData();

  }

  const getData = () => {
    GetElectionList()
      .then((r) => {
        setElectionList(r.data as Election[])
      })
      .catch((e) => Alert.alert("ERROR", e))
      .finally(() => setRefreshing(false));
  }


  useEffect(() => {
    getData();
  }, []);


  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={({ route }) => {
        switch (route.key) {
          case 'all':
            return <ElectionTab
              electionDataList={electionList}
              refreshing={refreshing}
              onRefresh={onRefreshData}
              {...props}
            />

            break;
          case 'participated':
            return <ParticipatedTab {...props} />
          case 'archived':
            return <ArchivedTab {...props} />
          default:
            return null
        }
      }}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
      renderTabBar={renderTabBar}
    />
  );
}

type ElectionTabProps = {
  electionDataList: Election[],
  navigation: NavigationProp<any, any>;
  refreshing: boolean;
  onRefresh: () => void;
}
function ElectionTab({ navigation, electionDataList, refreshing, onRefresh }: ElectionTabProps) {
  return (
    <ScrollView
      className='px-4 pt-4 bg-white'
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      }
    >
      {
        electionDataList.map((v, i) => (
          <ElectionCard
            key={i}
            {...v}
            onClick={() => navigation.navigate('ElectionVoting', { electionID: v.electionID })}
          />
        ))
      }
    </ScrollView>
  )
}

function ParticipatedTab(props: any) {
  return (
    <View className='flex flex-1 justify-center items-center'>
      <Text>Participateed</Text>
    </View>
  )
}

function ArchivedTab(props: any) {
  return (
    <View className='flex flex-1 justify-center items-center'>
      <Text>Archived</Text>
    </View>
  )
}