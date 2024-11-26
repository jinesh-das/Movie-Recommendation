import React from 'react';
import { FaStar } from "react-icons/fa6";

const Card = (props) => {
   console.log(props);
  const { original_title, title, poster_path, name, backdrop_path, vote_average, vote_count } = props.item


  return (
    <>
      <div className='flex-none flex flex-col bg-black min-w-48 max-w-48 h-96 rounded-lg overflow-hidden cursor-pointer hover:scale-95 transition-all shadow-lg shadow-[#6556CD] mb-10'>
        <div>
          <img className='w-full' src={`https://image.tmdb.org/t/p/original${poster_path || backdrop_path}`} alt="Deadpool Poster" />
        </div>
        <div className='text-lg text-zinc-100 py-3 px-2 flex flex-col gap-2'>
          {(original_title || title || name) && (<h1 className=' truncate max-w-full block leading-[1.2rem]'>{original_title || title || name}</h1>)}
          {vote_average && <span className='flex items-center gap-2 truncate'><FaStar className='text-yellow-500 text-xl' /> {vote_average.toFixed(1)}<span>({vote_count} votes)</span></span>}
        </div>
      </div>

    </>
  );
};

export default Card;
