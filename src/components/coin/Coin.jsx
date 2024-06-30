import { useState, useRef, useEffect } from 'react';
import './Coin.css';
import coinSoundFile from '../../assets/coin.mp3'

export const Coin = ({ coinValue, setCoinValue }) => {
  const [flipping, setFlipping] = useState(false);
  const [heads, setHeads] = useState(0);
  const [tails, setTails] = useState(0);
  const coinElement = useRef(null);

  const coinSound = new Audio(coinSoundFile);

  useEffect(() => {
    if (coinValue.length >= 2) {
      disableButton();
    }
  }, [coinValue]);

  const randomCoin = () => {
    if (coinValue.length >= 2) return;
    let i = Math.floor(Math.random() * 2);

    coinElement.current.style.animation = 'none';
    if (i) {
      setTimeout(function () {
        coinElement.current.style.animation = 'spin-heads 3s forwards';
      }, 100);
      setHeads(heads + 1);
      coinElement.current.addEventListener('animationend', () => {
        coinSound.play()
        setCoinValue([...coinValue, 'cara']);
      });
    } else {
      setTimeout(function () {
        coinElement.current.style.animation = 'spin-tails 3s forwards';
      }, 100);
      setTails(tails + 1);
      coinElement.current.addEventListener('animationend', () => {
        coinSound.play()
        setCoinValue([...coinValue, 'coroa']);
      });
    }
    disableButton();
  };

  const disableButton = () => {
    setFlipping(true);
    setTimeout(function () {
      setFlipping(false);
    }, 3000);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="coin" ref={coinElement}>
        <div className="heads border-4 border-yellow-500 shadow-lg text-xl">
          Cara
        </div>
        <div className="tails border-4 border-yellow-500 shadow-lg text-xl">
          Coroa
        </div>
      </div>
      <button
        className={`mt-8 text-white ${
          coinValue.length >= 2
            ? 'bg-zinc-400 text-zinc-600'
            : 'bg-green-700'
        } ${
          coinValue.length >= 2
            ? ''
            : 'hover:scale-105 disabled:hover:scale-100'
        } text-sm font-semibold rounded px-2 py-1 transition-all`}
        onClick={randomCoin}
        disabled={flipping || coinValue.length >= 2}
      >
        Jogar moeda
      </button>
    </div>
  );
};
