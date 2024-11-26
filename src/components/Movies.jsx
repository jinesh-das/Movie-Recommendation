import React from "react";
import { useEffect, useState } from "react";
import Card from "./Card";
import axios from "../utils/axios";
import TopNav from "./TopNav";
import { Link } from "react-router-dom";
import { FaArrowLeft, FaArrowUp } from "react-icons/fa6";
import Shimmer from "./Shimmer";
import InfiniteScroll from "react-infinite-scroll-component";

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  const GetMovies = async () => {
    try {
      const { data } = await axios.get(`/discover/movie?page=${page}`);
      setMovies((prevMovies)=>[...prevMovies, ...data.results]);
      setPage((prevPage)=>prevPage+1);
      if(data.results.length===0) setHasMore(false);
      console.log(data.results);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    GetMovies();
  }, []);

  return (
    <div className="w-full min-h-screen bg-[#1f1e24]">
      <div className="flex items-center   px-10">
        <h1 className="text-2xl font-semibold text-zinc-200 flex items-center gap-2">
          <Link to={"/"}>
            <FaArrowLeft />
          </Link>
          Movies
        </h1>
        <div className="w-full">
          <TopNav />
        </div>
      </div>
      <InfiniteScroll
       className="flex justify-center flex-wrap gap-4 px-10 mt-10"
       dataLength={movies.length}
       next={GetMovies}
       hasMore={hasMore}
       loader={<Shimmer />}
      >
        {
           movies.length ? movies.map((item, index)=><Link key={index} to={`/movie/${item.id}`}><Card  item={item}/></Link>) : <Shimmer count={6}/>  
        }
      </InfiniteScroll>

      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-10 right-10 bg-[#6556CD] text-white p-3 rounded-full shadow-lg hover:bg-blue-700 focus:outline-none group"
      >
        <FaArrowUp className="group-hover:rotate-[360deg] transition-all duration-700" />
      </button>
    </div>

      
      
  );
};

export default Movies;
