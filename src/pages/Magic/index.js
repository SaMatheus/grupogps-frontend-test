import React, { useState, useEffect } from 'react';

// STYLES
import styles from '../../styles/css/Magic.module.css';

// REQUEST
import api from '../../services/api.js';

const Magic = () => {
  const [deck, setDeck] = useState([]);

  const [isShuffle, setIsShuffle] = useState(false);
  const [cardSelect, setCardSelect] = useState(false);
  const [columnSelect, setColumnSelect] = useState(false);

  // PEGANDO O DECK INICIAL
  useEffect(() => {
    localStorage.clear('deck_id');
    localStorage.clear('card_code');
    getDeck();
  }, []);

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

  // EMBARALHANDO O DECK
  useEffect(() => {
    setIsShuffle(true);
    shuffleDeck();
  }, [cardSelect, columnSelect]);

  const shuffleDeck = async () => {
    const getCardCode = localStorage.getItem('card_code');
    api.get(`new/shuffle/?cards=${getCardCode}`).then((response) => {
      getNewDeck(response.data.deck_id);
    });
  };

  // PEGANDO UM DECK EMBARALHADO COM AS CARTAS SETADAS DO PRIMEIRO DECK
  const getNewDeck = async (cardId) => {
    api.get(`${cardId}/draw/?count=21`).then((response) => {
      if (isShuffle) {
        setDeck(response.data.cards);
      }
    });
  };

  const handleCardSelect = (code) => {
    setCardSelect(true);

    if (!localStorage.hasOwnProperty('card_chosen')) {
      localStorage.setItem('card_chosen', code);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.firstDeck}>
        <ul onClick={() => setColumnSelect(!columnSelect)}>
          {deck.map((item, index) => {
            return (
              <li
                key={index}
                onClick={() => {
                  handleCardSelect(item.code);
                }}
              >
                <img src={item.image} alt={item.code} />
              </li>
            );
          })}
        </ul>
      </div>
      {/* {!isShuffle ? (
  //       <div className={styles.firstDeck}>
  //         {deck.map((item, index) => {
  //           return (
  //             <li
  //               key={index}
  //               onClick={() => {
  //                 handleCardSelect(item.code);
  //                 console.log(index);
  //               }}
  //             >
  //               <img src={item.image} alt={item.code} />
  //             </li>
  //           );
  //         })}
  //       </div>
  //     ) : (
  //       <div className={styles.secondDeck}>
  //         {deck.map((item, index) => {
  //           return (
  //             <li
  //               key={index}
  //               onClick={() => {
  //                 handleCardSelect(item.code);
  //                 console.log(index);
  //               }}
  //             >
  //               <img src={item.image} alt={item.code} />
  //             </li>
  //           );
  //         })}
  //       </div>
  //     )} */}
      {/* <div className={styles.thirdDeck}>
  //       {deck.map((item, index) => {
  //         return (
  //           <li
  //             key={index}
  //             onClick={() => {
  //               handleCardSelect(item.code);
  //               console.log(index);
  //             }}
  //           >
  //             <img src={item.image} alt={item.code} />
  //           </li>
  //         );
  //       })}
  //     </div> */}
    </div>
  );
};

export default Magic;
