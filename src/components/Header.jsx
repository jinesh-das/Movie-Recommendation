import React, { useEffect, useState } from 'react';
import axios from '../utils/axios';
import { CiCalendar } from "react-icons/ci";
import { Link } from 'react-router-dom';

const Header = () => {
    const [headerWallpaper, setHeaderWallpaper] = useState(null); // Changed to null instead of array
    const [video, setVideo] = useState([]);

    const GetHeaderWallpaper = async () => {
        try {
            const { data } = await axios.get('trending/all/day');
            if (data.results && data.results.length > 0) {
                const wallpaper = data.results[Math.floor(Math.random() * data.results.length)];
                setHeaderWallpaper(wallpaper); 
                console.log(wallpaper);
                
                // Store a single object, not array
            } else {
                console.log("No results found in API response.");
            }
        } catch (error) {
            console.log("Error: ", error);
        }
    };

    useEffect(() => {
        GetHeaderWallpaper();
    }, []);

    return (
        <div 
            style={{
                backgroundImage: headerWallpaper && headerWallpaper.backdrop_path 
                    ? `linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.2), rgba(0,0,0,0.8)), url(https://image.tmdb.org/t/p/original${headerWallpaper.backdrop_path})`
                    : 'none',
            }}
            className='w-full h-[70vh] bg-cover bg-top bg-no-repeat flex flex-col justify-end p-8 gap-3'
        >
            {headerWallpaper && (
                <>
                    <h1 className='text-5xl font-bold text-white'>{headerWallpaper?.original_title || headerWallpaper?.name}</h1>
                    <p className='text-white w-[50%]'>{headerWallpaper?.overview}</p>
                    <div>
                        <span className='flex gap-2 text-white items-center'>
                            <CiCalendar className='text-yellow-600 text-xl'/> 
                            {headerWallpaper?.release_date || headerWallpaper?.first_air_date}
                        </span>
                    </div>
                    {/* Uncomment if you want the watch button */}
                    <Link to={`https://www.youtube.com/watch?v=${video[0]?.key}`} className='bg-[#6556CD] text-white w-[10%] p-2 rounded-lg font-medium'>Watch now</Link>
                </>
            )}
        </div>
    );
};

export default Header;
