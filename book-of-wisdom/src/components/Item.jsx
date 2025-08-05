import React from "react";

function Item({ quote, onDelete, onToggleFavorite }) {
  return (
    <div className="quote-item">
      {/* Quote text */}
      <blockquote>
        “{quote.content}”
      </blockquote>

      {/* Quote details */}
      <footer>
        <span className="quote-category">Category: {quote.category}</span>
        {quote.source && <span className="quote-source"> | Source: {quote.source}</span>}
      </footer>

      {/* Actions */}
      <div className="quote-actions">
        <button
          className="favorite-btn"
          onClick={() => onToggleFavorite(quote.id)}
        >
          {quote.favorite ? '💖 Unfavorite' : '🤍 Favorite'}
        </button>
        <button className="delete-btn" onClick={() => onDelete(quote.id)}>🗑 Delete</button>
      </div>
    </div>
  );
}

export default Item;
