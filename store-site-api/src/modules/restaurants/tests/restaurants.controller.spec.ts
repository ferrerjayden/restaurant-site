import { Test, TestingModule } from '@nestjs/testing'
import { RestaurantsController } from '../restaurants.controller'
import { RestaurantsService } from '../restaurants.service'
import { ObjectId } from 'bson'

describe('RestaurantsController', () => {
  let controller: RestaurantsController
  let service: RestaurantsService

  beforeEach(async () => {
    const mockRestaurantsService = {
      getAllRestaurants: jest.fn(),
      getOneRestaurant: jest.fn(),
      getOneRestaurantEnriched: jest.fn(),
      createRestaurant: jest.fn(),
      updateRestaurant: jest.fn(),
      deleteRestaurant: jest.fn(),
    }

    const module: TestingModule = await Test.createTestingModule({
      controllers: [RestaurantsController],
      providers: [
        {
          provide: RestaurantsService,
          useValue: mockRestaurantsService,
        },
      ],
    }).compile()

    controller = module.get<RestaurantsController>(RestaurantsController)
    service = module.get<RestaurantsService>(RestaurantsService)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })

  describe('getAll', () => {
    it('should call getAllRestaurants', async () => {
      const mockRestaurantData = [
        {
          name: 'Test Restaurant',
          description: 'Test Description',
          city: 'Test City',
          address: 'Test Address',
          reviews: [new ObjectId()],
        },
      ]

      jest.spyOn(service, 'getAllRestaurants').mockResolvedValue(mockRestaurantData)

      expect(await controller.getAll()).toBe(mockRestaurantData)
      expect(service.getAllRestaurants).toHaveBeenCalled()
    })
  })

  describe('getOne', () => {
    it('should call getOneRestaurant with id param', async () => {
      const mockRestaurantData = {
        name: 'Test Restaurant',
        description: 'Test Description',
        city: 'Test City',
        address: 'Test Address',
        reviews: [new ObjectId()],
      }

      jest.spyOn(service, 'getOneRestaurant').mockResolvedValue(mockRestaurantData)

      expect(await controller.getOne('123')).toBe(mockRestaurantData)
      expect(service.getOneRestaurant).toHaveBeenCalledWith('123')
    })
  })

  describe('getRestaurantWithReviews', () => {
    it('should call getOneRestaurantEnriched with restaurant id param', async () => {
      const mockRestaurantData = {
        name: 'Test Restaurant',
        description: 'Test Description',
        city: 'Test City',
        address: 'Test Address',
        reviews: [new ObjectId()],
      }

      jest.spyOn(service, 'getOneRestaurantEnriched').mockResolvedValue(mockRestaurantData)

      expect(await controller.getRestaurantWithReviews('123')).toBe(mockRestaurantData)
      expect(service.getOneRestaurantEnriched).toHaveBeenCalledWith('123')
    })
  })

  describe('createOne', () => {
    it('should call createRestaurant with createRestaurantDTO data', async () => {
      const mockCreateRestaurant = {
        name: 'Test Restaurant',
        description: 'Test Description',
        city: 'Test City',
        address: 'Test Address',
        user: null,
      }
      const mockRestaurantData = {
        name: 'Test Restaurant',
        description: 'Test Description',
        city: 'Test City',
        address: 'Test Address',
        reviews: [new ObjectId()],
      }

      jest.spyOn(service, 'createRestaurant').mockResolvedValue(mockRestaurantData)

      expect(await controller.createOne(mockCreateRestaurant)).toBe(mockRestaurantData)
      expect(service.createRestaurant).toHaveBeenCalledWith(mockCreateRestaurant)
    })
  })

  describe('updateOne', () => {
    it('should call updateRestaurant with restaurant id and updateRestaurantDTO data', async () => {
      const mockUpdateRestaurant = {
        name: 'Test Restaurant',
        description: 'Test Description',
        city: 'Test City',
        address: 'Test Address',
      }
      const mockRestaurantData = {
        name: 'Test Restaurant',
        description: 'Test Description',
        city: 'Test City',
        address: 'Test Address',
        reviews: [new ObjectId()],
      }

      jest.spyOn(service, 'updateRestaurant').mockResolvedValue(mockRestaurantData)

      expect(await controller.updateOne('123', mockUpdateRestaurant)).toBe(mockRestaurantData)
      expect(service.updateRestaurant).toHaveBeenCalledWith('123', mockUpdateRestaurant)
    })
  })

  describe('deleteOne', () => {
    it('should call deleteRestaurant with restaurant id', async () => {
      const mockDeletedRestaurant = {
        name: 'Test Restaurant',
        description: 'Test Description',
        city: 'Test City',
        address: 'Test Address',
        reviews: [new ObjectId()],
      }

      jest.spyOn(service, 'deleteRestaurant').mockResolvedValue(mockDeletedRestaurant)

      expect(await controller.deleteOne('123')).toBe(mockDeletedRestaurant)
      expect(service.deleteRestaurant).toHaveBeenCalledWith('123')
    })
  })
})
