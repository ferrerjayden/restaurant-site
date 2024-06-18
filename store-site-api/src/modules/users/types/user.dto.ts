import UserData from "./user-interfaces";

export default interface CreateUserDTO extends UserData {
    userName: string;
    email: string;
    password: string;
    role: string[];
}

export default interface UpdateUserDTO extends UserData {
    userName: string;
    email: string;
    password: string;
    role: string[];
}