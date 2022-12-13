import { Link } from "react-router-dom";

interface GameBannerProps {
    bannerUrl: string;
    title: string;
    adsCount: number;
    linkTo: string;
}

export function GameBanner(props: GameBannerProps) {
    return (
        <Link to={`/game/${props.linkTo}`} className='relative rounded-lg overflow-hidden'>
          <img src={props.bannerUrl} alt="" />

          <div className='w-full pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0 left-0 right-0'>
            <strong className='font-bold text-white block'>{props.title}</strong>
            <span className='text-zinc-300 text-sm block'>{props.adsCount} anúncios</span>
          </div>
        </Link>
    )
}