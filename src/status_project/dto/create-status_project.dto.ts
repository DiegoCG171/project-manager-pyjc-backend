import { IsString } from "class-validator";

export class CreateStatusProjectDto {

    @IsString()
    name: string;

    @IsString()
    color: string;
}
