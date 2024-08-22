import { Body, Controller, Get, Param, Post } from '@nestjs/common'
import { UsersService } from './users.service'
import { ObjectId } from 'bson'
import CreateUserDTO from './types/user.dto'

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get(':userId/restaurants')
  async getRestaurantsByUser(@Param('userId') userIdentifier: ObjectId) {
    return this.userService.getRestaurantsByUser(userIdentifier)
  }

  @Get(':userId/reviews')
  async getReviewsByUser(@Param('userId') userIdentifier: ObjectId) {
    return this.userService.getReviewsByUser(userIdentifier)
  }

  @Get(':userId')
  async getUserDetails(@Param('userId') userId: string) {
    return this.userService.getUserDetails(userId)
  }

  @Post('register')
  async register(@Body() createUserDto: CreateUserDTO) {
    return this.userService.registerNewUser(createUserDto)
  }
}
