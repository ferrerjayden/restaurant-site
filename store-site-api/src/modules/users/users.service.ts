import { HttpException, Injectable } from '@nestjs/common'
import { ObjectId } from 'bson'
import { RestaurantsService } from '../restaurants/restaurants.service'
import { ReviewsService } from '../reviews/reviews.service'
import { UserRepository } from './repositories/user.repository'
import * as bcrypt from 'bcrypt'
import CreateUserDTO from './types/user.dto'

@Injectable()
export class UsersService {
  constructor(
    private readonly restaurantsService: RestaurantsService,
    private readonly reviewsService: ReviewsService,
    private readonly usersRepository: UserRepository,
  ) {}

  async getRestaurantsByUser(userIdentifier: ObjectId) {
    return this.restaurantsService.getRestaurantsByUser(userIdentifier)
  }

  async getReviewsByUser(userIdentifier: ObjectId) {
    return this.reviewsService.getReviewsByUser(userIdentifier)
  }

  async getUserDetails(userId: string) {
    const user = await this.usersRepository.findByFilter({ username: userId })

    if (!user) {
      throw new HttpException('Invalid credentials!', 404)
    }

    return user
  }

  async registerNewUser(createUserData: CreateUserDTO) {
    // check existing users and throw if duplicate
    const existingUser = await this.usersRepository.findByFilter({
      username: createUserData.username,
    })
    const existingEmail = await this.usersRepository.findByFilter({
      email: createUserData.email,
    })

    if (existingUser || existingEmail) {
      throw new HttpException('User already exists', 400)
    }

    const { password } = createUserData
    // NOTE: 10 refers to the salt rounds
    const hashSaltedPassword = await bcrypt.hash(password, 10)

    const updatedUserData = {
      ...createUserData,
      password: hashSaltedPassword,
      // always have default user role
      role: ['user'],
    }

    return this.usersRepository.create(updatedUserData)
  }
}
