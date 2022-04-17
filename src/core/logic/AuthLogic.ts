import axios from "axios"
import { API_URL } from "../Constants"

export type AuthResponse = {
    error: boolean;
    message: string;
    token: string | null
}

export async function loginAsync(username: string, password: string): Promise<AuthResponse> {
    const result = await axios({
        url: API_URL + `/auth/login`,
        method: 'post',
        data: {
            username,
            password
        }
    })

    return result.data as AuthResponse
}

export async function registerAsync(username: string, password: string): Promise<AuthResponse> {
    const result = await axios({
        url: API_URL + `/auth/signup`,
        method: 'post',
        data: {
            username,
            password
        }
    })

    return result.data as AuthResponse
}