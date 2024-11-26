import React from 'react'

const Cast = (props) => {
    
       const {profile_path,character,name} = props.cast || props.items
  return (
    <div className='bg-[black] w-36 overflow-hidden rounded-lg shadow-lg shadow-[#6556CD] mb-5 cursor-pointer hover:scale-95 transition-all'>
       <div className='w-36 '>
        <img className='w-full' src={`https://image.tmdb.org/t/p/original${profile_path}`} alt="" />
       </div>
       <div className='text-zinc-200 py-4'>
            <h1 className='font-bold pl-2 truncate' >{name}</h1>
           {character && <h1 className='text-sm pl-2 truncate'>{character}</h1>}
       </div>
    </div>
  )
}

export default Cast