import React, { FC, useState, Dispatch, SetStateAction } from 'react';
import { UseFormRegister } from 'react-hook-form';
import { View, Text, TextInput, KeyboardTypeOptions, Platform, TouchableOpacity } from 'react-native';

type InputProps = {
    label: string;
    value?: string | any;
    setValue: Dispatch<SetStateAction<string>>;
    keyType?: KeyboardTypeOptions;
    secureTextEntry?: Boolean;
    setShowTextEntry?: Dispatch<SetStateAction<boolean>>;
    passwordShowBtnVisible?: Boolean;
    errors?: string;
}

const Input = ({
    value,
    label,
    setValue,
    secureTextEntry,
    setShowTextEntry,
    passwordShowBtnVisible,
    keyType,
    errors,
}: InputProps
) => {
    const [borderColor, setBorderColor] = useState<string>('border-gray-300')
    const keyboardType = keyType !== undefined ? keyType : undefined;
    const btnPadding = Platform.OS == 'android' ? 'py-2' : 'py-4'
    return (
        <View className='w-full'>
            <View className='flex flex-row justify-between'>
                <Text className='my-2.5 text-black'>{label}</Text>
                {secureTextEntry !== undefined && passwordShowBtnVisible !== false && setShowTextEntry !== undefined ?
                    <TouchableOpacity onPress={() => setShowTextEntry!(!secureTextEntry)}>
                        <Text className='my-2.5 text-black'>{secureTextEntry ? 'Show' : 'Hide'}</Text>
                    </TouchableOpacity>
                    :
                    null
                }
            </View>
            <TextInput
                className={`w-full rounded-md px-1.5 ${btnPadding} border ${borderColor}`}
                value={value}
                placeholder={label}
                onFocus={() => setBorderColor('border-bluechain50')}
                onBlur={() => setBorderColor('border-gray-300')}
                onChangeText={setValue}
                keyboardType={keyboardType}
                style={{ fontSize: 14 }}
                secureTextEntry={secureTextEntry ? true : false}
            />
            {errors && <Text className='text-red-400 text-xs'>{errors}</Text>}
        </View>
    );
};

export default Input;
