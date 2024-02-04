import { useState, useEffect } from 'react';
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
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);

  function shuffleCards() {
    const twelveImagesArray = [...weatherImages, ...weatherImages]
      .sort(() => Math.random() - 0.5)
      .map((val) => ({ ...val, id: uniqid() }));
    setCards(twelveImagesArray);
    setTurns(0);
  }
  function handleChoice(card) {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  }

  //compare two selected cards
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      console.log('use effect is run');
      if (choiceOne.src == choiceTwo.src) {
        console.log('two cards match');
        resetTurn();
      } else {
        console.log('No match');
        resetTurn();
      }
    }
  }, [choiceOne, choiceTwo]);

  //reset choices and increase turn
  function resetTurn() {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prev) => prev + 1);
  }
  return (
    <>
      <h1>Memory game</h1>
      <button onClick={shuffleCards}>New Game</button>
      <div className="card-grid">
        {cards.map((card) => (
          <Card card={card} key={card.id} handleChoice={handleChoice} />
        ))}
      </div>
    </>
  );
}

export default App;
