import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, ImageBackground, Pressable } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { MaterialIcons, AntDesign } from '@expo/vector-icons';
import { NavigationProp } from '@react-navigation/native';
import { useFonts, Lekton_400Regular, Lekton_700Bold } from '@expo-google-fonts/lekton';
import React from 'react';
const masjiduri = 'https://images.unsplash.com/photo-1628307106657-9112a8260318?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
export function FragmentCardHeaderBar(props: any) {
    return (
        <ImageBackground source={{ uri: masjiduri }} imageStyle={{ borderBottomLeftRadius: 24, borderBottomRightRadius: 24 }} className='h-72 pb-8 bg-gray-200'>
            <SafeAreaView className='px-4 pt-5 flex flex-col justify-between h-full'>
                <Pressable className='flex flex-row items-center ' onPress={props.navigation.goBack}>
                    <MaterialIcons name='keyboard-backspace' color={'#fff'} size={24} />
                    <Text className='text-white px-1 text-md font-bold'>
                        {/* {props.back.title ? props.back.title.name : "Back"} */}

                        {props.back.title}

                    </Text>
                </Pressable>

                <View className='flex justify-center items-center text-center'>
                    <Text className='text-white text-3xl w-11/12 font-semibold text-center'>Presidential Election 2020</Text>
                    <Text className='text-white text-sm  text-center'>Banyumas, Jawa Tengah</Text>
                </View>
                <StatusBar style='light' />

            </SafeAreaView>
        </ImageBackground>
    )
}

type FragmentHeaderBarProp = {
    navigation: NavigationProp<any, any>
    backTitle?: string;
}
export function FragmentHeaderBar(props: FragmentHeaderBarProp) {
    return (
        <SafeAreaView className={`bg-white`}>
            <Pressable className='flex flex-row bg-white items-center px-4 pt-5' onPress={props.navigation.goBack}>
                <MaterialIcons name='keyboard-backspace' color={'#000'} size={24} />
                <Text className='text-black px-1 text-md font-bold'>
                    {/* {props.back.title === "ElectionVoting" ? "Cancel" : "Back"} */}
                    {props.backTitle ? props.backTitle : 'Back'}
                </Text>
            </Pressable>
            <StatusBar style='dark' />
        </SafeAreaView>
    )
}

export function DefaultHeaderBar(props: any) {
    return (
        <SafeAreaView className='bg-white'>
            <StatusBar style='dark' />
            <View className="flex h-fit pt-10 px-4 flex-row justify-between items-center bg-white">
                <Text className="text-2xl font-medium">{props.route.name}</Text>
                <AntDesign.Button name="calendar" backgroundColor={'transparent'} color={'black'} size={22} />
            </View>
        </SafeAreaView>
    )
}



export const DefaultHeaderTitle = () => {
    let [fontsLoaded] = useFonts({Lekton_700Bold})
    if(!fontsLoaded) return null;
    return (
        <Text style={{
            fontFamily:'Lekton_700Bold',
            fontSize:24,

        }}>
            HLVote
        </Text>
    )
}