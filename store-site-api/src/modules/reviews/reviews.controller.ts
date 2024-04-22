import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateReviewDTO, UpdateReviewDTO } from './types/review.dto';
import { ReviewsService } from './reviews.service';
import { ObjectId } from 'bson';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Get(':reviewId')
  async getReview(@Param('reviewId') reviewId: string) {
    return this.reviewsService.getReview(reviewId);
  }

  @Patch(':reviewId')
  async updateReview(
    @Param('reviewId') reviewId: ObjectId | string,
    @Body() updateReviewData: UpdateReviewDTO,
  ) {
    return this.reviewsService.updateReview(reviewId, updateReviewData);
  }

  @Delete(':reviewId/:restaurantId')
  async deleteReview(
    @Param('reviewId') reviewId: ObjectId,
    @Param('restaurantId') restaurantId: ObjectId,
  ) {
    return this.reviewsService.deleteReview(reviewId, restaurantId);
  }

  @Post(':restaurantId')
  async createReview(
    @Param('restaurantId') restaurantId: string,
    @Body() createReviewData: CreateReviewDTO,
  ) {
    return this.reviewsService.createReviewOnRestaurant(
      restaurantId,
      createReviewData,
    );
  }

  // get all reviews for a user id
  // might be useful for a user profile page, or when they are logged in and want to see all their reviews
  // GET /reviews/user/:userName
}
