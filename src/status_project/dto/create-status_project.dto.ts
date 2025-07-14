import { IsArray, IsString } from "class-validator";

export class CreateStatusProjectDto {

    @IsString()
    name: string;

    @IsString()
    color: string;

    @IsArray()
    @IsString({ each: true })
    projects: string[];
}
