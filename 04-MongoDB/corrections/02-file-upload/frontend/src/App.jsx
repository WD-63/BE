import { useState } from "react";
import "./App.css";

function App() {
	const [file, setFile] = useState(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [preview, setPreview] = useState(null);

	const [uploadedImage, setUploadedImage] = useState(null);

	const handleChange = (e) => {
		const fileToUpload = e.target.files[0];
		setFile(fileToUpload);
		setPreview(URL.createObjectURL(fileToUpload));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		alert("UPLOADING IMAGE");
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
				{/* Input Element here */}
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
