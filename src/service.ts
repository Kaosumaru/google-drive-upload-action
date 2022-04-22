import {drive_v3, google} from 'googleapis'
import {createReadStream} from 'fs'

export class FileUploader {
  constructor(authFile: string, driveId?: string) {
    this.driveService = FileUploader.getDriveService(authFile)
    if (driveId && driveId !== '') this.driveId = driveId
  }

  async uploadFile(
    fileName: string,
    filepath: string,
    folderId: string
  ): Promise<string> {
    const fileMetadata = {
      name: fileName,
      parents: [folderId],
      driveId: this.driveId
    }
    const media = {
      body: createReadStream(filepath)
    }
    const file = await this.driveService.files.create({
      requestBody: fileMetadata,
      media,
      supportsAllDrives: true,
      fields: 'id'
    })
    return file.data.id as string
  }

  static getDriveService(authJson: string): drive_v3.Drive {
    const SCOPES = ['https://www.googleapis.com/auth/drive']

    const auth = new google.auth.GoogleAuth({
      keyFile: authJson,
      scopes: SCOPES
    })
    const driveService = google.drive({version: 'v3', auth})
    return driveService
  }

  driveService: drive_v3.Drive
  driveId: string | undefined
}
