import { IsOptional, IsString, IsUUID } from "class-validator";

export class CreateCommentDto {

    @IsUUID()
    id_project: string;

    @IsString()
    id_user: string;

    @IsString()
    comment: string;

    @IsOptional()
    @IsString()
    parent?: string;

}
