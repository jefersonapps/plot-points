import goldMedal from "../assets/goldMedal.png";
import Lottie from "react-lottie";
import confetti from "../assets/confetti.json";
import useWindowDimensions from '../Hooks/useWindowDimensions';

export const WinnerScreen = ({ winner, open, onClose }) => {
  const winnerColor = winner === 1 ? "blue-500" : "red-500";

  const { width, height } = useWindowDimensions();

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: confetti,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  if (!open) return null;

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="absolute">
      <Lottie options={defaultOptions} height={height} width={width} />
      </div>
      <div className="flex items-center justify-center min-h-screen">
        <div className="fixed inset-0 bg-black opacity-30" onClick={onClose} />
        <div className="bg-zinc-800 border-2 border-gray-500 shadow-lg shadow-black z-20 flex flex-col items-center justify-center p-8 rounded-lg text-center">
          <h2
            className={`text-4xl mb-8 font-bold text-white text-${winnerColor}`}
          >
            Parabéns!
          </h2>
          <img className="w-16 h-fit" src={goldMedal} alt="medalha de ouro" />
          <div className="flex gap-2 mt-8 items-center justify-center">
            <p className="text-2xl text-gray-300">O jogador</p>
            {winner === 1 ? (
              <div className="w-8 h-8 mx-2 rounded bg-blue-500 shadow-black shadow-md"></div>
            ) : (
              <div className="w-8 h-8 mx-2 rounded bg-red-500 shadow-black shadow-md"></div>
            )}
            <p className="text-2xl text-gray-300">venceu!</p>
          </div>

          <button
            className="mt-8 px-4 py-2 bg-gray-800 border-2 border-gray-500 text-white rounded-lg hover:bg-gray-700 w-fit"
            onClick={onClose}
          >
            Recomeçar
          </button>
        </div>
      </div>
    </div>
  );
};
