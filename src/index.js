/**
 * es6 modules and imports
 */

import sayHello from './hello';
sayHello('World');
/**
 * require style imports
 */
const {getMovies} = require('./api.js');
let movieArray;

function postMovies() {
  $("#movie-box").html("<h1 id='load-head'>LOADING...</h1>");
  getMovies().then((movies) => {
    console.log('Here are all the movies:');
    movieArray = movies;
    console.log(movieArray);
    $("#movie-box").html("<h1 id='load-head'>LOADING...</h1>");
    movies.forEach(({title, rating, id}) => {

      console.log(`id#${id} - ${title} - rating: ${rating}`);

      $("#movie-box").append(`<section class="card-div"><div class="card">id#${id} - ${title} - rating: ${rating}</div><button class="delete-button">This movie is garbage</button><button class="edit-button" id="${id}">Fix what this says.</button></section>`);
    });

    $('.delete-button').click(function () {
        let buttonId = $(this).next().attr('id');
        deletePost(buttonId);
    });

    $('.edit-button').click(function() {
      let editId = $(this).attr('id');
      console.log(editId);
      let editMovie = movieArray[editId - 1];
      $('aside').html(`<form><label for="rename-title">Movie Title Here</label>
            <input type="text" id="rename-title">
            <label for="edit-rating">Edit Rating</label>
            <input type="text" id="edit-rating">
            <input type="submit" id="submit-edit"></form>`)
    });


  }).then(function () {
    $('#load-head').hide('')
  }).catch((error) => {
    alert('Oh no! Something went wrong.\nCheck the console for details.')
    console.log(error);
  })
}

let lastElementOnLoad;
let highestIdOnLead;
  postMovies();

$( document ).ready(function() {
  getMovies().then((movies) => {
    movieArray = movies;
    lastElementOnLoad = movieArray.length - 1;
    highestIdOnLead = movieArray[lastElementOnLoad].id;
  })
});

let maybeId = 0;
let newId;

let submitBtn = document.getElementById("submit");
submitBtn.addEventListener("click", function() {
  if (highestIdOnLead > maybeId) {
    newId = highestIdOnLead + 1;
    maybeId = highestIdOnLead + 1;
  } else {
    newId = maybeId + 1;
    maybeId += 1;
  }
  console.log(newId);
  let newTitle = $("#movie-title").val();
  let newRating = $("#ratings").val();
  let newMovieObject = {
    "title": newTitle,
    "rating": newRating,
    "id": newId
  };
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newMovieObject),
  };
  fetch('api/movies', options).then((movies) => {
    movieArray = movies;
  }).then(() => {
    postMovies()
    $("#movie-box").html("");
  })

      .catch(console.log("Panic"));
      //=== Clears text from text box after submitted
      $("#movie-title").val("");
      $("#ratings").val("");
});

function deletePost(postId) {
  const url = `api/movies/${postId}`;
  const options = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // function deletePost(postId) {
  //   const url = `api/movies/${postId}`;
  //   const options = {
  //     method: 'DELETE',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //   };

  fetch(url, options).then((movies) => {
    movieArray = movies;
  }).then(() => {
    postMovies();
  })
}



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
