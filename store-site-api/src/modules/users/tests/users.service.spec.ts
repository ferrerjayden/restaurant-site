import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../users.service';
import { RestaurantsService } from "../../restaurants/restaurants.service";
import { ReviewsService } from "../../reviews/reviews.service";
import { ObjectId } from 'bson';
import { UserRepository } from '../user.repository';
import { UserDocument } from '../types/users.schema';
import * as bcrypt from 'bcrypt';

jest.mock('bcrypt', () => ({
  hash: jest.fn().mockResolvedValue("aHashedPassword")
}))

describe('UsersService', () => {
  let service: UsersService;
  let restaurantsService: RestaurantsService;
  let reviewsService: ReviewsService;
  let userRepository: UserRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, {
        provide: RestaurantsService,
        useValue: {
          getRestaurantsByUser: jest.fn()
        }
      }, {
        provide: ReviewsService,
        useValue: {
          getReviewsByUser: jest.fn()
        },
      }, {
        provide: UserRepository,
        useValue: {
          findByFilter: jest.fn(),
          create: jest.fn()
        }
      }],
    }).compile();

    service = module.get<UsersService>(UsersService);
    restaurantsService = module.get<RestaurantsService>(RestaurantsService);
    reviewsService = module.get<ReviewsService>(ReviewsService);
    userRepository = module.get<UserRepository>(UserRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe("getRestaurantsByUser", () => {
    it("should call getRestaurantsByUser with userIdentifier", async () => {
      const mockUserIdentifier = new ObjectId();

      jest.spyOn(restaurantsService, 'getRestaurantsByUser').mockResolvedValueOnce(null);
      expect(await service.getRestaurantsByUser(mockUserIdentifier)).toBe(null);

      expect(restaurantsService.getRestaurantsByUser).toHaveBeenCalledWith(mockUserIdentifier);
    });
  })

  describe("getReviewsByUser", () => {
    it("should call getReviewsByUser with userIdentifier", async () => {
      const mockUserIdentifier = new ObjectId();

      jest.spyOn(reviewsService, 'getReviewsByUser').mockResolvedValueOnce(null);
      expect(await service.getReviewsByUser(mockUserIdentifier)).toBe(null);

      expect(reviewsService.getReviewsByUser).toHaveBeenCalledWith(mockUserIdentifier);
    });
  })

  describe("getUserDetails", () => {
    it("should call call user repository method findByFilter with userId", async () => {
      const mockUserName = "jaydeniskool123"

      const mockUser = {
        username: "mockUserName",
        email: "sup@gmail.com"
      }

      jest.spyOn(userRepository, "findByFilter").mockResolvedValue(mockUser as UserDocument)

      expect(await service.getUserDetails(mockUserName)).toBe(mockUser)
      expect(userRepository.findByFilter).toHaveBeenCalledWith({username: mockUserName})
    })

    it("should throw an error if a user is not found", async () => {
      const mockUserName = "jaydeniskool123"

      jest.spyOn(userRepository, "findByFilter").mockResolvedValue(null)

      await expect(service.getUserDetails(mockUserName)).rejects.toThrow("User not found")

    })
  })

  describe("registerNewUser", () => {
    it("should hash the password, and call the user repository method create", async () => {
      const mockUser = {
        username: "jaydeniskool123",
        email: "test123",
        password: "test123",
      }

      jest.spyOn(userRepository, "create").mockResolvedValue(mockUser as UserDocument)
      jest.spyOn(userRepository, "findByFilter").mockResolvedValue(null)

      await service.registerNewUser(mockUser)

      expect(bcrypt.hash).toHaveBeenCalledWith(mockUser.password, 10)
      expect(userRepository.create).toHaveBeenCalledWith({
        ...mockUser,
        password: "aHashedPassword",
        role: ["user"]
      })
    })

    it("should throw an error if a user with the same username already exists", async () => {
      const mockUser = {
        username: "jaydeniskool123",
        email: "test123",
        password: "test123",
      }

      jest.spyOn(userRepository, "findByFilter").mockResolvedValue(mockUser as UserDocument)

      await expect(service.registerNewUser(mockUser)).rejects.toThrow("User already exists")
    })
  })
});
