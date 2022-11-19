import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import { NewUserDTO } from './dtos/newUser_dto';
import { UpdateUserDTO } from './dtos/updateUser_dto';
import { UserDetails } from './interface/user.interface';
import { UserDocument } from './user.schema';

@Injectable()
export class UserService {
    constructor(
        @InjectModel('User') private readonly userModel: Model<UserDocument>
    ) {}

    async createUser(name: string, surname: string, email: string, hashed_password: string): Promise<UserDocument> {
        const newUser = new this.userModel({
            name, 
            surname,
            email, 
            password: hashed_password
        })

        return newUser.save(); 
        
    }

    async findByEmail(email: string): Promise<UserDocument | null> {
        return this.userModel.findOne({email}).exec();
    }

    async findById(id: string): Promise<UserDetails | HttpException> {
        const user = await this.userModel.findById(id);
        if(!user) return new HttpException('Not found', HttpStatus.NOT_FOUND);
        return this._getUserDetails(user);
    }

    async findAllUsers(): Promise<UserDetails[] | HttpException> {
        return this.userModel.find({})
        .then((users) => {
            const allUsers = [];
            users.forEach((user) => allUsers.push(this._getUserDetails(user)))
            return allUsers
        })
        .catch((err) => {
            if(err) return new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR)
        });
    }

    async updateUser(id: string, freelancer: UpdateUserDTO): Promise<UserDocument>  {
        return this.userModel.findByIdAndUpdate(id, freelancer, {new: true});
    }


    _getUserDetails(user: UserDocument): UserDetails {
        return {
            _id: user._id,
            name: user.name,
            surname: user.surname,
            email: user.email
        }
    }
}
