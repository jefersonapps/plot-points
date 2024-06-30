import logo from "../assets/logo.png";
export const Rules = ({ open, onClose }) => {
  if (!open) return null;

  return (
    <div className="fixed z-50 inset-0">
      <div className="flex items-center justify-center h-svh">
        <div className="fixed inset-0 bg-black opacity-30" onClick={onClose} />
        <div
          style={{ height: "90vh", marginTop: "5vh" }}
          className="overflow-auto bg-zinc-800  border-2 border-gray-500 shadow-lg shadow-black max-w-xl z-20 flex flex-col p-8 rounded-lg"
        >
          <div className="flex gap-2 items-center justify-center">
            <div className="flex w-full justify-center items-center gap-2">
              <img className="w-8 h-8" src={logo} alt="logo" />
              <h2 className={`text-4xl font-bold text-white`}>Marca Pontos</h2>
            </div>
          </div>

          <br />

          <section className="text-gray-300 text-justify text-base">
            <h2 className="font-bold text-xl">Como jogar:</h2>

            <br></br>
            <ul className="list-disc list-inside">
              <li>O jogo deve ser jogado por 2 jogadores.</li>
              <br></br>
              <li>
                Cada jogador deve jogar dois dados: um dado determinará a
                coordenada do eixo horizontal e o outro dado determinará a
                coordenada do eixo vertical.
              </li>

              <li>
                Depois de jogar o primeiro dado, o jogador deve jogar a moeda
                para definir o sinal do número obtido. Se a moeda cair com a
                face “cara” para cima, o valor da coordenada será positivo.
              </li>

              <li>
                {" "}
                Se a moeda cair com a face “coroa” para cima, o valor da
                coordenada será negativo. O mesmo processo deve ser repetido
                depois de jogar o segundo dado.
              </li>

              <br></br>
              <li>
                O jogador poderá escolher qual coordenada será utilizada no eixo
                horizontal e qual será utilizada no eixo vertical
                estrategicamente.
              </li>
              <br></br>
              <li>
                Depois de jogar os dados e as moedas, o jogador deve marcar o
                ponto correspondente às coordenadas obtidas no plano cartesiano
                com seu marcador.
              </li>
              <br></br>
              <li>
                Se o jogador marcar um ponto que já foi marcado por outro
                jogador, ele deve remover todos os pontos por ele marcados.
              </li>
              <br></br>
              <li>
                O primeiro jogador que conseguir marcar ao menos 2 pontos em
                cada quadrante vence o jogo. Caso os jogadores utilizem todos os
                seus 16 marcadores e não consigam conquistar a vitória, o jogo
                recomeça.
              </li>
              <br></br>
              <li>
                O jogo possui níveis de dificuldade, os jogadores podem definir
                no início do jogo a quantidade de pontos que devem ser marcados
                por quadrante para que se tenha um vencedor.
              </li>
              <br></br>
              <li>
                O vencedor será o jogador que conseguir marcar em cada quadrante
                a quantidade de pontos definida previamente.
              </li>
            </ul>
          </section>

          <button
            className="mt-8 self-center px-4 py-2 bg-gray-800 border-2 border-gray-500 text-white rounded-lg hover:bg-gray-700 w-fit"
            onClick={onClose}
          >
            Iniciar
          </button>
        </div>
      </div>
    </div>
  );
};

{
  /* <div className=" text-gray-300 text-justify text-base">
              <div className="flex w-full justify-center items-center gap-2">
                <img className="w-8 h-8" src={logo} alt="logo" />
                <h2 className={`text-4xl font-bold text-white`}>
                  Marca Pontos
                </h2>
                
              </div>

              <p className="font-bold">Como jogar:</p>
              <br></br>
              <ul className="list-disc list-inside">
                <li>O jogo deve ser jogado por 2 jogadores.</li>
                <br></br>
                <li>
                  Cada jogador deve jogar dois dados: um dado determinará a
                  coordenada do eixo horizontal e o outro dado determinará a
                  coordenada do eixo vertical. Depois de jogar o primeiro dado,
                  o jogador deve jogar a moeda para definir o sinal do número
                  obtido. Se a moeda cair com a face “cara” para cima, o valor
                  da coordenada será positivo. Se a moeda cair com a face
                  “coroa” para cima, o valor da coordenada será negativo. O
                  mesmo processo deve ser repetido depois de jogar o segundo
                  dado.
                </li>
                <br></br>
                <li>
                  O jogador poderá escolher qual coordenada será utilizada no
                  eixo horizontal e qual será utilizada no eixo vertical
                  estrategicamente.
                </li>
                <br></br>
                <li>
                  Depois de jogar os dados e as moedas, o jogador deve marcar o
                  ponto correspondente às coordenadas obtidas no plano
                  cartesiano com seu marcador.
                </li>
                <br></br>
                <li>
                  Se o jogador marcar um ponto que já foi marcado por outro
                  jogador, ele deve remover todos os pontos por ele marcados.
                </li>
                <br></br>
                <li>
                  O primeiro jogador que conseguir marcar ao menos 2 pontos em
                  cada quadrante vence o jogo. Caso os jogadores utilizem todos
                  os seus 16 marcadores e não consigam conquistar a vitória, o
                  jogo recomeça.
                </li>
                <br></br>
                <li>
                  O jogo possui níveis de dificuldade, os jogadores podem
                  definir no início do jogo a quantidade de pontos que devem ser
                  marcados por quadrante para que se tenha um vencedor.
                </li>
                <br></br>
                <li>
                  O vencedor será o jogador que conseguir marcar em cada quadrante a quantidade de pontos definida previamente.
                </li>
              </ul>
          
            </div> */
}
