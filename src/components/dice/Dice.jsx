import { useState, useRef, useEffect } from "react";
import "./Dice.css";

import diceSoundFile from '../../assets/swipe.mp3'

export const Dice = ({ diceValue, setDiceValue }) => {
  const [rolling, setRolling] = useState(false);
  const diceElement = useRef(null);

  const diceSound = new Audio(diceSoundFile);

  const diceSort = () => {
    return Math.floor(Math.random() * 6 + 1);
  };

  useEffect(() => {
    if (diceValue.length >= 2) {
      disableButton();
    }
  }, [diceValue]);

  const randomDice = () => {
    if (diceValue.length >= 2) return;
    var randomNumber = diceSort();
    const random = randomNumber;
    if (random >= 1 && random <= 6) {
      rollDice(random);
    } else {
      rollDice();
    }
  };

  const rollDice = (random) => {
    setRolling(true);
    diceElement.current.style.animation = "rolling 4s";
    diceSound.play()
    setTimeout(() => {
      diceSound.play()
    }, 2025);
    setTimeout(() => {
      switch (random) {
        case 1:
          diceElement.current.style.transform = "rotateX(0deg) rotateY(0deg)";
          break;
        case 6:
          diceElement.current.style.transform = "rotateX(180deg) rotateY(0deg)";
          break;
        case 2:
          diceElement.current.style.transform = "rotateX(-90deg) rotateY(0deg)";
          break;
        case 5:
          diceElement.current.style.transform = "rotateX(90deg) rotateY(0deg)";
          break;
        case 3:
          diceElement.current.style.transform = "rotateX(0deg) rotateY(90deg)";
          break;
        case 4:
          diceElement.current.style.transform = "rotateX(0deg) rotateY(-90deg)";
          break;
        default:
          break;
      }

      diceElement.current.style.animation = "none";
      setRolling(false);
      diceSound.play()
      setDiceValue([...diceValue, random]);
    }, 4050);
  };

  const disableButton = () => {
    setRolling(true);
    setTimeout(function () {
      setRolling(false);
    }, 4000);
  };

  return (
    <div className="flex flex-col">
      <div className="dice" ref={diceElement}>
        <div className="face front"></div>
        <div className="face backDice"></div>
        <div className="face top"></div>
        <div className="face bottom"></div>
        <div className="face right"></div>
        <div className="face left"></div>
      </div>
      <button
        className={`mt-8 text-white ${
          diceValue.length >= 2
            ? 'bg-zinc-400 text-zinc-600'
            : 'bg-green-700'
        } ${
          diceValue.length >= 2
            ? ''
            : 'hover:scale-105 disabled:hover:scale-100'
        } text-sm font-semibold rounded px-2 py-1 transition-all`}
        onClick={randomDice}
        disabled={rolling || diceValue.length >= 2}
      >
        Jogar Dado
      </button>
    </div>
  );
};
