import { GENERATE_OTP_URL, LOGIN_URL, SIGNUP_URL, VERIFY_OTP_URL } from "./apiList";
import { ApiInputProps } from "./app/helper/inputProps";
import AxiosService from "./services/axiosService";

export const postSignUp = async({email, password, username}:ApiInputProps)=>{
    const config = {
        method:"post",
        url: SIGNUP_URL,
        data:{
            email,
            password,
            username
        }
    }
    return AxiosService.makeApiRequest(config);
}

export const postLogin = async({email, password}:ApiInputProps)=>{
    const config = {
        method:"post",
        url: LOGIN_URL,
        data:{
            email,
            password
        }
    }
    return AxiosService.makeApiRequest(config);
}

export const GenerateOTP = async({email}:ApiInputProps)=>{
    const config = {
        method:"post",
        url: GENERATE_OTP_URL,
        data:{
            email,
        }
    }
    return AxiosService.makeApiRequest(config);
}

export const VerifyOTP = async({email, otp}:ApiInputProps)=>{
    const config = {
        method:"post",
        url: VERIFY_OTP_URL,
        data:{
            email,
            otp
        }
    }
    return AxiosService.makeApiRequest(config);
}