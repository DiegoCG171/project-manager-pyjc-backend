import { IsDateString, IsNumber, IsNumberString, IsUUID, Length, Max, Min } from "class-validator";

export class CreateRecoveryCodeDto {
    @IsUUID(4, { message: "El usuario debe ser un uuid válido" })
    user_id: string;

    @IsNumberString({}, { message: "El codigo debe ser númerico" })
    @Length(6, 6, { message: "El código debe ser de una longitud de 6" })
    code: string;

    @IsDateString()
    date: string;

    @IsNumber({}, { message: "El campo debe ser númerico" })
    @Min(0)
    @Max(3)
    attemps: number

}
