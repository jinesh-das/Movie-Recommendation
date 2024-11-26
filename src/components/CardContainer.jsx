import React, { useEffect, useState } from 'react';
import Card from './Card';
import axios from '../utils/axios';
import Dropdown from './Dropdown';
import Shimmer from './Shimmer';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Link } from 'react-router-dom';



const CardContainer = () => {

  const [trendingMovies, setTrendingMovies] = useState([])
  const [filteredData, setFilteredData] = useState('all')

  // console.log(filteredData);

  const GetTrendingMovies = async () => {
    try {
      const { data } = await axios.get(`trending/${filteredData}/day`);
      // console.log(data); 
      setTrendingMovies(data.results);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  useEffect(() => {
    GetTrendingMovies()
  }, [filteredData])


  return (
    <div
      className='flex flex-col p-5 gap-5 mb-5'
    >
      <div className='flex justify-between '>
        <h1 className='text-2xl text-zinc-100 font-bold'>Trending Movies & Tv show</h1>
        <Dropdown title={'filter'} options={['tv', 'movie', 'all']} fn={(e) => { setFilteredData(e.target.value) }} />
      </div>
      <div className='scroller flex gap-4  overflow-x-auto whitespace-nowrap'>
      <Swiper slidesPerView={5} spaceBetween={20}>

        {
          trendingMovies.length ? trendingMovies.map((items, index) => (
            <SwiperSlide key={index} className="bg-transparent" >
            <Link to={`/movieDetails/${items.media_type}/${items.id}`}><Card  item={items} /></Link>
            </SwiperSlide>
            )) : <Shimmer count={6} />
        }
      </Swiper>
      </div>
    </div>
  );
};

export default CardContainer;
