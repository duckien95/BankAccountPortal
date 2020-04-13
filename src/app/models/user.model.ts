import { Role } from "./user-role.model";

export class User {
    account_id: number;
    username: string;
    password: string;
    role: Role;
    token?: string;
}