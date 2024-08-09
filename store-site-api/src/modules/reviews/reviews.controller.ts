import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreateReviewDTO, UpdateReviewDTO } from './types/review.dto';
import { ReviewsService } from './reviews.service';
import { ObjectId } from 'bson';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Get(':reviewId')
  async getReview(@Param('reviewId') reviewId: string) {
    return this.reviewsService.getReview(reviewId);
  }

  @Patch(':reviewId')
  //@UseGuards(JwtAuthGuard)
  async updateReview(
    @Param('reviewId') reviewId: ObjectId | string,
    @Body() updateReviewData: UpdateReviewDTO,
  ) {
    return this.reviewsService.updateReview(reviewId, updateReviewData);
  }

  @Delete(':reviewId/:restaurantId')
  //@UseGuards(JwtAuthGuard)
  async deleteReview(
    @Param('reviewId') reviewId: ObjectId,
    @Param('restaurantId') restaurantId: ObjectId,
  ) {
    return this.reviewsService.deleteReview(reviewId, restaurantId);
  }

  @UseGuards(JwtAuthGuard)
  @Post('helloprotected')
  async helloProtected() {
    return 'Hello from protected route!';
  }

  @Post(':restaurantId')
  //@UseGuards(JwtAuthGuard)
  async createReview(
    @Param('restaurantId') restaurantId: ObjectId,
    @Body() createReviewData: CreateReviewDTO,
  ) {
    return this.reviewsService.createReviewOnRestaurant(
      restaurantId,
      createReviewData,
    );
  }

}
