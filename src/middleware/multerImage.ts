import multer from 'multer';
import path from 'path';
import { Request } from 'express';

const storage = multer.diskStorage({
    destination: (req: Request, file, cb) => {
        cb(null, 'uploads');
    },
    filename: (req: Request, file, cb) => {
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 5 },
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb(new Error('Only images are allowed!'));
        }
    }
});

export default upload;
