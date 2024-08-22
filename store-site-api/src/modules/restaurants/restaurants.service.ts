import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common'
import { CreateRestaurantDTO, UpdateRestaurantDTO } from './types/restaurant.dto'
import { RestaurantRepository } from './repositories/restaurant.repository'
import { ObjectId } from 'bson'

@Injectable()
export class RestaurantsService {
  constructor(private readonly restaurantRepository: RestaurantRepository) {}

  async createRestaurant(createRestaurantData: CreateRestaurantDTO) {
    return this.restaurantRepository.create(createRestaurantData)
  }

  async getAllRestaurants() {
    return this.restaurantRepository.findAll()
  }

  async getOneRestaurant(restaurantId: ObjectId | string) {
    return this.restaurantRepository.findById(restaurantId)
  }

  async getOneRestaurantEnriched(restaurantId: ObjectId | string) {
    return this.restaurantRepository.findByIdEnriched(restaurantId)
  }

  async updateRestaurant(
    restaurantId: ObjectId | string,
    updateData: UpdateRestaurantDTO,
    user: any,
  ) {
    const restaurant = await this.restaurantRepository.findById(restaurantId)

    if (!restaurant) {
      throw new NotFoundException('Restaurant not found')
    }

    if (!restaurant.user.equals(ObjectId.createFromHexString(user.userId))) {
      throw new UnauthorizedException('You do not have permission to update this restaurant!')
    }

    return this.restaurantRepository.update(restaurantId, updateData)
  }

  async deleteRestaurant(restaurantId: ObjectId | string, user: any) {
    const restaurant = await this.restaurantRepository.findById(restaurantId)

    if (!restaurant) {
      throw new NotFoundException('Restaurant not found')
    }

    if (!restaurant.user.equals(ObjectId.createFromHexString(user.userId))) {
      throw new UnauthorizedException('You do not have permission to delete this restaurant!')
    }

    return this.restaurantRepository.delete(restaurantId)
  }

  async updateRestaurantReviews(restaurantId: ObjectId | string, reviews: ObjectId[]) {
    return this.restaurantRepository.updateReviews(restaurantId, reviews)
  }

  async getRestaurantsByUser(userIdentifier: ObjectId) {
    return this.restaurantRepository.findAllByFilter({ user: userIdentifier })
  }
}
