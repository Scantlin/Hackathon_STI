import { useState } from "react";

export const useStoryGenerator = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	const generateStory = async (formData) => {
		setIsLoading(true);
		setError(null);

		try {
			const response = await fetch(
				"http://localhost:3001/api/generate-story",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(formData),
					credentials: "include", // If you need cookies/auth
				}
			);

			if (!response.ok) {
				throw new Error("Failed to generate story");
			}

			const data = await response.json();
			return data.story;
		} catch (err) {
			setError(err.message);
			return null;
		} finally {
			setIsLoading(false);
		}
	};

	return { generateStory, isLoading, error };
};
