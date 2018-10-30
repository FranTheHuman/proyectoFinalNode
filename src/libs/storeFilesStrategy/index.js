'use strcit'

// configuracion Multer
import multer from 'multer';

const fecha = new Date().toDateString().replace(/\s+/gi,'_');

// Seteamos las propiedades de almacenamiento
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${fecha}${file.originalname}`);
    }
});

// Validacion de los archivos
const fileFilter = (req, file, cb) => {
    // reject a file 
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
        cb(null, true); // guarda el archivo
    } else {
        cb(null, false); // no guarda el archivo
    }
};

// Inicializamos multer y le pasamos las propiedades de configuracion
const upload = multer({
    storage, 
    limits: { 
        fileSize : 1024 * 1024 * 5,
    },
    fileFilter
});

module.exports = upload;

/*
|-------------------------------------------------------------------------------------------------------------------------------
|   MULTER
|-------------------------------------------------------------------------------------------------------------------------------
|
| Es un middleware para manejar "multipart/form-data" (archivos), principalmente usado para subir archivos.
|
*/