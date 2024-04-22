import { Injectable, NotFoundException } from '@nestjs/common';
import { ObjectId } from 'bson';
import { CreateReviewDTO } from './types/review.dto';
import { ReviewsRepository } from './review.repository';
import { RestaurantsService } from '../restaurants/restaurants.service';

@Injectable()
export class ReviewsService {
  constructor(
    private readonly reviewsRepository: ReviewsRepository,
    private readonly restaurantsService: RestaurantsService,
  ) {}

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
}
