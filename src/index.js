/**
 * es6 modules and imports
 */

import sayHello from './hello';
sayHello('World');
/**
 * require style imports
 */
const {getMovies} = require('./api.js');
// const {addMovies} = require('./api.js');

getMovies().then((movies) => {
  console.log('Here are all the movies:');
  movies.forEach(({title, rating, id}) => {
    console.log(`id#${id} - ${title} - rating: ${rating}`);
    $("#movie-box").append(`<div class="card">id#${id} - ${title} - rating: ${rating}</div>`)
  });
}).catch((error) => {
  alert('Oh no! Something went wrong.\nCheck the console for details.')
  console.log(error);
});

let submitBtn = document.getElementById("submit");
submitBtn.addEventListener("click", function() {
  // console.log("test");
})



  // function() {
  //   const newMovieTitle = $("#movie-title").val();
  //   console.log("newMovieTitle");
  // };
const testMovie = {
  "title": "Pulp Fiction",
  "rating": "5",
  "id": 3
};

const url = 'api/movies';
const options = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(testMovie),
};
fetch(url, options)
    .then(getMovies())
    .catch(console.log("Panic"));


/**
 *
 * 0. Create loading message.
 *      in order: load page, fetch api, check to see if content is loaded
 *      (if no after a certain amount of time has passed: display 'L' and check again. repeat until content is loaded)
 * 1. Create connection to db.json in place of api via Ajax request J
 * 2. Make button to Add dropdown a form to add movies
 * 3. Create form that allows the creation of a movie and it's rating
 *
 */
