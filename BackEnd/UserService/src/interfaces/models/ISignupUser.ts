export interface ISignupUser {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    isAdmin: boolean;
    imageFile: Buffer;
    address: string;
    phone: string;
}