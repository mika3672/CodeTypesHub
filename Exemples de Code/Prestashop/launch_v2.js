/**
 * Ce code permet de resoudre les problèmes de decli size qui passe avant decli color
 *
 * A mettre dans launch JS
 * exemple: https://www.vacanzeitaliane.com/index.php?id_product=679&id_product_attribute=3604&rewrite=costume-intero-manila&controller=product&id_lang=1#/30-taglia-l/46-colore-lime
 */

// Etat pour gérer les requêtes en cours
let requestState = {
    block1: false,
    block3: false,
    sizeOptions: [],
    filterLinks: new Set(),
};

let idColor = location.href.split(`#/`)[1];
idColor = idColor.split(`-color`)[0];
idColor = idColor.includes(`-taglia`) ? idColor.split(`/`)[1] : idColor;
const productId = document.querySelector(`input[id="product_page_product_id"]`).getAttribute(`value`);
let xhr = new XMLHttpRequest();

// Bloc 1
function executeFirstBlock() {
    requestState.sizeOptions = document.querySelectorAll(`[class="product-information"] [id="group_1"] input`);
    requestState.block1 = requestState.sizeOptions.length;

    requestState.sizeOptions.forEach((sizeOption) => {
        let data = new FormData();
        data.append(`controller`, `product`);
        data.append(`id_product`, productId);
        data.append(`id_customization`, `0`);
        data.append(`group[1]`, sizeOption.getAttribute(`value`));
        data.append(`group[2]`, idColor);
        data.append(`qty`, `1`);
        data.append(`quickview`, `0`);
        data.append(`ajax`, `1`);
        data.append(`action`, `refresh`);
        data.append(`quantity_wanted`, `1`);

        xhr.open(`POST`, `${location.origin}/index.php`, false);
        xhr.send(data);

        if (xhr.status === 200) {
            let resp = JSON.parse(xhr.responseText);
            let container = document.createElement(`div`);
            container.setAttribute(`class`, `hidden_for_me`);
            container.setAttribute(`id`, sizeOption.getAttribute(`value`) + `-` + sizeOption.textContent);
            container.innerHTML = resp.product_variants;
            document.body.appendChild(container);

            requestState.block1--;
            if (requestState.block1 === 0) {
                executeSecondBlock();
            }
        }
    });
}

// Bloc 2
function executeSecondBlock() {
    let colors = document.querySelectorAll(`[class="hidden_for_me"] [id="group_2"] input`);
    colors.forEach((color) => requestState.filterLinks.add(color.getAttribute(`value`)));
    executeThirdBlock();
}

// Bloc 3
function executeThirdBlock() {
    requestState.block3 = requestState.sizeOptions.length * requestState.filterLinks.size;

    requestState.sizeOptions.forEach((sizeOption) => {
        requestState.filterLinks.forEach((filterLink) => {
            let data = new FormData();
            data.append(`controller`, `product`);
            data.append(`id_product`, productId);
            data.append(`id_customization`, `0`);
            data.append(`group[1]`, sizeOption.getAttribute(`value`));
            data.append(`group[2]`, filterLink);
            data.append(`qty`, `1`);
            data.append(`quickview`, `0`);
            data.append(`ajax`, `1`);
            data.append(`action`, `refresh`);
            data.append(`quantity_wanted`, `1`);

            if (xhr.status === 200) {
                let resp = JSON.parse(xhr.responseText);
                let container = document.createElement(`div`);
                container.setAttribute(`class`, `hidden_for_me`);
                container.setAttribute(`id`, `link`);
                container.innerHTML = resp.product_url;
                document.body.appendChild(container);

                requestState.block3--;
            }

            xhr.open(`POST`, `${location.origin}/index.php`, false);
            xhr.send(data);
        });
    });
}
executeFirstBlock();
