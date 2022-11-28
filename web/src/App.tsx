import { useEffect, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog'
import { GameBanner } from './components/GameBanner';

import { CreateAdBanner } from './components/CreateAdBanner';

import './styles/main.css';

import logoImg from './assets/Logo.svg';
import { CreateAdModal } from './components/CreateAdModal';
import axios from 'axios';

interface Game {
  id: string,
  title: string,
  bannerUrl: string,
  _count: {
    ads: number,
  }
}

function App() {
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    axios('http://localhost:3333/games').then(response => {
      setGames(response.data);
    });
  }, []);

  return (
    <div className='max-w-[1344px] mx-auto flex flex-col items-center my-20'>

      <h1 className='text-6xl text-white font-black mb-32'>
        <span className='bg-name-gradient bg-clip-text text-transparent'>TinderGames</span>
      </h1>

      <h1 className='text-6xl text-white font-black mt-20 '>
        Seu <span className='bg-nlw-gradient bg-clip-text text-transparent'>parceiro</span> está aqui.
      </h1>

      <div className='grid grid-cols-6 gap-6 mt-16'>
      {games.map(game => {
          return (
            <GameBanner
              key={game.id}
              title={game.title}
              bannerUrl={game.bannerUrl}
              adsCount={game._count.ads}
            />
          )
        })}
      </div>
      <Dialog.Root>
        <CreateAdBanner />

        <CreateAdModal />
      </Dialog.Root>
    </div>
  )
}

export default App
