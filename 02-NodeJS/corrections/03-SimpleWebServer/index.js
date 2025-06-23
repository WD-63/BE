import http from 'http';
import { createFileWithMessage, deleteFileByName } from './fileOperations.js';

const requestHandler = async (req, res) => {
	const { method, url } = req;
	const singleFileRegex = /^\/files\/[a-zA-Z0-9-]+\/[a-zA-Z0-9:]+\.txt$/;
	if (url === '/files') {
		if (method === 'POST') {
			let body = '';
			req.on('data', (chunk) => {
				body += chunk.toString();
			});
			req.on('end', async () => {
				let parsedBody;
				try {
					parsedBody = JSON.parse(body);
				} catch (error) {
					// res.writeHead(400, { 'Content-Type': 'application/json' });
					res.statusCode = 400;
					res.setHeader('Content-Type', 'application/json');
					return res.end(JSON.stringify({ error: 'Invalid body' }));
				}
				if (!parsedBody || !parsedBody.message) {
					// res.writeHead(400, { 'Content-Type': 'application/json' });
					res.statusCode = 400;
					res.setHeader('Content-Type', 'application/json');
					return res.end(JSON.stringify({ error: 'Invalid body' }));
				}
				await createFileWithMessage(parsedBody.message);
				res.statusCode = 201;
				res.setHeader('Content-Type', 'application/json');
				return res.end(
					JSON.stringify({ message: 'File created successfully' })
				);
			});
		} else {
			res.statusCode = 405;
			res.setHeader('Content-Type', 'application/json');
			return res.end(JSON.stringify({ error: 'Method not allowed' }));
		}
	} else if (singleFileRegex.test(url)) {
		if (method === 'DELETE') {
            const filePath = url.split('/').slice(2).join('/');
            await deleteFileByName(filePath);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            return res.end(JSON.stringify({ message: 'File deleted successfully' }));
		} else {
			res.statusCode = 405;
			res.setHeader('Content-Type', 'application/json');
			return res.end(JSON.stringify({ error: 'Method not allowed' }));
		}
	} else {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'application/json');
        return res.end(JSON.stringify({ error: 'Not found' }));
	}
};

const server = http.createServer(requestHandler);
const port = 3005;

server.listen(port, () =>
	console.log(`Server is running on http://localhost:${port}`)
);
