export interface IUserDetailsModel{
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    dateOfBirth: Date;
    roleId: string;
    role: IRoleModel
}

export interface IRoleModel{
    id: string;
    name: string;
}