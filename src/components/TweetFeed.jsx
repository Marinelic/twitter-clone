import React, { useState } from "react";

    function TweetFeed({ tweets, onDelete, onToggleLike }) {
      return (
          <div>
            {tweets.length === 0 ? (
                <p className="text-pink-600 text-center">No tweets yet!</p>
            ) : (
                tweets.map((tweet) => <Tweet key={tweet.id} tweet={tweet} onDelete={onDelete} onToggleLike={onToggleLike} />)
            )}
          </div>
        );
      }

      function Tweet({ tweet, onDelete, onToggleLike }) {
        const likes = tweet.likes ?? 0;     
        const liked = Boolean(tweet.liked); 

      return (
        <div className="border-b border-yellow-300 py-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-semibold text-gray-800">
                @{tweet.username}
            </h3>

            <span className="text-sm text-gray-500">
                {tweet.createAt}
            </span>
          </div>

          <p className="text-gray-700 mb-3">
              {tweet.content}
          </p>

          <div className="flex items-center gap-2">
              <button
                onClick={() => onToggleLike(tweet.id)}
                className={`flex items-center gap-1 ${liked ? "text-red-500" : "text-gray-500"}`}
              >
                ❤️ {likes}
              </button>

              <button
                onClick={() => onDelete(tweet.id)}
                className="text-gray-400 hover:text-red-500 transition"
              >
                🗑️
              </button>
          </div>
        </div>
      );
    }

    export default TweetFeed;
