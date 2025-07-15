import { GoogleGenAI } from "@google/genai";
import { isValidObjectId } from "mongoose";
import Chat from "../models/Chat.js";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const model = "gemini-2.0-flash";
const systemInstruction = "You are a speaking like a person fom the 1800s";

const createSimpleChat = async (req, res) => {
  const { message } = req.sanitizedBody;

  let history = [
    {
      role: "user",
      parts: [{ text: "Hello" }],
    },
    {
      role: "model",
      parts: [{ text: "Great to meet you. What would you like to know?" }],
    },
  ];

  const chat = ai.chats.create({
    model,
    history,
    config: {
      systemInstruction,
    },
  });

  const aiResponse = await chat.sendMessage({ message });

  history = chat.getHistory();

  res.json({ aiResponse: aiResponse.text });
};

const createChat = async (req, res) => {
  const { message, chatId, stream } = req.sanitizedBody;

  let currentChat = await Chat.findById(chatId);

  if (!currentChat) {
    currentChat = await Chat.create({});
  }

  currentChat.history.push({
    role: "user",
    parts: [{ text: message }],
  });

  const chat = ai.chats.create({
    model,
    history: JSON.parse(JSON.stringify(currentChat.history)),
    config: {
      systemInstruction,
    },
  });

  if (stream) {
    res.writeHead(200, {
      Connection: "keep-alive",
      "Cache-Control": "no-cache",
      "Content-Type": "text/event-stream",
    });

    const aiResponse = await chat.sendMessageStream({ message });

    let fullResponse = "";

    for await (const chunk of aiResponse) {
      fullResponse += chunk.text;
      // console.log(chunk.text);
      // console.log("_".repeat(80));
      const textJson = JSON.stringify({ text: chunk.text });
      res.write(`data: ${textJson}\n\n`);
    }

    const chatIdJson = JSON.stringify({ chatId: currentChat._id });
    res.write(`data: ${chatIdJson}\n\n`);

    currentChat.history.push({
      role: "model",
      parts: [{ text: fullResponse }],
    });

    res.end();

    res.on("close", async () => {
      await currentChat.save();
      res.end();
    });
  } else {
    const aiResponse = await chat.sendMessage({ message });

    currentChat.history.push({
      role: "model",
      parts: [{ text: aiResponse.text }],
    });

    await currentChat.save();

    res.json({ aiResponse: aiResponse.text, chatId: currentChat._id });
  }
};

const getChatHistory = async (req, res) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) throw new Error("Invalid id", { cause: 400 });

  const chat = await Chat.findById(id);

  if (!chat) throw new Error("Chat not found", { cause: 404 });

  res.json(chat);
};

export { createSimpleChat, createChat, getChatHistory };
