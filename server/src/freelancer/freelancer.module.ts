import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/user/user.schema';
import { FreelancerController } from './freelancer.controller';
import { FreelancerSchema } from './freelancer.schema';
import { FreelancerService } from './freelancer.service';

@Module({
  imports:[MongooseModule.forFeature([
    {name: 'Freelancer', schema: FreelancerSchema},
    {name: 'User', schema: UserSchema}
  ])],
  controllers: [FreelancerController],
  providers: [FreelancerService],
  exports: [FreelancerService],
})
export class FreelancerModule {}