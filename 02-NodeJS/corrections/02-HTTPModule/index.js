import http from 'http';

const posts = [
	{
		id: '1',
		title: 'First post',
		content: 'Hello world!',
	},
	{
		id: '2',
		title: 'Second post',
		content: 'My second post!',
	},
];

const requestHandler = (req, res) => {
	const { method, url } = req;
    const singlePostRegex = /^\/posts\/[0-9a-zA-Z]+$/;
	if (url === '/posts') {
		if (method === 'GET') {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            return res.end(JSON.stringify(posts));
		}

        if (method === 'POST') {
            let body = '';
            req.on("data", (chunk) => {
                body += chunk.toString();
            })
            req.on("end", () => {
                const newPost = JSON.parse(body);
                newPost.id = (posts.length + 1).toString();
                posts.push(newPost);
                res.statusCode = 201;
                res.setHeader('Content-Type', 'application/json');
                return res.end(JSON.stringify(newPost));
            })
        }
        return res.end('Method not allowed');
	}
    if(singlePostRegex.test(url)) {
        if (method === 'GET') {
            return res.end('Single post details');
        };
        if (method === 'PUT') {
            return res.end('Update post');
        };
        if (method === 'DELETE') {
            return res.end('Delete post');
        };
        return res.end('Method not allowed');
    }
   return res.end('Not Found');
};
const server = http.createServer(requestHandler);

const port = 3002;

server.listen(port, () => console.log(`Server is running on http://localhost:${port}`));
