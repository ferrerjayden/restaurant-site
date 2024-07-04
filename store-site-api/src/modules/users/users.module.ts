import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { RestaurantsModule } from '../restaurants/restaurants.module';
import { ReviewsModule } from '../reviews/reviews.module';
import { UserRepository } from './repositories/user.repository';
import { Mongoose } from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './types/users.schema';

@Module({
  imports: [RestaurantsModule, ReviewsModule, MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
  providers: [UsersService, UserRepository],
  controllers: [UsersController],
  exports: [UsersService]
})
export class UsersModule {}
