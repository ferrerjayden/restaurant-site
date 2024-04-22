import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ObjectId } from 'bson';
import { Injectable } from '@nestjs/common';
import { Review, ReviewDocument } from './types/reviews.schema';
import { CreateReviewDTO } from './types/review.dto';
import { ReviewRO } from './types/review.ro';
import { UpdateRestaurantDTO } from '../restaurants/types/restaurant.dto';

@Injectable()
export class ReviewsRepository {
  constructor(
    @InjectModel(Review.name)
    private reviewModel: Model<ReviewDocument>,
  ) {}

  async findAll(): Promise<ReviewRO[]> {
    return this.reviewModel.find().lean().exec();
  }

  async findById(id: ObjectId | string): Promise<ReviewRO> {
    return this.reviewModel.findById(id).lean().exec();
  }

  async create(data: CreateReviewDTO): Promise<ReviewRO> {
    return this.reviewModel.create(data);
  }

  async update(
    id: ObjectId | string,
    data: UpdateRestaurantDTO,
  ): Promise<ReviewRO> {
    return this.reviewModel.findByIdAndUpdate(id, data).exec();
  }

  async delete(id: ObjectId | string): Promise<ReviewRO> {
    return this.reviewModel.findByIdAndDelete(id).lean().exec();
  }
}
