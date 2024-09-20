import { Test, TestingModule } from '@nestjs/testing'
import { BadRequestException } from '@nestjs/common'

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

  it('getUser() should return a user', async () => {
    const user = await controller.getUser('1')
    expect(user.id).toEqual(1)
  })

  it('getUser() should throw an error if id is undefined', async () => {
    fakeUsersService.findOne = async () => {
      throw new BadRequestException()
    }

    await expect(controller.getUser(undefined)).rejects.toThrow(
      BadRequestException,
    )
    await expect(controller.getUser(null)).rejects.toThrow(BadRequestException)
  })

  it('getUserByEmail() should return a user', async () => {
    const email = 'miguel@gmail.com'
    const user = await controller.getUserByEmail('miguel@gmail.com')
    expect(user.email).toEqual(email)
  })

  it("getUserByEmail() should return null if email doesn't exist", async () => {
    const email = 'miguel@gmail.com'
    fakeUsersService.findByEmail = async () => null

    await expect(await controller.getUserByEmail(email)).toBeNull()
  })
})
