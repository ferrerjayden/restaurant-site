import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { ObjectId } from 'bson';
import { CreateReviewDTO, UpdateReviewDTO } from './types/review.dto';
import { ReviewsRepository } from './repositories/review.repository';
import { RestaurantsService } from '../restaurants/restaurants.service';

@Injectable()
export class ReviewsService {
  constructor(
    private readonly reviewsRepository: ReviewsRepository,
    private readonly restaurantsService: RestaurantsService,
  ) {}

  async getReview(reviewId: string) {
    return this.reviewsRepository.findById(reviewId);
  }

  async updateReview(
    reviewId: ObjectId | string,
    updateReviewData: UpdateReviewDTO,
    user: any,
  ) {

    const review = await this.reviewsRepository.findById(reviewId)

    if (!review) {
      throw new NotFoundException("Could not find review")
    }

    if (!ObjectId.createFromHexString(user.userId).equals(review.user)) {
      throw new UnauthorizedException("You do not have permission to update this review")
    }

    return this.reviewsRepository.update(reviewId, updateReviewData);
  }

  async deleteReview(reviewId: ObjectId, restaurantId: ObjectId, user: any) {
    const restaurant =
      await this.restaurantsService.getOneRestaurant(restaurantId);

    if (!restaurant) {
      throw new NotFoundException('Restaurant not found');
    }

    const review = await this.reviewsRepository.findById(reviewId)

    if (!ObjectId.createFromHexString(user.userId).equals(review.user)) {
      throw new UnauthorizedException("You do not have permission to delete this review!")
    }

    const restaurantReviews = restaurant.reviews || [];

    const updatedReviews = restaurantReviews.filter(
      (review) => !review.equals(reviewId),
    );

    return this.restaurantsService.updateRestaurantReviews(
      restaurantId,
      updatedReviews,
    );
  }

  async createReviewOnRestaurant(
    restaurantId: ObjectId | string,
    createReviewData: CreateReviewDTO,
  ) {
    const restaurant =
      await this.restaurantsService.getOneRestaurant(restaurantId);

    if (!restaurant) {
      throw new NotFoundException('Restaurant not found');
    }

    const review = await this.reviewsRepository.create(createReviewData);

    const restaurantReviews = restaurant.reviews || [];
    const updatedReviews = [...restaurantReviews, review._id];

    return this.restaurantsService.updateRestaurantReviews(
      restaurantId,
      updatedReviews,
    );
  }

  async getReviewsByUser(userIdentifier: ObjectId) {
    return this.reviewsRepository.findAllByFilter({ user: userIdentifier });
  }
}
