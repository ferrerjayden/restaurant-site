import { Test, TestingModule } from '@nestjs/testing'
import { ReviewsController } from '../reviews.controller'
import { ReviewsService } from '../reviews.service'
import { ObjectId } from 'bson'

describe('ReviewsController', () => {
  let controller: ReviewsController
  let service: ReviewsService

  beforeEach(async () => {
    const mockReviewsService = {
      getReview: jest.fn(),
      createReviewOnRestaurant: jest.fn(),
      updateReview: jest.fn(),
      deleteReview: jest.fn(),
    }

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: ReviewsService,
          useValue: mockReviewsService,
        },
      ],
      controllers: [ReviewsController],
    }).compile()

    controller = module.get<ReviewsController>(ReviewsController)
    service = module.get<ReviewsService>(ReviewsService)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
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

      jest.spyOn(service, 'getReview').mockResolvedValue(mockReviewData)

      expect(await controller.getReview('123')).toBe(mockReviewData)
      expect(service.getReview).toHaveBeenCalledWith('123')
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

      jest.spyOn(service, 'updateReview').mockResolvedValue(mockReviewData)

      expect(await controller.updateReview('123', mockReviewData)).toBe(mockReviewData)
      expect(service.updateReview).toHaveBeenCalledWith('123', mockReviewData)
    })
  })

  describe('deleteReview', () => {
    it('should call deleteReview with reviewId and restaurantId params', async () => {
      const restaurantId = new ObjectId()
      const reviewId = new ObjectId()

      jest.spyOn(service, 'deleteReview').mockResolvedValue(null)

      expect(await controller.deleteReview(reviewId, restaurantId)).toBe(null)
      expect(service.deleteReview).toHaveBeenCalledWith(reviewId, restaurantId)
    })
  })

  describe('createReview', () => {
    it('should call createReview with restaurantId and createReviewData params', async () => {
      const mockReviewData = {
        title: 'Test',
        rating: 5,
        comment: 'hi',
        _id: new ObjectId(),
        user: new ObjectId(),
      }

      const restaurantId = new ObjectId()

      jest.spyOn(service, 'createReviewOnRestaurant').mockResolvedValue(null)

      expect(await controller.createReview(restaurantId, mockReviewData)).toBe(null)
      expect(service.createReviewOnRestaurant).toHaveBeenCalledWith(restaurantId, mockReviewData)
    })
  })
})
