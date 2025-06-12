import { IsOptional, IsString } from "class-validator";

export class CreateCommentDto {

    @IsString()
    id_user:string

    @IsString()
    comment: string;

    @IsOptional()
    @IsString()
    parent?: string;

}
