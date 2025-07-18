// fileOperations.js
import { access, appendFile, mkdir, unlink } from 'fs/promises';
import { join } from 'path';

export const createDirIfNotExists = async (dirPath) => {
	// Check if directory exists, if not, create it
	try {
		await access(dirPath);
		return `Directory ${dirPath} already exists.`;
	} catch (error) {
		await mkdir(dirPath, { recursive: true });
		return `Directory ${dirPath} created successfully.`;
	}
};

// Function to create a file with a message
export const createFileWithMessage = async (message) => {
	try {
		// Get the current date and time
		const now = new Date();
		// Create a directory name with the current date
		const dirName = `${now.getFullYear()}-${(now.getMonth() + 1)
			.toString()
			.padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')}`;
		// Create a file name with the current time
		const fileName = `${now.getHours().toString().padStart(2, '0')}:${now
			.getMinutes()
			.toString()
			.padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}.txt`;
		// Create directory if it does not exist
		await createDirIfNotExists(dirName);
		// Create the file path
		const filePath = join(dirName, fileName);
		// Append message to the file if it exists, otherwise create the file
		await appendFile(filePath, message + '\n');
		console.log('File created successfully!');
	} catch (error) {
		console.log(error);
	}
};

// Function to delete a file by name
export const deleteFileByName = async (filePath) => {
	try {
		// Check if the file exists
		await access(filePath);
		// Delete the file
		await unlink(filePath);

		console.log('File deleted successfully!');
	} catch (error) {
		console.log('File not found.');
	}
};

// Terminal execution
const command = process.argv[2];
const argument = process.argv[3];

if (command === 'create' && argument) {
	createFileWithMessage(argument);
} else if (command === 'delete' && argument) {
	deleteFileByName(argument);
}
