import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from '../users.controller';
import { UsersService } from '../users.service';
import { User } from '@entities/user.entity';

class UsersServiceMock {
  findOne(id: string): Promise<User> {
    if (id === 'existingUserId') {
      return Promise.resolve({
        id,
        firstName: 'Thiago',
        lastName: 'FazPay',
      } as User);
    } else {
      return Promise.resolve(undefined);
    }
  }
}

describe('UsersController', () => {
  let controller: UsersController;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let userService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useClass: UsersServiceMock,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    userService = module.get<UsersService>(UsersService);
  });

  describe('findOne', () => {
    it('should return an existing user by ID', async () => {
      const result = await controller.findOne('existingUserId');

      expect(result).toEqual({
        id: 'existingUserId',
        firstName: 'Thiago',
        lastName: 'FazPay',
      });
    });

    it('should return undefined for a non-existing user', async () => {
      const result = await controller.findOne('nonExistingUserId');
      expect(result).toBeUndefined();
      expect(result).toMatchSnapshot();
    });
  });
});
