import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { createReviewDTO } from './dtos/createReview_dto';
import { UpdateFrelancersDTO } from './dtos/updateFreelancer_dto';
import { FreelancerDetails } from './interfaces/freelancer.interface';
import { Freelancer } from './freelancer.schema';
import { FreelancerService } from './freelancer.service';

@Controller('freelancer')
export class FreelancerController {
    constructor(
        private freelancerService: FreelancerService,
    ) {}

    @Get(':id')
    getFreelancer(@Param('id') id: string): Promise<any | null> {
        return this.freelancerService.findById(id);
    }

    @Get()
    getAllFreelancers(): Promise<FreelancerDetails[] | string> {
        return this.freelancerService.findAllFreelancers();
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id')
    @UsePipes(new ValidationPipe())
    async updateFreelancer(
      @Param('id') id: string,
      @Body() updateData: UpdateFrelancersDTO
    ): Promise<Freelancer| string>{
        return this.freelancerService.updateFreelancer(id, updateData);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    deleteFreelancer(@Param('id') id: string): Promise<boolean | string> {
        return this.freelancerService.delete(id);
    }


    //@UseGuards(JwtAuthGuard)
    @Put('review/:id')
    async createReview(
        @Body() review: createReviewDTO,
        @Param('id') id: string,
    ): Promise<any> {
        return this.freelancerService.createReview(id, review);
    }


    //@UseGuards(JwtAuthGuard)
    @Get('find_by_city/:city')
    async getFreelancerByCity(
        @Param('city') city: string
    ): Promise<FreelancerDetails[]> {
        return this.freelancerService.getFreelancerByCity(city);
    }
}
