export interface CreateUserDto {
    username: string;
    password: string;
    referralCode?: string;
}