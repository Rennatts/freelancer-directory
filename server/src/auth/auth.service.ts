
import {  HttpException, HttpStatus, Injectable } from '@nestjs/common';

import * as bcrypt from 'bcrypt';
import { NewUserDTO } from 'src/user/dtos/newUser_dto';
import { ExistingUserDTO } from 'src/user/dtos/existingUser_dto';
import { JwtService } from '@nestjs/jwt';
import { UserType } from './enum/userTypes';
import { LoginReturn } from './interfaces/loginReturn.interface';
import { UserService } from 'src/user/user.service';
import { FreelancerService } from 'src/freelancer/freelancer.service';
import { NewFreelancersDTO } from 'src/freelancer/dtos/newFreelancer_dto';
import { LoginFreelancerDTO } from 'src/freelancer/dtos/loginFreelancer_dto';


@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private FreelancerService: FreelancerService ,
        private jwtService: JwtService,
    ) { }

    async hashPassword(password: string): Promise<string> {
        const saltOrRounds = 12;
        return bcrypt.hash(password, saltOrRounds);
    }

    async doesPasswordMatch(password: string, hashedPassword: string): Promise<boolean> {
        return bcrypt.compare(password, hashedPassword)
    }

    async registerUser(user: Readonly<NewUserDTO>): Promise<LoginReturn | HttpException> {
        const { name, surname, email, password } = user;

        const existingUser = await this.userService.findByEmail(user.email);

        if (existingUser) {
            throw new HttpException('User already exists.', HttpStatus.CONFLICT);
        }

        const hashedPassword = await this.hashPassword(password);

        const newUser = await this.userService.createUser(name, surname, email, hashedPassword);

        const jwt = await this.jwtService.signAsync({
            newUser
        })

        return {token: jwt, id: newUser._id, name: newUser.name, userType: UserType.user};
    }

    async loginUser(user: ExistingUserDTO,): Promise<LoginReturn  | string> {
        const { email, password } = user;

        return this.validateUser(email, password);
    }

    async logoutUser(): Promise<{token: string, name: string}  | string> {
        return {token: "", name: ""};
    }

    async validateUser(email: string, password: string): Promise<LoginReturn | string> {
        const user = await this.userService.findByEmail(email);

        if(!user) {
            throw new HttpException('e-mail not registered', HttpStatus.FORBIDDEN);
        }
        
        const doesPasswordMatch = await  this.doesPasswordMatch(password, user.password);

        if(!doesPasswordMatch) {
            throw new HttpException('wrong password, try again', HttpStatus.UNAUTHORIZED);
        }

        const jwt = await this.jwtService.signAsync({
            user
        })

        const nameToBeShown = user.username || user.name;

        return {token: jwt, name: nameToBeShown, id: user._id, userType: UserType.user};
    }


    async registerFreelancer(freelancer: NewFreelancersDTO): Promise<LoginReturn | HttpException> {
        const { email, password } = freelancer;

        const existingFreelancer = await this.FreelancerService.findByEmail(email)

        if(existingFreelancer) throw new HttpException('e-mail already registered', HttpStatus.NOT_ACCEPTABLE);

        const hashedPassword = await this.hashPassword(password);

        freelancer.password = hashedPassword;

        const newFreelancer = await this.FreelancerService.create(freelancer);

        const jwt = await this.jwtService.signAsync({
            newFreelancer
        })

        return {token: jwt, id: newFreelancer._id, name: newFreelancer.name, userType: UserType.Freelancer};
    }

    async loginFreelancer(user: LoginFreelancerDTO,): Promise<LoginReturn | HttpException> {
        const { email, password } = user;

        return this.validateFreelancer(email, password)
    }

    async validateFreelancer(email: string, password: string): Promise<LoginReturn | HttpException> {
        const user = await this.FreelancerService.findByEmail(email);

        if(!user) {
            throw new HttpException('e-mail not registered', HttpStatus.NOT_ACCEPTABLE);
        }

        const doesPasswordMatch = await  this.doesPasswordMatch(password, user.password);

        if(!doesPasswordMatch) {
            throw new HttpException('wrong password, try again', HttpStatus.UNAUTHORIZED);
        }

        const jwt = await this.jwtService.signAsync({
            user
        });

        return {token: jwt, name: user.name, id: user._id, userType: UserType.Freelancer};
    }
        
}
