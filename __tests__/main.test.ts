import * as process from 'process'
import * as cp from 'child_process'
import * as path from 'path'
import {test} from '@jest/globals'
import * as loadEnv from '@devnetic/load-env'

// shows how the runner will run a javascript action with env / stdout protocol
test('test runs', () => {
  loadEnv.load('__tests__/.env')

  process.env['INPUT_FILEPATH'] = path.join(__dirname, '..', 'README.md')
  process.env['INPUT_FOLDERID'] = '14NoF0UhftEcjOw6pok2nJDhASp9R9cWU'
  const np = process.execPath
  const ip = path.join(__dirname, '..', 'lib', 'main.js')
  const options: cp.ExecFileSyncOptions = {
    env: process.env
  }
  console.log(cp.execFileSync(np, [ip], options).toString())
})
