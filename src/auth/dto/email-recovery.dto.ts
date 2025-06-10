import { IsEmail } from "class-validator";

export class EmailRecoveryDto {
    @IsEmail({}, { message: "El campo debe ser un email" })
    email: string
}