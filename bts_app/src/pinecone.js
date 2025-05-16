import { Pinecone } from '@pinecone-database/pinecone';

let pineconeInstance;
let assistantId;

export const initPinecone = async () => {
  pineconeInstance = new Pinecone({
    apiKey: import.meta.env.VITE_PINECONE_KEY || "your-api-key-here"
  });
  
  // Create or retrieve assistant
  const assistants = await pineconeInstance.assistant.list();
  const existingAssistant = assistants.find(a => a.assistant_name === "bedtime-assistant");
  
  assistantId = existingAssistant?.id || (await pineconeInstance.assistant.create({
    assistant_name: "bedtime-assistant",
    instructions: "Generate children's bedtime stories with morals...",
    timeout: 30
  })).id;

  return { pineconeInstance, assistantId };
};