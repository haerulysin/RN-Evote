import React, { FC } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';


type ButtonProps = {
    title: string;
    bgcolor?: string;
    onPress?: () => void;
    textcolor?: string;
    disabled?: boolean;

}

export const CButton: React.FC<ButtonProps> = ({
    title,
    bgcolor,
    textcolor,
    disabled,
    onPress
}: ButtonProps) => (
    <TouchableOpacity
        className={`w-full items-center rounded-2xl p-3.5 justify-center mb-2 bg-${bgcolor != undefined ? bgcolor : 'bluechain'} ${disabled?'opacity-50':''}`}
        onPress={onPress}
        disabled={disabled}
    >
        <Text className={`text-md font-medium text-${textcolor != null ? textcolor : 'white'}`}>{title}</Text>
    </TouchableOpacity>
)


export const OutlineButton: React.FC<ButtonProps> = ({
    title,
    bgcolor,
    onPress
}: ButtonProps) => (
    <TouchableOpacity className={`mb-2 bg-opacity-0 w-full items-center rounded-2xl p-3.5 border border-${bgcolor != undefined ? bgcolor : 'bluechain'}`} onPress={onPress}>
        <Text className={`text-md text-${bgcolor != undefined ? bgcolor : 'bluechain'}`}>{title}</Text>
    </TouchableOpacity>
)

