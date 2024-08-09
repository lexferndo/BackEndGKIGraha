const multer = require("multer");
const errorResponse = require("./error.response");

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    let uploadPath = "";

    if (
      (file.mimetype === "image/png" ||
        file.mimetype === "image/jpg" ||
        file.mimetype === "image/jpeg") &&
      file.fieldname === "url_image"
    ) {
      uploadPath = "upload/images";
    } else if (
      file.mimetype === "application/pdf" &&
      file.fieldname === "url_file"
    ) {
      uploadPath = "upload/documents";
    } else {
      return cb(new errorResponse("Unsupported file type", 400));
    }

    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(
      null,
      Date.now().toString() +
        "-" +
        file.originalname.replace(/,/g, "").toLowerCase().split(" ").join("-"),
    );
  },
});

const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = [
    "image/png",
    "image/jpg",
    "image/jpeg",
    "application/pdf",
  ];

  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    return cb(new errorResponse("Unsupported images type", 400), false);
  }
};

const Upload = multer({
  storage: fileStorage,
  fileFilter: fileFilter,
  limits: { fileSize: 20000000 },
});

module.exports = Upload;
