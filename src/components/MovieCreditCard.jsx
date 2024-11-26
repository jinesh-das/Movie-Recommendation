import React from 'react';

const MovieCreditCard = ({ items }) => {
    const { backdrop_path, poster_path, original_title, title } = items;

    // Use a placeholder image if neither poster nor backdrop is available
    const imageUrl = `https://image.tmdb.org/t/p/original${poster_path || backdrop_path}` || 'path/to/placeholder-image.jpg'; // Replace with your placeholder image path

    return (
        <div className='w-full flex flex-col gap-2 hover:scale-95 transition-transform duration-300 cursor-pointer'>
            <div className='w-full rounded-lg overflow-hidden shadow-lg'>
                <img
                    className='w-full h-auto' // Ensures the image fits the card width
                    src={imageUrl}
                    alt={original_title || title || "Movie poster"}
                />
            </div>
            <div className='flex justify-center truncate w-full px-2'>
                <h3 className='text-center text-sm font-semibold'>
                    {original_title || title}
                </h3>
            </div>
        </div>
    );
};

export default MovieCreditCard;
