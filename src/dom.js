import { dataMethods } from "./data";

export const editDom = (() => {
    const addMostCommonTeamPhoto = (team) => {
        const img = document.querySelector('.header__stats-section__list__item__logo.most-common');
        img.src = `/src/images/${dataMethods.getLogo(team)}`;
    }

    return {
        addMostCommonTeamPhoto
    }
})();

