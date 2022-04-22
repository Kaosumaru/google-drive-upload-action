/* eslint-disable no-console */
import * as base64 from 'base-64'
import * as loadEnv from '@devnetic/load-env'
import {basename} from 'path'
import {FileUploader} from './service'
import tempfile from 'tempfile'
import {writeFile} from 'fs/promises'

async function run(): Promise<void> {
  const config: Record<string, string> = loadEnv.load('__tests__/.env', {
    returnConfig: true
  }) as Record<string, string>

  const credentials = base64.decode(config['INPUT_CREDENTIALS'])
  const filePath = config['INPUT_FILEPATH']
  const folderId = config['INPUT_FOLDERID']

  const authFile = tempfile()
  await writeFile(authFile, credentials)

  console.log(`Uploading ${filePath} to ${folderId}...`)
  console.log(`${authFile}`)

  const uploader = new FileUploader(authFile)
  await uploader.uploadFile(basename(filePath), filePath, folderId)
}

run()
