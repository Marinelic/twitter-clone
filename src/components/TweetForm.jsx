import { useState } from "react";

function TweetForm ({onTweet}) {
    const [content, setContent] = useState("");

    // Avatar URL based on the name
    const makeAvatar = (name) =>
         `https://api.dicebear.com/7.x/thumbs/svg?seed=${encodeURIComponent(name)}&backgroundType=gradientLinear`;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!content.trim()) return;

        const displayName = "Marinela";
        const handle = "marinela";

        const newTweet = {
            displayName,
            handle,
            userName: displayName,
            content,
            createAt: new Date().toISOString(),
            createAt: new Date().toISOString(),
            avatarUrl: makeAvatar(displayName),
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