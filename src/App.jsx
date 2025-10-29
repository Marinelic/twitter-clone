import React, { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import TweetForm from "./components/TweetForm";
import TweetFeed from "./components/TweetFeed";

const API_URL = "https://68ffb048e02b16d1753ef66c.mockapi.io/tweet";

function App() {
  const [tweets, setTweets] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch tweets on load
  useEffect(() => {
    const fetchTweets = async () => {
      try {
        const res = await fetch(API_URL);
        const data = await res.json();

        // Ensure array; sort newest first (MockAPI ids are strings)
        const list = Array.isArray(data) ? data : [];
        setTweets(list.sort((a, b) => Number(b.id || 0) - Number(a.id || 0)));
      } catch (error) {
        console.error("Error fetching tweets:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTweets();
  }, []);

  // Create tweet (POST)
  const handleNewTweet = async (tweet) => {
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(tweet),
      });
      const newTweet = await res.json();
      // Use server version (has real id)
      setTweets((prev) => [newTweet, ...prev]);
    } catch (error) {
      console.error("Error adding tweet:", error);
    }
  };

  // Toggle like (PUT) with optimistic update + rollback
  const handleToggleLike = async (id) => {
    const idStr = String(id);

    // 1) Snapshot original (for rollback)
    const original = tweets.find((t) => String(t.id) === idStr);
    if (!original) return;

    // 2) Compute new values
    const newLiked = !Boolean(original.liked);
    const newLikes = (original.likes ?? 0) + (newLiked ? 1 : -1);

    // 3) Optimistically update UI
    setTweets((prev) =>
      prev.map((t) =>
        String(t.id) === idStr ? { ...t, liked: newLiked, likes: newLikes } : t
      )
    );

    try {
      // 4) Persist to API
      const res = await fetch(`${API_URL}/${idStr}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ liked: newLiked, likes: newLikes }),
      });
      const serverTweet = await res.json();

      // 5) Reconcile with server
      setTweets((prev) =>
        prev.map((t) => (String(t.id) === idStr ? serverTweet : t))
      );
    } catch (error) {
      console.error("Error toggling like:", error);
      // 6) Roll back
      setTweets((prev) =>
        prev.map((t) => (String(t.id) === idStr ? original : t))
      );
    }
  };

  // Delete tweet (DELETE) — use functional state update
  const handleDeleteTweet = async (id) => {
    const idStr = String(id);
    try {
      await fetch(`${API_URL}/${idStr}`, { method: "DELETE" });
      setTweets((prev) => prev.filter((t) => String(t.id) !== idStr));
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
          <h2 className="text-2xl font-semibold text-blue-600 mb-4">Home Feed</h2>

          {loading ? (
            <p className="text-center text-gray-500">Loading tweets...</p>
          ) : (
            <TweetFeed
              tweets={tweets}
              onDelete={handleDeleteTweet}
              onToggleLike={handleToggleLike}
            />
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
