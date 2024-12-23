import sharp from "sharp";
import {basename, extname, join} from 'path'

async function compression(path: string){
  const fileName = basename(path, extname(path))
  const outputPath = join(process.cwd(), 'public', 'compressed-thumbnails', `${fileName}-thumb.jpg`)
  try {
    await sharp(path).jpeg({
      quality: 30,
      progressive: true,
      chromaSubsampling: '4:4:4'
    }).toFile(outputPath)
    return `${fileName}-thumb.jpg`
  } catch (error) {
    console.log(error);
    return false
  }
}

export default compression