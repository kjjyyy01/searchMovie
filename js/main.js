const cardContainer = document.querySelector("#cardArea");
const searchButton = document.querySelector("#searchBtn");
const searchInputArea = document.querySelector("#searchInput");
const modal = document.querySelector("#modal");
const modalClose = document.querySelector("#close");

const options = {
    method: "GET",
    headers: {
        accept: "application/json",
        Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmODIyZGRlNzlmMTM4OTJiODNmNGQwZWYyODA1N2NjNyIsIm5iZiI6MTczNjI5NzI1MC4xNzcsInN1YiI6IjY3N2RjYjIyMTI2Njc5Njg4NTRlNTIwNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.SmP-bGfzsthwXW1aqN7W3Zr64qf-keRNMH0gn6HPW9A",
    },
};

//* 데이터 읽어오는 함수
function fetchMovie() {
    fetch(
        "https://api.themoviedb.org/3/movie/popular?language=ko&page=1",
        options
    )
        .then((res) => res.json())
        .then((res) => {
            movies = res.results;
            movieId = movies;
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
    cardContainer.innerHTML = makeLi;
}

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

    makeModal = `
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
