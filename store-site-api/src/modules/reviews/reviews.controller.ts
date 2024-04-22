import { Body, Controller, Param, Post } from '@nestjs/common';
import { CreateReviewDTO } from './types/review.dto';
import { ReviewsService } from './reviews.service';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}
  // get all reviews for a restaurant id
  // GET /reviews/:restaurantId
  // update a review for a restaurant id
  // PUT /reviews/:restaurantId
  // delete a review for a restaurant id
  // DELETE /reviews/:restaurantId
  // create a review for a restaurant id

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
  // GET /reviews/user/:userId
}
