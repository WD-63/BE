import multer from "multer";
import CloudinaryStorage from "../services/cloudinary.js";

// const upload = multer({ storage: multer.memoryStorage() });

// const storage = multer.diskStorage({
// 	destination: function (req, file, cb) {
// 		cb(null, "./uploads");
// 	},
// 	filename: function (req, file, cb) {
// 		const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
// 		cb(null, uniqueSuffix + "-" + file.originalname);
// 	},
// });

const storage = new CloudinaryStorage();

const allowedFormats = ["png", "jpg", "jpeg", "gif", "svg", "webp", "avif"];
// const allowedFormats = new Set(["png", "jpg", "jpeg", "gif", "svg", "webp", "avif"]);

const fileFilter = (req, file, cb) => {
	const fileExtension = file.mimetype.split("/")[1];

	if (allowedFormats.includes(fileExtension)) {
		cb(null, true);
	} else {
		cb(new Error("File type not allowed", { cause: 400 }));
	}
};

const fileSize = 1_048_576 * 4; // 2mb

const upload = multer({ storage, fileFilter, limits: { fileSize } });

export default upload;
