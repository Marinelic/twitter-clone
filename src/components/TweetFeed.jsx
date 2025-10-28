import React from "react";

function TweetFeed({ tweets = [], onDelete }) {
  if (tweets.length === 0) {
    return <p className="text-pink-600 text-center">No tweets yet!</p>;
  }

  return (
    <ul className="space-y-4">
      {tweets.map((tweet) => (
        <li
          key={tweet.id}
          className="border-b border-gray-200 pb-3 last:border-none"
        >
          <div>
            <div>
               <p className="font-semibold text-blue-600">{tweet.userName}</p>
               <p className="mt-1">{tweet.content}</p>
                 <span className="text-sm text-gray-400 mt-1 block">
                   {tweet.createdAt}
                 </span>
            </div>

            <button
                onClick={() => onDelete(tweet.id)}
                className="text-red-500 hover:text-red-600 text-sm font-medium ml-2"
                title="Delete tweet"
            >
                🗑️
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default TweetFeed;
