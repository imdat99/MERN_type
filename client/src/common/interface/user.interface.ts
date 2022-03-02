import iprofile from "./profile.interface";


export interface LoginData {
    usenrame: string;
    password: string;
}

export interface RegData {
    email: string;
    usenrame: string;
    password: string;
}

export default interface iUser {
    username: string
    profile: iprofile
}