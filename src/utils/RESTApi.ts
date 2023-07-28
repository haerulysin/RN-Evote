import React from "react";
import { AuthContext } from "../context/AuthContext";
import { APIResponseType, EnrollProcessResponse, EnrollResponse } from "../types";
import * as LocalStorage from './LocalStorage';

const apiURL = process.env.EXPO_PUBLIC_API_URL;




const getApiToken = async () => {
    return await LocalStorage.get('uid');
}

export const pingCC = async (uid: string) => {
    const fetchEnroll = await fetch(`${apiURL}/auth/pingn`, {
        headers: {
            'x-api-key': uid
        }
    });

    return {
        status: fetchEnroll.status,
        data: await fetchEnroll.json()
    };

}
export const enrollIdentities = async (data: string): Promise<APIResponseType> => {

    const fetchEnroll = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/auth/enroll`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: data
    });

    return {
        status: fetchEnroll.status,
        data: await fetchEnroll.json(),
    }
}

export const Login = async (cert: string): Promise<APIResponseType> => {
    const fetchLogin = await fetch(`${apiURL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: cert
    });
    return {
        status: fetchLogin.status,
        data: await fetchLogin.json()
    }
}

export const GetElectionList = async (): Promise<APIResponseType> => {
    const fetchs = await fetch(`${apiURL}/election/`, {
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': await getApiToken()
        },
    });
    return {
        status: fetchs.status,
        data: await fetchs.json()
    }

}


export const GetElectionByID = async (electionID: string): Promise<APIResponseType> => {
    const fetchs = await fetch(`${apiURL}/election/${electionID}`, {
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': await getApiToken()
        },
    });
    return {
        status: fetchs.status,
        data: await fetchs.json()
    }
}

export const GetCandidateByElectionID = async (electionID: string): Promise<APIResponseType> => {
    const fetchs = await fetch(`${apiURL}/election/${electionID}`, {
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': await getApiToken()
        },
    });
    return {
        status: fetchs.status,
        data: await fetchs.json()
    }
}


