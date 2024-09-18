import { Test } from '@nestjs/testing'
import { BadRequestException, NotFoundException } from '@nestjs/common'

import { AuthService, generateHash } from './auth.service'
import { UsersService } from './users.service'
import { User } from './user.entity'

describe('AuthService', () => {
  let service: AuthService
  let fakeUsersService: Partial<UsersService>

  beforeEach(async () => {
    // Create a fake copy of the users service
    fakeUsersService = {
      create: (email, password) =>
        Promise.resolve({ id: 1, email, password } as User),
      findByEmail: (email) =>
        Promise.resolve({ id: 1, email, password: 'b' } as User),
      findOne: (id) =>
        Promise.resolve({ id, email: 'a', password: 'b' } as User),
    }

    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersService, useValue: fakeUsersService },
      ],
    }).compile()

    service = module.get(AuthService)
  })

  it('can create an instance of auth service', async () => {
    expect(service).toBeDefined()
  })

  it('creates a new user with a salted and hashed password', async () => {
    const user = await service.signup('miguel@gmail.com', 'asdf')

    expect(user.password).not.toEqual('asdf')
    const [salt, hash] = user.password.split('.')
    expect(salt).toBeDefined()
    expect(hash).toBeDefined()
  })

  it('throws an error if user signs up with an email that is in use', async () => {
    const email = 'miguel@gmail.com'
    const password = 'password'
    fakeUsersService.create = () => Promise.reject(new Error())
    await expect(service.signup(email, password)).rejects.toThrow(Error)
  })

  it('throws if signin is called with an unused email', async () => {
    const email = 'emaildoesnotexist@gmail.com'
    const password = 'password'
    fakeUsersService.findByEmail = () => Promise.resolve(null)

    await expect(service.signin(email, password)).rejects.toThrow(
      NotFoundException,
    )
  })

  it('returns a user if the provided password is correct', async () => {
    const email = 'miguel@gmail.com'
    const password = 'password'
    const salt = 'salt'
    const hash = await generateHash(password, salt)
    const hashedPassword = `${salt}.${hash.toString('hex')}`

    fakeUsersService.findByEmail = () =>
      Promise.resolve({ id: 1, email, password: hashedPassword } as User)

    const user = await service.signin(email, password)
    expect(user).toBeDefined()
  })

  it('throws if an invalid password is provided', async () => {
    const email = 'miguel@gmail.com'
    const password = 'password'
    const salt = 'salt'
    const hash = await generateHash(password, salt)
    const hashedPassword = `${salt}.${hash.toString('hex')}`
    const wrongPassword = 'wrong.password'

    fakeUsersService.findByEmail = () =>
      Promise.resolve({ id: 1, email, password: hashedPassword } as User)

    await expect(service.signin(email, wrongPassword)).rejects.toThrow(
      BadRequestException,
    )
  })
})
