import { Body, Controller, Get, HttpCode, HttpException, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { NewFreelancersDTO } from 'src/Freelancer/dtos/newFreelancer_dto';
import { ExistingUserDTO } from 'src/user/dtos/existingUser_dto';
import { NewUserDTO } from 'src/user/dtos/newUser_dto';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import { LocalAuthGuard } from './guard/local-auth.guard';
import { LocalStrategy } from './guard/local.strategy';
import { LoginReturn } from './interfaces/loginReturn.interface';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('signup_user')
    signupUser(@Body() user: NewUserDTO): Promise<LoginReturn | HttpException>{
        return this.authService.registerUser(user);
    }

    // @UseGuards(LocalAuthGuard)
    @Post('login_user')
    // @HttpCode(HttpStatus.OK)
    loginUser(@Body() user: ExistingUserDTO): Promise<LoginReturn | string> {
        return this.authService.loginUser(user);
    }

    @Get('logout_user')
    @HttpCode(HttpStatus.OK)
    logoutUser(): Promise<{token: string, name: string} | string> {
        return this.authService.logoutUser();
    }

    @Post('signup_freelancer')
    signupFreelancer(@Body() freelancer: NewFreelancersDTO): Promise<LoginReturn | HttpException> {
        return this.authService.registerFreelancer(freelancer);
    }


    // @UseGuards(JwtAuthGuard)
    @Post('login_freelancer')
    // @HttpCode(HttpStatus.FORBIDDEN)
    // @HttpCode(HttpStatus.OK)
    loginFreelancer(@Body() freelancer: ExistingUserDTO): Promise<LoginReturn | HttpException> {
        return this.authService.loginFreelancer(freelancer);
    }
}
