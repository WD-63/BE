import { dir } from 'console';
import { access, appendFile, mkdir, unlink } from 'fs/promises';
import { join } from 'path';

export const createDirIfNotExists = async (dirPath) => {
	try {
		await access(dirPath);
		return "Directory already exists.";
	} catch (err) {
		await mkdir(dirPath, { recursive: true });
		return "Directory created successfully.";
	}
};

export const createFileWithMessage = async (message) => {
	try {
		const now = new Date();
		const dirName = `${now.getFullYear()}-${
			now.getMonth() + 1
		}-${now.getDate()}`;
		const fileName = `${now.getHours()}-${now.getMinutes()}-${now.getSeconds()}.txt`;

		await createDirIfNotExists(dirName);
		const filePath = join(dirName, fileName);
        console.log(filePath);
		await appendFile(filePath, message);
		// console.log(`File created at ${filePath}`);
	} catch (err) {
		console.error("Error creating file: " + err.message);
	}
};

export const deleteFileByName = async (filePath) => {
    try {
        await access(filePath);
        await unlink(filePath);
        console.log("File deleted successfully.");
    } catch (err) {
        console.error("Error deleting file: " + err.message);
    };
}


const command = process.argv[2];
const argument = process.argv[3];

console.log(command, argument);

if(command === "create" && argument) {
    createFileWithMessage(argument);
} else if(command === "delete" && argument) {
    deleteFileByName(argument);
} else {
    console.log("Invalid command. Use 'create <message>' or 'delete <filePath>'.");
}