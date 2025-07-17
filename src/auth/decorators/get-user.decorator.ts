import { createParamDecorator, ExecutionContext, NotFoundException } from "@nestjs/common";

export const GetUser = createParamDecorator(
    (data: string, ctx: ExecutionContext) => {
        try {
            const request = ctx.switchToHttp().getRequest();
            const user = request.user

            if (!user) {
                throw new NotFoundException('Usuario no encontrado (request)');
            }

            return !data ? user : user[data]
        } catch (error) {
            throw error
        }

    }
)