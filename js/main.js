import { fetchMovie } from "./api.js";
import { searchMovies } from "./search.js";
import { openModal, closeModal } from "./modal.js";

const cardContainer = document.querySelector("#cardContainer");
const searchButton = document.querySelector("#searchBtn");
const searchInputArea = document.querySelector("#searchInput");
const modal = document.querySelector("#modal");

let movies = [];

//* 데이터 뿌려주는 함수
function makeCard(moviesData) {
    movies = moviesData.results;
    let makeLi = "";

    movies.forEach((movie) => {
        let moviePoster = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
        let movieTitle = movie.title;
        let movieVoteAvg = movie.vote_average;
        let movieId = movie.id;
        makeLi += `
        <li class="movieCard" id="${movieId}">
            <img class="poster"src="${moviePoster}" alt="${movieTitle}포스터">
            <p class="title">${movieTitle}</p>
            <p class="voteAvg">⭐: ${movieVoteAvg}</p>
        </li>
        
        `;
    });
    cardContainer.innerHTML = makeLi;

    openModal(cardContainer, movies, modal);
}

fetchMovie(makeCard);

//* 이벤트 리스너 모음
searchButton.addEventListener("click", () => {
    const keyword = searchInputArea.value.toLowerCase();
    searchMovies(keyword, movies, makeCard, cardContainer);
});

searchInputArea.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        const keyword = searchInputArea.value.toLowerCase();
        searchMovies(keyword, movies, makeCard, cardContainer);
    }
});

closeModal(modal);
