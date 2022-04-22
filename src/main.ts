import * as core from '@actions/core'
import * as base64 from 'base-64'
import {FileUploader} from './service'
import {basename} from 'path'
import tempfile from 'tempfile'
import {writeFile} from 'fs/promises'

async function run(): Promise<void> {
  try {
    const credentials = base64.decode(core.getInput('credentials'))
    const filePath = core.getInput('filePath')
    const folderId = core.getInput('folderId')
    const driveId = core.getInput('driveId')
    let fileName = core.getInput('fileName')

    // create authfile
    const authFile = tempfile()
    await writeFile(authFile, credentials)

    fileName = fileName ? fileName : basename(filePath)

    core.notice(`Uploading ${filePath} to ${folderId} as ${fileName}...`)

    const uploader = new FileUploader(authFile, driveId)
    uploader.uploadFile(fileName, filePath, folderId)

    core.notice(`Finished uploading ${filePath} to ${folderId}`)

    core.setOutput('time', new Date().toTimeString())
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
