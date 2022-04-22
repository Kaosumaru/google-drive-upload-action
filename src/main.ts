import * as core from '@actions/core'
import {wait} from './wait'

async function run(): Promise<void> {
  try {
    // const ms: string = core.getInput('milliseconds')
    const credentials = core.getInput('credentials')
    const filename = core.getInput('filename')
    const folderId = core.getInput('folderId')

    core.notice(`Uploading ${filename} to ${folderId}...`)

    const ms = "1000";
    core.debug(`Waiting ${ms} milliseconds ...`) // debug is only output if you set the secret `ACTIONS_STEP_DEBUG` to true

    core.debug(new Date().toTimeString())
    await wait(parseInt(ms, 10))
    core.debug(new Date().toTimeString())

    core.setOutput('time', new Date().toTimeString())
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
