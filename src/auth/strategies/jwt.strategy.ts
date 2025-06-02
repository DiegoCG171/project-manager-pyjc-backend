import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
//import { Strategy, ExtractJwt } from 'passport-jwt'

export class JwtStrategy{
    constructor(
        configService: ConfigService
    ){
        /*super({
            secretOrKey: configService.get('JWT_SECRET'),
            //jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
        });*/
    }

    
}