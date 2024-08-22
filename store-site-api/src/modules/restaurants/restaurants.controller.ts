import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common'
import { CreateRestaurantDTO, UpdateRestaurantDTO } from './types/restaurant.dto'
import { RestaurantsService } from './restaurants.service'
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'
import { GetUser } from '../users/users.decorator'
import { ObjectId } from 'bson'

@Controller('restaurants')
export class RestaurantsController {
  constructor(private readonly restaurantService: RestaurantsService) {}

  @Get()
  async getAll() {
    return this.restaurantService.getAllRestaurants()
  }

  @Get(':id')
  async getOne(@Param('id') restaurantId: string) {
    return this.restaurantService.getOneRestaurant(restaurantId)
  }

  @Get(':id/reviews')
  async getRestaurantWithReviews(@Param('id') restaurantId: string) {
    return this.restaurantService.getOneRestaurantEnriched(restaurantId)
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async createOne(@GetUser() user: any, @Body() createRestaurantData: CreateRestaurantDTO) {
    return this.restaurantService.createRestaurant({
      user: ObjectId.createFromHexString(user.userId),
      ...createRestaurantData,
    })
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async updateOne(
    @GetUser() user: any,
    @Param('id') restaurantId: string,
    @Body() updateRestaurantData: UpdateRestaurantDTO,
  ) {
    return this.restaurantService.updateRestaurant(restaurantId, updateRestaurantData, user)
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async deleteOne(@GetUser() user: any, @Param('id') restaurantId: string) {
    return this.restaurantService.deleteRestaurant(restaurantId, user)
  }
}
