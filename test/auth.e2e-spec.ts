import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'

import { AppModule } from '../src/app.module'

describe('Authentication System', () => {
  let app: INestApplication

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleFixture.createNestApplication()
    await app.init()
  })

  it('handles a signup request', async () => {
    const email = 'miguel@gmail.com'
    const response = await request(app.getHttpServer())
      .post('/auth/signup')
      .send({ email, password: '1234' })
      .expect(201)

    expect(response.body.id).toBeDefined()
    expect(response.body.email).toEqual(email)
    expect(response.body.password).toBeUndefined()
  })

  it('signup as a new user then get the currently logged in user', async () => {
    const email = 'miguel@gmail.com'
    const signupRes = await request(app.getHttpServer())
      .post('/auth/signup')
      .send({ email, password: '1234' })
      .expect(201)
    const cookie = signupRes.get('Set-Cookie')

    await request(app.getHttpServer())
      .get('/auth/whoami')
      .set('Cookie', cookie)
      .expect(200)
      .then((response) => {
        expect(response.body.email).toEqual(email)
      })
  })
})
