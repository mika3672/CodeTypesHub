/**
 *Ce code fonctionne avec launch_v2 en filtrant les liens de decli color présent dans le DOM
 */

(function (data_attribute_stringified) {
    let allColorLinks = document.querySelectorAll(`[class="hidden_for_me"][id="link"]`);
    let filterAllColorLinks = new Set();
    allColorLinks.forEach((allColorLink) => filterAllColorLinks.add(allColorLink.textContent));
    let links = Array.from(filterAllColorLinks);
    let listColor = links.map((link) => {
        let splitColor = link.split(`colore-`)[1];
        return splitColor.includes(`taglia`) ? splitColor.split(`/`)[0] : splitColor;
    });

    let singleColor = listColor.filter((value, index, self) => self.indexOf(value) === index);

    let objectColor = {};

    for (let i = 0; i < links.length; i++) {
        for (let j = 0; j < singleColor.length; j++) {
            if (links[i].includes(singleColor[j])) {
                if (!objectColor[singleColor[j]]) {
                    objectColor[singleColor[j]] = []; // Initialiser une liste pour chaque couleur
                }
                objectColor[singleColor[j]].push(links[i]);
            }
        }
    }

    let finalLinks = [];
    let colors = Object.keys(objectColor);
    colors.forEach((color) => {
        finalLinks.push(objectColor[color][0]);
    });

    return finalLinks.join(`<!LIST!>`);
})(`DATA_ATTRIBUTE_INSTANCE_LIVE_SCRAPPER_SPOT`);
