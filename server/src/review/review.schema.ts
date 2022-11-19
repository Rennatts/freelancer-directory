import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import mongoose, { Document } from 'mongoose';

export type ReviewDocument = Review & Document;

@Schema({ timestamps: true })
export class Review {
    @Prop({required: true})
    freelancer: any[];

    @Prop({required: true})
    userId: string;

    @Prop({required: false})
    reviewText: string;

    @Prop({required: false})
    score: number;

    @Prop({required: true, default: Date.now()})
    createdAt: Date;
}

export const ReviewSchema = SchemaFactory.createForClass(Review); 