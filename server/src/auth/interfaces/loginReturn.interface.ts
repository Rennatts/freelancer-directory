import { Usertype } from "../enum/userTypes";

export class LoginReturn {
    token: string;
    name: string;
    userType: Usertype;
}