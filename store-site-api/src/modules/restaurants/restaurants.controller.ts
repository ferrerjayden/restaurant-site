import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  CreateRestaurantDTO,
  UpdateRestaurantDTO,
} from './types/restaurant.dto';
import { RestaurantsService } from './restaurants.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

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
  //@UseGuards(JwtAuthGuard)
  async createOne(@Body() createRestaurantData: CreateRestaurantDTO) {
    return this.restaurantService.createRestaurant(createRestaurantData);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
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
  @UseGuards(JwtAuthGuard)
  async deleteOne(@Param('id') restaurantId: string) {
    return this.restaurantService.deleteRestaurant(restaurantId);
  }
}
