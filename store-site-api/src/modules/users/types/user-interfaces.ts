export default interface UserData {
    userName: string,
    email: string,
    password: string,
    role: string[],
}

// by default, all users should have a default 'users' role in the array