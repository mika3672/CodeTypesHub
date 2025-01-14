/**
 * Fonction pour simuler une survol par Florence
 *
 * ------------------------Consigne --------------------------
 * Declarer le selecteur de categorie , faire une parcour sur chaque elements
 * Créer un événement mouseover pour simuler un hover
 * Déclenche le survol sur l'élément , puis pusher les liens Categories
 * Exemple de marque : Tommy Hilfiger/ Descamps
 */

(function (data_attribute_stringified) {
    let hrefAttributes = [];
    let elements = document.evaluate(
        `//li[contains(text(),"Linge")]//..//li[not(contains(text(),"Chemin")) and not(contains(text(),"cadeaux")) and not(contains(text(),"Collection"))]`,
        document,
        null,
        XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
        null
    );

    for (let i = 0; i < elements.snapshotLength; i++) {
        let el = elements.snapshotItem(i);
        let hoverEvent = new MouseEvent(`mouseover`, { 
            bubbles: true
        });
        el.dispatchEvent(hoverEvent);  
        
        let select = document.querySelectorAll(`ul li[class="nav-link"] a:not([href*="decouvrir"])`);
        for (let i = 0; i < select.length; i++) {
            hrefAttributes.push(select[i].getAttribute(`href`));
        }
    }

    return hrefAttributes.join(`<!LIST!>`);
})(`DATA_ATTRIBUTE_INSTANCE_LIVE_SCRAPPER_SPOT`);
