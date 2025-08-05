import React from 'react';
import './About.css'; 
import aboutImage from '../../assets/about.jpg'; // Adjust the path as necessary

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
            Book of Wisdom is a heartfelt space where inspiration meets reflection.
It’s a personal corner of the web designed to capture beautiful words, timeless quotes, and life lessons that inspire growth, motivation, and mindfulness.

Born from my passion for meaningful storytelling and self-growth, this project began as part of my LaunchCode Full-Stack Web Development journey. It combines the creativity of React for the front-end with the power of Java & Spring Boot for the back-end, creating a seamless experience for anyone who loves collecting and revisiting wisdom.

Whether you’re here to save a quote that touched your heart, reflect on a personal moment, or discover new daily inspiration, Book of Wisdom is meant to be a cozy space just for you.
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
