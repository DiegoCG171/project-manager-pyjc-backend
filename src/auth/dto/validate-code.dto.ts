import { IsNumberString, Length } from "class-validator";

export class ValidateCodeDto {

    @IsNumberString({}, { message: "El codigo debe ser u valor numerico" })
    @Length(6, 6, { message: "La longitud del campo debe ser 6" })
    code: string
    
}