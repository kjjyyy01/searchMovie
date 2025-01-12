//* ul태그에 접근
const resultUl = document.querySelector("#cardArea");
const searchBtn = document.querySelector("#searchBtn");
const searchInput = document.querySelector("#searchInput");
const Modal = document.querySelector("#modal");
const Close = document.querySelector("#close");

const popularMoviesUrl =
    "https://api.themoviedb.org/3/movie/popular?language=ko&page=1";

const options = {
    method: "GET",
    headers: {
        accept: "application/json",
        Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmODIyZGRlNzlmMTM4OTJiODNmNGQwZWYyODA1N2NjNyIsIm5iZiI6MTczNjI5NzI1MC4xNzcsInN1YiI6IjY3N2RjYjIyMTI2Njc5Njg4NTRlNTIwNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.SmP-bGfzsthwXW1aqN7W3Zr64qf-keRNMH0gn6HPW9A",
    },
};

let popularMoviesArr = [];

//* 데이터 읽어오는 함수
function fetchMovie() {
    fetch(popularMoviesUrl, options)
        .then((res) => res.json())
        .then((res) => {
            popularMoviesArr = res.results;
            makeCard(res);
        })
        .catch((err) => console.error("fetch error!!!", err));
}
fetchMovie();

//* 데이터 뿌려주는 함수
function makeCard(movies) {
    let makeLi = "";
    let movieData = movies.results;

    movieData.forEach((movie) => {
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
    resultUl.innerHTML = makeLi;
}

//*검색 기능 함수
function searchMovies(keyword) {
    const filteredMovie = popularMoviesArr.filter(function (movie) {
        return movie["title"].toLowerCase().includes(keyword);
    });
    console.log(filteredMovie);

    const movieCards = document.querySelectorAll(".movieCard");
    movieCards.forEach((card) => {
        const cardTitle = card
            .querySelector(".title")
            .textContent.toLowerCase();
        if (
            filteredMovie.some(
                (movie) => movie.title.toLowerCase() === cardTitle
            )
        ) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });
}

searchBtn.addEventListener("click", () => {
    const keyword = searchInput.value.toLowerCase();
    searchMovies(keyword);
});

searchInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        const keyword = searchInput.value.toLowerCase();
        searchMovies(keyword);
    }
});

//* 모달창 여는 함수
function openModal() {
    resultUl.addEventListener("click", function (event) {
        console.log(event.target);
        //todo 모달 제목, 내용 까지 신경써야함
        Modal.style.display = "block";
    });
}
openModal();

//* 모달창 닫는 함수 & 닫기 버튼
function closeModal() {
    Close.addEventListener("click", function () {
        Modal.style.display = "none";
    });
}
closeModal();
