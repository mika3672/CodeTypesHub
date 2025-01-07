/**
 * Changer la localisation et le currency et injecter les variants dans une variable appelé resp
 *
 * ------------------------Consigne --------------------------
 * ne pas utiliser de virtual display
 * Ne pas reload la page avec window.location.reload()
 *
 *
 * Exemple de marque pour la fonction : Couture Kingdom, Luxenter, Skinchemist
 */

let url = 'https://www.couturekingdom.com//localization';
let xhr = new XMLHttpRequest();
xhr.open('POST', url, false);
let formData = new FormData();
formData.append('form_type', 'localization');
formData.append('utf8', '✓');
formData.append('_method', 'put');
formData.append('return_to', window.location.pathname);
formData.append('country_code', 'FR');
xhr.send(formData);

// Injecter les données dans une variable
function getResponse(link) {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', link, false);
    xhr.send();
    let resp;
    if (xhr.status == 200) resp = JSON.parse(xhr.response);
    return resp;
}
let loc = location.href.split('?')[0];

// Injecter les variants dans une variable resp
window.resp = getResponse(loc + '.js');
