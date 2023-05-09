import React, { FC, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { ButtonGroupWithText, SwitchGroupWithText } from '../../components/SettingButton';
import { NavigationProp } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';

type SettingScreenProps = {
    navigation: NavigationProp<any, any>
}

const SettingScreen = (props: SettingScreenProps) => {
    const [biometricEnabled, setBiometricEnabled] = useState<boolean>(false);
    const [passcodeEnabled, setPasscodeEnabled] = useState<boolean>(false);

    return (
        <View className='bg-white h-screen px-4 pt-6'>

            <SwitchGroupWithText
                title='Sign in with Biometric?'
                isEnabled={biometricEnabled}
                setIsEnabled={setBiometricEnabled}
            />

            <SwitchGroupWithText
                title='Sign in with Passcode?'
                isEnabled={passcodeEnabled}
                setIsEnabled={setPasscodeEnabled}
            />
            {/* <ButtonGroupWithText
                title='Change Password'
                btnTitle='Password'
                btnText='Choose a strong password to unlock MetaMask app on your device. If you lose this password, you will need your Secret Recovery Phrase to re-import your wallet.'
            /> */}

            <ButtonGroupWithText
                title='Show Certificate & Private Key'
                btnTitle='Certificate & Private Key'
                btnText='Never disclose this certificate and private key. Anyone with your private key can fully control your account, including revoke your ballot.'
                onPress={() => { props.navigation.navigate('SettingShowCertificate') }}
            />

            <TouchableOpacity
                className='h-12 bg-red-500 rounded-md items-center justify-center'
                onPress={() => props.navigation.navigate('LoginLanding')}
            >
                <Text>Logout</Text>
            </TouchableOpacity>

            <StatusBar style='dark' />
        </View>
    );
};

export default SettingScreen;
