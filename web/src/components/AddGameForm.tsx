import { House, Plus } from "phosphor-react";
import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../lib/axios";
import { Input } from "./Form/input";


export function AddGameForm() {
  const [gameTitle, setGameTitle] = useState<string>('');
  const [imgUrl, setImgUrl] = useState<string>('');

  async function handleAddGame(event: FormEvent) {
    event.preventDefault();

    if (!imgUrl.trim() || !gameTitle.trim()) {
      return alert('Por favor, preencha os campos.');
    }

    try {
      await api.post(`/games`, {
        title: gameTitle,
        imgUrl: imgUrl,
      });

      alert('Game adicionado com sucesso!');
    } catch (err) {
      console.log(err);
      alert('Erro ao enviar novo game.');
    } finally {
    }
  }

  return (
    <div className='max-w-[1344px] mx-auto flex flex-col items-center my-20'>
      <form className='mt-8 w-[32rem] p-6 flex flex-col gap-4 bg-gray-700/20 rounded-lg' onSubmit={handleAddGame}>
        <div className='flex flex-col gap-2 text-gray-300'>
          <label className="font-bold" htmlFor="name">Nome do Game</label>
          <Input value={gameTitle} onChange={e => setGameTitle(e.target.value)} name='name' id='name' type='text' placeholder='League of Legends' />
        </div>

        <div className='flex flex-col gap-2 text-gray-300'>
          <label className="font-bold" htmlFor="imageURL">URL da Imagem</label>
          <Input value={imgUrl} onChange={e => setImgUrl(e.target.value)} name='imageURL' id='imageURL' type='text' placeholder='Digite sua senha aqui' />
        </div>

        <footer className='mt-4 flex-row items-center space-y-4'>
          <button
            className='bg-fuchsia-600 w-full px-5 h-12 rounded-md font-semibold flex items-center justify-center gap-3 hover:bg-fuchsia-700'
            type='submit'
          >
            <Plus size={24} />
            Cadastrar Novo Game
          </button>
          <Link
            to='/'
            className='bg-fuchsia-600 w-full px-5 h-12 rounded-md font-semibold flex justify-center items-center gap-3 hover:bg-fuchsia-700'
            type='submit'
          >
            <House size={24} />
            Retornar a Home
          </Link>
        </footer>
      </form>
    </div>
  )
}