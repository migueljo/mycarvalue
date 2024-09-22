import { NestFactory } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'

const cookieSession = require('cookie-session')

import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.use(
    cookieSession({
      // TODO: Improvie this
      keys: ['asdasdasd'],
    }),
  )
  await app.listen(3000)
}
bootstrap()
