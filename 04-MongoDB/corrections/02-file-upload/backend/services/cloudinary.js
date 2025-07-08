import { v2 as cloudinary } from "cloudinary";

class CloudinaryStorage {
	_handleFile(req, file, cb) {
		const cloudinaryUploadStream = cloudinary.uploader.upload_stream(
			{ resource_type: "auto" },
			(error, result) => {
				if (error) {
					cb(error);
				} else {
					cb(null, result);
				}
			},
		);

		file.stream.pipe(cloudinaryUploadStream);
	}

	_removeFile(req, file, cb) {
		cb(new Error("Invalid attempt"), false);
	}
}

export default CloudinaryStorage;
