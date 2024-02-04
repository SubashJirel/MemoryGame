import { useState } from 'react';
import './App.css';
import uniqid from 'uniqid';
import Card from './components/Card';
const weatherImages = [
  { src: '/img/clear.png' },
  { src: '/img/clouds.png' },
  { src: '/img/drizzle.png' },
  { src: '/img/mist.png' },
  { src: '/img/rain.png' },
  { src: '/img/snow.png' },
];

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  function shuffleCards() {
    const twelveImagesArray = [...weatherImages, ...weatherImages]
      .sort(() => Math.random() - 0.5)
      .map((val) => ({ ...val, id: uniqid() }));
    setCards(twelveImagesArray);
    setTurns(0);
  }
  console.log(cards, turns);
  return (
    <>
      <h1>Memory game</h1>
      <button onClick={shuffleCards}>New Game</button>
      <div className="card-grid">
        {cards.map((card) => (
          <Card card={card} key={card.id} />
        ))}
      </div>
    </>
  );
}

export default App;
