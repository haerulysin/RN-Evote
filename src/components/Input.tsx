import React, { FC, useState, Dispatch, SetStateAction } from 'react';
import { View, Text, TextInput, KeyboardTypeOptions, Platform, TouchableOpacity } from 'react-native';

type InputProps = {
    label: string;
    value?: string | any;
    setValue: Dispatch<SetStateAction<string | null>>;
    keyType?: KeyboardTypeOptions;
    secureTextEntry?: Boolean;
    setShowTextEntry?: Dispatch<SetStateAction<Boolean>>;
    passwordShowBtnVisible?: Boolean;
}

const Input = ({
    value,
    label,
    setValue,
    secureTextEntry,
    setShowTextEntry,
    passwordShowBtnVisible,
    keyType
}: InputProps
) => {
    const [borderColor, setBorderColor] = useState<string>('border-gray-300')
    const keyboardType = keyType !== undefined ? keyType : undefined;
    const btnPadding = Platform.OS == 'android' ? 'py-2' : 'py-4'
    return (
        <View className='w-full'>
            <View className='flex flex-row justify-between'>
                <Text className='my-2.5 text-black'>{label}</Text>
                {secureTextEntry !== undefined && passwordShowBtnVisible !== false ?
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
                // selectionColor='#a8ddf3'
                onChangeText={setValue}
                keyboardType={keyboardType}
                style={{ fontSize: 14 }}
                secureTextEntry={secureTextEntry ? true : false}

            />
        </View>
    );
};

export default Input;
