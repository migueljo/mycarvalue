import { Test, TestingModule } from '@nestjs/testing'

import { UsersController } from './users.controller'
import { UsersService } from './users.service'
import { AuthService } from './auth.service'
import { User } from './user.entity'

describe('UsersController', () => {
  let controller: UsersController
  let fakeUsersService: Partial<UsersService>
  let fakeAuthService: Partial<AuthService>

  beforeEach(async () => {
    fakeUsersService = {
      findOne: async (id: number) =>
        ({ id, email: 'miguel@gmail.com', password: 'password' }) as User,
      findByEmail: async (email: string) =>
        ({ id: 1, email, password: 'password' }) as User,
      update: async (id: number, attrs) => ({ id, ...attrs }) as User,
      remove: async (id: number) => ({ id }) as User,
    }
    fakeAuthService = {
      signup: () => null,
      signin: () => null,
    }

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: fakeUsersService,
        },
        {
          provide: AuthService,
          useValue: fakeAuthService,
        },
      ],
    }).compile()

    controller = module.get<UsersController>(UsersController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
