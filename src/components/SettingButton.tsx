import React, { useState, Dispatch, SetStateAction } from 'react';
import { View, Text, Button, TouchableOpacity, Switch } from 'react-native';

type ButtonGroupWithTextProps = {
    btnTitle: string;
    btnText: string;
    title: string;
    onPress?: () => void;
}

export const ButtonGroupWithText: React.FC<ButtonGroupWithTextProps> = ({
    btnTitle,
    btnText,
    title,
    onPress

}) => {

    return (
        <View className='mb-2'>
            <Text className='text-lg font-medium'>{btnTitle}</Text>
            <Text className='opacity-60 text-xs'>{btnText}</Text>
            <View className='flex justify-center items-center mt-3 '>
                <TouchableOpacity className='m-1 p-3 w-full border border-blue-400 rounded-xl' onPress={onPress}>
                    <Text
                        className='text-blue-400 text-center font-medium w-full'
                    >{title}</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}


type SwitchGroupWithTextProps = {
    title: string;
    isEnabled: boolean;
    setIsEnabled: Dispatch<SetStateAction<boolean>>;

};

export const SwitchGroupWithText: React.FC<SwitchGroupWithTextProps> = ({
    title,
    isEnabled,
    setIsEnabled,
}) => {
    return (
        <View className='flex justify-start items-start'>
            <Text className='text-lg font-medium'>{title}</Text>
            <View className='my-2'>
                <Switch
                    thumbColor={isEnabled ? '#f9f9f9' : '#25AAE1'}
                    trackColor={{ false: '#f9f9f9', true: '#25AAE1' }}
                    onValueChange={() => setIsEnabled(!isEnabled)}
                    value={isEnabled}
                />
            </View>
        </View>
    )
}