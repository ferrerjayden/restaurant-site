import { HttpException, Injectable } from '@nestjs/common';
import { ObjectId } from 'bson';
import { RestaurantsService } from '../restaurants/restaurants.service';
import { ReviewsService } from '../reviews/reviews.service';
import { UserRepository } from './user.repository';
import { HttpErrorByCode } from '@nestjs/common/utils/http-error-by-code.util';

@Injectable()
export class UsersService {

    constructor(
        private readonly restaurantsService: RestaurantsService,
        private readonly reviewsService: ReviewsService,
        private readonly usersRepository: UserRepository,
    ) {}

    async getRestaurantsByUser(userIdentifier: ObjectId) {
        return this.restaurantsService.getRestaurantsByUser(userIdentifier)
    }

    async getReviewsByUser(userIdentifier: ObjectId) {
        return this.reviewsService.getReviewsByUser(userIdentifier)
    }

    async getUserDetails(userId: string)
    {
        const user = await this.usersRepository.findByFilter({userName: userId})

        if (!user) {
            throw new HttpException("User not found", 404)
        }

        return user
    }

    async registerNewUser() {
        console.log("hi")
    }

    async loginUser() {
        console.log("hi")
    }

    async logOutUser() {
        console.log("hi")
    }

}
