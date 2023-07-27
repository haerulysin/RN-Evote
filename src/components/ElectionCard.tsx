import { View, Text, ImageBackground, TouchableOpacity } from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import React from 'react';
import { ElectionCardProps } from "../types";

const demoimage = 'https://images.unsplash.com/photo-1628307106657-9112a8260318?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'

const ElectionCard: React.FC<ElectionCardProps> = (props: ElectionCardProps) => {
    const inExpire = countExpire(props.electionDate);
    return (
        <TouchableOpacity className='h-56 w-full bg-bluechain rounded-md mb-4' onPress={props.onClick}>
            <ImageBackground className="h-full flex justify-between" imageStyle={{ borderRadius: 12 }} source={{ uri: demoimage }}>
                <LinearGradient
                    colors={['rgba(0,0,0,0.7)', 'transparent']}
                    className="h-16 p-2 rounded-md"
                >
                    <Text className="text-white font-medium text-base">{props.electionName}</Text>
                    <Text className="text-white text-xs">{props.electionLocation}</Text>
                </LinearGradient>

                <View className="h-fit bg-bluechain rounded-b-md px-2 py-3">
                    <Text className="text-white font-medium pb-0.5">{inExpire}</Text>
                    <Text className="text-white font-light text-xs">{props.totalVotes?.toLocaleString('de-DE')} Votes</Text>
                </View>

            </ImageBackground>
        </TouchableOpacity>
    )
}


function countExpire(electionTime: { from: string, to: string; }): string {
    const currentTime = new Date().valueOf();
    const expireTime = new Date(electionTime.to).valueOf();
    let delta = Math.abs(expireTime - currentTime) / 1000;
    const days = Math.floor(delta / 86400);
    delta -= days * 86400;
    const hours = Math.floor(delta / 3600) % 24;
    delta -= hours * 3600;
    const minutes = Math.floor(delta / 60) % 60;
    return `Voting Closes in ${days} Day ${hours} Hours`;
}

export default ElectionCard;