import fs from 'fs'
import path from 'path'

export default function getImageBlob(req: any, res: any) {
    const dirRelativeToPublicFolder = 'images'
    const dir = path.resolve('./public', dirRelativeToPublicFolder);
    const filenames = fs.readdirSync(dir);
    const images = filenames.map(name => path.join('/', dirRelativeToPublicFolder, name))
    res.statusCode = 200
    return res.json(images);
}