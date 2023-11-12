

export const editDom = (() => {
    const addLines = (pooler, week1, logo) => {
        const section = document.createElement('div');
        const elementPooler = document.createElement('div');
        const elementWeek1 = document.createElement('div');
        const img = document.createElement('img');

        elementPooler.innerHTML = pooler;
        elementWeek1.innerHTML = week1;
        img.setAttribute("src", logo);

        section.className = "participation";
        img.className = "team-logo";

        section.appendChild(elementPooler)
        section.appendChild(elementWeek1)
        section.appendChild(img)

        document.body.appendChild(section);
    };

    return {
        addLines
    }
})();

