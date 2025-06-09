import { IsEmail, IsNotEmpty, Matches } from "class-validator";

export class LoginDto {
    @IsNotEmpty({ message: "El campo no debe estar vacío" })
    @IsEmail({}, {message: "El campo debe ser un email"})
    email: string;

    @IsNotEmpty({ message: "El campo no debe estar vacío"})
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&\-_.])[A-Za-z\d@$!%*?&\-_.]{8,}$/, {message: "La contraseña debe tener al menos 8 caracteres, incluyendo mayúsculas, minúsculas, números y símbolos"})
    password: string;
}