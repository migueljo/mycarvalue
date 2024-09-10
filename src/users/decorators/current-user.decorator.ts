import { createParamDecorator } from '@nestjs/common'
import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host'

export const CurrentUser = createParamDecorator(
  (data: any, context: ExecutionContextHost) => {
    return 'hi there'
  },
)
