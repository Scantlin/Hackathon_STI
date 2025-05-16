import dotenv from "dotenv";
import express from "express";
import { Pinecone } from "@pinecone-database/pinecone";
import cors from "cors";

dotenv.config();

const app = express();

// Configure CORS properly
const corsOptions = {
	origin: "http://localhost:5173", // Your Vite frontend URL
	optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());

const pc = new Pinecone({
	apiKey: process.env.PINECONE_API_KEY,
});

app.post("/api/generate-story", async (req, res) => {
	try {
		const { childName, age, interests, moralLesson, storyLength } =
			req.body;

		const assistant = await pc.assistant.create({
			assistant_name: "bedtime-story-assistant",
			instructions: `Generate a story for ${age}-year-old ${childName} about ${interests} teaching ${moralLesson}`,
			timeout: 30,
		});

		const response = await pc.assistant.complete({
			assistant_id: assistant.id,
			prompt: `Create a ${storyLength} bedtime story`,
			max_tokens: storyLength === "short" ? 300 : 600,
			temperature: 0.7,
		});

		res.json({ story: response.choices[0].text });
	} catch (error) {
		console.error("Error:", error);
		res.status(500).json({ error: "Failed to generate story" });
	}
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});

// Temporary debug line in server.js
console.log("Loaded API Key:", process.env.PINECONE_API_KEY ? "Yes" : "No");
