import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
    @Prop({required: true})
    name: string;

    @Prop({required: true})
    surname: string;

    @Prop({required: false})
    username: string;

    @Prop({required: true})
    email: string;

    @Prop({required: true})
    password: string;

    @Prop({required: false})
    profile_photo: string;

    @Prop({required: true, default: Date.now()})
    createdAt: Date;

    @Prop({required: true, default: Date.now()})
    updatedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User); 