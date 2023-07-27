import React, { FC, Dispatch, SetStateAction, useEffect, useState } from 'react'
import { View, Text, Alert } from 'react-native';
import * as LocalStorage from '../../utils/LocalStorage';
import { Controller, useForm } from 'react-hook-form';
import { EnrollFormTypes } from '../../types';
import Input from '../../components/Input';
import { CButton } from '../../components/Button';
import * as Crypto from 'expo-crypto';
import { NavigationProp } from '@react-navigation/native';
type InAppPasswordFormProps = {
  setPage: Dispatch<SetStateAction<number>>;
  navigation: NavigationProp<any, any>;

}

type PasswordFormTypes = {
  password: string;
  passwordConfirmation: string;
}

const InAppPasswordForm: FC<InAppPasswordFormProps> = ({ setPage, navigation }: InAppPasswordFormProps) => {

  const { handleSubmit, control, watch, formState: { errors, isValid } } = useForm<PasswordFormTypes>({
    defaultValues: {
      password: '',
      passwordConfirmation: ''
    },
    mode: 'onChange'
  });

  const onSubmit = async (data: PasswordFormTypes) => {
    const { password } = data;
    // const passwordHash = createHash('sha256').update(password).digest('hex');
    // await LocalStorage.store("InAppPassword", passwordHash);
    const passwordHash = await Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA256, password);
    await LocalStorage.store("inAppPassword", passwordHash);
    // setPage(prev => prev + 1);
    navigation.navigate('Home');
  }

  return (
    <View>
      <View className='items-center mb-4'>
        <Text className='text-lg font-bold'>
          Create Password
        </Text>

        <Text className='text-center text-sm mt-2'>
          This password will unlock the Apps only on this device
        </Text>
      </View>

      <View className='mt-5'>
        <Controller
          control={control}
          name='password'
          rules={{ required: 'Password is required' }}
          render={({ field: { onChange, value, name, ref } }) => (
            <Input
              label='Password'
              value={value}
              setValue={value => onChange(value)}
              // keyType='nu'
              errors={errors.password?.message}
              secureTextEntry={true}
            />
          )}
        />
        <Controller
          control={control}
          name='passwordConfirmation'
          rules={{
            required: 'Password confirmation is required',
            validate: (val: string) => {
              if (watch('password') !== val) {
                return "Passwords do not match"
              }
            }
          }}
          render={({ field: { onChange, value, name, ref } }) => (
            <Input
              label='Password Confirmation'
              value={value}
              setValue={value => onChange(value)}
              // keyType='nu'
              errors={errors.passwordConfirmation?.message}
              secureTextEntry={true}
            />
          )}
        />

        <View className='mt-5'>
          <CButton
            title='Submit'
            onPress={handleSubmit(onSubmit)}
            disabled={!isValid}
          />
        </View>
      </View>
    </View>
  )
}

export default InAppPasswordForm;