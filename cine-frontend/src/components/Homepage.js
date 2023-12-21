import React, { useEffect, useState } from 'react';
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
  const [searchFilter, setSearchFilter] = useState('');
  const [ReleasedINFilter, setReleasedINFilter] = useState('Release Year');
  const [genreFilter, setGenreFilter] = useState('Genre');
  const [platformFilter, setPlatformFilter] = useState('Platform');
  const [MoviesWithFilters, setMoviesWithFilters] = useState([]);
  const getSearchedMovie = async () => {
    const url = `http://127.0.0.1:8000/moviesapi/movies/?search=${searchFilter}`;
    const response = await axios.get(url);
    console.log(response.data);
    setMoviesWithFilters([...response.data]);
    console.log(MoviesWithFilters);
  };
  useEffect(() => {
    getSearchedMovie();
  }, [searchFilter]);

  return (
    <>
      <Navbar loggedIn={loggedIn} />
      <div className='homeContainer'>
        <div className='searchCont'>
          <div className='searchBox'>
            <input
              placeholder='Search For Movies'
              className='searchInput'
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
            />
            <div className='searchIcons'>
              {searchFilter.length > 0 ? (
                <X onClick={() => setSearchFilter('')} />
              ) : (
                <Search />
              )}
            </div>
          </div>
        </div>
        <div className='filersCont'>
          <div className='filtertext'>Filter</div>
          <div className='switchCont'>
            <div className='switch-inner'>
              <Switch
                onChange={() => setFiltersActive(!filtersActive)}
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
              <option value={'Documentory'}>Documentory</option>
              <option value={'Comedy'}>Comedy</option>
              <option value={'Crime'}>Crime</option>
              <option value={'Romance'}>Romance</option>
              <option value={'Horror'}>Horror</option>
              <option value={'Fantacy'}>Fantacy</option>
            </select>
          </div>
          <div className='filterBox'>
            <label className='selectlabel'>Available On</label>
            <select
              className='selectF'
              value={platformFilter}
              disabled={!filtersActive}
              onChange={(e) => setPlatformFilter(e.target.value)}
            >
              <option value={'all'}>All</option>
              <option value={'Netflix'}>Netflix</option>
              <option value={'AMazonPrime'}>Amazon prime</option>
              <option value={'Youtube'}>Youtube</option>
            </select>
            {/* </div>
            </div> */}
          </div>
        </div>
        <div className='MovieCont'>
          {/* if no search and filters just show all the movies in differnet sections Latest popular best of 2023*/}
          {searchFilter.length == 0 && !filtersActive ? (
            <MoviePageWithoutFilters />
          ) : (
            <>
              {MoviesWithFilters.map((movie) => {
                return <MovieCard movie={movie} />;
              })}
            </>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Homepage;
