import { Type } from "class-transformer";
import { IsArray, IsDate, IsNumber, IsOptional, IsString, IsUUID } from "class-validator";

export class CreateProjectDto {

    @IsString()
    name: string;

    @IsString()
    leader_name: string;

    @IsString()
    key: String;

    @Type(() => Date)  
    @IsDate()
    start_date: Date;

    @Type(() => Date)
    @IsDate()
    finish_date: Date;

    @IsString()
    priority: string;

    @IsString()
    pm_name: string;

    @IsString()
    purchase_order: string;

    @IsString()
    designer_name: string;

    @IsNumber()
    total_hours: number;

    @IsNumber()
    added_hours: number;

    @IsString()
    status_project: string;

    @IsArray()
    @IsString({ each: true })
    providers: string[];

    @IsArray()
    @IsString({ each: true })
    comments: string[];

    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    assignaments: string[];

    @IsUUID()
    id_area: string;
}
