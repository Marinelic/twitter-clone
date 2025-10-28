import React, { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import TweetForm from "./components/TweetForm";


 function App() {

  const[tweets, setTweets] =useState([]);

  const handleNewTweet = (tweet) => {
    setTweets([tweet, ...tweets]);
  };


  return (
    <div className="min-h-screen bg-gray-200 text-blue-300">
      <Header />

      <main className="pt-24 flex flex-col items-center px-4">
          <TweetForm onTweet={handleNewTweet} />

        <div className="w-full max-w-2xl bg-white shadow-md rounded-xl p-6">
          <h2 className="text-2xl font-semibold text-blue-600 mb-4">
            Home Feed
          </h2>

          {tweets.length === 0 ? (
            <p className="text-gray-500">
              No tweets yet!
            </p>
          ) : (
            <ul className="space-y-4">
              {tweets.map((tweet) => (
                <li
                  key={tweet.id}
                  className="border-b border-gray-200 pb-3 last:border-none"
                >
                  <p className="font-semibold text-blue-600">
                    {tweet.username}
                  </p>

                  <p>
                    {tweet.content}
                  </p>

                  <span className=" text-sm text-gray-400">
                    {tweet.createAt}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
    </div>
  );
}

export default App
