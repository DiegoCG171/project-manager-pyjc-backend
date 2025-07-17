import { applyDecorators, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

export function AuthJwt(){
    return applyDecorators(
        UseGuards(AuthGuard('jwt')),
    )
}