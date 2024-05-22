export interface RegisterModel{
    firstName: string;
    lastName: string;
    email: string;
    dateOfBirth: string;
    password: string;
    roleId: number;
}

export interface RegisterUserResponse{
    id: string;
}