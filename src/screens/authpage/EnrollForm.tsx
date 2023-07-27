import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { APIResponseType, EnrollFormTypes } from "../../types";
import { CButton } from "../../components/Button";
import { useForm, Controller } from 'react-hook-form'
import { TextInput, View, Text, Alert } from "react-native";
import Input from "../../components/Input";
import { enrollIdentities } from "../../utils/RESTApi";
import * as LocalStorage from '../../utils/LocalStorage';

type EnrollFormProp = {
    setPage: Dispatch<SetStateAction<number>>;

}
export const EnrollForm = ({
    setPage
}: EnrollFormProp) => {
    // const [isValid, setIsValid] = useState<boolean>(false);
    const [submitButtonState, setSubmitButtonState] = useState<boolean>(true);
    const { register, handleSubmit, control, reset, formState: { errors, isValid } } = useForm<EnrollFormTypes>({
        defaultValues: {
            voterID: '',
            voterRegisterID: '',
            voterName: '',
        },
        mode: 'onChange'
    })

    const onSubmit = async (data: EnrollFormTypes) => {
        // Alert.alert(JSON.stringify(data))
        const enroll: APIResponseType = await enrollIdentities(JSON.stringify(data));
        const apiData: any = enroll.data;
        if (enroll.status !== 200) {
            Alert.alert("Enroll Failed", JSON.stringify(enroll.data));
        } else {
            await LocalStorage.store("cert", JSON.stringify(apiData));
            setPage(prev => prev+1);
        }
    };
    return (
        <View>
            <View className='items-center mb-4'>
                <Text className='text-lg font-bold'>
                    Enroll Identity
                </Text>

                <Text className='text-center text-sm mt-2'>
                    Checking and enrolling identity
                </Text>
            </View>

            <Controller
                control={control}
                name="voterID"
                rules={{
                    required: "ID required"
                }}
                render={({ field: { onChange, value, name, ref } }) => (
                    <Input
                        label="ID"
                        value={value}
                        setValue={value => onChange(value)}
                        keyType="numeric"
                        errors={errors.voterID?.message}
                    />
                )}
            />

            <Controller
                name="voterName"
                rules={{ required: "Fullname required" }}
                control={control}
                render={({ field: { onChange, value, name, ref } }) => (
                    <Input
                        label="Full Name"
                        value={value}
                        setValue={value => onChange(value)}
                        errors={errors.voterName?.message}
                    />
                )}
            />

            <Controller
                control={control}
                name="voterRegisterID"
                rules={{ required: "Register ID required" }}
                render={({ field: { onChange, value, name, ref } }) => (
                    <Input
                        label="Register ID"
                        value={value}
                        setValue={value => onChange(value)}
                        keyType="numeric"
                        errors={errors.voterRegisterID?.message}
                    />
                )}
            />


            <View className="mt-5">
                <CButton
                    title="Submit"
                    onPress={handleSubmit(onSubmit)}
                    disabled={!isValid}
                />
            </View>
        </View>
    );
}