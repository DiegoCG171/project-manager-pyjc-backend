import { Type } from "class-transformer";
import { IsArray, IsString, ValidateNested } from "class-validator";

export class ActivityDto {
    @IsString()
    name: string;

    @IsString()
    descipcion: string;
}

export class CreatePlataformDto {

    @IsString()
    name: string;

    @IsArray()
    @IsString({ each: true })
    assignaments: string[];

    @ValidateNested({ each: true })
    @Type(() => ActivityDto)
    activities: ActivityDto[];
}
