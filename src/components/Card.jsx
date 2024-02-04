function Card({ card, handleChoice, flipped }) {
  return (
    <div className="card">
      <div className={flipped ? 'flipped' : ''}>
        <img src={card.src} className="front" alt="card front" />
        <img
          src="/img/cover.png"
          className="back"
          onClick={() => handleChoice(card)}
          alt="card back"
        />
      </div>
    </div>
  );
}
export default Card;
