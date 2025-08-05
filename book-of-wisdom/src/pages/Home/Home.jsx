import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import { API_BASE_URL } from '../../api';

function Home() {
  const [quote, setQuote] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/gemini/quote`)
      .then((res) => res.text()) // backend returns plain text
      .then((data) => {
        setQuote(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching quote:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="page-container home-page">
      <h1>Welcome to Book of Wisdom</h1>

      <p className="intro-text">
        This is your peaceful space to reflect, collect, and grow through the wisdom of words.
      </p>

      <div className="quote-of-day">
        <h3>Quote of the Day</h3>
        {loading ? (
          <p>Loading your inspiration...</p>
        ) : (
          <blockquote>
            “{quote}”
          </blockquote>
        )}
      </div>

      <Link to="/quotes">
        <button className="view-quotes-btn">View All Quotes</button>
      </Link>
    </div>
  );
}

export default Home;
