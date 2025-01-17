import { options } from "./api.js";

//* 검색 api를 통한 검색 기능
// 검색 버튼 클릭 시 검색이 될 수 있도록 호출, 엔터키 누를 시 검색이 될 수 있도록 호출
export function searchMovies(keyword, makeCard, cardContainer) {
    const searchUrl = `https://api.themoviedb.org/3/search/multi?query=${keyword}&include_adult=false&language=ko&page=1`;

    fetch(searchUrl, options)
        .then((res) => res.json())
        .then((moviesData) => {
            if (moviesData.results.length > 0) {
                makeCard(moviesData);
            } else {
                cardContainer.innerHTML = `<p class="searchResultNo">검색결과가 없습니다.</p>`;
            }
        })
        .catch((err) => console.error("Fetch Error!!!!", err));
}
