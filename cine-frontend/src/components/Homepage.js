import React, { useEffect, useRef, useState } from 'react';
import Navbar from './Navbar';
import { Search, X } from 'lucide-react';
import Switch from 'react-switch';
import '../cssFiles/HomePage.css';
import MoviePageWithoutFilters from './MoviePageWithoutFilters';
import Footer from './Footer';
import AllMovies from './AllMovies';
import axios from 'axios';
import LatestMovies from './LatestMovies';
import MovieCard from './MovieCard';
function Homepage() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [filtersActive, setFiltersActive] = useState(false);
  const [languageFilter, setLanguageFilter] = useState('language');
  const isInitialMount = useRef(true);
  const searchInputRef = useRef(null);
  const [searchFilter, setSearchFilter] = useState(
    localStorage.getItem('search') || ''
  );
  console.log(process.env.REACT_APP_API_URL);
  const [ReleasedINFilter, setReleasedINFilter] = useState('Release Year');
  const [genreFilter, setGenreFilter] = useState('Genre');
  // const [platformFilter, setPlatformFilter] = useState('Platform');
  const [MoviesWithFilters, setMoviesWithFilters] = useState([]);
  const [nofilter, setNofilter] = useState(
    filtersActive &&
      languageFilter == 'all' &&
      ReleasedINFilter == 'all' &&
      genreFilter == 'all'
  );
  const itemsPerPage = 15;

  const [visibleMovies, setVisibleMovies] = useState(itemsPerPage);
  const [originalVisibleMovies, setOriginalVisibleMovies] =
    useState(itemsPerPage);

  const showMoreMovies = () => {
    setOriginalVisibleMovies(visibleMovies);
    setVisibleMovies((prevVisibleMovies) => prevVisibleMovies + itemsPerPage);
  };
  const getAllMovies = async () => {
    const url = `${process.env.REACT_APP_API_URL}moviesapi/movies/`;
    const response = await axios.get(url);
    // console.log(response.data);
    const all_movies = response.data;
    // setMoviesWithFilters([...all_movies]);
    // console.log(MoviesWithFilters);
    if (nofilter) {
      setMoviesWithFilters([...all_movies]);
      console.log(MoviesWithFilters);
    } else {
      console.log(all_movies);
      const filterMovieSet = all_movies.filter((movie) => {
        return (
          movie.language.includes(
            languageFilter === 'all' ? movie.language : languageFilter
          ) &&
          (movie.release_date.slice(0, 4) ===
            (ReleasedINFilter === 'all'
              ? movie.release_date.slice(0, 4)
              : ReleasedINFilter) ||
            (ReleasedINFilter === 'below' &&
              parseInt(movie.release_date.slice(0, 4)) < 2019)) &&
          movie.genre.includes(
            genreFilter === 'all' ? movie.genre : genreFilter
          )
        );
      });
      console.log(filterMovieSet);
      // setMoviesWithFilters([]);
      setMoviesWithFilters([...filterMovieSet]);
      console.log(MoviesWithFilters);
    }
  };
  const getSearchedMovie = async () => {
    if (searchFilter.length != 0) {
      const url = ` ${process.env.REACT_APP_API_URL}moviesapi/movies/?search=${searchFilter}`;
      const response = await axios.get(url);
      // console.log(response.data);
      const Search_movies = response.data;
      setMoviesWithFilters([...response.data]);
      // console.log(MoviesWithFilters);
      if (nofilter || !filtersActive) {
        setMoviesWithFilters([...Search_movies]);
        console.log(MoviesWithFilters);
      } else {
        console.log(Search_movies);
        const filterMovieSet = Search_movies.filter((movie) => {
          return (
            movie.language.includes(
              languageFilter === 'all' ? movie.language : languageFilter
            ) &&
            (movie.release_date.slice(0, 4) ===
              (ReleasedINFilter === 'all'
                ? movie.release_date.slice(0, 4)
                : ReleasedINFilter) ||
              (ReleasedINFilter === 'below' &&
                parseInt(movie.release_date.slice(0, 4)) < 2019)) &&
            movie.genre.includes(
              genreFilter === 'all' ? movie.genre : genreFilter
            )
          );
        });
        console.log(filterMovieSet);
        // setMoviesWithFilters([]);
        setMoviesWithFilters([...filterMovieSet]);
        console.log(MoviesWithFilters);
      }
    }
  };
  const showLessMovies = () => {
    setVisibleMovies(originalVisibleMovies);
  };
  const getMoviesWithFilters = () => {
    // console.log(MoviesWithFilters, languageFilter);
    const filterMovieSet = MoviesWithFilters.filter((movie) => {
      return (
        movie.language.includes(
          languageFilter === 'all' ? movie.language : languageFilter
        ) &&
        (movie.release_date.slice(0, 4) ===
          (ReleasedINFilter === 'all'
            ? movie.release_date.slice(0, 4)
            : ReleasedINFilter) ||
          (ReleasedINFilter === 'below' &&
            parseInt(movie.release_date.slice(0, 4)) < 2019)) &&
        movie.genre.includes(genreFilter === 'all' ? movie.genre : genreFilter)
      );
    });
    console.log(filterMovieSet);
    // setMoviesWithFilters([]);
    setMoviesWithFilters([...filterMovieSet]);
    console.log(MoviesWithFilters);
  };
  useEffect(() => {
    if (searchFilter.length == 0) {
      getAllMovies();
      localStorage.setItem('search', '');

      // getMoviesWithFilters();
    } else {
      getSearchedMovie();
      localStorage.setItem('search', searchFilter);
      // getMoviesWithFilters();
    }
  }, [
    searchFilter,
    languageFilter,
    // platformFilter,
    ReleasedINFilter,
    genreFilter,
  ]);
  useEffect(() => {
    if (searchFilter.length == 0) {
      getAllMovies();
    } else {
      getSearchedMovie();
    }
    const handleShortcut = (event) => {
      if (event.ctrlKey && event.key === 'm') {
        searchInputRef.current.focus();
      }
    };

    document.addEventListener('keydown', handleShortcut);

    return () => {
      document.removeEventListener('keydown', handleShortcut);
    };
  }, []);

  useEffect(() => {
    console.log(MoviesWithFilters);
  }, [MoviesWithFilters]);

  const visibleMoviesList = MoviesWithFilters.slice(0, visibleMovies);
  // console.log(visibleMoviesList, MoviesWithFilters);
  return (
    <>
      <Navbar loggedIn={loggedIn} />
      <div className='homeContainer'>
        <div className='searchCont'>
          <div className='searchBox'>
            <input
              ref={searchInputRef}
              placeholder='Search For Movies CTRL+M'
              className='searchInput'
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
            />
            <div className='searchIcons'>
              {searchFilter.length > 0 ? (
                <X
                  style={{ cursor: 'pointer' }}
                  onClick={() => {
                    setSearchFilter('');
                    localStorage.setItem('search', '');
                  }}
                />
              ) : (
                <Search style={{ cursor: 'pointer' }} />
              )}
            </div>
          </div>
        </div>
        <div className='filersCont'>
          <div className='filtertext'>Filter</div>
          <div className='switchCont'>
            <div className='switch-inner'>
              <Switch
                onChange={() => {
                  setFiltersActive(!filtersActive);
                  setLanguageFilter('all');
                  // setPlatformFilter('all');
                  setGenreFilter('all');
                  setReleasedINFilter('all');
                }}
                checked={filtersActive}
                offColor='#ccc'
                onColor='#4caf50'
                height={25}
                className='switch-handle'
                width={50}
                handleDiameter={25}
                uncheckedIcon={false}
                checkedIcon={false}
              />
            </div>
          </div>
          {/* <div className='selectCont'>
            <div className='selectRow'> */}
          <div className='filterBox'>
            <label className='selectlabel'>Language</label>
            <select
              className='selectF'
              value={languageFilter}
              disabled={!filtersActive}
              onChange={(e) => setLanguageFilter(e.target.value)}
            >
              <option value={'all'}>All</option>
              <option value={'Hindi'}>Hindi</option>
              <option value={'Punjabi'}>Punjabi</option>
              <option value={'English'}>English</option>
              <option value={'Tamil'}>Tamil</option>
              <option value={'Telugu'}>Telugu</option>
              <option value={'Gujarati'}>Gujarati</option>
              <option value={'Bhojpuri'}>Bhojpuri</option>
            </select>
          </div>
          <div className='filterBox'>
            <label className='selectlabel'>Release Year</label>
            <select
              className='selectF'
              value={ReleasedINFilter}
              disabled={!filtersActive}
              onChange={(e) => setReleasedINFilter(e.target.value)}
            >
              <option value={'all'}>All</option>
              <option value={'2023'}>2023</option>
              <option value={'2022'}>2022</option>
              <option value={'2021'}>2021</option>
              <option value={'2020'}>2020</option>
              <option value={'2019'}>2019</option>
              <option value={'below'}>{'<2019'}</option>
            </select>
          </div>
          {/* </div> */}
          {/* <div className='selectRow'> */}
          <div className='filterBox'>
            <label className='selectlabel'>Genre</label>
            <select
              className='selectF'
              value={genreFilter}
              disabled={!filtersActive}
              onChange={(e) => setGenreFilter(e.target.value)}
            >
              <option value={'all'}>All</option>
              <option value={'Thriller'}>Thriller</option>
              <option value={'Comedy'}>Comedy</option>
              <option value={'Crime'}>Crime</option>
              <option value={'Romance'}>Romance</option>
              <option value={'Horror'}>Horror</option>
              <option value={'fantacy'}>Fantacy</option>
            </select>
          </div>
          {/* <div className='filterBox'> */}
          {/* <label className='selectlabel'>Available On</label> */}
          {/* <select
              className='selectF'
              value={platformFilter}
              disabled={!filtersActive}
              onChange={(e) => setPlatformFilter(e.target.value)}
            >
              <option value={'all'}>All</option>
              <option value={'Netflix'}>Netflix</option>
              <option value={'amazonprime'}>Amazon prime</option>
              <option value={'Youtube'}>Youtube</option>
            </select> */}
          {/* </div>
            </div> */}
          {/* </div> */}
        </div>
        <div className='MovieCont'>
          {/* if no search and filters just show all the movies in differnet sections Latest popular best of 2023*/}
          {searchFilter.length == 0 && !filtersActive ? (
            <MoviePageWithoutFilters />
          ) : (
            <>
              <div className='allMovies'>
                <div className='headText'>All Movies</div>
                <div className='movie-grid'>
                  {MoviesWithFilters.slice(0, visibleMovies).map((movie) => (
                    <MovieCard movie={movie} />
                  ))}
                </div>

                {visibleMovies > itemsPerPage && (
                  <div style={{ marginTop: '10px' }}>
                    <button onClick={showLessMovies}>See Less</button>
                  </div>
                )}

                {visibleMovies < MoviesWithFilters.length && (
                  <div style={{ marginTop: '10px' }}>
                    <button onClick={showMoreMovies}>See More</button>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Homepage;
