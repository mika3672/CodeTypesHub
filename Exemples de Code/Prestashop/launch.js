function getAttributes() {
    let attrs = [];
    let selectors = document.querySelectorAll(`[class*="-information"] select[name*='group'] option`);
    selectors.forEach(el => {
        let name = el?.parentElement.getAttribute(`name`); 
        attrs.push(name);   
    });
    attrs = Array.from(new Set(attrs));
    return attrs;
}


function getGroup() {
    let variants = getAttributes();
    let allValues = [];

    variants.forEach(variant => {
        let selector = document.querySelectorAll(`[name="${variant}"]`);
        selector.forEach(element => {
            if (element.tagName.toLowerCase() === `select`) {
                let selectValues = Array.from(element.options).map(option => option.value);
                allValues.push({ type: `select`, values: selectValues, group: variant });
            } else if (element.tagName.toLowerCase() === `input`) {
                let existingGroup = allValues.find(item => item.group === variant && item.type === `input`);
                if (existingGroup) {
                    existingGroup.values.push(element.value);
                } else {
                    allValues.push({ type: `input`, values: [element.value], group: variant });
                }
            }
        });
    });

    return allValues;
}

function sendXHRRequest(url, body) {
    let xhr = new XMLHttpRequest();
    xhr.open(`POST`, url, false);
    xhr.setRequestHeader(`Accept`, `application/json`);
    xhr.setRequestHeader(`Content-Type`, `application/x-www-form-urlencoded`);
    xhr.send(body);
    return xhr.responseText;
}

function cartesianProduct(arrays) {
    return arrays.reduce((acc, curr) => acc.flatMap(a => curr.map(b => [...a, b])), [[]]);
}

function parseDOM(text, type = `text/html`) {
    let parser = new DOMParser();
    return parser.parseFromString(text, type);
}

function getHiddenInputsObject() {
    let hiddenInputs = document.querySelectorAll(`[class*="-information"] form input[name][type="hidden"]`);
    let inputsObject = {};
    hiddenInputs.forEach(input => {
        inputsObject[input.name] = input.value;
    });
    return inputsObject;
}


let baseUrl = new URL(window.location.href).origin;
let url = `${baseUrl}/fr/index.php`;

function getProducts(allValues) {
    let products = [];
    let hiddenInputsObj = getHiddenInputsObject();
    let valueGroups = allValues.map(item => item.values);
    let combinations = cartesianProduct(valueGroups);
    combinations.forEach(combination => {
        let params = new URLSearchParams({
            id_product: hiddenInputsObj.id_product,
            id_customization: hiddenInputsObj.id_customization,
            qty: 1
        });


        let paramForms = new URLSearchParams({
            ajax: 1,
            action: `refresh`,
            quantity_wanted: 1
        });

        allValues.forEach((item, index) => {
            params.append(item.group, combination[index]);
        });

        let body = params.toString();
        let uri = url + `?controller=product&token=` + hiddenInputsObj.token + `&` + body;
        let response = JSON.parse(sendXHRRequest(uri, paramForms.toString()));
        products.push(response);
    });
    return products;
}

let inputs = getGroup();


window.productList = getProducts(inputs).map(product => product) ;
window.productUrls = window.productList.map(product => product.product_url) ;

window.ProductInfoPriceNet = getPriceNet(productList);
window.ProductInfoPriceGross = getPriceGross(productList);
window.ProductInfoPriceCurrency = getPriceCurrency(productList);
window.ProductInfoSizeLabels = getSizeLabels(productList);
window.ProductInfoSizeAvailability = getAvailability(productList);


function getPriceNet(products) {
    let priceNet = [];
    products.forEach( product => {
        let productPrice = product?.product_prices;
        productPriceElement = parseDOM(productPrice);
        productPriceElement = productPriceElement?.querySelector(`[class*="urrent-pric"] [itemprop="price"]`);
        productPrice = productPriceElement?.getAttribute(`content`);
        priceNet.push(productPrice);
    });

    return priceNet;
}

function getPriceGross(products) {
    let priceGross = [];
    products.forEach( product => {
        let productPrice = product?.product_prices;
        productPriceElement = parseDOM(productPrice);
        productPriceElement = productPriceElement?.querySelector(`[class*="roduct-discount"] [class*="regular-price"]`);
        priceText = productPriceElement?.textContent.replace(/[\.,]/g, m => (m === `.` ? `` : `.`));
        let priceBrut = parseFloat(priceText) || 0;
        priceGross.push(priceBrut);
    });

    return priceGross;
}

function getPriceCurrency(products) {
    let priceCurrency = [];
    products.forEach( product => {
        let productPrice = product?.product_prices;
        productPriceElement = parseDOM(productPrice);
        productPriceElement = productPriceElement?.querySelector(`[class*="-prices"] [itemprop="priceCurrency"]`);
        productPrice = productPriceElement?.getAttribute(`content`);
        priceCurrency.push(productPrice);
    });

    return priceCurrency;
}

function getAvailability(products) {
    function isAvailable(element) {
        let selector = element.querySelector(`.add button[class*="to-cart"]`);
        let isAvailable = selector && !selector?.hasAttribute(`disabled`) ? true : false;
        return isAvailable;
    }

    let sizeAvailability = [];
    products.forEach( product => {
        let productText = product?.product_add_to_cart;
        productElement = parseDOM(productText);
        let productAvailable = isAvailable(productElement);
        sizeAvailability.push(productAvailable);
    });

    return sizeAvailability;
}


function getSizeLabels(products) {
    function getSize(doc) {
        let sizes = ``;
        let xpath =  `//*[contains(@class,'variant')]//select//option[@selected] | //*[contains(@class,'ontenance')]`;
        let sizeSelector = document.evaluate(
            xpath,
            doc,
            null,
            XPathResult.FIRST_ORDERED_NODE_TYPE,
            null
        ).singleNodeValue;
        
        if (sizeSelector) {
            sizes = sizeSelector.textContent;
        } else {
            let selector = document.querySelector(`[class*="product-information"] [class*="ontenance"]`);
            sizes = selector?.textContent;
        }
        sizes = sizes && sizes.length ? sizes : `TU`;
        return sizes;
    }

    let sizeLabels = [];
    products.forEach( product => {
        let productText = product?.product_variants;
        productElement = parseDOM(productText);
        let size = getSize(productElement);
        sizeLabels.push(size);
    });

    return sizeLabels;
}







