import React from 'react'
import { BiSolidMoviePlay } from "react-icons/bi";
import { RiFireFill } from "react-icons/ri";
import { BsStars } from "react-icons/bs";
import { RiMovie2Fill } from "react-icons/ri";
import { ImTv } from "react-icons/im";
import { HiMiniUserGroup } from "react-icons/hi2";
import { IoInformationCircle } from "react-icons/io5";
import { MdLocalPhone } from "react-icons/md";
import { Link } from 'react-router-dom';

const SideNav = () => {
    return (
        <div className='w-[20%] h-full border-r-2 border-zinc-400 p-5'>
            <Link to={"/"} className='flex text-xl  items-center font-semibold gap-2 text-white hover:shadow-[#6556CD] shadow-lg rounded-lg p-2'><BiSolidMoviePlay className='text-2xl text-[#6556CD]' /> JD MOVIES</Link>

            <nav className='flex flex-col text-zinc-300 text-lg gap-4 mt-5'>
                <h1 className='font-semibold text-xl'>New Feeds</h1>
                
                <Link to={'/trending'} className='flex items-center gap-2 hover:bg-[#6556CD] hover:text-white delay-300 rounded-lg p-4 cursor-pointer'><RiFireFill />Trending</Link>
                <Link to={'/popular'} className='flex items-center gap-2 hover:bg-[#6556CD] hover:text-white delay-300 rounded-lg p-4 cursor-pointer'><BsStars/>Popular</Link>
                <Link to={'/movies'} className='flex items-center gap-2 hover:bg-[#6556CD] hover:text-white delay-300 rounded-lg p-4 cursor-pointer'> <RiMovie2Fill/>Movies</Link>
                <Link to={'/tv-shows'} className='flex items-center gap-2 hover:bg-[#6556CD] hover:text-white delay-300 rounded-lg p-4 cursor-pointer'><ImTv/>Tv Shows</Link>
                <Link to={'/people'} className='flex items-center gap-2 hover:bg-[#6556CD] hover:text-white delay-300 rounded-lg p-4 cursor-pointer'> <HiMiniUserGroup/>People</Link>

            </nav>
            <hr className='border-none h-[2px] bg-zinc-400'/>
            <nav className='flex flex-col text-zinc-200 text-lg gap-4 mt-5'>
                <h1 className='font-semibold text-xl'>Website Info.</h1>
                
                <a className='flex items-center gap-2 hover:bg-[#6556CD] hover:text-white delay-300 rounded-lg p-4 cursor-pointer'><IoInformationCircle/>About JD MOVIES</a>
                <a className='flex items-center gap-2 hover:bg-[#6556CD] hover:text-white delay-300 rounded-lg p-4 cursor-pointer'><MdLocalPhone/>Contact</a>
               
            </nav>
        </div>
    )
}

export default SideNav