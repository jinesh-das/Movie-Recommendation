import React, { useEffect, useState } from 'react'
import { FaFacebook } from 'react-icons/fa6'
import { IoLogoYoutube } from 'react-icons/io5'
import { RiTwitterXLine } from 'react-icons/ri'
import { SiInstagram } from 'react-icons/si'
import axios from '../utils/axios'
import { Link, useParams } from 'react-router-dom'
import MovieCreditCard from './MovieCreditCard'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";


const PeopleDetails = () => {
 const [peopleDetails, setPeopleDetails] = useState([])
 const [peoplesIds, setPeoplesIds] = useState([])
 const [ movieCredits, setMovieCredits] = useState([])
 const [readMore, setReadMore] = useState(true)
 const {id} = useParams();
  const GetPeopleDetails= async ()=>{
    try {
    const { data } = await axios.get(`/person/${id}`);
    //  console.log(data);
    setPeopleDetails(data)
    
    }
    catch(error){
      console.log(error);
      
    }
  }

  const GetPeoplesIds = async ()=>{
    try{
      const {data} = await axios.get(`/person/${id}/external_ids`);
      // console.log(data);
      setPeoplesIds(data)
    }catch(error){
      console.log(error);
    }
  }

  const GetMovieCredits = async () => {
    try {
      const { data } = await axios.get(`/person/${id}/movie_credits`);
      
      // Fallback to data.crew if data.cast is empty or unavailable
      const movieList = data.cast.length > 0 ? data.cast : data.crew;
      
      // Filter and sort the list (either cast or crew) by release date
      const finalList = movieList
        .filter((item) => item.poster_path || item.backdrop_path) // Ensure movie has a valid image
        .sort((a, b) => new Date(b.release_date) - new Date(a.release_date)); // Sort by release date
      
      setMovieCredits(finalList); // Set filtered and sorted movie credits to state
      console.log(finalList);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(()=>{
    GetPeopleDetails()
    GetPeoplesIds()
    GetMovieCredits()
  },[id])

  return (
    <div className='w-full min-h-screen bg-[#1f1e24] text-zinc-200 flex gap-3 p-8'>
      <div className='w-1/4 min-h-screen  flex flex-col items-center gap-8 '>
        <div className='w-[90%] rounded-lg overflow-hidden '>
          <img src={`https://image.tmdb.org/t/p/original${peopleDetails?.profile_path}`} alt="" />
        </div>
        <div className='w-[75%] text-3xl text-[#6556CD] flex gap-5 items-center'>
          
           
           {peoplesIds.facebook_id && <Link to={`https://www.facebook.com/${peoplesIds.facebook_id}`}><FaFacebook /></Link>}
           {peoplesIds.instagram_id && <Link to={`https://www.instagram.com/${peoplesIds.instagram_id}`}><SiInstagram /></Link>}
           {peoplesIds.twitter_id && <Link to={`https://x.com/${peoplesIds.twitter_id}`}><RiTwitterXLine /></Link>}
           {peoplesIds.youtube_id &&  <Link to={`https://www.youtube.com/${peoplesIds.youtube_id}`}><IoLogoYoutube /></Link>}
           
          
        </div>
        <div className='flex items-start flex-col w-[75%]'>
          <h2 className='text-xl font-bold'>Personal Info</h2>
          <div className='flex flex-col gap-4 mt-4'>
            <div className='text-base'>
            <div className='font-bold'>Known For</div>
            <div>{peopleDetails.known_for_department}</div>
            </div>
            <div>
            <div className='font-bold'>Known Credits</div>
            <div>{peopleDetails.popularity}</div>
            </div>
            <div>
            <div className='font-bold'>Gender</div>
            <div>{peopleDetails.gender===1 ? 'Female':'Male'}</div>
            </div>
            <div>
            <div className='font-bold'>Birthday</div>
            <div>{peopleDetails.birthday}</div>
            </div>
            <div>
            <div className='font-bold'>Place of Birth</div>
            <div>{peopleDetails.place_of_birth}</div>
            </div>
          </div>
        </div>
      </div>
      <div className='w-3/4 min-h-screen  px-5 flex flex-col gap-6'>
        <div>
           <h2 className='text-4xl font-bold'>{peopleDetails.name}</h2>
        </div>
        <div>
          <h3 className='text-lg font-semibold'>Biography</h3>
         {peopleDetails.biography ? <p >{readMore ? peopleDetails.biography.slice(0,300): peopleDetails.biography } <span className='text-[#6556CD] font-bold cursor-pointer' onClick={()=>setReadMore(!readMore)}>{readMore ? '...read more' : 'show less'}</span></p> : <p>We don't have a biography of {peopleDetails.name}</p>}
        </div>
        <div className='flex flex-col gap-3'>
          <h3 className='text-lg font-semibold'>Known For</h3>
          <div className='w-full flex gap-3'>
            {movieCredits && movieCredits.length > 0 ? (
              <Swiper
                slidesPerView={6}
                spaceBetween={20}
                // **No Pagination and Navigation Modules**
                // breakpoints={{
                //   320: { slidesPerView: 2, spaceBetween: 20 },
                //   640: { slidesPerView: 3, spaceBetween: 30 },
                //   768: { slidesPerView: 4, spaceBetween: 40 },
                //   1024: { slidesPerView: 8, spaceBetween: 40 },
                //   1280: { slidesPerView: 8, spaceBetween: 40 },
                // }}
                className="mySwiper"
              >
                {movieCredits.slice(0, 20).map((movie) => (
                  <SwiperSlide key={movie.id} className="bg-transparent">
                    <Link to={`/people/movie/${movie.id}`}><MovieCreditCard items={movie} /></Link>

                  </SwiperSlide>
                ))}
              </Swiper>
            ) : (
              <p>No movie credits available.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PeopleDetails