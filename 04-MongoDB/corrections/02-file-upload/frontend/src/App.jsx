import { useState } from "react";
import "./App.css";

function App() {
	const [file, setFile] = useState(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [preview, setPreview] = useState(null);

	const [uploadedImage, setUploadedImage] = useState(null);

	const handleChange = (e) => {
		console.log(e.target.files);
		const fileToUpload = e.target.files[0];
		setFile(fileToUpload);
		setPreview(URL.createObjectURL(fileToUpload));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const formData = new FormData();
		formData.append("image", file);

		try {
			setError(null);

			const res = await fetch("http://localhost:3000/file-upload", {
				method: "POST",
				body: formData,
			});

			const data = await res.json();

			console.log(data);
			setUploadedImage(data.location);
		} catch (error) {
			setError(error);
		}
	};

	return (
		<>
			<div className="mb-7 size-50 mx-auto">
				{preview && (
					<>
						<h2>Preview Image</h2>
						<div className="size-42 mx-auto outline-orange-400 outline">
							<img src={preview} alt="" />
						</div>
					</>
				)}
			</div>

			<form onSubmit={handleSubmit} inert={loading}>
				<input
					type="file"
					name="image"
					id="image"
					className="file:bg-amber-600 file:py-2 file:px-1 file:rounded-lg w-full cursor-pointer file:cursor-pointer my-2"
					onChange={handleChange}
				/>
				<button type="submit" disabled={loading}>
					Upload
				</button>
			</form>

			{error && <p className="text-red-500">{error}</p>}

			<div className="mt-7 size-50 mx-auto">
				{uploadedImage && (
					<>
						<h2>Uploadad image</h2>
						<div className="size-42 mx-auto outline outline-green-500">
							<img src={uploadedImage} alt="" />
						</div>
					</>
				)}
			</div>
		</>
	);
}

export default App;
