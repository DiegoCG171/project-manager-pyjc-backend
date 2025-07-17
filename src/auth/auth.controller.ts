import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { EmailRecoveryDto } from './dto/email-recovery.dto';
import { RecoveryPasswordDto } from './dto/recovery-password.dto';
import { ValidateCodeDto } from './dto/validate-code.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() loginDto: LoginDto){
    return this.authService.login(loginDto)
  }

  @Post('recovery-code')
  getRecoveryCode(@Body() emailRecoveryDto: EmailRecoveryDto){
    return this.authService.recoveryCode(emailRecoveryDto)
  }

  @Post('validate-code')
  validateCode(@Body() validateCodeDto: ValidateCodeDto){
    return this.authService.validateCode(validateCodeDto)
  }

  @Post('recovery-password')
  recoveryPassword(@Body() recoveryPasswordDto: RecoveryPasswordDto){
    return this.authService.recoveryPassword(recoveryPasswordDto)
  }
}
