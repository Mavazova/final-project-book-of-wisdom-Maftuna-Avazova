import React, { useState } from 'react';
import Form from '../components/Form';
import Item from '../components/Item';
import './Quotes.css';

// ✅ Image imports at the top
import lifeImg from '../assets/life.jpg';
import growthImg from '../assets/growth.jpg';
import motivationImg from '../assets/motivation.jpg';

function Quotes() {
  const [quotes, setQuotes] = useState([]);
  const [filter, setFilter] = useState('All');

  const handleAddQuote = (quote) => {
    setQuotes([quote, ...quotes]);
  };

  const handleDelete = (id) => {
    setQuotes(quotes.filter((q) => q.id !== id));
  };

  const handleToggleFavorite = (id) => {
    setQuotes(
      quotes.map((q) =>
        q.id === id ? { ...q, isFavorite: !q.isFavorite } : q
      )
    );
  };

  const filteredQuotes =
    filter === 'All'
      ? quotes
      : quotes.filter((q) => q.category === filter);

  return (
    <div className="quotes-page">

      {/* ✅ Image section goes here */}
      <div className="quote-image-row">
        <div className="quote-image-card">
          <img src={lifeImg} alt="Life" />
          <p>Life</p>
        </div>
        <div className="quote-image-card">
          <img src={growthImg} alt="Growth" />
          <p>Growth</p>
        </div>
        <div className="quote-image-card">
          <img src={motivationImg} alt="Motivation" />
          <p>Motivation</p>
        </div>
      </div>

      <h2>All Quotes</h2>

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
      </div>

      {/* Form to add new quote */}
      <section className="quote-form">
        <h3>Add a New Quote</h3>
        <Form onAddQuote={handleAddQuote} />
      </section>

      {/* List of quotes */}
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