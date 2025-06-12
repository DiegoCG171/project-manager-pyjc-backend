import { IsEmail, IsNumberString, IsString, Length, Matches } from "class-validator";

export class RecoveryPasswordDto {
    @IsEmail({}, { message: "El campo debe se ser un email" })
    email: string

    @IsNumberString({}, { message: "El codigo debe ser u valor numerico" })
    @Length(6, 6, { message: "La longitud del campo debe ser 6" })
    code: string

    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&\-_.])[A-Za-z\d@$!%*?&\-_.]{8,}$/, { message: "La contraseña debe tener al menos 8 caracteres, incluyendo mayúsculas, minúsculas, números y símbolos" })
    password: string;

}