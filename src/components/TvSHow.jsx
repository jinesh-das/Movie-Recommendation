import React from 'react' 
import { useEffect, useState } from 'react'
import Card from './Card'
import axios from '../utils/axios'
import { FaArrowLeft, FaArrowUp } from 'react-icons/fa6'
import TopNav from './TopNav'
import { Link } from 'react-router-dom'
import InfiniteScroll from 'react-infinite-scroll-component'
import Shimmer from './Shimmer'

const TvSHow = () => {
    const [tvShows, setTvShows] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(1);

    const GetTvShows = async () => {
        try {
            const {data} = await axios.get(`/discover/tv?page=${page}`);
            setTvShows((prevTv)=>[...prevTv, ...data.results]);
            setPage(page+1);
            if(data.results.length===0) setHasMore(false);
        }
        catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        GetTvShows();
    }, []);


  return (
    <div className='w-full min-h-screen bg-[#1f1e24]'>
        <div className="flex items-center   px-10">
        <h1 className="text-2xl font-semibold text-zinc-200 flex items-center gap-2 w-full">
          <Link to={"/"}>
            <FaArrowLeft />
          </Link>
          Tv Shows
        </h1>
        <div className="w-full">
          <TopNav />
        </div>
      </div>
      <InfiniteScroll 
      className="flex justify-center flex-wrap gap-4 px-10 mt-10"
      dataLength={tvShows.length}
      hasMore={hasMore}
      next={GetTvShows}
      >
        {tvShows.length ? tvShows.map((tvShow)=><Link key={tvShow.id} to={`/tv/${tvShow.id}`}><Card  item={tvShow}/></Link>) : <Shimmer count={6}/>}
      </InfiniteScroll> 

      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-10 right-10 bg-[#6556CD] text-white p-3 rounded-full hover:bg-blue-700 focus:outline-none group"
      >
        <FaArrowUp className="group-hover:rotate-[360deg] transition-all duration-700" />
      </button>
    </div>
  )
}

export default TvSHow