var normalizedMovies = movies.slice(0, 100).map((movie) => {
  return {
    title: movie.Title.toString(),
    year: movie.movie_year,
    categories: movie.Categories.split('|'),
    summary: movie.summary,
    imdbId: movie.imdb_id,
    imdbRating: movie.imdb_rating,
    runtime: movie.runtime,
    language: movie.language,
    trailer: `https://youtube.com/watch?v=${movie.ytid}`,
    bigPoster: `https://i3.ytimg.com/vi/${movie.ytid}/maxresdefault.jpg`,
    smallPoster: `https://i3.ytimg.com/vi/${movie.ytid}/hqresdefault.jpg`,
  };
});
/* Array toplami yangi obyekt tugashi */


let elSearchForm = $(".js-search-form");
let elSearchTitleInput = $(".js-search-form__title-input", elSearchForm);
let elSearchRatingInput = $(".js-search-form__rating-input", elSearchForm);
let elSearchGanreSelect = $(".js-search-form__genre-select", elSearchForm);
let elSearchSortSelect = $(".js-search-form__sort-select", elSearchForm);

let elSearchResults = $(".search-results");

let elSearchResultTemplate = $("#search-result-template").content;
/* Faqatgina ozgaruvchilar yozilgam bu yerga */

let renderResult = (searchResult) => {
  elSearchResults.innerHTML = ""

  let elResultFragment = document.createDocumentFragment()

  searchResult.forEach(movie => {
    let elMovie = elSearchResultTemplate.cloneNode(true)

    $(".movie__poster", elMovie).src = movie.bigPoster
    $(".movie__title", elMovie).textContent = movie.title
    $(".movie__year", elMovie).textContent = movie.year
    $(".movie__rating", elMovie).textContent = movie.imdbRating
    $(".movie__trailer-link", elMovie).href = movie.trailer


    elResultFragment.appendChild(elMovie)
  })

  elSearchResults.appendChild(elResultFragment)
}



let createGenreSelectOptions = () => {
  let moviesCategories = [];

  normalizedMovies.forEach(movie => {
    movie.categories.forEach(category => {
      if (!moviesCategories.includes(category)) {
        moviesCategories.push(category);
      }
    })

  })
  moviesCategories.sort();

  let elOptionsFragment = document.createDocumentFragment();

  moviesCategories.forEach(category => {
    let elCategoryOption = createElement("option", "", category);
    elCategoryOption.value = category;

    elOptionsFragment.appendChild(elCategoryOption);
  })

  elSearchGanreSelect.appendChild(elOptionsFragment);
}
createGenreSelectOptions()


let sortSearchResults = (results, sortTypee) => {
  if (sortTypee === "az") {
    return results.sort((a, b) => {
      if (a.title > b.title) {
        return 1;
      } else if (a.title < b.title) {
        return -1;
      } else {
        return 0;
      }
    });
  } else if (sortTypee === "za") {
    return results.sort((a, b) => {
      if (a.title < b.title) {
        return 1;
      } else if (a.title > b.title) {
        return -1;
      } else {
        return 0;
      }
    });
  } else if (sortTypee === "rating_desc") {
    return results.sort((a, b) => {
      if (a.imdbRating < b.imdbRating) {
        return 1;
      } else if (a.imdbRating > b.imdbRating) {
        return -1;
      } else {
        return 0;
      }
    });
  } else if (sortTypee === "rating_asc") {
    results.forEach(result => {
      console.log(result.imdbRating);
    })
    return results.sort((a, b) => {
      if (a.imdbRating > b.imdbRating) {
        return 1;
      } else if (a.imdbRating < b.imdbRating) {
        return -1;
      } else {
        return 0;
      }
    });
  } else if (sortTypee === "year_descn") {
    results.forEach(result => {
      console.log(result.year);
    })
    return results.sort((a, b) => {
      if (a.year > b.year) {
        return 1;
      } else if (a.year < b.year) {
        return -1;
      } else {
        return 0;
      }
    });
  } else if (sortTypee === "year_desco") {
    results.forEach(result => {
      console.log(result.year);
    })
    return results.sort((a, b) => {
      if (a.year < b.year) {
        return 1;
      } else if (a.year > b.year) {
        return -1;
      } else {
        return 0;
      }
    });
  }
}
let findMovies = (title, raiting, genree) => {
  return normalizedMovies.filter(movie => {
    let doesMatchCategory = genree === "All" || movie.categories.includes(genree);

    return movie.title.match(title) && movie.imdbRating > raiting && doesMatchCategory;
  })
}


/* bu qidituv xizmatini funksiyasi */

elSearchForm.addEventListener("submit", (evt) => {
  evt.preventDefault();

  let inputValue = elSearchTitleInput.value.trim()
  let raitingValue = Number(elSearchRatingInput.value)
  let genre = elSearchGanreSelect.value;
  let sortValue = elSearchSortSelect.value
  let movieTitleRegex = new RegExp(inputValue, 'gi')
  let searchResults = findMovies(movieTitleRegex, raitingValue, genre, sortValue)
  sortSearchResults(searchResults, sortValue)


  renderResult(searchResults)
})

















// let createGenreSelectOptions = () => {
//   let moviesCategories = [];

//   normalizedMovies.slice(0, 50).forEach((movie) => {
//     movie.categories.forEach((category) => {
//       if (!moviesCategories.includes(category)) {
//         moviesCategories.push(category);
//       }
//     })
//   });

//   moviesCategories.sort();

//   let elOptionsFragment = document.createDocumentFragment();

//   moviesCategories.forEach((category) => {
//     let elCategoryOption = document.createElement("option");
//     elCategoryOption.textContent = category;
//     elCategoryOption.value = category;

//     elOptionsFragment.appendChild(elCategoryOption);
//   })

//   elSearchGanreSelect.appendChild(elOptionsFragment);
// }
// createGenreSelectOptions();

// let renderResults = (searchResults) => {
//   elSearchResults.innerHTML = "";

//   let elSearchResultFragment = document.createDocumentFragment();

//   searchResults.forEach((movie) => {
//     let elMovie = elSearchResultTemplate.cloneNode(true);

//     $(".movie__poster", elMovie).src = movie.smallPoster;
//     $(".movie__title", elMovie).textContent = movie.title;
//     $(".movie__year", elMovie).textContent = movie.year;
//     $(".movie__rating", elMovie).textContent = movie.imdbRating;
//     $(".movie__trailer-link", elMovie).href = movie.trailer;

//     elSearchResultFragment.appendChild(elMovie);
//   });

//   elSearchResults.appendChild(elSearchResultFragment);
// }

// let findMovies = (title, minRating, genre) => {
//   return normalizedMovies.filter((movie) => {
//     let doesMatchCategory = genre === "All" || movie.categories.includes(genre);

//     return movie.title.match(title) && movie.imdbRating >= minRating && doesMatchCategory;
//   })
// }

// elSearchForm.addEventListener("submit", (evt) => {
//   evt.preventDefault();

//   let searchTitle = elSearchTitleInput.value.trim();
//   let movieTitleRegex = new RegExp(searchTitle, "gi");

//   let minimumRating = Number(elSearchRatingInput.value);

//   let genre = elSearchGanreSelect.value;

//   let searchResults = findMovies(movieTitleRegex, minimumRating, genre);

//   renderResults(searchResults);
// });