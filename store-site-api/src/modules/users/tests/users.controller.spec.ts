import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from '../users.controller';
import { UsersService } from '../users.service';
import { ObjectId } from 'bson';
import { UserDocument } from '../types/users.schema';

describe('UsersController', () => {
  let controller: UsersController;
  let userService: UsersService;

  beforeEach(async () => {

    const mockUserService = {
      getRestaurantsByUser: jest.fn(),
      getReviewsByUser: jest.fn(),
      getUserDetails: jest.fn(),
      registerNewUser: jest.fn(),
      loginUser: jest.fn(),
      logOutUser: jest.fn(),
    }

    const module: TestingModule = await Test.createTestingModule({
      providers: [{
        provide: UsersService,
        useValue: mockUserService
      }],
      controllers: [UsersController],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    userService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getRestaurantsByUser', () => {
    it("should call getRestaurantsByUser with userId", async () => {

      const mockUserId = new ObjectId()

      jest.spyOn(userService, 'getRestaurantsByUser').mockResolvedValueOnce(null)

      expect(await controller.getRestaurantsByUser(mockUserId)).toBe(null)
      expect(userService.getRestaurantsByUser).toHaveBeenCalledWith(mockUserId)
    })
  })

  describe('getReviewsByUser', () => {
    it("should call getReviewsByUser with userId", async () => {

        const mockUserId = new ObjectId()

         jest.spyOn(userService, 'getReviewsByUser').mockResolvedValueOnce(null)

         expect(await controller.getReviewsByUser(mockUserId)).toBe(null)
         expect(userService.getReviewsByUser).toHaveBeenCalledWith(mockUserId)
    })
  })

  describe('getUserDetails', () => {
    it("should call getUserDetails with userId", async () => {

      const mockUserId = "testUser"

      jest.spyOn(userService, 'getUserDetails').mockResolvedValueOnce(null)

      expect(await controller.getUserDetails(mockUserId)).toBe(null)
      expect(userService.getUserDetails).toHaveBeenCalledWith(mockUserId)
    })
  })

  describe('register', () => {
    it("should call registerNewUser", async () => {

      const mockUser = {
        userName: "testUser",
        password: "testPassword",
        email: "testEmail@gmail.com"
      }



      jest.spyOn(userService, 'registerNewUser').mockResolvedValueOnce(mockUser as UserDocument)

      expect(await controller.register(mockUser)).toBe(mockUser)
      expect(userService.registerNewUser).toHaveBeenCalledWith(mockUser)
    })
  })
});
