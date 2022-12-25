import { Body, Controller, Delete, Get, Param, Post, Put, Req, Res, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { createReviewDTO } from './dtos/createReview_dto';
import { UpdateFrelancersDTO } from './dtos/updateFreelancer_dto';
import { FreelancerDetails } from './interfaces/freelancer.interface';
import { Freelancer } from './freelancer.schema';
import { FreelancerService } from './freelancer.service';
import { LocalAuthGuard } from 'src/auth/guard/local-auth.guard';
import { Review } from './dtos/Review.interface';

@Controller('freelancer')
export class FreelancerController {
    constructor(
        private freelancerService: FreelancerService,
    ) {}

    @Get(':id')
    getFreelancer(@Param('id') id: string): Promise<any | null> {
        return this.freelancerService.findById(id);
    }
    
    // @UseGuards(LocalAuthGuard)
    @Get()
    getAllFreelancers(): Promise<FreelancerDetails[] | string> {
        return this.freelancerService.findAllFreelancers();
    }

    // @UseGuards(LocalAuthGuard)
    @Put(':id')
    // @UsePipes(new ValidationPipe())
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
    @Put('rating/:id')
    async createRating(
        @Body() rating: any,
        @Param('id') id: string,
    ): Promise<any> {
        return this.freelancerService.createRating(id, rating);
    }

    //@UseGuards(JwtAuthGuard)
    @Get('avg_score/:id')
    async getAvgScore(
        @Param('id') id: string,
    ): Promise<any> {
        return this.freelancerService.getAvgScore(id);
    }

    //@UseGuards(JwtAuthGuard)
    @Get('reviews/:id')
    async getReviews(
        @Param('id') id: string,
        @Res() res: Response,
    ){
        return this.freelancerService.getAllTheReviews(id, res);
    }
    


    //@UseGuards(JwtAuthGuard)
    @Get('find_by_city/:city')
    async getFreelancerByCity(
        @Param('city') city: string
    ): Promise<FreelancerDetails[]> {
        return this.freelancerService.getFreelancerByCity(city);
    }


    //@UseGuards(JwtAuthGuard)
    @Get('find_by_service/:serviceInput')
    async getFreelancerByServiceType(
        @Param('serviceInput') serviceInput: string
    ): Promise<FreelancerDetails[]>{
        return this.freelancerService.getFreelancerByServiceType(serviceInput);
    }
}
