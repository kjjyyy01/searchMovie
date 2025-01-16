export function searchMovies(keyword, movies, makeCard, cardContainer) {
    const filteredMovies = movies.filter((movie) =>
        movie["title"].toLowerCase().includes(keyword)
    );

    if (filteredMovies.length > 0) {
        makeCard({ results: filteredMovies });
    } else {
        cardContainer.innerHTML = `<p class="searchResultNo">검색결과가 없습니다.</p>`;
    }
}
