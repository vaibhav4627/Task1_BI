import React, { useState } from 'react';
import { v4 as uuid } from 'uuid';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import image from './image.jpg';

function App() {
  const [cards, setCards] = useState([]);

  const handleAddCard = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const newCard = {
      id: uuid(),
      title: formData.get('title'),
      text: formData.get('text'),
      image: URL.createObjectURL(formData.get('image')),
      video: URL.createObjectURL(formData.get('video')),
    };
    setCards([...cards, newCard]);
    event.target.reset();
  };

  const handleDeleteCard = (id) => {
    const updatedCards = cards.filter((card) => card.id !== id);
    setCards(updatedCards);
  };

  return (
    <div className="App">
      <header>
        <h1>React Content Management Tool</h1>
        
      </header>
      <img src={image} alt="App logo" />
      
      <form onSubmit={handleAddCard}>
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input type="text" id="title" name="title" className="form-control" />
        </div>
        <br />
        <div className="form-group">
          <label htmlFor="text">Text:</label>
          <textarea id="text" name="text" className="form-control" />
        </div>
        <br />
        <div className="form-group">
          <label htmlFor="image">Image:</label>
          <input type="file" id="image" name="image" accept="image/*" class="btn btn-secondary" />
        </div>
        <br />
        <div className="form-group">
          <label htmlFor="video">Video:</label>
          <input type="file" id="video" name="video" accept="video/*" class="btn btn-secondary" />
        </div>
        <br />
        <button type="submit" className="btn btn-primary">Add Card</button>
      </form>
      <br />
      <div className="card-container">
        {cards.map((card) => (
          <div className="card" style={{ width: '18rem' }} key={card.id}>
            {card.image && <img src={card.image} className="card-img-top" alt="Card" />}
            
            <div className="card-body">
              <h5 className="card-title">{card.title}</h5>
              <p className="card-text">{card.text}</p>
              {card.video && (
              <video controls className="card-video">
                <source src={card.video} type="video/mp4" />
              </video>
            )}
              <button onClick={() => handleDeleteCard(card.id)} className="btn btn-danger">Delete</button>
            </div>
            
          </div>
        ))}
      </div>
      <footer>
        <p>&copy; 2023 Content Management Tool APP</p>
      </footer>
    </div>
  );
}

export default App;
