import React from "react";

function TweetFeed({ tweets = [] }) {
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
          <p className="font-semibold text-blue-600">{tweet.userName}</p>
          <p className="mt-1">{tweet.content}</p>
          <span className="text-sm text-gray-400 mt-1 block">
            {tweet.createdAt}
          </span>
        </li>
      ))}
    </ul>
  );
}

export default TweetFeed;
