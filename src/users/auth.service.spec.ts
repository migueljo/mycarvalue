import { Test } from '@nestjs/testing'
import { AuthService } from './auth.service'
import { UsersService } from './users.service'

it('can create an instance of auth service', async () => {
  // Create a fake copy of the users service
  const fakeUsersService = {
    create: ({ email, password }) =>
      Promise.resolve({ id: 1, email, password }),
    findone: (id) => Promise.resolve({ id, email: 'a', password: 'b' }),
    findByEmail: (email) => Promise.resolve({ id: 1, email, password: 'b' }),
    update: (id, attrs) => Promise.resolve({ id, ...attrs }),
    remove: (id) => Promise.resolve({ id }),
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
