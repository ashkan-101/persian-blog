import {join} from 'path'
import multer from 'multer'
import { Application } from 'express'
import FieldName from './contracts/FieldName'

const fileStorage = multer.diskStorage({
  destination(req, file, cb){
    if(file.fieldname === FieldName.AVATAR){
      cb(null, join(process.cwd(), 'public', 'avatars'))
    }else if(file.fieldname === FieldName.POSTIMAGE){
      cb(null, join(process.cwd(), 'public', 'gallery'))
    }else if(file.fieldname === FieldName.THUMBNAIL){
      cb(null, join(process.cwd(), 'public', 'thumbnails'))
    }
  },
  filename(req, file, callback){
    const fileFormat = file.originalname.split('.')
    const fileExtension = fileFormat[fileFormat.length - 1]
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    callback(null, file.fieldname + '-' + uniqueSuffix + '.' + fileExtension)
  },
})

function fileFilter (req: any, file: any, cb: any) {
  if(file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg'){
    // To accept the file pass `true`, like so:
    cb(null, true)
  }else{
    // To reject this file pass `false`, like so:
    cb(null, false)
  }
}

export function uploadFile(app: Application){
  app.use(multer({storage: fileStorage, fileFilter: fileFilter}).fields([
    {name: 'postImage'},
    {name: 'avatar', maxCount: 1},
    {name: 'thumbnail', maxCount: 1}
  ]))
}