import * as core from '@actions/core'
import * as base64 from 'base-64'
import {FileUploader} from './service'
import {basename} from 'path'
import {statSync} from 'fs'
import {TempGenerator} from './tmp'

async function run(): Promise<void> {
  const tmp = new TempGenerator()
  try {
    const credentials = base64.decode(core.getInput('credentials'))
    let filePath = core.getInput('filePath')
    const folderId = core.getInput('folderId')
    const driveId = core.getInput('driveId')
    let fileName = core.getInput('fileName')

    // create authfile
    const authFile = await tmp.createFileWithContent(credentials)

    fileName = fileName ? fileName : basename(filePath)
    core.notice(`Uploading ${filePath} to ${folderId} as ${fileName}...`)

    // if file is a directory, zip it first
    if (statSync(filePath).isDirectory()) {
      filePath = await tmp.zipDirectory(filePath)
    }

    // upload file to google drive
    const uploader = new FileUploader(authFile, driveId)
    uploader.uploadFile(fileName, filePath, folderId)

    core.notice(`Finished uploading ${filePath} to ${folderId}`)
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }

  tmp.cleanup()
}

run()
