import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common'
import { CreateReviewDTO, UpdateReviewDTO } from './types/review.dto'
import { ReviewsService } from './reviews.service'
import { ObjectId } from 'bson'
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'
import { GetUser } from '../users/users.decorator'

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Get(':reviewId')
  async getReview(@Param('reviewId') reviewId: string) {
    return this.reviewsService.getReview(reviewId)
  }

  @Patch(':reviewId')
  @UseGuards(JwtAuthGuard)
  async updateReview(
    @GetUser() user: any,
    @Param('reviewId') reviewId: ObjectId | string,
    @Body() updateReviewData: UpdateReviewDTO,
  ) {
    return this.reviewsService.updateReview(reviewId, updateReviewData, user)
  }

  @Delete(':reviewId/:restaurantId')
  @UseGuards(JwtAuthGuard)
  async deleteReview(
    @GetUser() user: any,
    @Param('reviewId') reviewId: ObjectId,
    @Param('restaurantId') restaurantId: ObjectId,
  ) {
    return this.reviewsService.deleteReview(reviewId, restaurantId, user)
  }

  @UseGuards(JwtAuthGuard)
  @Post('helloprotected')
  async helloProtected() {
    return 'Hello from protected route!'
  }

  @Post(':restaurantId')
  @UseGuards(JwtAuthGuard)
  async createReview(
    @GetUser() user: any,
    @Param('restaurantId') restaurantId: ObjectId,
    @Body() createReviewData: CreateReviewDTO,
  ) {
    return this.reviewsService.createReviewOnRestaurant(restaurantId, {
      user: ObjectId.createFromHexString(user.userId),
      ...createReviewData,
    })
  }
}
