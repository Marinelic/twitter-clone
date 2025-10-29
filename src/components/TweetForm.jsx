import { useState } from "react";

function TweetForm ({onTweet}) {
    const [content, setContent] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!content.trim()) return;

        const newTweet = {
            username: "Marinela",
            content,
            createAt: new Date().toLocaleString(),
            likes: 0,
            liked: false,
        };

        onTweet(newTweet);
        setContent("");
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white shadow-md rounded-xl p-4 mb-6 w-full max-w-md"
        > 
            <textarea 
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="What is happening?"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-400 resize-none"
                rows="3"
            />

            <button
                type="submit"
                className=" mt-3 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
            >
                Tweet
            </button>
        </form>
    );
}

export default TweetForm;