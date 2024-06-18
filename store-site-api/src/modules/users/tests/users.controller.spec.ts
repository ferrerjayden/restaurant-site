import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from '../users.controller';
import { UsersService } from '../users.service';
import { get } from 'http';
import { ObjectId } from 'bson';

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

      jest.spyOn(userService, 'registerNewUser').mockResolvedValueOnce(null)

      expect(await controller.register()).toBe(null)
      expect(userService.registerNewUser).toHaveBeenCalled()
    })
  })

  describe("login", () => {
    it("should call loginUser", async () => {

        jest.spyOn(userService, 'loginUser').mockResolvedValueOnce(null)

        expect(await controller.login()).toBe(null)
        expect(userService.loginUser).toHaveBeenCalled()
    })
  })

  describe("logout", () => {
    it("should call logOutUser", async () => {

        jest.spyOn(userService, 'logOutUser').mockResolvedValueOnce(null)

        expect(await controller.logout()).toBe(null)
        expect(userService.logOutUser).toHaveBeenCalled()
    })
  })

});
