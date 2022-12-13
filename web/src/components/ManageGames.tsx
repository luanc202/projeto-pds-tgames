import { Check, X } from 'phosphor-react'
import { useEffect, useState } from 'react'
import { api } from '../lib/axios';

interface Game {
  id: string,
  title: string,
  bannerUrl: string,
  _count: {
    ads: number,
  },
  isActive: boolean,
}

export function ManageGames() {
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    api.get('/games').then(response => {
      setGames(response.data);
    });
  }, []);

  async function handleChangeGameStatus(id: string, status: boolean) {
    await api.post(`/games/${id}`, {
      isActive: !(status),
    });

    api.get('/games').then(response => {
      setGames(response.data);
    });
  }

  return (
    <div className="mx-auto flex flex-col items-start my-20">
      <div className="table w-full table-auto bg-[#2A2634] text-white border-separate border-spacing-2 border-2 border-zinc-700 rounded-lg">
        <div className='table-header-group'>
          <div className='table-row'>
            <div className='table-cell text-center font-bold'>Id do Game</div>
            <div className='table-cell text-center font-bold'>Nome</div>
            <div className='table-cell text-center font-bold'>Banner Url</div>
            <div className='table-cell text-center font-bold'>Anúncios</div>
            <div className='table-cell text-center font-bold'>Status</div>
          </div>
        </div>
        <div className='table-row-group'>
          {games.map(game => {
              return (
                <div className='table-row text-center' key={game.id}>
                  <div className='table-cell p-2 bg-zinc-900 rounded-lg hover:bg-zinc-700'>{game.id}</div>
                  <div className='table-cell bg-zinc-900 rounded-lg hover:bg-zinc-700 px-1'>{game.title}</div>
                  <div className='table-cell bg-zinc-900 rounded-lg hover:bg-zinc-700 px-1'>{game.bannerUrl}</div>
                  <div className='table-cell bg-zinc-900 rounded-lg hover:bg-zinc-700'>{game._count.ads}</div>
                  <div onClick={() => handleChangeGameStatus(game.id, game.isActive)} className='hover:cursor-pointer table-cell align-middle bg-zinc-900 rounded-lg hover:bg-zinc-700'>{game.isActive ? <Check className='w-4 h-4 text-emerald-400 bg-[#4A357D] ml-4 ' /> : <X className='w-4 h-4 text-red-600 bg-purple-900 ml-4' />}</div>
                </div>
              )
          })}
        </div>
      </div>
    </div>
  )
}