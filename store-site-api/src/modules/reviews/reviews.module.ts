import { Module } from '@nestjs/common';
import { ReviewsController } from './reviews.controller';
import { ReviewsService } from './reviews.service';
import { RestaurantsModule } from '../restaurants/restaurants.module';
import { ReviewsRepository } from './review.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Review, ReviewSchema } from './types/reviews.schema';

@Module({
  imports: [
    RestaurantsModule,
    MongooseModule.forFeature([{ name: Review.name, schema: ReviewSchema }]),
  ],
  controllers: [ReviewsController],
  providers: [ReviewsService, ReviewsRepository],
  exports: [ReviewsService]
})
export class ReviewsModule {}
