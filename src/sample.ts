var tmp = require('temporary');
import * as base64 from 'base-64'
import * as loadEnv from '@devnetic/load-env'
import { FileUploader } from './service';
import { basename } from 'path';

async function run(): Promise<void> {
    const config: Record<string, string> = loadEnv.load('__tests__/.env', { returnConfig: true }) as Record<string, string>;
    console.log("Hello world");

    const credentials = base64.decode(config['INPUT_CREDENTIALS'])
    const filePath = config['INPUT_FILEPATH']
    const folderId = config['INPUT_FOLDERID']

    let authFile = new tmp.File();
    authFile.writeFileSync(credentials);

    console.log(`Uploading ${filePath} to ${folderId}...`)
    console.log(`${authFile.path}`)

    let uploader = new FileUploader(authFile.path);
    await uploader.uploadFile(basename(filePath), filePath, 'text/plain', folderId)
}

run()
