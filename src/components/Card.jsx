function Card({ card, handleChoice }) {
  return (
    <div className="card">
      <div>
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
