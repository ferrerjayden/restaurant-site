import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../auth.service';
import { UsersService } from '../../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

jest.mock('bcrypt', () => ({
  compare: jest.fn()
}))

describe('AuthService', () => {
  let service: AuthService;
  let userService: UsersService
  let jwtService: JwtService

  beforeEach(async () => {

    const mockUserService = {
      getRestaurantsByUser: jest.fn(),
      getReviewsByUser: jest.fn(),
      getUserDetails: jest.fn(),
      registerNewUser: jest.fn(),
    }

    const mockJwtService = {
      sign: jest.fn(),
    }

    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, {
        provide: UsersService,
        useValue: mockUserService,
      }, {
        provide: JwtService,
        useValue: mockJwtService,
      }],
    }).compile();

    service = module.get<AuthService>(AuthService);
    userService = module.get<UsersService>(UsersService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe("validateUser", () => {
    it("should get the user, compare the password and return the user details (result) if the password matches", async () => {
      const mockUsername = "testuser";
      const mockPassword = "testpassword";

      const mockUser = {
        username: mockUsername,
        roles: ["user"],
        email: "test123@gmail.com",
        password: "hashedpassword",
      }



      jest.spyOn(userService, 'getUserDetails').mockResolvedValueOnce(mockUser as any);
      (bcrypt.compare as jest.Mock).mockResolvedValueOnce(true);

      const result = await service.validateUser(mockUsername, mockPassword);

      expect(result).toEqual({ username: mockUsername, roles: ["user"], email: "test123@gmail.com"});
    })

    it("should return null if password doesn't match", async () => {
      const mockUsername = "testuser";
      const mockPassword = "testpassword";

     const mockUser = {
        username: mockUsername,
        roles: ["user"],
        email: "test123@gmail.com",
        password: mockPassword,
      }

      jest.spyOn(userService, 'getUserDetails').mockResolvedValueOnce(mockUser as any);
      (bcrypt.compare as jest.Mock).mockResolvedValueOnce(false);

      const result = await service.validateUser(mockUsername, mockPassword);

      expect(result).toEqual(null)

    })

    it("should return null if the user isn't found", async () => {
      const mockUsername = "testuser";
      const mockPassword = "testpassword";

      jest.spyOn(userService, 'getUserDetails').mockResolvedValueOnce(null);
      (bcrypt.compare as jest.Mock).mockResolvedValueOnce(true);

      const result = await service.validateUser(mockUsername, mockPassword);

      expect(result).toEqual(null)
    })
  })

  describe("login", () => {
    it("should generate the payload based on user details and return the access token", async () => {
      const mockUser = {
        username: "testuser",
        userId: "12345",
      }

      const mockToken = "whatsup"
      jest.spyOn(jwtService, 'sign').mockReturnValueOnce(mockToken);

      const result = await service.login(mockUser);
      expect(result).toEqual({access_token: mockToken})

    })
  })
});
