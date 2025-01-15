import { fetchMovie } from "./api.js";

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
        let moviePoster = `https://image.tmdb.org/t/p/w500${movie["poster_path"]}`;
        let movieTitle = movie["title"];
        let movieVoteAvg = movie["vote_average"];
        let movieId = movie["id"];
        makeLi += `
        <li class="movieCard" id="${movieId}">
            <img class="poster"src="${moviePoster}" alt="">
            <p class="title">${movieTitle}</p>
            <p class="voteAvg">⭐: ${movieVoteAvg}</p>
        </li>
        
        `;
    });
    cardContainer.innerHTML = makeLi;
}

fetchMovie(makeCard);

//*검색 기능 함수
function searchMovies(keyword) {
    const filteredMovies = movies.filter((movie) =>
        movie["title"].toLowerCase().includes(keyword)
    );
    console.log(filteredMovies);

    if (filteredMovies.length > 0) {
        makeCard({ results: filteredMovies });
    } else {
        cardContainer.innerHTML = `<p class="searchResultNo">검색결과가 없습니다.</p>`;
    }
}

//* 모달 여는 함수
function openModal() {
    cardContainer.addEventListener("click", (e) => {
        const clickMovieId = e.target.closest(".movieCard").id;

        const sameMovieId = movies.find((movie) => movie.id == clickMovieId);

        modalInfo(sameMovieId);
        modal.showModal();
    });
}
openModal();

//* 모달 닫는 함수
function closeModal() {
    modal.addEventListener("click", (e) => {
        if (e.target.id === "close") {
            modal.close();
        }
    });
}
closeModal();

//* 모달에 정보 넣는 함수
function modalInfo(info) {
    const { title, vote_average, poster_path, overview, release_date } = info;

    const makeModal = `
    <div id="modalContent">
        <span id="close">&times;</span>
        <img src="https://image.tmdb.org/t/p/w500${poster_path}"
            alt="">
        <h1>${title}</h1>
        <p class="modalTitle">상세 정보: ${overview}</p>
        <p class="modalTitle">개봉일: ${release_date}</p>
        <p>평점: ${vote_average}</p>
    </div>
    
    
    `;
    modal.innerHTML = makeModal;
}

//* 이벤트 리스너 모음
searchButton.addEventListener("click", () => {
    const keyword = searchInputArea.value.toLowerCase();
    searchMovies(keyword);
});

searchInputArea.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        const keyword = searchInputArea.value.toLowerCase();
        searchMovies(keyword);
    }
});
