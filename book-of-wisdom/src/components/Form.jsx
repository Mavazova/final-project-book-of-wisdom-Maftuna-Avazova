import React, { useState } from 'react';

export default function Form({ onAddQuote }) {
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('Life');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content.trim()) return;
    onAddQuote({ content, category });
    setContent('');
  };

  return (
    <div className="quote-form">
      
      <form onSubmit={handleSubmit}>
        <textarea
          rows="3"
          placeholder="Write your quote here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="Life">Life</option>
          <option value="Growth">Growth</option>
          <option value="Motivation">Motivation</option>
        </select>
        <button type="submit">Add Quote</button>
      </form>
    </div>
  );
}
