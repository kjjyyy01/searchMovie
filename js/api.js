export const options = {
    method: "GET",
    headers: {
        accept: "application/json",
        Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmODIyZGRlNzlmMTM4OTJiODNmNGQwZWYyODA1N2NjNyIsIm5iZiI6MTczNjI5NzI1MC4xNzcsInN1YiI6IjY3N2RjYjIyMTI2Njc5Njg4NTRlNTIwNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.SmP-bGfzsthwXW1aqN7W3Zr64qf-keRNMH0gn6HPW9A",
    },
};

//* 데이터 읽어오는 함수
export function fetchMovie(makeCard) {
    fetch(
        "https://api.themoviedb.org/3/movie/popular?language=ko&page=1",
        options
    )
        .then((res) => res.json())
        .then((res) => {
            makeCard(res);
        })
        .catch((err) => console.error("fetch error!!!", err));
}
