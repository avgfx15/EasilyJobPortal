import multer from 'multer';


const storageConfig = multer.diskStorage({
    destination: (req, file, callBack) => {

        callBack(null, 'public/resumes/');
    },
    filename: (req, file, callBack) => {
        const fileName = Date.now() + '_' + file.originalname;

        callBack(null, fileName);
    }
});

export const upload = multer({
    storage: storageConfig,
});