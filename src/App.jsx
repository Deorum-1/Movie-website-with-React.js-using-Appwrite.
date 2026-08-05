import React, { useEffect, useState } from 'react'
import Search from './components/Search'
import Spinner from './components/Spinner'
import MovieCard from './components/MovieCard';

const API_BASE_URL = 'https://api.themoviedb.org/3'

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`
  }
};


const App = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [movieList, setMovieList] = useState([])
  const [isLoading, setIsLoading]= useState(false)


  // calling the API
  const fetchMovies = async (query= '') => {
    setIsLoading(true);
    setErrorMessage('');
    // trying to call the API
  try {
    const endpoint = query ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}` : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
    // endpoint is where we are calling the API from
    const response = await fetch(endpoint, API_OPTIONS);
    // Response expected from the API
    if (!response.ok) { //If our response from the API fails, throw an error
      throw new Error('Failed to fetch movies')
    }
    const data = await response.json()
    console.log(data)
    if (data.response === 'False') {
      setErrorMessage(data.error || 'Failed to fetch movies')
      setMovieList([])
      return;
    }
    setMovieList(data.results ||[])
  } catch(error) {
    console.error(`Error fetching movies: ${error}`)
    setErrorMessage('Error fetching movies. Please try again')
  } finally {
    setIsLoading(false);
  }
}


  
  useEffect(() => { // we use useEffect to call an API
    fetchMovies(searchTerm);
  //   fetch(`${API_BASE_URL}/discover/movie?sort_by=popularity.desc`, API_OPTIONS)
  // .then(res => res.json())
  // .then(res => console.log(res))
  //     .catch(err => setErrorMessage('Error fetching movies. Please try again'));
  }, [searchTerm])
  

  return (
    <main className='pattern'>
      <div className='wrapper'>
        <header>
          <img src="./hero.png" alt="Hero banner" />
          <h1>Find <span className='text-gradient'>Movies</span> You'll Enjoy Without the Hassle</h1>
        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </header>

        <section className='all-movies'>
          <h2 className='mt-5'>All Movies</h2>
          {isLoading && <Spinner />}
       {errorMessage ? <p className='text-red-500'>{errorMessage}</p> : (<ul>
            { movieList.map((movie) => (
              
               
              <MovieCard key={movie.id}  movie={movie} />
                
             
            ))}
          </ul>)}
        </section>
      </div>
    </main>
  )
}

export default App