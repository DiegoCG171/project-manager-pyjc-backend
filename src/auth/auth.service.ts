import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/user/entities/user.entity';
import { Model } from 'mongoose';
import { HashService } from './hash.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name)
        private readonly userModel = Model<User>,
        private readonly hashService: HashService,
        private readonly jwtService: JwtService
    ){}
    async login(loginDto: LoginDto){
        const { password, email } = loginDto;

        const user = await this.userModel.findOne({ email }).exec();
        if(!user) throw new UnauthorizedException("Credenciales no válidas");

        const isPasswordValid = await this.hashService.comparePassword(password, user.password)
        if(!isPasswordValid) throw new UnauthorizedException("Credenciales no válidas");

        const objUser = user.toObject();
        delete objUser.password;
        
        return {
            ...objUser,
            token: this.jwtService.sign({objUser}, { expiresIn: '1h' })
        }
    }
}
