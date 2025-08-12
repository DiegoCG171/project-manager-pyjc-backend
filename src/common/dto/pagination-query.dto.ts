import { IsEnum, IsNumber, IsOptional, IsPositive, IsString, Min } from "class-validator"

export enum Order{
    ASC = 'ASC',
    DESC ='DESC'
}

export class PaginationQueryDto {
    
    @Min(1)
    @IsOptional()
    @IsNumber()
    page?: number;

    @IsOptional()
    @IsNumber()
    limit?: number;

    @IsOptional()
    @IsString()
    sortBy?: string; 
    
    @IsOptional()
    @IsString()
    @IsEnum(Order)
    order?: Order = Order.ASC;

    
}