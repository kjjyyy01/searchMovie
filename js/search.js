import { options } from "./api.js";

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
