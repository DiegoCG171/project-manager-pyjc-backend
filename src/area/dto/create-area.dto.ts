import { IsArray, IsNumber, IsNumberString, IsString } from "class-validator";

export class CreateAreaDto {

    @IsString()
    name:string;

    @IsString()
    leader:string;

    @IsArray()
    @IsString({ each: true })
    projects: string[];

    @IsNumber()
    order:number;

}
