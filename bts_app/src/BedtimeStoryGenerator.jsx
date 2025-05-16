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
					? "bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100"
					: "bg-gradient-to-br from-amber-50 to-amber-100 text-gray-800"
			}`}
		>
			{/* Stylistic elements */}
			<div
				className={`fixed top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-pink-500 z-50`}
			></div>
			<div
				className={`absolute top-20 right-10 w-40 h-40 rounded-full blur-xl opacity-20 ${
					darkMode ? "bg-purple-600" : "bg-amber-300"
				}`}
			></div>
			<div
				className={`absolute bottom-10 left-10 w-60 h-60 rounded-full blur-xl opacity-20 ${
					darkMode ? "bg-blue-600" : "bg-amber-200"
				}`}
			></div>

			<div className="container mx-auto px-4 py-8 relative z-10">
				{/* Header */}
				<header className="flex justify-between items-center mb-8">
					<div className="flex items-center">
						<div className="w-10 h-10 rounded-lg bg-gradient-to-r from-purple-600 to-pink-500 shadow-lg flex items-center justify-center mr-3">
							<span className="text-white font-bold text-xl">
								DT
							</span>
						</div>
						<h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
							DreamyTales
						</h1>
					</div>
					<button
						onClick={() => setDarkMode(!darkMode)}
						className={`p-2 rounded-full transition-all duration-300 ${
							darkMode
								? "bg-gray-800 text-yellow-300 shadow-lg"
								: "bg-white text-gray-800 shadow-md"
						}`}
						aria-label="Toggle dark mode"
					>
						<div
							className={`w-5 h-5 rounded-full transition-all duration-300 ${
								darkMode ? "bg-yellow-300" : "bg-gray-800"
							}`}
						></div>
					</button>
				</header>

				{/* Main Content */}
				<main className="max-w-5xl mx-auto backdrop-blur-sm bg-opacity-80 rounded-2xl overflow-hidden">
					{/* Tabs */}
					<div className="flex border-b border-gray-200 dark:border-gray-700 overflow-x-auto">
						<button
							onClick={() => setActiveTab("generate")}
							className={`px-6 py-3 font-medium whitespace-nowrap relative ${
								activeTab === "generate"
									? "text-purple-600 dark:text-purple-400"
									: "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
							}`}
						>
							Generate Story
							{activeTab === "generate" && (
								<span className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-pink-500"></span>
							)}
						</button>
						<button
							onClick={() => setActiveTab("library")}
							className={`px-6 py-3 font-medium whitespace-nowrap relative ${
								activeTab === "library"
									? "text-purple-600 dark:text-purple-400"
									: "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
							}`}
						>
							Story Library
							{activeTab === "library" && (
								<span className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-pink-500"></span>
							)}
						</button>
					</div>

					{/* Generate Tab */}
					{activeTab === "generate" && (
						<div className="grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-6 p-6">
							<div
								className={`p-6 rounded-xl ${
									darkMode
										? "bg-gray-800/80 backdrop-blur-sm"
										: "bg-white/90 backdrop-blur-sm"
								} shadow-lg`}
							>
								<h2 className="text-xl font-bold mb-6 flex items-center">
									<span className="w-3 h-3 rounded-full bg-pink-500 mr-2"></span>
									Create Your Story
								</h2>
								<form
									onSubmit={generateStory}
									className="space-y-5"
								>
									<div>
										<label className="block mb-2 font-medium text-sm uppercase tracking-wider text-gray-500 dark:text-gray-400">
											Child's Name
										</label>
										<input
											type="text"
											name="childName"
											value={formData.childName}
											onChange={handleInputChange}
											className={`w-full p-3 rounded-lg border-0 ${
												darkMode
													? "bg-gray-700/50 focus:ring-purple-500"
													: "bg-gray-50 focus:ring-pink-300"
											} focus:ring-2 focus:outline-none transition-all`}
											required
										/>
									</div>

									<div className="grid grid-cols-2 gap-4">
										<div>
											<label className="block mb-2 font-medium text-sm uppercase tracking-wider text-gray-500 dark:text-gray-400">
												Age
											</label>
											<input
												type="number"
												name="age"
												min="1"
												max="12"
												value={formData.age}
												onChange={handleInputChange}
												className={`w-full p-3 rounded-lg border-0 ${
													darkMode
														? "bg-gray-700/50 focus:ring-purple-500"
														: "bg-gray-50 focus:ring-pink-300"
												} focus:ring-2 focus:outline-none transition-all`}
												required
											/>
										</div>
										<div>
											<label className="block mb-2 font-medium text-sm uppercase tracking-wider text-gray-500 dark:text-gray-400">
												Story Length
											</label>
											<select
												name="storyLength"
												value={formData.storyLength}
												onChange={handleInputChange}
												className={`w-full p-3 rounded-lg border-0 ${
													darkMode
														? "bg-gray-700/50 focus:ring-purple-500"
														: "bg-gray-50 focus:ring-pink-300"
												} focus:ring-2 focus:outline-none transition-all`}
											>
												<option value="short">
													Short (1-2 min)
												</option>
												<option value="medium">
													Medium (3-5 min)
												</option>
												<option value="long">
													Long (5+ min)
												</option>
											</select>
										</div>
									</div>

									<div>
										<label className="block mb-2 font-medium text-sm uppercase tracking-wider text-gray-500 dark:text-gray-400">
											Interests
										</label>
										<input
											type="text"
											name="interests"
											value={formData.interests}
											onChange={handleInputChange}
											className={`w-full p-3 rounded-lg border-0 ${
												darkMode
													? "bg-gray-700/50 focus:ring-purple-500"
													: "bg-gray-50 focus:ring-pink-300"
											} focus:ring-2 focus:outline-none transition-all`}
											placeholder="dinosaurs, princesses, space..."
											required
										/>
									</div>

									<div>
										<label className="block mb-2 font-medium text-sm uppercase tracking-wider text-gray-500 dark:text-gray-400">
											Moral Lesson
										</label>
										<input
											type="text"
											name="moralLesson"
											value={formData.moralLesson}
											onChange={handleInputChange}
											className={`w-full p-3 rounded-lg border-0 ${
												darkMode
													? "bg-gray-700/50 focus:ring-purple-500"
													: "bg-gray-50 focus:ring-pink-300"
											} focus:ring-2 focus:outline-none transition-all`}
											placeholder="kindness, honesty, bravery..."
											required
										/>
									</div>

									<button
										type="submit"
										disabled={isGenerating}
										className={`w-full py-4 px-6 rounded-xl font-bold flex items-center justify-center transition-all duration-300 ${
											isGenerating
												? "bg-purple-400"
												: "bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 shadow-lg hover:shadow-xl"
										} text-white`}
									>
										{isGenerating ? (
											<>
												<div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
												Generating Magic...
											</>
										) : (
											<>
												<span className="mr-2">✨</span>{" "}
												Generate Story
											</>
										)}
									</button>
								</form>
							</div>

							<div
								className={`p-6 rounded-xl ${
									darkMode
										? "bg-gray-800/80 backdrop-blur-sm"
										: "bg-white/90 backdrop-blur-sm"
								} shadow-lg mt-6 lg:mt-0`}
							>
								<div className="flex justify-between items-center mb-6">
									<h2 className="text-xl font-bold flex items-center">
										<span className="w-3 h-3 rounded-full bg-purple-500 mr-2"></span>
										Your Story
									</h2>
									{generatedStory && (
										<button
											onClick={saveStory}
											className={`flex items-center py-2 px-4 rounded-lg transition-all ${
												darkMode
													? "bg-gray-700 hover:bg-gray-600"
													: "bg-gray-100 hover:bg-gray-200"
											} shadow-sm`}
										>
											<span className="mr-2">💾</span>{" "}
											Save
										</button>
									)}
								</div>

								{generatedStory ? (
									<div
										className={`p-5 rounded-lg ${
											darkMode
												? "bg-gray-700/50"
												: "bg-gray-50"
										} transition-all`}
									>
										<div className="prose dark:prose-invert max-w-none">
											<p className="text-lg leading-relaxed">
												{generatedStory}
											</p>
										</div>
									</div>
								) : (
									<div
										className={`p-8 text-center rounded-lg ${
											darkMode
												? "bg-gray-700/50 text-gray-400"
												: "bg-gray-100 text-gray-600"
										} transition-all`}
									>
										<div className="text-5xl mb-4">📖</div>
										<p className="font-medium">
											Your personalized story will appear
											here
										</p>
										<p className="text-sm mt-2">
											Fill out the form and click
											"Generate Story"
										</p>
									</div>
								)}
							</div>
						</div>
					)}

					{/* Library Tab */}
					{activeTab === "library" && (
						<div
							className={`p-6 rounded-xl ${
								darkMode
									? "bg-gray-800/80 backdrop-blur-sm"
									: "bg-white/90 backdrop-blur-sm"
							} shadow-lg`}
						>
							<h2 className="text-xl font-bold mb-6 flex items-center">
								<span className="w-3 h-3 rounded-full bg-blue-500 mr-2"></span>
								Your Saved Stories
							</h2>

							{savedStories.length > 0 ? (
								<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
									{savedStories.map((story) => (
										<div
											key={story.id}
											className={`p-5 rounded-lg transition-all ${
												darkMode
													? "bg-gray-700/50 hover:bg-gray-700"
													: "bg-gray-100 hover:bg-gray-200"
											} cursor-pointer shadow-sm`}
										>
											<div className="flex justify-between items-start">
												<div>
													<h3 className="font-bold text-lg">
														{story.title}
													</h3>
													<p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
														For {story.childName} •{" "}
														{story.date}
													</p>
												</div>
												<div className="text-2xl">
													📚
												</div>
											</div>
											<div className="mt-3 line-clamp-3 text-gray-700 dark:text-gray-300">
												{story.content.substring(
													0,
													200
												)}
												...
											</div>
											<button className="mt-3 text-sm text-purple-600 dark:text-purple-400 hover:underline">
												Read full story →
											</button>
										</div>
									))}
								</div>
							) : (
								<div
									className={`p-8 text-center rounded-lg ${
										darkMode
											? "bg-gray-700/50 text-gray-400"
											: "bg-gray-100 text-gray-600"
									} transition-all`}
								>
									<div className="text-5xl mb-4">📚</div>
									<p className="font-medium">
										Your story library is empty
									</p>
									<p className="text-sm mt-2">
										Generate and save stories to find them
										here
									</p>
								</div>
							)}
						</div>
					)}
				</main>

				{/* Footer */}
				<footer className="mt-12 text-center text-sm text-gray-500 dark:text-gray-400">
					<p>DreamyTales ✨ Magical AI-powered bedtime stories</p>
				</footer>
			</div>
		</div>
	);
};

export default BedtimeStoryGenerator;
