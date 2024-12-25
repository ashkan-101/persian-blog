import {unlink} from 'fs/promises'

const deleteFile = async (filePath: string) => {
  try {
    await unlink(filePath)
    return true
  } catch (error) {
    return false
  }
}

export {deleteFile}