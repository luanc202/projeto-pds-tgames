import { useContext, useEffect, useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import { GameHeader } from "../components/GameHeader";
import { UserAdCard } from "../components/UserAdCard";
import { AuthContext } from "../context/AuthContext";
import { api } from "../lib/axios";

interface UserInfo {
  name: string,
  yearsPlaying: number,
  discord: string,
  weekDays: string[],
  hourStart: string,
  hourEnd: string,
  useVoiceChannel: boolean,
}

interface GameData {
  id: string,
  title: string,
  bannerUrl: string,

}

export function GameAds() {
  const { user } = useContext(AuthContext);

  const gameId = String(useLoaderData());

  const [ads, setAds] = useState<UserInfo[]>([]);
  const [gameData, setGameData] = useState<GameData>({} as GameData);

  useEffect(() => {
    api.get(`/games/${gameId}/ads`).then(response => {
      setAds(response.data);
    });

    api.get('http://localhost:3333/games').then(response => {
      setGameData(response.data.filter((game: GameData) => game.id === gameId)[0]);
    });
  }, []);


  if (!user.name) {
    return (
      <div className='max-w-[1344px] mx-auto flex flex-col items-center my-20'>
        <h1 className='text-4xl font-bold text-gray-300'>Você não tem permissão para acessar essa página.</h1>
      </div>
    )
  }

  else {
    return (
      <div className='max-w-[1344px] mx-auto flex flex-col items-start my-20'>
        <Link to='/'>
          <GameHeader
            bannerUrl={gameData.bannerUrl}
            title={gameData.title} />
        </Link>
        <div className='grid grid-cols-3 gap-6 mt-12'>
          {ads.map(ad => {
            return (
              <UserAdCard
                key={ad.discord + Math.random()}
                name={ad.name}
                yearsPlaying={ad.yearsPlaying}
                discord={ad.discord}
                hourStart={ad.hourStart}
                hourEnd={ad.hourEnd}
                weekDays={ad.weekDays}
                voiceChat={ad.useVoiceChannel}
              />
            )
          })}
        </div>
      </div>

    )
  }
}