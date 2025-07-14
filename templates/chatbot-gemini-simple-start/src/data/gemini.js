const API_URL = import.meta.env.VITE_API_URL;
if (!API_URL) throw new Error('API URL is required, are you missing a .env file?');
const baseURL = `${API_URL}/chat`;

const createChat = async body => {};

const getChatHistory = async chatId => {};

export { createChat, getChatHistory };
