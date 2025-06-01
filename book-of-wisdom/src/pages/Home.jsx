import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'; // we’ll create this now

function Home() {
  return (
    <div className="page-container home-page">
  <h1>Welcome to Book of Wisdom</h1>
  ...


      <p className="intro-text">
        This is your peaceful space to reflect, collect, and grow through the wisdom of words.
      </p>

      <div className="quote-of-day">
        <h3>Quote of the Day</h3>
        <blockquote>
          “The best time for new beginnings is now.”  
          <footer>– Unknown</footer>
        </blockquote>
      </div>

      <Link to="/quotes">
        <button className="view-quotes-btn">View All Quotes</button>
      </Link>
    </div>
  );
}

export default Home;