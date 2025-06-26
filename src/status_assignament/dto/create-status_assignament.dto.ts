import { IsArray, IsString } from "class-validator";

export class CreateStatusAssignamentDto {

    @IsString()
    name: string;

    @IsString()
    color: string;

    @IsArray()
    @IsString({ each: true })
    assignaments: string[];
}
