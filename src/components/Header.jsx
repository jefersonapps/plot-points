import { useNavigate } from 'react-router-dom';

import logo from "../assets/logo.png";

export const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="bg-zinc-900 px-6 py-3 w-full justify-between items-center flex gap-8">
          <div className="flex gap-2 items-center">
            <img className="w-8 h-8" src={logo} alt="logo" />
            <h1 className="md:text-2xl xs:text-lg font-bold text-white">Marca pontos</h1>
            <button 
            className="bg-violet-700 hover:bg-violet-800 transition-colors text-white font-bold py-2 px-4 md:ml-4 xs:ml-0 rounded focus:outline-none focus:shadow-outline w-fit"
            onClick={() => navigate('/simulador')}>
              Simulador
            </button>
          </div>

          <a
            href="http://buscatextual.cnpq.br/buscatextual/visualizacv.do?metodo=apresentar&id=K9602447P6"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img className="w-8 h-8 rounded-full border-[3px] border-green-600 hover:scale-105 transition-all"
              src="http://servicosweb.cnpq.br/wspessoa/servletrecuperafoto?tipo=1&id=K9602447P6"
              alt="Jeferson Leite"
            ></img>
          </a>
        </header>
  )
}