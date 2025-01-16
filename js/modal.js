//* 모달 여는 함수
export function openModal(modal, info) {
    modalInfo(modal, info); // 모달에 정보를 렌더링
    modal.showModal();
}

//* 모달 닫는 함수
export function closeModal(modal) {
    modal.close();
}

//* 모달에 정보 렌더링하는 함수
export function modalInfo(modal, info) {
    const { title, vote_average, poster_path, overview, release_date } = info;

    const makeModal = `
    <div id="modalContent">
        <span id="close" class="closeButton">&times;</span>
        <img class="modalPoster" src="https://image.tmdb.org/t/p/w500${poster_path}" alt="${title}포스터">
        <h1 class="modalTitle">${title}</h1>
        <p class="overview">${overview}</p>
        <p class="releaseDate">개봉일: ${release_date}</p>
        <p class="modalVoteAverge">⭐: ${vote_average}</p>
    </div>`;
    modal.innerHTML = makeModal;
}
