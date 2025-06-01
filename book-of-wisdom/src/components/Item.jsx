import React from "react";



 function Item({ quote, onDelete, onToggleFavorite }) {
  return (
    <div className="quote-item">
    
      <blockquote>
        “{quote.text}”
        <footer>– {quote.author || 'Unknown'} ({quote.category})</footer>
      </blockquote>

      <div className="quote-actions">
        <button onClick={() => onToggleFavorite(quote.id)}>
          {quote.isFavorite ? '💖 Unfavorite' : '🤍 Favorite'}
        </button>
        <button onClick={() => onDelete(quote.id)}>🗑 Delete</button>
      </div>
    </div>
  );
}

export default Item;