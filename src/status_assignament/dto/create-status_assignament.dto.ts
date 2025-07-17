import { IsString } from "class-validator";

export class CreateStatusAssignamentDto {

    @IsString()
    name: string;

    @IsString()
    color: string;

}
