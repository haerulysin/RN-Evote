import React, { FC, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Modal } from 'react-native';
import * as Clipboard from 'expo-clipboard';
import { FontAwesome } from '@expo/vector-icons';

type CertCardBoxProps = {
    title: string;
    cert: string;
}

const CertCardBox = ({
    title,
    cert,
}: CertCardBoxProps) => {
    const [modalVisible, setModalVisible] = useState(false);
    const getCopiedText = async () => {
        const setCopyText = await Clipboard.setStringAsync(cert)
        if (setCopyText) {
            setModalVisible(true)
            setTimeout(() => {
                setModalVisible(false)
            }, 2000)
        }

    }
    return (
        <View className=''>
            <Modal
                animationType='fade'
                transparent={true}
                visible={modalVisible}
            >
                <View className='flex h-screen justify-center items-center'>
                    <View className='h-fit items-center bg-black/70 p-8 rounded-2xl '>
                        <FontAwesome name="paste" size={32} color="white" />

                        <Text className='text-white'>
                            {title} copied to clipboard
                        </Text>
                    </View>
                </View>

            </Modal>

            <Text className='text-md font-medium'>{title}</Text>
            <View className='flex my-3 justify-center items-center border border-gray-200 rounded-md'>
                <ScrollView className='w-full h-32'>
                    <Text className='text-xs p-2 w-full text-left'>{cert}</Text>
                </ScrollView>
                <View className='p-2 flex items-center justify-center border-t border-gray-300 w-full'>
                    <TouchableOpacity className='border border-bluechain rounded-md w-11/12' onPress={getCopiedText}>
                        <Text className='p-1 text-center text-bluechain'>Copy to clipboard</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};


export default CertCardBox;