import React from 'react';
import './About.css';
import aboutImage from '../assets/about.jpg'; 

function About() {
  return (
    <div className="page-container about-page">
      <h1>About Book of Wisdom</h1>
      <div className="about-content">
        {/* Left: Image */}
        <div className="about-image">
          <img src={aboutImage} alt="Vintage book" />
        </div>

        {/* Right: Text */}
        <div className="about-text">
          <p>
            Book of Wisdom is a cozy space to reflect and save beautiful words, quotes, and life lessons.  
            This project was built with React as part of the LaunchCode front-end unit using components, props, and state.
          </p>
          <p>
            Created with love by Maftuna Avazova 💫
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;
