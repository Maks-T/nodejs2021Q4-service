import { diskStorage } from 'multer';
import { extname } from 'path';

const storageOptions = diskStorage({
  destination: './uploads',
  filename: (req, file, callback) => {
    callback(null, generateFilename(file));
  },
});

const generateFilename = (file) => `${Date.now()}${extname(file.originalname)}`;

export default storageOptions;
