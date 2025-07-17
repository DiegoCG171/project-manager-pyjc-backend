import { Type } from "class-transformer";
import { IsDate, IsNumber, IsString } from "class-validator";

export class CreateAssignamentDto {

    @IsString()
    id_project:string;

    @IsString()
    id_user:string;

    @IsString()
    id_plataform:string;

    @IsString()
    plataform_activity:string;

    @IsString()
    id_status:string;

    @IsNumber()
    procentage:number;

    @IsNumber()
    hours:number;

    @IsNumber()
    hours_per_day:number;

    @IsNumber()
    extra_hours:number;

    @Type(() => Date)
    @IsDate()
    start_date:Date;

    @Type(() => Date)
    @IsDate()
    finish_date:Date;

    @IsNumber()
    test_cases:number;
}
