import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import {
  CreateRestaurantDTO,
  UpdateRestaurantDTO,
} from './types/restaurant.dto';
import { RestaurantsService } from './restaurants.service';

@Controller('restaurants')
export class RestaurantsController {
  constructor(private readonly restaurantService: RestaurantsService) {}

  @Get()
  async getAll() {
    return this.restaurantService.getAllRestaurants();
  }

  @Get(':id')
  async getOne(@Param('id') restaurantId: string) {
    return this.restaurantService.getOneRestaurant(restaurantId);
  }

  @Get(':id/reviews')
  async getRestaurantWithReviews(@Param('id') restaurantId: string) {
    return this.restaurantService.getOneRestaurantEnriched(restaurantId);
  }

  @Post()
  async createOne(@Body() createRestaurantData: CreateRestaurantDTO) {
    return this.restaurantService.createRestaurant(createRestaurantData);
  }

  @Patch(':id')
  async updateOne(
    @Param('id') restaurantId: string,
    @Body() updateRestaurantData: UpdateRestaurantDTO,
  ) {
    return this.restaurantService.updateRestaurant(
      restaurantId,
      updateRestaurantData,
    );
  }

  @Delete(':id')
  async deleteOne(@Param('id') restaurantId: string) {
    return this.restaurantService.deleteRestaurant(restaurantId);
  }
}
