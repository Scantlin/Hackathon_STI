import { useState } from "react";
import { useStoryGenerator } from "./useStoryGenerator";

const BedtimeStoryGenerator = () => {
	const [activeTab, setActiveTab] = useState("generate");
	const [formData, setFormData] = useState({
		childName: "",
		age: "",
		interests: "",
		moralLesson: "",
		storyLength: "medium",
	});
	const [generatedStory, setGeneratedStory] = useState("");
	const [savedStories, setSavedStories] = useState([]);

	const {
		generateStory: generateStoryAI,
		isLoading: isGenerating,
		error,
	} = useStoryGenerator();

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleGenerate = async (e) => {
		e.preventDefault();
		const story = await generateStoryAI(formData);
		if (story) setGeneratedStory(story);
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
		alert("Story saved successfully!");
	};

	return (
		<div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-50 text-gray-800 font-sans">
			{/* Decorative elements */}
			<div className="fixed top-0 left-0 w-full h-4 bg-stripes bg-repeat-x bg-contain opacity-20 z-0"></div>
			<div className="fixed bottom-0 right-0 w-64 h-64 bg-yellow-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
			<div className="fixed top-0 left-0 w-64 h-64 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>

			<div className="container mx-auto px-4 py-8 relative z-10">
				<header className="flex justify-between items-center mb-8">
					<div className="flex items-center">
						<div className="w-12 h-12 rounded-full bg-yellow-300 shadow-md flex items-center justify-center mr-3 border-4 border-white">
							<span className="text-2xl">📖</span>
						</div>
						<h1 className="text-3xl font-bold text-indigo-800 font-serif">
							Storyland
							<span className="text-yellow-500 ml-1">✨</span>
						</h1>
					</div>
					<div className="flex items-center space-x-2">
						<button className="p-2 rounded-full bg-white shadow-sm hover:shadow-md transition-shadow">
							<span className="text-xl">🧸</span>
						</button>
						<button className="p-2 rounded-full bg-white shadow-sm hover:shadow-md transition-shadow">
							<span className="text-xl">🎨</span>
						</button>
					</div>
				</header>

				<main className="max-w-5xl mx-auto">
					{/* Tab buttons styled like storybook tabs */}
					<div className="flex mb-6">
						<button
							onClick={() => setActiveTab("generate")}
							className={`px-6 py-3 font-medium rounded-t-lg border-b-4 transition-all ${
								activeTab === "generate"
									? "border-yellow-400 bg-white text-indigo-800 shadow-md"
									: "border-transparent bg-indigo-50 text-indigo-600 hover:bg-indigo-100"
							}`}
						>
							<span className="mr-2">✨</span> Create Story
						</button>
						<button
							onClick={() => setActiveTab("library")}
							className={`px-6 py-3 font-medium rounded-t-lg border-b-4 transition-all ${
								activeTab === "library"
									? "border-yellow-400 bg-white text-indigo-800 shadow-md"
									: "border-transparent bg-indigo-50 text-indigo-600 hover:bg-indigo-100"
							}`}
						>
							<span className="mr-2">📚</span> My Storybooks
						</button>
					</div>

					{activeTab === "generate" && (
						<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
							{/* Form panel - styled like a storybook page */}
							<div className="bg-white rounded-xl shadow-lg p-6 border-4 border-indigo-100 relative overflow-hidden">
								<div className="absolute top-0 right-0 w-16 h-16 bg-yellow-200 rounded-bl-full"></div>
								<h2 className="text-2xl font-bold mb-6 text-indigo-800 font-serif flex items-center">
									<span className="mr-2">✏️</span> Tell Me
									About...
								</h2>
								<form
									onSubmit={handleGenerate}
									className="space-y-5"
								>
									<div>
										<label className="block mb-2 font-medium text-indigo-600">
											Your Name
										</label>
										<div className="relative">
											<input
												type="text"
												name="childName"
												value={formData.childName}
												onChange={handleInputChange}
												className="w-full p-3 rounded-lg border-2 border-indigo-100 focus:border-yellow-300 focus:ring-0 bg-indigo-50 placeholder-indigo-300 transition-all"
												placeholder="What's your name?"
												required
											/>
											<div className="absolute right-3 top-3 text-indigo-300">
												👧
											</div>
										</div>
									</div>

									<div className="grid grid-cols-2 gap-4">
										<div>
											<label className="block mb-2 font-medium text-indigo-600">
												Your Age
											</label>
											<div className="relative">
												<input
													type="number"
													name="age"
													min="1"
													max="12"
													value={formData.age}
													onChange={handleInputChange}
													className="w-full p-3 rounded-lg border-2 border-indigo-100 focus:border-yellow-300 focus:ring-0 bg-indigo-50 placeholder-indigo-300 transition-all"
													placeholder="How old are you?"
													required
												/>
												<div className="absolute right-3 top-3 text-indigo-300">
													🎂
												</div>
											</div>
										</div>
										<div>
											<label className="block mb-2 font-medium text-indigo-600">
												Story Length
											</label>
											<select
												name="storyLength"
												value={formData.storyLength}
												onChange={handleInputChange}
												className="w-full p-3 rounded-lg border-2 border-indigo-100 focus:border-yellow-300 focus:ring-0 bg-indigo-50 appearance-none"
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
										<label className="block mb-2 font-medium text-indigo-600">
											What do you love?
										</label>
										<div className="relative">
											<input
												type="text"
												name="interests"
												value={formData.interests}
												onChange={handleInputChange}
												className="w-full p-3 rounded-lg border-2 border-indigo-100 focus:border-yellow-300 focus:ring-0 bg-indigo-50 placeholder-indigo-300 transition-all"
												placeholder="Dragons? Unicorns? Space?"
												required
											/>
											<div className="absolute right-3 top-3 text-indigo-300">
												🦄
											</div>
										</div>
									</div>

									<div>
										<label className="block mb-2 font-medium text-indigo-600">
											What should we learn?
										</label>
										<div className="relative">
											<input
												type="text"
												name="moralLesson"
												value={formData.moralLesson}
												onChange={handleInputChange}
												className="w-full p-3 rounded-lg border-2 border-indigo-100 focus:border-yellow-300 focus:ring-0 bg-indigo-50 placeholder-indigo-300 transition-all"
												placeholder="Bravery? Kindness?"
												required
											/>
											<div className="absolute right-3 top-3 text-indigo-300">
												🏆
											</div>
										</div>
									</div>

									<button
										type="submit"
										disabled={isGenerating}
										className={`w-full py-4 px-6 rounded-xl font-bold flex items-center justify-center transition-all duration-300 ${
											isGenerating
												? "bg-indigo-300"
												: "bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 shadow-lg hover:shadow-xl"
										} text-white text-lg`}
									>
										{isGenerating ? (
											<>
												<div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
												Creating Magic...
											</>
										) : (
											<>
												<span className="mr-2">✨</span>{" "}
												Make My Story!
											</>
										)}
									</button>
								</form>
							</div>

							{/* Story display panel - styled like an open book */}
							<div className="bg-white rounded-xl shadow-lg p-6 border-4 border-indigo-100 relative">
								<div className="absolute -left-2 top-1/2 transform -translate-y-1/2 w-2 h-32 bg-indigo-200 rounded-r-lg"></div>
								<div className="flex justify-between items-center mb-6">
									<h2 className="text-2xl font-bold text-indigo-800 font-serif flex items-center">
										<span className="mr-2">📖</span> Your
										Story
									</h2>
									{generatedStory && (
										<button
											onClick={saveStory}
											className="flex items-center py-2 px-4 rounded-lg bg-indigo-100 hover:bg-indigo-200 text-indigo-700 transition-all shadow-sm"
										>
											<span className="mr-2">💾</span>{" "}
											Save
										</button>
									)}
								</div>

								{generatedStory ? (
									<div className="p-5 rounded-lg bg-indigo-50 border-2 border-indigo-100 min-h-64">
										<div className="prose max-w-none font-serif text-lg leading-relaxed">
											<p className="first-letter:text-4xl first-letter:font-bold first-letter:mr-1 first-letter:float-left first-letter:text-indigo-700">
												{generatedStory}
											</p>
										</div>
									</div>
								) : (
									<div className="p-8 text-center rounded-lg bg-indigo-50 border-2 border-dashed border-indigo-200 min-h-64 flex flex-col items-center justify-center">
										<div className="text-6xl mb-4">📖</div>
										<p className="font-medium text-indigo-700">
											Your story will appear here!
										</p>
										<p className="text-indigo-500 mt-2">
											Fill out the form and click "Make My
											Story"
										</p>
									</div>
								)}
							</div>
						</div>
					)}

					{activeTab === "library" && (
						<div className="bg-white rounded-xl shadow-lg p-6 border-4 border-indigo-100">
							<h2 className="text-2xl font-bold mb-6 text-indigo-800 font-serif flex items-center">
								<span className="mr-2">📚</span> My Storybooks
							</h2>

							{savedStories.length > 0 ? (
								<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
									{savedStories.map((story) => (
										<div
											key={story.id}
											className="p-5 rounded-lg bg-indigo-50 border-2 border-indigo-100 hover:border-yellow-300 cursor-pointer transition-all shadow-sm"
										>
											<div className="flex justify-between items-start">
												<div>
													<h3 className="font-bold text-lg text-indigo-800">
														{story.title}
													</h3>
													<p className="text-sm text-indigo-500 mt-1">
														For {story.childName} •{" "}
														{story.date}
													</p>
												</div>
												<div className="text-3xl">
													📘
												</div>
											</div>
											<div className="mt-3 line-clamp-3 text-indigo-700 font-serif">
												{story.content.substring(
													0,
													200
												)}
												...
											</div>
											<button className="mt-3 text-sm text-indigo-600 hover:text-yellow-500 hover:underline transition-colors">
												Read full story →
											</button>
										</div>
									))}
								</div>
							) : (
								<div className="p-8 text-center rounded-lg bg-indigo-50 border-2 border-dashed border-indigo-200">
									<div className="text-6xl mb-4">📚</div>
									<p className="font-medium text-indigo-700">
										Your story library is empty
									</p>
									<p className="text-indigo-500 mt-2">
										Create and save stories to find them
										here
									</p>
								</div>
							)}
						</div>
					)}

					{error && (
						<div className="p-4 bg-red-100 text-red-700 rounded-lg mt-6 border-2 border-red-200">
							{error}
						</div>
					)}
				</main>

				<footer className="mt-12 text-center text-sm text-indigo-500">
					<p>
						Storyland ✨ Where magical dreams become bedtime stories
						<span className="ml-2">🌙</span>
					</p>
				</footer>
			</div>
		</div>
	);
};

export default BedtimeStoryGenerator;
