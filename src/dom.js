
export const editDom = (() => {
    const addPlayersCount = (count) => {
        document.querySelector('.header__stats-section__list__item__result').innerHTML = count;
    };

    const addCurrentWeek = (week) => {
        document.querySelector('.header__stats-section__top-result').innerHTML = week;
    };

    return {
        addPlayersCount,
        addCurrentWeek
    }
})();

