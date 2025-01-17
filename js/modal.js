//* 모달 여는 함수
// 카드를 클릭 시 모달이 열릴 수 있게 모달 열기 이벤트 리스너에 호출
export function openModal(modal, info) {
    modalInfo(modal, info); // 모달에 정보를 렌더링
    modal.showModal();
}

//* 모달 닫는 함수
// 닫기 버튼 클릭시 모달이 닫힐 수 있게 모달 닫기 이벤트 리스너에 호출
export function closeModal(modal) {
    modal.close();
}

//* 모달에 정보 HTML화 시키는 함수
// 모달을 열면 정보가 랜더링되기 위해 모달 여는 함수에 호출
export function modalInfo(modal, info) {
    const { title, vote_average, poster_path, overview, release_date } = info;

    const makeModal = `
    <div id="modalContent">
        <span id="close" class="closeButton">&times;</span>
        <img class="modalPoster" src="https://image.tmdb.org/t/p/w500${poster_path}" alt="${title}포스터">
        <h1 class="modalTitle">${title}</h1>
        <p class="overview">${overview}</p>
        <p class="releaseDate">개봉일: ${release_date}</p>
        <p class="modalVoteAverage">⭐: ${vote_average}</p>
    </div>`;
    modal.innerHTML = makeModal;
}
