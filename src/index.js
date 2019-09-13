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
  $("#load-head").css("z-index", "50");
  getMovies().then((movies) => {
    movieArray = movies;
    let movieVariable = "";
    console.log(movieVariable);
    movies.forEach(({title, rating, id}) => {
      movieVariable += `<section class="card-div card"><div class="card-body">id#${id} - ${title} - rating: ${rating}</div><button class="delete-button">This movie is garbage</button><button class="edit-button" id="${id}">Fix what this says.</button></section>`
    $("#movie-box").html(movieVariable);
    });
    console.log(movieVariable);


    $('.delete-button').click(function () {
        let buttonId = $(this).next().attr('id');
        deletePost(buttonId);
    });

    $('.edit-button').click(function() {
      let editId = $(this).attr('id');
      console.log(editId);
      const url = `api/movies/${editId}`;
      fetch(url).then(function (movieToEdit) {
        return movieToEdit.json().then(function (movieToEdit) {
          console.log(movieToEdit);
          $('aside').html(`<label for="rename-title">Movie Title Here</label>
              <input type="text" id="rename-title" value="${movieToEdit.title}">
              <label for="edit-rating">Edit Rating</label>
              <input type="text" id="edit-rating" value="${movieToEdit.rating}">
              <input type="submit" id="submit-edit" class="${editId}">`);

          $("#submit-edit").click(function() {
            let submitBtn = $(this).attr("class");
            const url = `api/movies/${submitBtn}`;
            fetch(url).then(function(editCinema) {
              return editCinema.json().then(function (relavent) {
                let newTitle = $("#rename-title").val();
                let newRating = $("#edit-rating").val();
                let newMovieObject = {
                  "title": newTitle,
                  "rating": newRating,
                  "id": relavent.id
                };
                addEditedMovie(newMovieObject);
              })
            })
          })

        }).then((movies) => {
            movieArray = movies;
          }).then(() => {
            postMovies();
            $("#load-head").css("z-index", "-50");
          });
        });
      })
    //Makes loading text disappear.
    }).then(function () {
    $('#load-head').css("z-index", "-50");
  }).catch((error) => {
    alert('Oh no! Something went wrong.\nCheck the console for details.');
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
    postMovies();
    $("#load-head").css("z-index", "-50");
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

  fetch(url, options).then((movies) => {
    movieArray = movies;
  }).then(() => {
    postMovies();
  })
}

function addEditedMovie(editedMovie) {
  const url = `api/movies/${editedMovie.id}`;
  const options = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(editedMovie),
  };

  fetch(url, options).then((movies) => {
    movieArray = movies;
  }).then(() => {
    postMovies();
    $("#load-head").css("z-index", "-50");
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
