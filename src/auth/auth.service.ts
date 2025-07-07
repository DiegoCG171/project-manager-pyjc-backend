import { ForbiddenException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/user/entities/user.entity';
import { Model } from 'mongoose';
import { HashService } from './hash.service';
import { JwtService } from '@nestjs/jwt';
import { EmailRecoveryDto } from './dto/email-recovery.dto';
import { CreateRecoveryCodeDto } from './dto/recovery-code.dto';
import { RecoveryCode } from './entities/recovery-code.entity';
import { MailSenderService } from 'src/mail-sender/mail-sender.service';
import { RecoveryPasswordDto } from './dto/recovery-password.dto';
import { IsNumberString } from 'class-validator';
import { ValidateCodeDto } from './dto/validate-code.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name)
        private readonly userModel = Model<User>,
        @InjectModel(RecoveryCode.name)
        private readonly codeModel = Model<RecoveryCode>,
        private readonly hashService: HashService,
        private readonly jwtService: JwtService,
        private readonly emailService: MailSenderService
    ) { }
    async login(loginDto: LoginDto) {
        const { password, email } = loginDto;

        const user = await this.userModel.findOne({ email }).exec();
        if (!user) throw new UnauthorizedException("Credenciales no válidas");

        const isPasswordValid = await this.hashService.comparePassword(password, user.password)
        if (!isPasswordValid) throw new UnauthorizedException("Credenciales no válidas");

        const objUser = user.toObject();
        delete objUser.password;

        return {
            ...objUser,
            token: this.jwtService.sign({ ...objUser }, { expiresIn: '1h' })
        }
    }

    async recoveryCode(emailRecoveryDto: EmailRecoveryDto) {
        try {
            const { email } = emailRecoveryDto;

            const user: User = await this.userModel.findOne({ email }).exec();

            if (!user) {
                throw new UnauthorizedException("No tienes permiso par realizar esta acción")
            }
            const today = new Date();
            today.setMinutes(today.getMinutes() + 5);

            const createRecoveryCode: CreateRecoveryCodeDto = {
                user_id: user._id,
                code: Math.floor(100000 + Math.random() * 900000).toString(),
                expiresAt: today.toISOString(),
                attemps: 0
            }

            createRecoveryCode.code = Math.floor(100000 + Math.random() * 900000).toString()
            await this.codeModel.create(createRecoveryCode)
            await this.emailService.sendRecoveryPasswordEmail(user.email, createRecoveryCode.code);
            return { message: "Correo enviado" }
        } catch (error) {
            console.log(error)
            throw error
        }

    }

    async validateCode(validateCodeDto: ValidateCodeDto) {
        try {
            const { code } = validateCodeDto;
            const storedCode: RecoveryCode = await this.codeModel.findOne({ code }).exec();
            const isCodeNotExpired = new Date(storedCode?.expiresAt) > new Date();

            if (!storedCode) {
                throw new NotFoundException('El codigo no es valido')
            }

            if(!isCodeNotExpired){
                throw new UnauthorizedException('El codigo ha caducado')
            }

            return { isValid: true, message: 'El codigo es valido' }
        } catch (error) {
            throw error
        }

    }

    async recoveryPassword(recoveryPasswordDto: RecoveryPasswordDto) {
        try {
            const { email, password, code } = recoveryPasswordDto;
            const user: User = await this.userModel.findOne({ email }).exec();

            if (!user) {
                throw new UnauthorizedException("No tienes permiso de realizar esta acción")
            }

            const storedCode: RecoveryCode = await this.codeModel.findOne({ user_id: user._id }).exec();

            if (storedCode?.attemps == 3) {
                await this.codeModel.deleteMany({ user_id: user._id });
                throw new ForbiddenException("Haz superado los intentos permitidos");
            }

            const isCodeValid = storedCode.code === code;
            const isCodeNotExpired = new Date(storedCode.expiresAt) > new Date();

            if (isCodeValid && isCodeNotExpired) {
                const hashedPassword = await this.hashService.hashPassword(password);
                await this.userModel.findOneAndUpdate({ _id: user._id }, { password: hashedPassword });
                await this.codeModel.deleteMany({ user_id: user._id });
                return { message: "Contraseña actualizada correctamente" }
            }

            storedCode.attemps += 1;
            await this.codeModel.findOneAndUpdate({ _id: storedCode._id }, storedCode);
            throw new UnauthorizedException("Código no válido o expirado");

        } catch (error) {
            throw error
        }
    }
}
