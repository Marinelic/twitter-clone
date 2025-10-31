import { useState } from "react";

// Twitter-style limit
const LIMIT = 280;

function TweetForm ({onTweet}) {
    const [content, setContent] = useState("");

   /*  // Avatar URL based on the name
    const makeAvatar = (name) =>
         `https://api.dicebear.com/7.x/thumbs/svg?seed=${encodeURIComponent(name)}&backgroundType=gradientLinear`; */


    // Derived helpers (auto-calculated from content)
    const length = content.length;      // how many characters typed
    const remaining = LIMIT - length;   // how many left
    const isEmty = content.trim().length ===  0;
    const tooLong = remaining < 0;

    // counter color: gray → orange (near) → red (too long)
    const counterColor =
        tooLong ? "text-red-700"
            : remaining <= 20 ? "text-orange-700"
                : "text-blue-800"

    // When typing in the box
    const handleChange = (e) => {
        setContent (e.target.value);
    };

    // When you press "Tweet"
    const handleSubmit = (e) => {
        e.preventDefault();

        // Stop if empty or too long
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
            /* avatarUrl: makeAvatar(displayName), */
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

              <div className="mt-2 flex items-center justify-between">
                {/* live counter */}
                    <span className={`text-sm ${counterColor}`}>
                    {remaining >= 0 ? `${remaining} left` : `${-remaining} over!`}
                    </span>
            

            <button
                type="submit"
                className=" mt-3 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
            >
                Tweet
            </button>
            </div>
        </form>
    );
}

export default TweetForm;