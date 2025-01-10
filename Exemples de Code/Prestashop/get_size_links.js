/**
 * Recup les liste des url pour la decli Size en Prestashop
 *
 * ------------------------Consigne --------------------------
 * 
 *
 *
 * Exemple de marque pour la fonction : Cafe Granell 
 */
(function (data_attribute_stringified) {
    let idElement = document.querySelector('input[id="product_page_product_id"]');
    let requestUrl = "https://cafesgranell.es/es/index.php?controller=product&action=refresh";
    let urlsLinks = []; 
    if (idElement) {
        let productId = idElement.getAttribute('value');
        let colorInputs = document.querySelectorAll('[class*="product-variants"] [class="input-color"]');

        if (colorInputs.length > 0) {
            colorInputs.forEach(function (colorInput) {
                let colorValue = colorInput.getAttribute('value');
                let data = new FormData();
                data.append("controller", "product");
                data.append("id_product", productId);
                data.append("id_customization", "0");
                data.append("group[2]", colorValue);
                data.append("qty", "1");
                let xhr = new XMLHttpRequest();
                xhr.open("POST", requestUrl, false);
                xhr.setRequestHeader("Accept", "application/json, text/html");
                xhr.send(data);

                if (xhr.status === 200) {
                    let contentType = xhr.getResponseHeader("Content-Type");
                    if (contentType && contentType.includes("application/json")) {
                        let jsonResponse = JSON.parse(xhr.responseText);
                        if (jsonResponse.product_url && !urlsLinks.includes(jsonResponse.product_url)) {
                            urlsLinks.push(jsonResponse.product_url); 
                        }
                    }
                }
            });
        } else {
            if (!urlsLinks.includes(location.href)) {
                urlsLinks.push(location.href); 
            }
        }
    }
    return urlsLinks.join('<!LIST!>');
})('DATA_ATTRIBUTE_INSTANCE_LIVE_SCRAPPER_SPOT');
