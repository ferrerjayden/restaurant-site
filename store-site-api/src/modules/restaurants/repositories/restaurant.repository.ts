import { InjectModel } from '@nestjs/mongoose'
import { Restaurant, RestaurantDocument } from '../types/restaurant.schema'
import { FilterQuery, Model } from 'mongoose'
import { ObjectId } from 'bson'
import { Injectable } from '@nestjs/common'
import RestaurantData from '../types/restaurant-interfaces'
import { CreateRestaurantDTO, UpdateRestaurantDTO } from '../types/restaurant.dto'

@Injectable()
export class RestaurantRepository {
  constructor(
    @InjectModel(Restaurant.name)
    private restaurantModel: Model<RestaurantDocument>,
  ) {}

  async findAll(): Promise<RestaurantData[]> {
    return this.restaurantModel.find().lean().exec()
  }

  async findById(id: ObjectId | string): Promise<RestaurantData> {
    return this.restaurantModel.findById(id).lean().exec()
  }

  async findByIdEnriched(id: ObjectId | string): Promise<RestaurantData> {
    return this.restaurantModel
      .findById(id)
      .populate({
        path: 'reviews',
        populate: {
          path: 'user',
        },
      })
      .lean()
      .exec()
  }

  async create(data: CreateRestaurantDTO): Promise<RestaurantData> {
    return this.restaurantModel.create(data)
  }

  async update(id: ObjectId | string, data: UpdateRestaurantDTO): Promise<RestaurantData> {
    return this.restaurantModel.findByIdAndUpdate(id, data).lean().exec()
  }

  async delete(id: ObjectId | string): Promise<RestaurantData> {
    return this.restaurantModel.findByIdAndDelete(id).lean().exec()
  }

  async updateReviews(restaurantId: ObjectId | string, reviews: ObjectId[]) {
    return this.restaurantModel.findByIdAndUpdate(restaurantId, { reviews }).lean().exec()
  }

  async findAllByFilter(filter: FilterQuery<RestaurantData>) {
    return this.restaurantModel.find(filter).lean().exec()
  }
}
