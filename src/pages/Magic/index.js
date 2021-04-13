import React, { useState, useEffect } from 'react';

// STYLES
import styles from '../../styles/css/pages/Magic.module.css';

// REQUEST
import api from '../../services/api.js';

const Magic = () => {
  const [count, setCount] = useState(0);

  const [deck, setDeck] = useState([]);
  const [firstList, setFirstList] = useState([]);
  const [secondList, setSecondList] = useState([]);
  const [thirdList, setThirdList] = useState([]);
  const [chooseCard, setChooseCard] = useState([]);

  const [finish, setFinish] = useState(false);

  // PEGANDO O DECK INICIAL
  useEffect(() => {
    localStorage.clear('deck_id');
    localStorage.clear('card_code');
    getInitialDeck();
  }, []);

  useEffect(() => {
    memorizeDeck();
  }, [deck]);

  const getInitialDeck = async () => {
    api.get(`new/draw/?count=21`).then((response) => {
      getDeckWith21Cards(response.data.cards, response.data.deck_id);
    });
  };

  const getDeckWith21Cards = async (cards, deckId) => {
    const getCardCode = cards.map((card) => {
      return card.code;
    });
    api
      .get(`${deckId}/shuffle/?cards=${getCardCode}`)
      .then((response) => getDeckFiltered(response.data.deck_id));
  };

  const getDeckFiltered = async (deckId) => {
    api.get(`${deckId}/draw/?count=21`).then((response) => {
      localStorage.setItem('deck_id', response.data.deck_id);
      setDeck(response.data.cards);
    });
  };

  // MEMORIZANDO POSIÇÕES DAS CARTAS
  const memorizeDeck = () => {
    let newArr1 = [
      deck[0],
      deck[1],
      deck[2],
      deck[3],
      deck[4],
      deck[5],
      deck[6],
    ];
    let newArr2 = [
      deck[7],
      deck[8],
      deck[9],
      deck[10],
      deck[11],
      deck[12],
      deck[13],
    ];

    let newArr3 = [
      deck[14],
      deck[15],
      deck[16],
      deck[17],
      deck[18],
      deck[19],
      deck[20],
    ];

    setFirstList(newArr1);
    setSecondList(newArr2);
    setThirdList(newArr3);
  };

  // PRIMEIRA EMBARALHADA DO DECK
  const firstShuffledOnFirstColumn = () => {
    deck[0] = thirdList[0];
    deck[1] = thirdList[3];
    deck[2] = thirdList[6];
    deck[3] = firstList[2];
    deck[4] = firstList[5];
    deck[5] = secondList[1];
    deck[6] = secondList[4];

    deck[7] = thirdList[1];
    deck[8] = thirdList[4];
    deck[9] = firstList[0];
    deck[10] = firstList[3];
    deck[11] = firstList[6];
    deck[12] = secondList[2];
    deck[13] = secondList[5];

    deck[14] = thirdList[2];
    deck[15] = thirdList[5];
    deck[16] = firstList[1];
    deck[17] = firstList[4];
    deck[18] = secondList[0];
    deck[19] = secondList[3];
    deck[20] = secondList[6];
    memorizeDeck();
  };

  const firstShuffledOnSecondColumn = () => {
    deck[0] = firstList[0];
    deck[1] = firstList[3];
    deck[2] = firstList[6];
    deck[3] = secondList[2];
    deck[4] = secondList[5];
    deck[5] = thirdList[1];
    deck[6] = thirdList[4];

    deck[7] = firstList[1];
    deck[8] = firstList[4];
    deck[9] = secondList[0];
    deck[10] = secondList[3];
    deck[11] = secondList[6];
    deck[12] = thirdList[2];
    deck[13] = thirdList[5];

    deck[14] = firstList[2];
    deck[15] = firstList[5];
    deck[16] = secondList[1];
    deck[17] = secondList[4];
    deck[18] = thirdList[0];
    deck[19] = thirdList[3];
    deck[20] = thirdList[6];
    memorizeDeck();
  };

  const firstShuffledOnThirdColumn = () => {
    deck[0] = secondList[0];
    deck[1] = secondList[3];
    deck[2] = secondList[6];
    deck[3] = thirdList[2];
    deck[4] = thirdList[5];
    deck[5] = firstList[1];
    deck[6] = firstList[4];

    deck[7] = secondList[1];
    deck[8] = secondList[4];
    deck[9] = thirdList[0];
    deck[10] = thirdList[3];
    deck[11] = thirdList[6];
    deck[12] = firstList[2];
    deck[13] = firstList[5];

    deck[14] = secondList[2];
    deck[15] = secondList[5];
    deck[16] = thirdList[1];
    deck[17] = thirdList[4];
    deck[18] = firstList[0];
    deck[19] = firstList[3];
    deck[20] = firstList[6];
    memorizeDeck();
  };

  // FUNÇÃO PARA SELECIONAR A COLUNA
  const firstRow = () => {
    count < 3 && firstShuffledOnFirstColumn();
    count >= 2 && showChooseCard();
    setCount(count + 1);
  };

  const secondRow = () => {
    count < 3 && firstShuffledOnSecondColumn();
    count >= 2 && showChooseCard();
    setCount(count + 1);
  };

  const thirdRow = () => {
    count < 3 && firstShuffledOnThirdColumn();
    count >= 2 && showChooseCard();
    setCount(count + 1);
  };

  // ADVIVNHANDO CARTA
  const showChooseCard = () => {
    setChooseCard(deck[10]);
    setFinish(true);
    setCount(0);
  };

  return (
    <div className={styles.container}>
      {deck.length !== 0 && (
        <>
          <ul>
            <button onClick={firstRow}>Selecionar</button>
            {deck.map((card, index) => {
              while (index < 7) {
                return (
                  <li key={index}>
                    <img src={card.image} alt='' />
                    <span>{index}</span>
                  </li>
                );
              }
            })}
          </ul>
          <ul>
            <button onClick={secondRow}>Selecionar</button>
            {deck.map((card, index) => {
              while (index > 6 && index < 14) {
                return (
                  <li key={index}>
                    <img src={card.image} alt='' />
                    <span>{index}</span>
                  </li>
                );
              }
            })}
          </ul>
          <ul>
            <button onClick={thirdRow}>Selecionar</button>
            {deck.map((card, index) => {
              while (index > 13 && index < 22) {
                return (
                  <li key={index}>
                    <img src={card.image} alt='' />
                    <span>{index}</span>
                  </li>
                );
              }
            })}
          </ul>
        </>
      )}
      <span>{finish && <img src={chooseCard.image} alt='' />}</span>
    </div>
  );
};

export default Magic;
