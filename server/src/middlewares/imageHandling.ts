// imageUploadMiddleware.ts
import * as multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer.default({ storage: storage });
const imageHandler = upload.single("profilePicture");
export { imageHandler };
