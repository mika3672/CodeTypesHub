/**
 * Fonction pour filtré les liens avec la pagination pour les cas où les produits dans l'instance ne commence pas sur la première page
 *
 * ------------------------Consigne --------------------------
 * Modifier les variables productSelector, paginationType, includesWords et excludesWords en fonction du site
 * Supprimer les console.log en production
 *
 * Exemple de marque : Ales and Co, Alma En Pena, Kickers, Tramas
 */

function fetchProductLinksSync() {
    let pageNum = 1;

    let baseUrl = window.location.href.split('?')[0]; // Enlever les paramètres de requête

    let productsSelector =
        'div[class*="products"] [class*="product"][class*="item"] > a[class*="link"]';
    let paginationType = '?p=';

    let includeWords = ['maglia', 'grembiule', 'calzini']; // Mots à inclure
    let excludeWords = []; // Mots à exclure

    let allFilteredLinks = []; // Tableau pour stocker les liens filtrés
    let isFetching = false; // Flag pour éviter une boucle infinie

    // Fonction pour filtrer les liens
    function filterLinks(links) {
        return links
            .filter((link) => {
                let href = link.href;
                let include = includeWords.some((word) => href.includes(word));
                let exclude = excludeWords.some((word) => href.includes(word));
                return include && !exclude;
            })
            .map((link) => link.href); // Renvoyer directement les URLs filtrées
    }

    // Fonction pour récupérer la page
    function fetchPage(pageNum) {
        let url = `${baseUrl}${paginationType}${pageNum}`;
        let xhr = new XMLHttpRequest();
        xhr.open('GET', url, false);

        xhr.onload = function () {
            if (xhr.status === 200) {
                let parser = new DOMParser();
                let doc = parser.parseFromString(xhr.responseText, 'text/html');
                let productLinks = doc.querySelectorAll(productsSelector);

                // Filtrer les liens
                let filteredLinks = filterLinks(Array.from(productLinks));
                allFilteredLinks = allFilteredLinks.concat(filteredLinks);

                console.log(
                    `Page ${pageNum}: ${filteredLinks.length} liens filtrés trouvés`
                );

                // Si des liens ont été trouvés, continuer la pagination
                if (filteredLinks.length > 0) {
                    pageNum++;
                    fetchPage(pageNum); // Récursion pour la page suivante
                } else {
                    console.log('Pagination terminée.');
                    console.log('Tous les liens filtrés:', allFilteredLinks);
                }
            } else {
                console.error(
                    'Erreur lors du chargement de la page:',
                    xhr.status
                );
            }
        };

        xhr.send();
    }

    // Commencer avec la première page
    fetchPage(pageNum);

    return allFilteredLinks;
}

fetchProductLinksSync();
