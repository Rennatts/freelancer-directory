import { UserType } from "../enum/userTypes";

export class LoginReturn {
    token: string;
    name: string;
    id: string;
    userType: UserType;
}