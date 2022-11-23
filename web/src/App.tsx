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

      <h1 className='text-6xl text-white font-black mb-36'>
        <span className='bg-name-gradient bg-clip-text text-transparent'>TinderGames</span>
      </h1>

      <h1 className='text-6xl text-white font-black mt-20 '>
        Seu <span className='bg-nlw-gradient bg-clip-text text-transparent'>parceiro</span> está aqui.
      </h1>

      <div className='grid grid-cols-6 gap-6 mt-16'>
        <GameBanner
          title='League of Legends'
          bannerUrl='/image 1.png'
          adsCount={4}
        />
        <GameBanner
          title='Apex Legends'
          bannerUrl='/image 5.png'
          adsCount={4}
        />
        <GameBanner
          title='Counter Strike Global Offensive'
          bannerUrl='/image 3.png'
          adsCount={4}
        />
        <GameBanner
          title='World of Warcraft'
          bannerUrl='/image 7.png'
          adsCount={4}
        />
        <GameBanner
          title='Dota 2'
          bannerUrl='/image 2.png'
          adsCount={4}
        />
        <GameBanner
          title='Fortnite'
          bannerUrl='/image 6.png'
          adsCount={4}
        />
      </div>
      <Dialog.Root>
        <CreateAdBanner />

        <CreateAdModal />
      </Dialog.Root>
    </div>
  )
}

export default App
