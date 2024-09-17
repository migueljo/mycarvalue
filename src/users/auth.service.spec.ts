import { Test } from '@nestjs/testing'
import { AuthService } from './auth.service'
import { UsersService } from './users.service'
import { User } from './user.entity'

it('can create an instance of auth service', async () => {
  // Create a fake copy of the users service
  const fakeUsersService: Partial<UsersService> = {
    create: (email, password) =>
      Promise.resolve({ id: 1, email, password } as User),
    findOne: (id) => Promise.resolve({ id, email: 'a', password: 'b' } as User),
    findByEmail: (email) =>
      Promise.resolve({ id: 1, email, password: 'b' } as User),
  }

  const module = await Test.createTestingModule({
    providers: [
      AuthService,
      { provide: UsersService, useValue: fakeUsersService },
    ],
  }).compile()

  const service = module.get(AuthService)
  expect(service).toBeDefined()
})
