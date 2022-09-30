import React from 'react';
// , { title }, { type }, { beds }, { rating }
import '../styles/NavCard.css';

function NavCard({ image, title, type, beds, rating, superHost }) {
  return (
    <div className="NavCard">
      <img src={image} alt="" />
      <div className="card_container">
        {superHost === true ? <div className="superhost">SUPERHOST</div> : null}
        <div>{type}</div>
        <div>{beds}beds</div>
        <div className="end_item">
          <span class="fa fa-star checked"></span>
          {rating}
        </div>
      </div>
      <h3>{title}</h3>
    </div>
  );
}

export default NavCard;
