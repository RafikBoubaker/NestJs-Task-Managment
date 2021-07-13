import { ValidationPipe } from '@nestjs/common';
import { Post , Controller, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
    ){}

    @Post('/signup')
    signUp(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto): Promise<void>{
        console.log(authCredentialsDto)
        return this.authService.signUp(authCredentialsDto)

    }
}
