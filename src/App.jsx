import React, { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import TweetForm from "./components/TweetForm";
import TweetFeed from "./components/TweetFeed";

    const API_URL = "https://68ffb048e02b16d1753ef66c.mockapi.io/tweet";

 function App() {
    const[tweets, setTweets] =useState([]);
    const [loading, setLoading] = useState(true);


     // Fetch tweets when app loads
      useEffect (() => {
          const fetchTweets = async () => {
            try {
              const res = await fetch(API_URL);
              const data = await res.json();
              console.log("Fetched data:", data);

              // sort newest first
              setTweets(data.reverse());
            } catch (error) {
              console.error("Error fetching tweets:", error);
            } finally {
              setLoading(false);
            }
          };
            fetchTweets();
      }, []);


        // Add new tweet (POST)
        const handleNewTweet = async (tweet) => {
          try {
            const res = await fetch(API_URL, {
              method: "POST",
              headers: { "Content-Type" : "application/json" },
              body: JSON.stringify(tweet),
            });
              const newTweet = await res.json();
              setTweets([newTweet, ...tweets]);
          } catch (error) {
            console.error("Error adding tweet:", error);
          }
        };


         // Delete tweet (DELETE)
          const handleDeleteTweet = async (id) => {
            try {
              await fetch(`${API_URL}/${id}`, { method: "DELETE" });
              setTweets (tweets.filter((tweet) => tweet.id !==id));
            } catch (error) {
              console.error("Error deleting tweet:", error);
            }
          };

  return (
    <div className="min-h-screen bg-gray-200 text-blue-400">
      <Header />

      <main className="pt-24 flex flex-col items-center px-4">
          <TweetForm onTweet={handleNewTweet} />

        <div className="w-full max-w-2xl bg-white shadow-md rounded-xl p-6">
          <h2 className="text-2xl font-semibold text-blue-600 mb-4">
            Home Feed
          </h2>

          <TweetFeed tweets={tweets} onDelete={handleDeleteTweet} />
        </div>
      </main>
    </div>
  );
}

export default App
