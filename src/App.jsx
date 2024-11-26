import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MovieDetails from './components/MovieDetails';
import Movies from './components/Movies';
import TvSHow from './components/TvSHow';
import People from './components/People';
import PeopleDetails from './components/PeopleDetails';

// Lazy loading components
const Home = lazy(() => import('./components/Home'));
const Trending = lazy(() => import('./components/Trending'));
const Popular = lazy(() => import('./components/Popular'));

const NotFound = () => import('./components/NotFound');

const App = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/trending' element={<Trending />} />
          <Route path='/popular' element={<Popular />} />
          <Route path='/movies' element={<Movies />} />
          <Route path='/tv-shows' element={<TvSHow />} />
          <Route path='/people' element={<People />} />
          <Route path='/trending/:mediaType/:movieId' element={<MovieDetails/>} />
          <Route path='/popular/:mediaType/:movieId' element={<MovieDetails/>} />
          <Route path='/:mediaType/:movieId' element={<MovieDetails/>} />
          <Route path='/:mediaType/:movieId' element={<MovieDetails/>} />
          <Route path='/:mediaType/:movieId' element={<MovieDetails/>} />
          <Route path='/search/:mediaType/:movieId' element={<MovieDetails/>} />
          <Route path='/people/details/:id' element={<PeopleDetails/>} />
          <Route path='/movieDetails/:mediaType/:movieId' element={<MovieDetails/>}/>
          <Route path='/people/movie/:movieId' element={<MovieDetails/>}/>
          <Route path='*' element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
