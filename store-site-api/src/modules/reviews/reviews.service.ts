import { Injectable, NotFoundException } from '@nestjs/common';
import { ObjectId } from 'bson';
import { CreateReviewDTO, UpdateReviewDTO } from './types/review.dto';
import { ReviewsRepository } from './review.repository';
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
  ) {
    return this.reviewsRepository.update(reviewId, updateReviewData);
  }

  async deleteReview(reviewId: ObjectId, restaurantId: ObjectId) {
    const restaurant =
      await this.restaurantsService.getOneRestaurant(restaurantId);

    if (!restaurant) {
      throw new NotFoundException('Restaurant not found');
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
