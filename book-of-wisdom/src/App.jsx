import React from 'react';
import { Routes, Route } from "react-router-dom"
import { useState, useEffect } from 'react';

// lAYOUT COMPONENTS
import Navbar from "./components/Navbar";
import Header from './components/Header';
import Footer from './components/Footer';
//page components
import Home from './pages/Home/Home';
import Quotes from './pages/Quotes/Quotes';
import About from './pages/About/About';

import Reflections from './pages/Reflection/Reflection';
import Login from './pages/Login/Login';
import SignUp from './pages/SignUp/SignUp';


function App() {
   const [username, setUsername] = useState(null);

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);
  const handleLogout = () => {
    localStorage.removeItem("username");
    setUsername(null);
    navigate("/login");
  };

  return (
    
      <div className="App">
        <Header username={username} setUsername={setUsername} />  {/* ✅ Navbar is now inside header */}
        <main>
          <Routes>
            
            <Route path="/" element={<Home />} />
            <Route path="/quotes" element={<Quotes />} />
            <Route path="/about" element={<About />} />
        
           <Route path="/reflections" element={<Reflections />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </main>
        <Footer />
      </div>
    
  );
}

export default App;