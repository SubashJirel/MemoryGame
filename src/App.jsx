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
        console.log('No match');
        setTimeout(resetTurn, 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  console.log(cards);
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
          <Card
            card={card}
            key={card.id}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
          />
        ))}
      </div>
    </>
  );
}

export default App;
