import React, { useEffect, useState } from 'react'
import Search from './components/Search'
import Spinner from './components/Spinner'

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

  const fetchMovies = async () => {
    setIsLoading(true);
    setErrorMessage('');
  try {
    const endpoint = `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
    const response = await fetch(endpoint, API_OPTIONS);
    
    if (!response.ok) {
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
    setIsLoading(true);
  }
}


  
  useEffect(() => {
    fetchMovies();
  //   fetch(`${API_BASE_URL}/discover/movie?sort_by=popularity.desc`, API_OPTIONS)
  // .then(res => res.json())
  // .then(res => console.log(res))
  //     .catch(err => setErrorMessage('Error fetching movies. Please try again'));
  }, [])
  

  return (
    <main className='pattern'>
      <div className='wrapper'>
        <header>
          <img src="./hero.png" alt="Hero banner" />
          <h1>Find <span className='text-gradient'>Movies</span> You'll Enjoy Without the Hassle</h1>
        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </header>

        <section className='all-movies'>
          <h2>All Movies</h2>
          <Spinner />
       {errorMessage ? <p className='text-red-500'>{errorMessage}</p> : (<ul>
            { movieList.map((movie) => (
              <li key={movie.id}>
                {/* <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                <p className='text-white'>{movie.title}</p>
                <p>Rating: {movie.vote_average}</p> */}
              </li>
            ))}
          </ul>)}
        </section>
      </div>
    </main>
  )
}

export default App