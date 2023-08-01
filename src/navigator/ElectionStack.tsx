import ElectionDetailScreen from '../screens/election/ElectionDetailScreen';
import ElectionVotingScreen from '../screens/election/ElectionVotingScreen';
import ElectionScreens from '../screens/election/ElectionScreens';
import { DefaultHeaderBar, DefaultHeaderTitle, FragmentHeaderBar } from '../components/HeaderBar'
import ElectionVotingConfirmationScreen from '../screens/election/ElectionVotingConfirmationScreen';
import ElectionVotingSuccessScreen from '../screens/election/ElectionVotingFinalizeScreen';
import React, { } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ElectionStackParamList, RootStackParamList } from '../types';


const ElectionStack = createStackNavigator<ElectionStackParamList>();
export const ElectionStackScreen = () => {
    return (
        <ElectionStack.Navigator initialRouteName='Election'  >
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

            <ElectionStack.Screen
                name='ElectionVotingFinalize'
                component={ElectionVotingSuccessScreen}
                options={{
                    headerShown: false,
                }}
            />

        </ElectionStack.Navigator>
    )
}

export default ElectionStackScreen;