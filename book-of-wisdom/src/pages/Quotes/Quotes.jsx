import React, { useState, useEffect } from 'react';
import Form from '../../components/Form';
import Item from '../../components/Item';
import './Quotes.css';

import lifeImg from '../../assets/life.jpg';
import growthImg from '../../assets/growth.jpg';
import motivationImg from '../../assets/motivation.jpg';

import { API_BASE_URL } from '../../api';

function Quotes() {
  const [quotes, setQuotes] = useState([]);
  const [filter, setFilter] = useState('All');
  const [showMyQuotes, setShowMyQuotes] = useState(false);

  const username = localStorage.getItem('username');

  // ✅ Fetch quotes from backend
  useEffect(() => {
    const url = showMyQuotes
      ? `${API_BASE_URL}/api/entries/user/${username}`
      : `${API_BASE_URL}/api/entries`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => setQuotes(data))
      .catch((err) => console.error(err));
  }, [showMyQuotes, username]);

  // ✅ Add new quote
  const handleAddQuote = (quote) => {
    fetch(`${API_BASE_URL}/api/entries`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        content: quote.content,
        category: quote.category,
        favorite: false,
        date: new Date().toISOString().split("T")[0],
        user: { username }
      })
    })
      .then((res) => res.json())
      .then((newQuote) => setQuotes([newQuote, ...quotes]))
      .catch((err) => console.error("Error adding quote:", err));
  };

  // ✅ Delete quote
  const handleDelete = (id) => {
    fetch(`${API_BASE_URL}/api/entries/${id}`, {
      method: 'DELETE'
    })
      .then(() => setQuotes(quotes.filter((q) => q.id !== id)))
      .catch((err) => console.error(err));
  };

  // ✅ Toggle favorite
  const handleToggleFavorite = (id) => {
    setQuotes(
      quotes.map((q) =>
        q.id === id ? { ...q, favorite: !q.favorite } : q
      )
    );
  };

  // ✅ Apply category filter
  const filteredQuotes =
    filter === 'All'
      ? quotes
      : quotes.filter((q) => q.category === filter);

  return (
    <div className="quotes-page">
      {/* Images */}
      <div className="quote-image-row">
        <div className="quote-image-card" onClick={() => setFilter("Life")}>
          <img src={lifeImg} alt="Life" />
          <p>Life</p>
        </div>
        <div className="quote-image-card" onClick={() => setFilter("Growth")}>
          <img src={growthImg} alt="Growth" />
          <p>Growth</p>
        </div>
        <div className="quote-image-card" onClick={() => setFilter("Motivation")}>
          <img src={motivationImg} alt="Motivation" />
          <p>Motivation</p>
        </div>
      </div>

      <h2>{showMyQuotes ? 'My Quotes' : 'All Quotes'}</h2>

      {/* Filter Buttons */}
      <div className="filter-buttons">
        {['All', 'Life', 'Growth', 'Motivation'].map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={filter === cat ? 'active' : ''}
          >
            {cat}
          </button>
        ))}
        {username && (
          <button
            onClick={() => setShowMyQuotes(!showMyQuotes)}
            className={showMyQuotes ? 'active' : ''}
          >
            {showMyQuotes ? 'Show All Quotes' : 'Show My Quotes'}
          </button>
        )}
      </div>

      {/* Add Form */}
      {username && (
        <section className="quote-form">
          <h3>Add a New Quote</h3>
          <Form onAddQuote={handleAddQuote} />
        </section>
      )}

      {/* Quote List */}
      <section className="quote-list">
        {filteredQuotes.length === 0 ? (
          <p>No quotes in this category yet.</p>
        ) : (
          filteredQuotes.map((quote) => (
            <Item
              key={quote.id}
              quote={quote}
              onDelete={handleDelete}
              onToggleFavorite={handleToggleFavorite}
            />
          ))
        )}
      </section>
    </div>
  );
}

export default Quotes;
