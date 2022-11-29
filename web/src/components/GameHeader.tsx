interface GameHeaderProps {
  bannerUrl: string;
  title: string;
}

export function GameHeader(props: GameHeaderProps) {
  return (
    <div className='w-[56rem] h-[10rem] flex items-center'>
        <img className="w-[7rem] h-[10rem] rounded-md" src={props.bannerUrl} alt={props.title} />
        <h1 className='pl-6 font-black text-white text-7xl block'>{props.title}</h1>
    </div>
  )
}