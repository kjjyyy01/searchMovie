const resultUl = document.querySelector("#cardArea");
const searchBtn = document.querySelector("#searchBtn");
const searchInput = document.querySelector("#searchInput");
const modal = document.querySelector("#modal");
const clModal = document.querySelector("#close");

const options = {
    method: "GET",
    headers: {
        accept: "application/json",
        Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmODIyZGRlNzlmMTM4OTJiODNmNGQwZWYyODA1N2NjNyIsIm5iZiI6MTczNjI5NzI1MC4xNzcsInN1YiI6IjY3N2RjYjIyMTI2Njc5Njg4NTRlNTIwNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.SmP-bGfzsthwXW1aqN7W3Zr64qf-keRNMH0gn6HPW9A",
    },
};

let movies = [];

//* 데이터 읽어오는 함수
function fetchMovie() {
    fetch(
        "https://api.themoviedb.org/3/movie/popular?language=ko&page=1",
        options
    )
        .then((res) => res.json())
        .then((res) => {
            movies = res.results;
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
    const filteredMovie = movies.filter(function (movie) {
        return movie["title"].toLowerCase().includes(keyword);
    });
    console.log(filteredMovie);

    const movieCards = Array.from(document.getElementsByClassName("movieCard"));
    console.log(movieCards);
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

//todo 포스터 ,상세정보, 제목, 개봉일, 평점 넣기 불러오기
//* 모달창 여는 함수
function openModal() {
    resultUl.addEventListener("click", () => {
        modal.showModal();
    });
}
openModal();

//* 모달창 닫는 함수
function closeModal() {
    clModal.addEventListener("click", () => {
        modal.close();
    });
}
closeModal();

//! dialog 태그 사용해서 해보기!
//* 이벤트 리스너 모음
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
