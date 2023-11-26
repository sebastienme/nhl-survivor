
export const editDom = (() => {
    const addPlayersCount = (count) => {
        document.querySelector('.header__stats-section__list__item__resutl').innerHTML = count;
    }

    return {
        addPlayersCount
    }
})();

