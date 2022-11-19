import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/guard/jwt-auth.guard';
import { JwtStrategy } from './auth/guard/jwt.strategy';
import { UserModule } from './user/user.module';
import { UserSchema } from './user/user.schema'; 
import { ReviewService } from './review/review.service';
import { ReviewModule } from './review/review.module';
import { ReviewSchema } from './review/review.schema';
import { FreelancerSchema } from './freelancer/freelancer.schema';
import { FreelancerModule } from './freelancer/freelancer.module';
require('dotenv').config();

@Module({
  imports: [
    //MongooseModule.forRoot('mongodb://localhost:27017/tatoo_directory'),
    MongooseModule.forRoot(process.env.MONGO_DB_CREDENTIALS),
    MongooseModule.forFeature([
      {name: 'user', schema: UserSchema},
      {name: 'Freelancer', schema: FreelancerSchema},
      {name: 'Review', schema: ReviewSchema},
    ]),
    AuthModule,
    UserModule,
    FreelancerModule,
    ReviewModule,
  ],
  controllers: [AppController],
  providers: [AppService, JwtAuthGuard, JwtStrategy, ReviewService]
})
export class AppModule {}
