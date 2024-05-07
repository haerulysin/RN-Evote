import React, { createContext, useContext } from "react";
import * as SecureStore from 'expo-secure-store';
import * as LocalStorage from '../utils/LocalStorage';
import { Login, pingCC } from "../utils/RESTApi";
import AsyncStorage from "@react-native-async-storage/async-storage";
type Props = {
    children: string | JSX.Element | JSX.Element[];
}
export const AuthContext = createContext({});
export const AuthContextProvider = ({ children }: Props) => {
    const [state, dispatch] = React.useReducer(
        (prevState: any, action: any) => {
            switch (action.type) {
                case 'RESTORE_TOKEN':
                    return {
                        ...prevState,
                        uid: action.token,
                        isLoading: false,
                    };
                case 'SIGN_IN':
                    return {
                        ...prevState,
                        isSignout: false,
                        uid: action.token,
                    };
                case 'SIGN_OUT':
                    return {
                        ...prevState,
                        isSignout: true,
                        uid: null,
                    };
            }
        },
        {
            isLoading: true,
            isSignout: true,
            uid: null,
        }
    );

    React.useEffect(() => {
        // Fetch the token from storage then navigate to our appropriate place
        const bootstrapAsync = async () => {
            let uid;
            try {
                uid = await SecureStore.getItemAsync('uid');
                const ping = await pingCC(uid as string);
                if (ping.status !== 200) {
                    const cert = await SecureStore.getItemAsync('cert');
                    const login = await Login(cert as string);
                    await SecureStore.setItemAsync('uid', (login.data as any).uid);
                }
            } catch (e) {
            }

            if (uid !== undefined) {
                dispatch({ type: 'RESTORE_TOKEN', token: uid });
            }

        };

        bootstrapAsync();
    }, []);

    const authContext = React.useMemo(
        () => ({
            signIn: async (data: any) => {

                await SecureStore.setItemAsync('uid', data);
                await LocalStorage.store("uid", data);
                dispatch({ type: 'SIGN_IN', uid: data as string });
            },
            signOut: async() => {
                await SecureStore.deleteItemAsync('uid');
                await LocalStorage.remove("uid");
                await AsyncStorage.removeItem("cert");
                await SecureStore.deleteItemAsync("cert");
                dispatch({ type: 'SIGN_OUT' });
            },
            signUp: async (data: any) => {
                dispatch({ type: 'SIGN_IN', uid: data });
            },
        }),
        []
    );
    return (
        <AuthContext.Provider value={{ ...authContext, ...state }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuthContext = () => useContext(AuthContext);