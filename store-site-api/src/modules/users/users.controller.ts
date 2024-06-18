import { Controller, Get, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { ObjectId } from 'bson';

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

    // POST /users/register -> creates/registers a new user
    @Post('register')
    async register() {
        return this.userService.registerNewUser()
    }

    // POST /users/login -> logs in a user
    @Post('login')
    async login() {
        return this.userService.loginUser()
    }

        // POST /users/logout -> logs out a user
    @Post('logout')
    async logout() {
        return this.userService.logOutUser()
    }
}
