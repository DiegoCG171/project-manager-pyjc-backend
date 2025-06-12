import { IsOptional, IsString, IsUUID } from "class-validator";

export class CreateCommentDto {

    @IsString()
    id_user:string

    @IsString()
    comment: string;

    @IsOptional()
    @IsString()
    parent?: string;

    @IsUUID()
    id_project: string;

}
