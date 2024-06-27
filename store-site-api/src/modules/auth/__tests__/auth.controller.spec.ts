import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../auth.controller';
import { AuthService } from '../auth.service';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;

  beforeEach(async () => {

    const mockAuthService = {
      validateUser: jest.fn(),
      login: jest.fn(),
    }

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [{
        provide: AuthService,
        useValue: mockAuthService,
      }]
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe("login", () => {
    it("should call the login method on the AuthService with the users credentials (username and password)", async () => {
      const user = {
        username: "testuser",
        password: "testpassword"
      }

      const req = {user};

      await controller.login(req);

      expect(authService.login).toHaveBeenCalledWith(user);
    })
  })
});
