import * as core from '@actions/core'
// import base-64
import * as base64 from 'base-64'
import { FileUploader } from './service'
import { basename } from 'path';
var tmp = require('temporary');


async function run(): Promise<void> {
  try {
    const credentials = base64.decode(core.getInput('credentials'))
    const filePath = core.getInput('filePath')
    const folderId = core.getInput('folderId')
    const driveId = core.getInput('driveId')

    let authFile = new tmp.File();
    authFile.writeFileSync(credentials);

    core.notice(`Uploading ${filePath} to ${folderId}...`)

    let uploader = new FileUploader(authFile.path, driveId);
    uploader.uploadFile(basename(filePath), filePath, 'text/plain', folderId)

    core.notice(`Finished uploading ${filePath} to ${folderId}`)

    core.setOutput('time', new Date().toTimeString())
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
