from pinecone import Pinecone

pc = Pinecone(api_key="pcsk_6kGHd8_TVAtD3feFZjvohdNBVwmhmarWwMMnmEvtn9sWVmHMjB3LxPn8wY1ryUPnP5wFec")

# Create Assistant
assistant = pc.assistant.create(
    assistant_name="storyteller",
    instructions="Generate children's bedtime stories",
    timeout=30
)

# Generate Response
response = pc.assistant.complete(
    assistant_id=assistant.id,
    prompt="Create a story about...",
    max_tokens=500,
    temperature=0.7
)