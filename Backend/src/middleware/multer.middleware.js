import multer from "multer";

const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'../uploads')
    },
    filename:function(req,file,cb){
        cb(null,file.originalname)
    }
})


export const upload = multer({storage})


// import multer from "multer";
// import path from "path";
// import { fileURLToPath } from "url";
// import fs from "fs";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// // uploads folder should be at Backend/uploads
// const uploadPath = path.join(__dirname, "../uploads");

// // ensure folder exists
// if (!fs.existsSync(uploadPath)) {
//   fs.mkdirSync(uploadPath, { recursive: true });
// }

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, uploadPath);
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + "-" + file.originalname);
//   },
// });

// export const upload = multer({ storage });

