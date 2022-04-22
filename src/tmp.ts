import {unlink, writeFile} from 'fs/promises'
import tempfile from 'tempfile'
import {zip} from 'zip-a-folder'

export class TempGenerator {
  async createFileWithContent(content: string): Promise<string> {
    const tmpPath = tempfile()
    this.createdFiles.push(tmpPath)
    await writeFile(tmpPath, content)
    return tmpPath
  }

  async zipDirectory(directory: string): Promise<string> {
    const tmpPath = tempfile('.zip')
    this.createdFiles.push(tmpPath)
    await zip(directory, tmpPath)
    return tmpPath
  }

  async cleanup(): Promise<void> {
    for (const file of this.createdFiles) {
      try {
        await unlink(file)
      } catch (error) {
        // ignore
      }
    }
    this.createdFiles = []
  }

  createdFiles: string[] = []
}
