import { Body, Controller, Get, HttpException, Param, Put, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { NewUserDTO } from './dtos/newUser_dto';
import { UpdateUserDTO } from './dtos/updateUser_dto';
import { UserDetails } from './interface/user.interface';
import { UserDocument } from './user.schema';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(
        private userService: UserService
    ) {}

    @Get(':id')
    getUser(@Param('id') id: string): Promise<UserDetails | HttpException> {
        return this.userService.findById(id);
    }

    @Get()
    getAllUsers(): Promise<UserDetails[] | HttpException> {
        return this.userService.findAllUsers();
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id')
    async updateUser(
      @Param('id') id: string,
      @Body() updateUser: UpdateUserDTO
    ): Promise<UserDocument>{
        return this.userService.updateUser(id, updateUser);
    }
}
