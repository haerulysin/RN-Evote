import React, { FC } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CertCardBox from '../../components/CertCardBox';


type SettingShowCertScreenProps = {
}

const SettingShowCertScreen = (props: SettingShowCertScreenProps) => {


    return (
        <ScrollView className='bg-white h-full px-4 pt-4'>
            {/* <View className='w-full h-24 bg-red-200'>
                <View className='mx-4 flex flex-row justify-center items-center'>
                    <View className=' bg-teal-100 flex'>
                        <Ionicons name="warning" size={24} color="black" />
                    </View>
                    <Text>
                        Never disclose this certificate and private key. Anyone with your private key can fully control your account, including revoke your ballot.
                    </Text>
                </View>
            </View> */}


            <CertCardBox
                title="Certificate"
                cert="LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tCk1JSUN5VENDQW0rZ0F3SUJBZ0lVSmtzenI4Zy9zUUVIcTZ6V3RGdk9YTGJidGFBd0NnWUlLb1pJemowRUF3SXcKY2pFTE1Ba0dBMVVFQmhNQ1NVUXhGVEFUQmdOVkJBZ1RERU5sYm5SeVlXd2dTbUYyWVRFUk1BOEdBMVVFQnhNSQpRbUZ1ZVhWdFlYTXhHakFZQmdOVkJBb1RFV1YyYjNSbExtVjRZVzF3YkdVdVkyOXRNUjB3R3dZRFZRUURFeFJqCllTNWxkbTkwWlM1bGVHRnRjR3hsTG1OdmJUQWVGdzB5TXpBME1qRXdNVFV6TURCYUZ3MHlOREEwTWpVeE5URTAKTURCYU1Gd3hEekFOQmdOVkJBc1RCbU5zYVdWdWRERkpNRWNHQTFVRUF4TkFZamMxTTJJek5tSTBNMkUwWVRVdwpOR015TXpVNE5qVTJaV0ZqTkRBek1qRTVZakl4WlRjMlkySTFNRGxrT1dZMVlUZGlPV1UxTW1Nd1l6azBZVGRrCk16QlpNQk1HQnlxR1NNNDlBZ0VHQ0NxR1NNNDlBd0VIQTBJQUJENDRQNll2ZzMxeU1jOTJDYlRZYk5xdWhrS3YKbVdaRXdaR1pUMTJac1FadGNyWXpGV1E3T053UlFMbjlYRmtEalRFV2Fmc1NHVzNTYnRDKzJrSzlZUHFqZ2ZndwpnZlV3RGdZRFZSMFBBUUgvQkFRREFnZUFNQXdHQTFVZEV3RUIvd1FDTUFBd0hRWURWUjBPQkJZRUZHcVEwZ1ozCjFoNVhhUkRHbm5GOHJLNU4wY05HTUI4R0ExVWRJd1FZTUJhQUZIWFhPTXk0WmdUbC9ZbURtSEw1c2F3SWZBRisKTUlHVUJnZ3FBd1FGQmdjSUFRU0JoM3NpWVhSMGNuTWlPbnNpYUdZdVFXWm1hV3hwWVhScGIyNGlPaUlpTENKbwpaaTVGYm5KdmJHeHRaVzUwU1VRaU9pSmlOelV6WWpNMllqUXpZVFJoTlRBMFl6SXpOVGcyTlRabFlXTTBNRE15Ck1UbGlNakZsTnpaallqVXdPV1E1WmpWaE4ySTVaVFV5WXpCak9UUmhOMlF6SWl3aWFHWXVWSGx3WlNJNkltTnMKYVdWdWRDSjlmVEFLQmdncWhrak9QUVFEQWdOSUFEQkZBaUVBbkJlNUR1OFk4cGh2eEx6NzNqZmtISzBjWVR3TAorTTBIYWZiWUlUZ2hzWGNDSUEyeDVuMFZZNGxPY1crQlJYN095VDRnK214YS95L0RJb2lxOTZVaHhHQ1AKLS0tLS1FTkQgQ0VSVElGSUNBVEUtLS0tLQo="
            />

            <CertCardBox
                title="Private Key"
                cert="LS0tLS1CRUdJTiBQUklWQVRFIEtFWS0tLS0tDQpNSUdIQWdFQU1CTUdCeXFHU000OUFnRUdDQ3FHU000OUF3RUhCRzB3YXdJQkFRUWdEVWI0YzZpMm1lamNncGVXDQpja3JCczlVL1RacHFDNFZlUnB1bXM4ZUVLM1doUkFOQ0FBUStPRCttTDROOWNqSFBkZ20wMkd6YXJvWkNyNWxtDQpSTUdSbVU5ZG1iRUdiWEsyTXhWa096amNFVUM1L1Z4WkE0MHhGbW43RWhsdDBtN1F2dHBDdldENg0KLS0tLS1FTkQgUFJJVkFURSBLRVktLS0tLQ0K"
            />



        </ScrollView >
    );
};

export default SettingShowCertScreen;
