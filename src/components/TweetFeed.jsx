import React, { useState } from "react";

    function TweetFeed({ tweets = [], onDelete, onToggleLike }) {
      return (
          <div>
            {tweets.length === 0 ? (
                <p className="text-pink-600 text-center">No tweets yet!</p>
            ) : (
                tweets.map((tweet) => 
                      <Tweet 
                          key={tweet.id} 
                          tweet={tweet} 
                          onDelete={onDelete} 
                          onToggleLike={onToggleLike} />)
                  )}
            </div>
        );
      }

      // Helper to format "time ago"
      function timeAgo (input) {
          const d = input?.createAt
            ? new Date(input.createAt)
              : input?.createAt
                ? new Date(input.createAt)
                  : null; 

           if (!d || isNaN(d.getTime())) return "";
           
           const sec = Math.floor((Date.now() - d.getTime()) / 1000);
              if (sec < 60) return `${sec}s`;
              const min = Math.floor(sec / 60);
              if (min < 60) return `${min}m`;
              const hr = Math.floor(min / 60);
              if (hr < 24) return `${hr}h`;
              const day = Math.floor(hr / 24);
              if (day < 7) return `${day}d`;
              
              return d.toLocaleDateString();
      }


      function Tweet({ tweet, onDelete, onToggleLike }) {
        const likes = tweet.likes ?? 0;     
        const liked = Boolean(tweet.liked); 

        const displayName = tweet.displayName || tweet.userName || "User";
        const handle = tweet.handle || (displayName || "user").toLowerCase().replace(/\s+/g, "");
        const avatarUrl =
          tweet.avatarUrl ||
          `https://api.dicebear.com/7.x/thumbs/svg?seed=${encodeURIComponent(
            displayName
          )}&backgroundType=gradientLinear`;

      return (
    <div className="border-b border-gray-200 py-4">
      {/* top row: avatar + name/handle + time */}
      <div className="flex gap-3">
        {/* avatar */}
        <img
          src={avatarUrl}
          alt={`${displayName} avatar`}
          className="w-10 h-10 rounded-xl shrink-0"
        />

        {/* name/handle/content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 text-sm">
            <span className="font-semibold text-gray-900 truncate">
              {displayName}
            </span>
            <span className="text-gray-500 truncate">@{handle}</span>
            <span className="text-gray-400">·</span>
            <span className="text-gray-500">{timeAgo(tweet)}</span>
          </div>

          <p className="text-gray-800 whitespace-pre-wrap mt-1 break-words">
            {tweet.content}
          </p>

          {/* actions */}
          <div className="flex items-center gap-6 mt-3 text-sm">
            <button
              onClick={() => onToggleLike(tweet.id)}
              className={`flex items-center gap-1 ${
                liked ? "text-red-500" : "text-gray-500 hover:text-red-500"
              } transition`}
            >
              <span>❤️</span>
              <span>{likes}</span>
            </button>

            <button
              onClick={() => onDelete(tweet.id)}
              className="text-gray-400 hover:text-red-500 transition"
              title="Delete tweet"
            >
              🗑️
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

    export default TweetFeed;
