import { useState } from "react";

const BedtimeStoryGenerator = () => {
	const [darkMode, setDarkMode] = useState(false);
	const [activeTab, setActiveTab] = useState("generate");
	const [formData, setFormData] = useState({
		childName: "Emma",
		age: "8",
		interests: "space",
		moralLesson: "kindness",
		storyLength: "long",
	});
	const [generatedStory, setGeneratedStory] = useState(
		"Once upon a time, there was a brave 8-year-old named Emma who loved space. One day, while exploring the forest, Emma encountered a magical creature who taught them an important lesson about kindness. From that day forward, Emma always remembered to kindness and lived happily ever after."
	);
	const [savedStories, setSavedStories] = useState([]);
	const [isGenerating, setIsGenerating] = useState(false);

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const generateStory = (e) => {
		e.preventDefault();
		setIsGenerating(true);

		// Simulate API call
		setTimeout(() => {
			const sampleStory = `Once upon a time, there was a brave ${
				formData.age
			}-year-old named ${formData.childName} who loved ${
				formData.interests
			}. One day, while exploring the forest, ${
				formData.childName
			} encountered a magical creature who taught them an important lesson about ${
				formData.moralLesson
			}. From that day forward, ${
				formData.childName
			} always remembered to ${formData.moralLesson.toLowerCase()} and lived happily ever after.`;

			setGeneratedStory(sampleStory);
			setIsGenerating(false);
		}, 2000);
	};

	const saveStory = () => {
		if (!generatedStory) return;

		const newStory = {
			id: Date.now(),
			title: `${formData.childName}'s ${formData.moralLesson} Adventure`,
			content: generatedStory,
			date: new Date().toLocaleDateString(),
			childName: formData.childName,
		};

		setSavedStories((prev) => [...prev, newStory]);
		alert("Story saved to your library!");
	};

	return (
		<div
			className={`min-h-screen transition-colors duration-300 ${
				darkMode
					? "bg-gray-900 text-gray-100"
					: "bg-amber-50 text-gray-800"
			}`}
		>
			<div className="container mx-auto px-4 py-8">
				{/* Header */}
				<header className="flex justify-between items-center mb-8">
					<div className="flex items-center">
						<div className="w-8 h-8 rounded-full bg-purple-600 mr-2"></div>
						<h1 className="text-2xl md:text-3xl font-bold">
							DreamyTales
						</h1>
					</div>
					<button
						onClick={() => setDarkMode(!darkMode)}
						className={`p-2 rounded-full ${
							darkMode
								? "bg-gray-800 text-yellow-300"
								: "bg-amber-200 text-gray-800"
						}`}
						aria-label="Toggle dark mode"
					>
						<div
							className={`w-5 h-5 rounded-full ${
								darkMode ? "bg-yellow-300" : "bg-gray-800"
							}`}
						></div>
					</button>
				</header>

				{/* Main Content */}
				<main className="max-w-4xl mx-auto">
					{/* Tabs */}
					<div className="flex border-b mb-6 overflow-x-auto">
						<button
							onClick={() => setActiveTab("generate")}
							className={`px-4 py-2 font-medium whitespace-nowrap ${
								activeTab === "generate"
									? darkMode
										? "border-b-2 border-purple-500 text-purple-400"
										: "border-b-2 border-purple-600 text-purple-700"
									: ""
							}`}
						>
							Generate Story
						</button>
						<button
							onClick={() => setActiveTab("library")}
							className={`px-4 py-2 font-medium whitespace-nowrap ${
								activeTab === "library"
									? darkMode
										? "border-b-2 border-purple-500 text-purple-400"
										: "border-b-2 border-purple-600 text-purple-700"
									: ""
							}`}
						>
							Story Library
						</button>
					</div>

					{/* Generate Tab */}
					{activeTab === "generate" && (
						<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
							<div
								className={`p-4 sm:p-6 rounded-lg ${
									darkMode
										? "bg-gray-800"
										: "bg-white shadow-md"
								}`}
							>
								<h2 className="text-xl font-bold mb-4">
									Create Your Story
								</h2>
								<form onSubmit={generateStory}>
									<div className="mb-4">
										<label className="block mb-2 font-medium">
											Child's Name
										</label>
										<input
											type="text"
											name="childName"
											value={formData.childName}
											onChange={handleInputChange}
											className={`w-full p-2 rounded border ${
												darkMode
													? "bg-gray-700 border-gray-600"
													: "bg-amber-50 border-amber-200"
											}`}
											required
										/>
									</div>

									<div className="mb-4">
										<label className="block mb-2 font-medium">
											Age
										</label>
										<input
											type="number"
											name="age"
											min="1"
											max="12"
											value={formData.age}
											onChange={handleInputChange}
											className={`w-full p-2 rounded border ${
												darkMode
													? "bg-gray-700 border-gray-600"
													: "bg-amber-50 border-amber-200"
											}`}
											required
										/>
									</div>

									<div className="mb-4">
										<label className="block mb-2 font-medium">
											Interests (e.g., dinosaurs,
											princesses, space)
										</label>
										<input
											type="text"
											name="interests"
											value={formData.interests}
											onChange={handleInputChange}
											className={`w-full p-2 rounded border ${
												darkMode
													? "bg-gray-700 border-gray-600"
													: "bg-amber-50 border-amber-200"
											}`}
											required
										/>
									</div>

									<div className="mb-4">
										<label className="block mb-2 font-medium">
											Moral Lesson (e.g., kindness,
											honesty, bravery)
										</label>
										<input
											type="text"
											name="moralLesson"
											value={formData.moralLesson}
											onChange={handleInputChange}
											className={`w-full p-2 rounded border ${
												darkMode
													? "bg-gray-700 border-gray-600"
													: "bg-amber-50 border-amber-200"
											}`}
											required
										/>
									</div>

									<div className="mb-6">
										<label className="block mb-2 font-medium">
											Story Length
										</label>
										<select
											name="storyLength"
											value={formData.storyLength}
											onChange={handleInputChange}
											className={`w-full p-2 rounded border ${
												darkMode
													? "bg-gray-700 border-gray-600"
													: "bg-amber-50 border-amber-200"
											}`}
										>
											<option value="short">
												Short (1-2 minutes)
											</option>
											<option value="medium">
												Medium (3-5 minutes)
											</option>
											<option value="long">
												Long (5+ minutes)
											</option>
										</select>
									</div>

									<button
										type="submit"
										disabled={isGenerating}
										className={`w-full py-3 px-4 rounded-lg font-bold flex items-center justify-center ${
											isGenerating
												? "bg-purple-400"
												: "bg-purple-600 hover:bg-purple-700"
										} text-white transition-colors`}
									>
										{isGenerating ? (
											<>
												<div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
												Generating...
											</>
										) : (
											"Generate Story"
										)}
									</button>
								</form>
							</div>

							<div
								className={`p-4 sm:p-6 rounded-lg ${
									darkMode
										? "bg-gray-800"
										: "bg-white shadow-md"
								}`}
							>
								<div className="flex justify-between items-center mb-4">
									<h2 className="text-xl font-bold">
										Your Story
									</h2>
									{generatedStory && (
										<button
											onClick={saveStory}
											className={`flex items-center py-1 px-3 rounded ${
												darkMode
													? "bg-purple-700 hover:bg-purple-600"
													: "bg-purple-100 hover:bg-purple-200"
											} transition-colors`}
										>
											<div className="w-4 h-4 rounded-full bg-current mr-1"></div>{" "}
											Save
										</button>
									)}
								</div>

								{generatedStory ? (
									<div
										className={`p-3 sm:p-4 rounded ${
											darkMode
												? "bg-gray-700"
												: "bg-amber-50"
										} whitespace-pre-line`}
									>
										{generatedStory}
									</div>
								) : (
									<div
										className={`p-6 sm:p-8 text-center rounded ${
											darkMode
												? "bg-gray-700 text-gray-400"
												: "bg-amber-100 text-amber-800"
										}`}
									>
										<div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-current opacity-30 mx-auto mb-4"></div>
										<p>
											Your personalized story will appear
											here once generated.
										</p>
									</div>
								)}
							</div>
						</div>
					)}

					{/* Library Tab */}
					{activeTab === "library" && (
						<div
							className={`p-4 sm:p-6 rounded-lg ${
								darkMode ? "bg-gray-800" : "bg-white shadow-md"
							}`}
						>
							<h2 className="text-xl font-bold mb-4">
								Your Saved Stories
							</h2>

							{savedStories.length > 0 ? (
								<div className="space-y-3 sm:space-y-4">
									{savedStories.map((story) => (
										<div
											key={story.id}
											className={`p-3 sm:p-4 rounded-lg ${
												darkMode
													? "bg-gray-700 hover:bg-gray-600"
													: "bg-amber-50 hover:bg-amber-100"
											} transition-colors cursor-pointer`}
										>
											<div className="flex justify-between items-start">
												<div>
													<h3 className="font-bold text-sm sm:text-base">
														{story.title}
													</h3>
													<p className="text-xs sm:text-sm opacity-70">
														Created for{" "}
														{story.childName} on{" "}
														{story.date}
													</p>
												</div>
												<div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-gray-500"></div>
											</div>
											<div className="mt-2 line-clamp-2 text-xs sm:text-sm">
												{story.content.substring(
													0,
													150
												)}
												...
											</div>
										</div>
									))}
								</div>
							) : (
								<div
									className={`p-6 sm:p-8 text-center rounded ${
										darkMode
											? "bg-gray-700 text-gray-400"
											: "bg-amber-100 text-amber-800"
									}`}
								>
									<div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-current opacity-30 mx-auto mb-4"></div>
									<p>You haven't saved any stories yet.</p>
									<p>
										Generate a story and click "Save" to add
										it to your library.
									</p>
								</div>
							)}
						</div>
					)}
				</main>

				{/* Footer */}
				<footer className="mt-8 sm:mt-12 text-center text-xs sm:text-sm opacity-70">
					<p>
						DreamyTales - Magical bedtime stories generated with AI
					</p>
				</footer>
			</div>
		</div>
	);
};

export default BedtimeStoryGenerator;
