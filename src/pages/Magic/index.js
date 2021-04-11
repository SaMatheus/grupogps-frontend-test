import React, { useState, useEffect } from 'react';

// STYLES
import styles from '../../styles/css/Magic.module.css';

// REQUEST
import api from '../../services/api.js';

const Magic = () => {
  const [deck, setDeck] = useState([]);

  const [isShuffle, setIsShuffle] = useState(false);
  const [isSelect, setIsSelect] = useState(false);

  // PEGANDO O DECK INICIAL
  useEffect(() => {
    localStorage.clear('deck_id');
    localStorage.clear('card_code');
    getDeck();
  }, []);

  useEffect(() => {
    setIsShuffle(true);
    shuffleDeck();
  }, [isSelect]);

  const getDeck = async () => {
    api.get(`new/draw/?count=21`).then((response) => {
      setDeck(response.data.cards);
      localStorage.setItem(
        'card_code',
        response.data.cards.map((card) => {
          return card.code;
        })
      );
    });
  };

  const getNewDeck = async (cardId) => {
    api.get(`${cardId}/draw/?count=21`).then((response) => {
      if (isShuffle) {
        setDeck(response.data.cards);
      }
    });
  };

  const shuffleDeck = async () => {
    const getCardCode = localStorage.getItem('card_code');
    api.get(`new/shuffle/?cards=${getCardCode}`).then((response) => {
      console.log(response);
      getNewDeck(response.data.deck_id);
    });
  };

  const handleCardSelect = (code) => {
    setIsSelect(!isSelect);
  };

  return (
    <div className={styles.container}>
      {deck.map((item) => {
        return (
          <li key={item.code}>
            <img
              src={item.image}
              alt={item.code}
              onClick={() => handleCardSelect(item.code)}
            />
          </li>
        );
      })}
    </div>
  );
};

export default Magic;
