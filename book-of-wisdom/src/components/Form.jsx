import React,{useState} from "react";

function Form({ onAddQuote }) {
    const [text, setText] = useState('');
    const [author, setAuthor] = useState('');
    const [category, setCategory] = useState('');

  

const handleSubmit = (e) => {
  e.preventDefault();

  const newQuote = {
    id: Date.now(),
    text,
    author,
    category,
    isFavorite: false,
  };

  onAddQuote(newQuote);
  setText('');
  setAuthor('');
  setCategory('');
};

    

    return (
        <form onSubmit={handleSubmit}>
            <input
            type="text"
            placeholder="Quote"
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
            />
             <input
            type="text"
            placeholder="Author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
            />
            <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            >
                <option value="">Select Category</option>
                <option value="Life">Life</option>
                <option value="Growth">Growth</option>
                <option value="Motivation">Motivation</option>
            </select>
            <button type="submit">Add Quote</button>

        </form>
    );
}
export default Form;