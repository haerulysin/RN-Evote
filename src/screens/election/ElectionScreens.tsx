import React, { FC } from 'react'
import ElectionCard from '../../components/ElectionCard';
import { ScrollView, Button, View, Text, useWindowDimensions } from 'react-native'
import { NavigationProp } from '@react-navigation/native';
import { ElectionCardProps } from '../../types';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';

type Props = {
  navigation: NavigationProp<any, any>
}
const ElectionScreenStack = createNativeStackNavigator();

const electionData: ElectionCardProps = {
  electionDate: '2023-05-08T03:26:27.701Z',
  electionName: 'Mayoral Election',
  electionLocation: 'Banyumas, ID',
  electionTotal: 2343238
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
  const [routes] = React.useState([
    { key: 'all', title: 'All' },
    { key: 'participated', title: 'Participated' },
    { key: 'archived', title: 'Archived' },
  ])

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={({ route }) => {
        switch (route.key) {
          case 'all':
            return <ElectionTab {...props} />
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

function ElectionTab(props: any) {
  const { navigation } = props;
  return (
    <ScrollView className='px-4 pt-4 bg-white'>
      <ElectionCard
        {...electionData}
        onClick={() => navigation.navigate('ElectionVoting')}
      />
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