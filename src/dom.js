
export const buildDom = (() => {
    
    const fadeOutLoader = () => {
        const loaderContainer = document.getElementById("loader-container");
        loaderContainer.style.opacity = 0;
    
        // After fade out, hide the loader
        setTimeout(function () {
            loaderContainer.style.display = "none";
        }, 1250); // Should match the transition duration in CSS
    };

    return {
        fadeOutLoader    
    }
})();

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

