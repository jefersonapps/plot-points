import { useState } from "react";

import { Rules } from "../components/Rules";
import { WinnerScreen } from "../components/WinnerScreen";
import { Coin } from "../components/coin/Coin";
import { Dice } from "../components/dice/Dice";

import { HelpCircle } from "lucide-react";
import clickSoundFile from "../assets/click.mp3";
import { Header } from "../components/Header";
import {
  horizontalNumbers,
  quadrants,
  verticalNumbers,
} from "../utils/constants";

export const Game = () => {
  const [points, setPoints] = useState(Array.from({ length: 144 }, () => null));
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [focusedPoint, setFocusedPoint] = useState(null);
  const [diceValue, setDiceValue] = useState([]);
  const [coinValue, setCoinValue] = useState([]);
  const [numberOfPointsPerQuadrant, setNumberOfPointsPerQuadrant] = useState(1);

  const [winner, setWinner] = useState(null);
  const [openWinnerScreen, setOpenWinnerScreen] = useState(false);
  const [openRules, setOpenRules] = useState(true);

  // Quando um jogador clicou sobre o outro na sua vez, ele morreu
  const clickSound = new Audio(clickSoundFile);

  const handlePointClick = (index) => {
    // Verificar se o índice clicado corresponde à combinação dos valores dos dados e das moedas
    if (diceValue.length === 2 && coinValue.length === 2) {
      const options = [
        { num1: num1, num2: num2 },
        { num1: num2, num2: num1 },
      ];

      const validOption = options.find((option) => {
        const expectedIndex = getIndexFromValue(option.num1, option.num2);
        return index === expectedIndex;
      });

      if (validOption) {
        console.log("é valida");
        // Verificar se o ponto clicado já está ocupado por outro jogador
        if (
          points[index] !== null &&
          diceValue.length >= 2 &&
          coinValue.length >= 2
        ) {
          // Limpar todas as marcações desse jogador no tabuleiro
          const newPoints = points.map((player) =>
            player === currentPlayer ? null : player
          );
          setPoints(newPoints);
          setCurrentPlayer(currentPlayer === 1 ? 2 : 1);
          setDiceValue([]);
          setCoinValue([]);
          return;
        }

        clickSound.play();
        // O índice clicado corresponde a uma das opções válidas
        const newPoints = [...points];
        newPoints[index] = currentPlayer;
        setPoints(newPoints);
        setCurrentPlayer(currentPlayer === 1 ? 2 : 1);
        setDiceValue([]);
        setCoinValue([]);

        // Verificar se o jogador atual venceu em cada um dos 4 quadrantes

        const currentPlayerPoints = newPoints
          .map((player, index) => (player === currentPlayer ? index : null))
          .filter((index) => index !== null);

        let hasWon = true;
        for (const quadrant of quadrants) {
          const playerPointsInQuadrant = currentPlayerPoints.filter((index) =>
            quadrant.includes(index)
          );

          console.log(playerPointsInQuadrant.length, numberOfPointsPerQuadrant);

          if (playerPointsInQuadrant.length < numberOfPointsPerQuadrant) {
            hasWon = false;
            break;
          }
        }

        console.log(hasWon, "won");

        if (hasWon) {
          setWinner(currentPlayer);
          setOpenWinnerScreen(true);
        }
      }
    }
  };

  const getIndexFromValue = (num1, num2) => {
    const verticalIndex = verticalNumbers.indexOf(num2);
    const horizontalIndex = horizontalNumbers.indexOf(num1);

    if (verticalIndex !== -1 && horizontalIndex !== -1) {
      return verticalIndex * 12 + horizontalIndex;
    }

    return -1; // Valor não encontrado no tabuleiro
  };

  const num1 =
    coinValue[0] === "coroa" && diceValue[0] ? -diceValue[0] : diceValue[0];
  const num2 =
    coinValue[1] === "coroa" && diceValue[1] ? -diceValue[1] : diceValue[1];

  const onClose = () => {
    setPoints(Array.from({ length: 144 }, () => null));
    setCurrentPlayer(1);
    setFocusedPoint(null);
    setDiceValue([]);
    setCoinValue([]);
    setWinner(null);
    setOpenWinnerScreen(false);
  };

  const handleChange = (event) => {
    setNumberOfPointsPerQuadrant(Number(event.target.value));
  };
  const isBoardEmpty = points.every((point) => point === null);

  return (
    <div className="h-svh">
      <Rules open={openRules} onClose={() => setOpenRules(false)} />
      <div>
        <Header />
        <div className="bg-zinc-800 px-6 py-3 flex xs:flex-col lg:flex-row gap-8 lg:pl-56 lg:justify-between xs:justify-center xs:items-center">
          <div>
            <label
              className="text-white font-medium mr-2"
              htmlFor="points-per-quadrant"
            >
              Pontos por quadrante:
            </label>
            <select
              id="points-per-quadrant"
              value={String(numberOfPointsPerQuadrant)}
              onChange={handleChange}
              disabled={!isBoardEmpty}
              className="bg-gray-800 text-white border border-gray-600 rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-gray-600"
            >
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
            </select>
          </div>
          <div className="text-white font-medium flex items-center">
            Turno do jogador
            {currentPlayer === 1 && (
              <div className="w-8 h-8 ml-2 rounded bg-blue-500"></div>
            )}
            {currentPlayer === 2 && (
              <div className="w-8 h-8 ml-2 rounded bg-red-500"></div>
            )}
          </div>

          <div className="flex xs:flex-col md:flex-row">
            <span className="font-medium text-white md:w-44">
              Coordenada a:{" "}
              <span className="font-bold">
                {coinValue[0] === "cara" && "+"}{" "}
                {coinValue[0] === "coroa" && "-"} {num1 && Math.abs(num1)}
              </span>
            </span>
            <span className="font-medium text-white md:w-44">
              Coordenada b:{" "}
              <span className="font-bold">
                {coinValue[1] === "cara" && "+"}{" "}
                {coinValue[1] === "coroa" && "-"} {num2 && Math.abs(num2)}
              </span>
            </span>
          </div>
        </div>

        <div className="flex md:flex-row xs:flex-col justify-center items-center h-full gap-8 mt-8">
          <WinnerScreen
            winner={winner}
            open={openWinnerScreen}
            onClose={onClose}
          />
          <div className="relative">
            <div className="flex md:flex-col xs:flex-row xs:gap-8 px-3 gap-5 min-w-fit items-center justify-center bg-zinc-800 py-4 rounded-lg">
              <Dice
                diceValue={diceValue}
                setDiceValue={setDiceValue}
                disabled={!!points[focusedPoint]}
              />
              <Coin
                coinValue={coinValue}
                setCoinValue={setCoinValue}
                disabled={!!points[focusedPoint]}
              />
            </div>
            <div>
              <div className="flex justify-center">
                <button
                  onClick={() => setOpenRules(true)}
                  className="absolute -bottom-12 text-white w-fit"
                >
                  <HelpCircle size={40} />
                </button>
              </div>
            </div>
          </div>
          <div className="relative md:ml-9">
            {/* Plano Cartesiano */}
            <div className="grid grid-cols-12 gap-1 relative xs:scale-75 lg:scale-100">
              <div className="absolute -z-10 w-full h-full">
                <div className="grid grid-cols-2 w-full h-full">
                  <div className="bg-yellow-500/30"></div>
                  <div className="bg-green-600/40"></div>
                  <div className="bg-purple-600/40"></div>
                  <div className="bg-gray-600"></div>
                </div>
              </div>
              {points.map((player, index) => (
                <div
                  key={index}
                  className={`md:w-8 md:h-8 xs:w-7 xs:h-7 rounded border border-gray-400 flex justify-center items-center cursor-pointer transition-colors ${
                    player === 1
                      ? "bg-blue-500"
                      : player === 2
                      ? "bg-red-500"
                      : ""
                  } ${index === focusedPoint ? "bg-yellow-300" : ""}`}
                  onClick={() => handlePointClick(index)}
                  onMouseEnter={() => setFocusedPoint(index)}
                  onMouseLeave={() => setFocusedPoint(null)}
                >
                  {/* <p className="text-xs absolute">{index}</p> */}
                  {!player && (
                    <div className="w-4 h-4 rounded-full bg-transparent border border-blue-500"></div>
                  )}
                </div>
              ))}
              {/* Números na parte inferior */}
              <div className="absolute text-white left-0 right-0 -bottom-9 flex justify-center gap-1">
                {horizontalNumbers.map((number, index) => {
                  return (
                    <div
                      key={index}
                      className={`w-8 h-8 border rounded border-gray-400 flex justify-center items-center transition-colors ${
                        focusedPoint !== null && focusedPoint % 12 === index
                          ? "bg-yellow-300 text-black"
                          : ""
                      }`}
                    >
                      <span className="text-xs font-medium">
                        {number > 0 ? `+ ${number}` : `${number}`}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
            {/* Números na lateral esquerda */}
            <div className="absolute text-white top-0 bottom-0 gap-1 md:-left-9 xs:translate-x-1/2 flex flex-col justify-center  xs:scale-75 lg:scale-100">
              {verticalNumbers.map((number, index) => {
                return (
                  <div
                    key={index}
                    className={`w-8 h-8 rounded border border-gray-400 flex justify-center items-center transition-colors ${
                      focusedPoint !== null &&
                      Math.floor(focusedPoint / 12) === index
                        ? "bg-yellow-300 text-black"
                        : ""
                    }`}
                  >
                    {number !== 0 && (
                      <span className="text-xs font-medium">
                        {number > 0 ? `+ ${number}` : `${number}`}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
