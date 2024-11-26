import React, { useEffect, useState } from "react";
import axios from "../utils/axios";
import { Link, useParams } from "react-router-dom";
import CircularProgressBar from "./CircularProgressBar";
import { FaBookmark, FaHeart, FaPlay } from "react-icons/fa6";
import Card from "../components/Card";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import Cast from "./Cast";

const MovieDetails = () => {
  const [movieData, setMovieData] = useState([{}]);
  const [video, setVideo] = useState([]);
  const [similar, setSimilar] = useState([]);
 const [cast, setCast] = useState([])
  const [watchProvider, setWatchProvider] = useState({})

  const { mediaType, movieId } = useParams();

  const GetMovieDetails = async () => {
    try {
      const { data } = await axios.get(`${mediaType || 'movie'}/${movieId}`);
      setMovieData(data);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const GetVideos = async () => {
    try {
      const { data } = await axios.get(`${mediaType}/${movieId}/videos`);
      const trailer = (data?.results).filter((vdo)=>vdo.type==='Trailer')
      setVideo(trailer);
      
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const GetSimilar = async () => {
    try {
      const { data } = await axios.get(`${mediaType}/${movieId}/similar`);
      setSimilar(data.results);
    } catch (error) {
      console.log("Error: ", error);
    }
  };
  const GetCast = async () => {
    try {
      const { data } = await axios.get(`${mediaType}/${movieId}/credits`);
      const finalCast= (data.cast).filter((cst)=>cst.profile_path!=null)
      setCast(finalCast);
      console.log(finalCast);
      
    } catch (error) {
      console.log("Error: ", error);
    }
  };
  
  const GetWatchProvider = async () => {
    try {
      const { data } = await axios.get(`${mediaType}/${movieId}/watch/providers`);
  
      // Extract US region or fallback to null if undefined
      const usProviders = data?.results?.US;
      
      // Check for flatrate, rent, or buy providers in US region
      const provider = usProviders?.flatrate?.[0] || usProviders?.rent?.[0] || usProviders?.buy?.[0];
      
      if (provider) {
        setWatchProvider(provider);
      } else {
        console.log("No watch provider available for the US region.");
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };
  
  
  useEffect(() => {
    GetMovieDetails();
    GetVideos();
    GetSimilar();
    GetCast()
    GetWatchProvider()
  }, [movieId]);

  const getReleaseYear = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).getFullYear();
  };

  return (
    <div className="w-full h-full bg-[#1f1e24]">
      <div
        className="w-full h-[80vh] flex gap-10 items-center px-16 bg-cover bg-left-top bg-no-repeat relative z-0"
        style={{
          backgroundImage: `linear-gradient(to bottom right, rgba(31.5, 10.5, 10.5, 1), rgba(31.5, 10.5, 10.5, 0.84)), url(https://image.tmdb.org/t/p/original${movieData?.backdrop_path})`,
        }}
      >
        <div className="w-[300px] h-[450px] min-w-[300px] rounded-lg overflow-hidden relative">
          <img
            className="poster w-full "
            src={`https://image.tmdb.org/t/p/original${movieData?.poster_path}`}
            alt={movieData?.title || movieData?.name}
          />
          <div className="absolute bg-[#032541] w-full h-16 bottom-0 left-0 z-10 flex justify-center items-center gap-4">
            <img className="w-10 h-10" src={`https://image.tmdb.org/t/p/original${watchProvider?.logo_path}`} alt="" />
            <div className="leading-tight">
            <h2 className="text-md font-medium text-zinc-400">Now Streaming</h2>
            <h2 className="text-md font-bold text-zinc-200">Watch Now</h2>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <h1 className="text-5xl font-bold text-zinc-200">
              {movieData?.title || movieData?.name}
            </h1>
            <span className="text-4xl font-medium text-zinc-400">
              (
              {getReleaseYear(
                movieData?.release_date ||
                  movieData?.last_air_date ||
                  movieData.first_air_date
              )}
              )
            </span>
          </div>
          <div className="flex gap-2 items-center">
            <span className="text-md text-zinc-200 flex gap-4">
              {movieData?.release_date ||
                movieData?.last_air_date ||
                movieData.first_air_date}
            </span>
            <span className="text-2xl text-zinc-200">•</span>
            <span className="text-md text-zinc-200">
              {movieData?.genres?.map((gen) => gen.name).join(", ") || "N/A"}{" "}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <CircularProgressBar
              size={70}
              progress={(movieData?.vote_average * 10).toFixed(1)}
              strokeWidth={5}
            />
            <span className="text-lg text-zinc-200 font-semibold">
              User Score
            </span>
          </div>
          <div className="flex gap-5">
            <div className="flex gap-3">
              <div className="w-14 h-14 bg-[#032541] rounded-full flex justify-center items-center text-zinc-200 text-xl cursor-pointer">
                <FaHeart />
              </div>
              <div className="w-14 h-14 bg-[#032541] rounded-full flex justify-center items-center text-zinc-200 text-xl cursor-pointer">
                <FaBookmark />
              </div>
            </div>
            <Link
              to={`https://www.youtube.com/watch?v=${video[0]?.key}`}
              className="text-zinc-200 text-lg font-semibold flex items-center gap-2 cursor-pointer hover:text-zinc-400"
            >
              <FaPlay /> Play Trailer
            </Link>
          </div>
          <div>
            <h1 className="text-[20px] text-zinc-100 font-semibold">
              Overview
            </h1>
            <p className="text-zinc-200">{movieData?.overview}</p>
          </div>
        </div>
      </div>
      <div className=" px-5 mt-14 ">
       <h1 className="text-2xl text-zinc-200 font-semibold mb-5">Cast</h1>
       <Swiper slidesPerView={8} mousewheel={true} >
        {
          cast.slice(0,10).map((item,i)=>(<SwiperSlide key={i} className="overflow-visible"> <Link to={`/people/details/${item.id}`}><Cast  cast={item} /></Link></SwiperSlide>  ) )
        }
       </Swiper>
        
      </div>
      <div className="px-5 my-10 bg-transparent">
        <h1 className="text-2xl text-zinc-200 font-semibold mb-5">Related {mediaType==='movie'?'Movies':'Tv Shows'}</h1>
        <Swiper slidesPerView={7} spaceBetween={20}>
          {similar?.map((item) => (
            <SwiperSlide key={item.id} className="bg-transparent">
              <Card item={item} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default MovieDetails;
