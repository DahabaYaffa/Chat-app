import React from 'react';


import './TextContainer.css';

const TextContainer = ({ users }) => (
  <div className="textContainer">
    <div>
      <h1> Bienvenue sur Tchat Web@cademie <span role="img" aria-label="emoji">💬</span></h1>
      <h2>Created by Dahaba Yaffa</h2>
      <h2> Devoile nous les potins de la promo.. <span role="img" aria-label="emoji">⬅️</span></h2>
    </div>
  </div>
);

export default TextContainer;