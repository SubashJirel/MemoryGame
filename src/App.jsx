import { useState, useEffect } from 'react';
import './App.css';
import uniqid from 'uniqid';
import Card from './components/Card';
const weatherImages = [
  { src: '/img/clear.png', matched: false },
  { src: '/img/clouds.png', matched: false },
  { src: '/img/drizzle.png', matched: false },
  { src: '/img/mist.png', matched: false },
  { src: '/img/rain.png', matched: false },
  { src: '/img/snow.png', matched: false },
];

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);

  function shuffleCards() {
    const twelveImagesArray = [...weatherImages, ...weatherImages]
      .sort(() => Math.random() - 0.5)
      .map((val) => ({ ...val, id: uniqid() }));
    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(twelveImagesArray);
    setTurns(0);
  }
  function handleChoice(card) {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  }

  //compare two selected cards
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);

      if (choiceOne.src == choiceTwo.src) {
        setCards((prev) => {
          return prev.map((card) => {
            if (card.src == choiceOne.src) {
              // choiceone or choiceTwo same thing
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });

        resetTurn();
      } else {
        setTimeout(resetTurn, 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  //start a new game automatically
  useEffect(() => {
    shuffleCards();
  }, []);

  //reset choices and increase turn
  function resetTurn() {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prev) => prev + 1);
    setDisabled(false);
  }
  return (
    <>
      <h1>Memory game</h1>
      <p className="numOfTurns"> Number of turns {turns}</p>
      <button onClick={shuffleCards}>New Game</button>
      <div className="card-grid">
        {cards.map((card) => (
          <Card
            card={card}
            key={card.id}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
          />
        ))}
      </div>
    </>
  );
}

export default App;
