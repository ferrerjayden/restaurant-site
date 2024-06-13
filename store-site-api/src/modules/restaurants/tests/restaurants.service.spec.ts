import { Test, TestingModule } from '@nestjs/testing';
import { RestaurantsService } from '../restaurants.service';
import { RestaurantRepository } from '../repositories/restaurant.repository';
import { ObjectId } from 'bson';

describe('RestaurantsService', () => {
  let service: RestaurantsService;
  let repository: RestaurantRepository;

  beforeEach(async () => {

    const mockRestaurantRepository = {
      findAll: jest.fn(),
      findById: jest.fn(),
      findByIdEnriched: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      updateReviews: jest.fn(),
    }

    const module: TestingModule = await Test.createTestingModule({
      providers: [RestaurantsService,
        {
          provide: RestaurantRepository,
          useValue: mockRestaurantRepository,
        },
      ]
    }).compile();

    service = module.get<RestaurantsService>(RestaurantsService);
    repository = module.get<RestaurantRepository>(RestaurantRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe("createRestaurant", () => {
    it("should call create method of repository and create a new restaurant", async () => {

      const mockCreateData = {
          name: "test",
          description: "test",
          city: "test",
          address: "test",
          user: null,
      }

      const mockRestaurantData = {
        name: "Test Restaurant",
        description: "Test Description",
        city: "Test City",
        address: "Test Address",
        reviews: [new ObjectId()]
      };

      jest.spyOn(repository, "create").mockResolvedValue(mockRestaurantData)

      expect(await service.createRestaurant(mockCreateData)).toBe(mockRestaurantData);
      expect(repository.create).toHaveBeenCalledWith(mockCreateData);
    })
  })

  describe("getAllRestaurants", () => {
    it("should call findAll method of repository and get all restaurants", async () => {
        const mockRestaurantData = [{
        name: "Test Restaurant",
        description: "Test Description",
        city: "Test City",
        address: "Test Address",
        reviews: [new ObjectId()]
      }]

      jest.spyOn(repository, "findAll").mockResolvedValue(mockRestaurantData)

      expect(await service.getAllRestaurants()).toBe(mockRestaurantData)
      expect(repository.findAll).toHaveBeenCalled()
    })
  })

  describe("getOneRestaurant", () => {
    it("should call findById method of repository and get one restaurant", async () => {
          const mockRestaurantId = new ObjectId();

        const mockRestaurantData = {
          name: "Test Restaurant",
          description: "Test Description",
          city: "Test City",
          address: "Test Address",
          reviews: [new ObjectId()]
        }

        jest.spyOn(repository, "findById").mockResolvedValue(mockRestaurantData)

        expect(await service.getOneRestaurant(mockRestaurantId)).toBe(mockRestaurantData)
        expect(repository.findById).toHaveBeenCalledWith(mockRestaurantId)
    })
  })

  describe("getOneRestaurantEnriched", () => {
    it("should call findByIdEnriched method of repository and get one restaurant", async () => {
          const mockRestaurantId = new ObjectId();

        const mockRestaurantData = {
          name: "Test Restaurant",
          description: "Test Description",
          city: "Test City",
          address: "Test Address",
          reviews: [new ObjectId()]
        }

        jest.spyOn(repository, "findByIdEnriched").mockResolvedValue(mockRestaurantData)

        expect(await service.getOneRestaurantEnriched(mockRestaurantId)).toBe(mockRestaurantData)
        expect(repository.findByIdEnriched).toHaveBeenCalledWith(mockRestaurantId)
    })
  })

  describe("updateRestaurant", () => {
    it("should call update method of repository and update a restaurant", async () => {
          const mockRestaurantId = new ObjectId();

        const mockUpdateData = {
          name: "Test Restaurant",
          description: "Test Description",
          city: "Test City",
          address: "Test Address",
          reviews: [new ObjectId()]
        }

        jest.spyOn(repository, "update").mockResolvedValue(mockUpdateData)

        expect(await service.updateRestaurant(mockRestaurantId, mockUpdateData)).toBe(mockUpdateData)
        expect(repository.update).toHaveBeenCalledWith(mockRestaurantId, mockUpdateData)
    })
  })

  describe("deleteRestaurant", () => {
    it("should call delete method of repository and delete a restaurant", async () => {
          const mockRestaurantId = new ObjectId();

        const mockRestaurantData = {
          name: "Test Restaurant",
          description: "Test Description",
          city: "Test City",
          address: "Test Address",
          reviews: [new ObjectId()]
        }

        jest.spyOn(repository, "delete").mockResolvedValue(mockRestaurantData)

        expect(await service.deleteRestaurant(mockRestaurantId)).toBe(mockRestaurantData)
        expect(repository.delete).toHaveBeenCalledWith(mockRestaurantId)
    })
  })


  describe("updateRestaurantReviews", () => {
    it("should call updateReviews method of repository and update reviews of a restaurant", async () => {
        const mockRestaurantId = new ObjectId();
        const mockReviews = [new ObjectId(), new ObjectId()];

        jest.spyOn(repository, "updateReviews").mockResolvedValue(null)

        expect(await service.updateRestaurantReviews(mockRestaurantId, mockReviews)).toBe(null)
        expect(repository.updateReviews).toHaveBeenCalledWith(mockRestaurantId, mockReviews)
    })
  })
});
