import './App.css';
import Header from './Header';
import MoviePoster from './MoviePoster';
import { useEffect, useState } from 'react';

// GENERAL PSEUDO CODE
// 1. Page loads/mounts "upcoming movies" in theatre on page load via an API call. Movie data will be displayed once on page load.
// 2. Another separate API call is made on page load to fetch genre categories and create a drop down menu of all the genres. 
// 3. This gives the user the option to filter the upcoming movies into categories based on genre after form submission.


function App() {
    // 3. store the movie API data thats fetched in state.
    const [ movieData, setMovieData ] = useState([]);
    // 2. API call is made and will render movie data once on page load.
    useEffect(() => {
      fetchMovies();
      }, []);
  // 1. Create a function that fetches upcoming movie data from an API. 
    const fetchMovies = () => {
      const url = new URL(`https://api.themoviedb.org/3/movie/upcoming`);
      url.search = new URLSearchParams({
      api_key: `4d17ba0490e1fa0dcff61ffcfe3e0764`,
      format: "json",
      language: 'en-US',
      page: 1,
    });

    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(dataApi => {
        console.log(dataApi.results);  
        setMovieData(dataApi.results);
      })
      .catch(error => {
        console.log(error);
      });
  };
  // Map through the array of movieData stored in state and display it on the page. Key value also passed. Pass movieData via props in MoviePoster component.
  return (
    <main className="wrapper">
      <Header />
      {movieData.map((movie, key) => {
        return (
        // <p key={key}>{movie.title}</p>
          <MoviePoster movie={movie} key={key} />
        )
      })}
    </main>
  );

}

export default App;
