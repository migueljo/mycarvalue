import * as fs from 'fs/promises'
import * as path from 'path'

global.beforeEach(async () => {
  try {
    const testDBFile = path.resolve(__dirname, '../', 'test.sqlite')
    await fs.rm(testDBFile, { force: true })
  } catch (error) {
    // It's okay if the file doesn't exist
  }
})
