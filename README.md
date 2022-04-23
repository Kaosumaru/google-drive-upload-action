<p align="center">
  <a href="https://github.com/Kaosumaru/google-drive-upload-action/actions"><img alt="typescript-action status" src="https://github.com/Kaosumaru/google-drive-upload-action/workflows/build-test/badge.svg"></a>
</p>


# google-drive-upload-action
Github action that uploads files to Google Drive.
**You need google service account!**


# Inputs

## ``credentials``
Required: **YES**.

A base64 encoded string with the [GSA credentials](https://stackoverflow.com/questions/46287267/how-can-i-get-the-file-service-account-json-for-google-translate-api/46290808).

## ``filePath``
Required: **YES**.  

The name of the file or directory that you want to upload. Directory will be zipped & uploaded.

## ``folderId``
Required: **YES**. 

The [ID of the folder](https://ploi.io/documentation/database/where-do-i-get-google-drive-folder-id) you want to upload to.

## ``fileName``
Required: **NO**

The name you want the file to have in Google Drive. If this input is not provided, it will use only the filename of the source path.

## ``driveId``
Required: **NO**

If folder is on shared drive, you need to also provide drive id.


# Usage Example

## Simple Workflow
In this example we stored the folderId and credentials as action secrets. This is highly recommended as leaking your credentials key will allow anyone to use your service account.
```yaml
# .github/workflows/main.yml
name: Main
on: [push]

jobs:
  my_job:
    runs-on: ubuntu-latest

    steps:

      - name: Checkout code
        uses: actions/checkout@v2

      - name: Upload to drive
        uses: Kaosumaru/google-drive-upload-action@v1
        with:
          credentials: ${{ secrets.credentials }}
          filePath: ./archive
          folderId: ${{ secrets.folderId }}
          fileName: documentation.zip # optional string
          
```