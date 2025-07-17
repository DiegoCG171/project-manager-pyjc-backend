import { IsEmail, IsString } from "class-validator";

export class CreateProviderDto {

    @IsString()
    name: string;

    @IsString()
    status: string;

    @IsString()
    contact_name: string;

    @IsEmail()
    @IsString()
    contact_email: string;

    @IsString()
    contact_phone: string;
    
    @IsString()
    adress: string;
}
