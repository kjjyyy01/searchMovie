import { fetchMovie } from "./api.js";
import { searchMovies } from "./search.js";
import { openModal, closeModal } from "./modal.js";

const cardContainer = document.querySelector("#cardContainer");
const searchButton = document.querySelector("#searchBtn");
const searchInputArea = document.querySelector("#searchInput");
const modal = document.querySelector("#modal");

let movies = [];

//* 데이터 화면에 랜더링 해주는 함수
// 검색기능에서 검색된 결과를 랜더링해줄때 호출, 인기영화api를 불러올때 인기영화데이터를 받아서 카드를 만들기 위해 호출
function makeCard(moviesData) {
    movies = moviesData.results; //movies를 moviesData.results로 초기화
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
}

fetchMovie(makeCard); //* API 데이터를 가져오고, 가져온 데이터를 makeCard 함수에 전달하여 영화 카드를 생성하는 작업을 수행

//* 검색 버튼 클릭 이벤트 리스너
searchButton.addEventListener("click", () => {
    const keyword = searchInputArea.value.toLowerCase();
    searchMovies(keyword, makeCard, cardContainer);
});

//* 검색 엔터 이벤트 리스너
searchInputArea.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        const keyword = searchInputArea.value.toLowerCase();
        searchMovies(keyword, makeCard, cardContainer);
    }
});

//* 모달 열기
cardContainer.addEventListener("click", (e) => {
    const movieCard = e.target.closest(".movieCard");
    if (!movieCard) return; // 카드 외 클릭 시 무시

    const movieId = movieCard.id;
    const movieInfo = movies.find((movie) => movie.id == movieId);
    if (movieInfo) {
        openModal(modal, movieInfo);
    }
});

//* 모달 닫기
modal.addEventListener("click", (e) => {
    if (e.target.classList.contains("closeButton")) {
        closeModal(modal);
    }
});
