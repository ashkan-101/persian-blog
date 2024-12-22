import {unlink} from 'fs/promises'

const deleteFile = async (filePath: string) => {
  await unlink(filePath)
}

export {deleteFile}