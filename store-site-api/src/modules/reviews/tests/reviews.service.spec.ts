import { Test, TestingModule } from '@nestjs/testing'
import { ReviewsService } from '../reviews.service'
import { ReviewsRepository } from '../review.repository'
import { RestaurantsService } from '../../restaurants/restaurants.service'
import { ObjectId } from 'bson'

describe('ReviewsService', () => {
  let service: ReviewsService
  let repository: ReviewsRepository
  let restaurantService: RestaurantsService
  beforeEach(async () => {
    const mockReviewsRepository = {
      findAll: jest.fn(),
      findById: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    }

    const mockRestaurantsService = {
      getAllRestaurants: jest.fn(),
      getOneRestaurant: jest.fn(),
      getOneRestaurantEnriched: jest.fn(),
      createRestaurant: jest.fn(),
      updateRestaurant: jest.fn(),
      deleteRestaurant: jest.fn(),
      updateRestaurantReviews: jest.fn(),
    }

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReviewsService,
        {
          provide: ReviewsRepository,
          useValue: mockReviewsRepository,
        },
        {
          provide: RestaurantsService,
          useValue: mockRestaurantsService,
        },
      ],
    }).compile()

    service = module.get<ReviewsService>(ReviewsService)
    repository = module.get<ReviewsRepository>(ReviewsRepository)
    restaurantService = module.get<RestaurantsService>(RestaurantsService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('getReview', () => {
    it('should call getReview with reviewId param', async () => {
      const mockReviewData = {
        title: 'Test',
        rating: 5,
        comment: 'hi',
        _id: new ObjectId(),
        user: new ObjectId(),
      }

      jest.spyOn(repository, 'findById').mockResolvedValue(mockReviewData)

      expect(await service.getReview('123')).toBe(mockReviewData)
      expect(repository.findById).toHaveBeenCalledWith('123')
    })
  })

  describe('updateReview', () => {
    it('should call updateReview with reviewId and updateReviewData params', async () => {
      const mockReviewData = {
        title: 'Test',
        rating: 5,
        comment: 'hi',
        _id: new ObjectId(),
        user: new ObjectId(),
      }

      jest.spyOn(repository, 'update').mockResolvedValue(mockReviewData)

      expect(await service.updateReview('123', mockReviewData)).toBe(mockReviewData)
      expect(repository.update).toHaveBeenCalledWith('123', mockReviewData)
    })
  })

  it('should call deleteReview with reviewId and restaurantId params', async () => {
    const mockReviewId = new ObjectId()
    const mockRestaurantId = new ObjectId()
    const mockRestaurantData = {
      name: 'Test Restaurant',
      description: 'Test Description',
      city: 'Test City',
      address: 'Test Address',
      reviews: [mockReviewId],
      _id: mockRestaurantId,
    }

    jest.spyOn(restaurantService, 'getOneRestaurant').mockResolvedValue(mockRestaurantData)
    jest.spyOn(restaurantService, 'updateRestaurantReviews').mockResolvedValue(null)

    await service.deleteReview(mockReviewId, mockRestaurantId)

    expect(restaurantService.getOneRestaurant).toHaveBeenCalledWith(mockRestaurantId)
    expect(restaurantService.updateRestaurantReviews).toHaveBeenCalledWith(mockRestaurantId, [])
  })

  it('should call createReview with restaurantId and createReviewData params', async () => {
    const mockRestaurantId = new ObjectId()
    const mockCreateReviewData = {
      title: 'Test',
      rating: 5,
      comment: 'hi',
      user: new ObjectId(),
    }
    const mockReviewData = {
      title: 'Test',
      rating: 5,
      comment: 'hi',
      _id: new ObjectId(),
      user: new ObjectId(),
    }

    const mockRestaurantData = {
      name: 'Test Restaurant',
      description: 'Test Description',
      city: 'Test City',
      address: 'Test Address',
      reviews: [],
    }

    jest.spyOn(restaurantService, 'getOneRestaurant').mockResolvedValue(mockRestaurantData)
    jest.spyOn(repository, 'create').mockResolvedValue(mockReviewData)
    jest.spyOn(restaurantService, 'updateRestaurantReviews').mockResolvedValue(null)

    await service.createReviewOnRestaurant(mockRestaurantId, mockCreateReviewData)

    expect(restaurantService.getOneRestaurant).toHaveBeenCalledWith(mockRestaurantId)
    expect(repository.create).toHaveBeenCalledWith(mockCreateReviewData)
    expect(restaurantService.updateRestaurantReviews).toHaveBeenCalledWith(mockRestaurantId, [
      mockReviewData._id,
    ])
  })
})
