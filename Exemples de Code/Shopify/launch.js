class Product {
    constructor(
        sku,
        description,
        name,
        net,
        brut,
        currency,
        label,
        dispo,
        pictures,
        barcode,
        variants
    ) {
        this.sku = sku;
        this.descriptionHtml = description?.body;
        this.description = description?.body.textContent;
        this.name = name;
        this.net = net;
        this.brut = brut;
        this.currency = currency;
        this.label = label.length === 1 ? [] : label;
        this.dispo = dispo;
        this.pictures = pictures;
        this.barcode = barcode;
        this.variants = variants;
    }

    static sendXHRRequest(url) {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', url, false);
        xhr.send();
        return JSON.parse(xhr.response);
    }

    static parseDOM(text, type = 'text/html') {
        let parser = new DOMParser();
        return parser.parseFromString(text, type);
    }

    static getHiddenInputsObject() {
        let hiddenInputs = document.querySelectorAll(
            'form input[name][type="hidden"]'
        );
        let inputsObject = {};
        hiddenInputs.forEach((input) => {
            inputsObject[input.name] = input.value;
        });
        return inputsObject;
    }

    static getPictures(resp) {
        let color = decodeURIComponent(location.hash.substring(1)).replace(
            '_',
            ''
        );
        let { variants, media: medias } = resp;
        let featuredImageAlts = variants?.map((el) => el?.featured_image?.alt);
        let pictures = medias
            ?.filter(({ alt }) => featuredImageAlts.includes(alt))
            .map(({ src }) => src);
        return pictures?.length ? pictures : medias?.map(({ src }) => src);
    }

    static getCombinations(data) {
        let valueArrays = data.map((item) => item.values);

        function combine(arrays) {
            if (arrays.length === 0) return [[]];

            let first = arrays[0];
            let rest = arrays.slice(1);

            let combinationsOfRest = combine(rest);
            let result = [];

            first.forEach((value) => {
                combinationsOfRest.forEach((combination) => {
                    result.push([value, ...combination]);
                });
            });

            return result;
        }

        return combine(valueArrays);
    }

    static compareArrays(arr1, arr2) {
        const isSubset = (smaller, larger) =>
            smaller?.every((value) => larger?.includes(value));

        if (isSubset(arr1, arr2) && isSubset(arr2, arr1)) {
            return true;
        } else if (isSubset(arr1, arr2)) {
            return false;
        } else if (isSubset(arr2, arr1)) {
            return true;
        } else {
            return false;
        }
    }

    static addOrReplaceVariant(url, variantValue) {
        let urlObj = new URL(url);
        urlObj.searchParams.set('variant', variantValue);
        return urlObj.toString();
    }
}

let currentUrl = location.href;
let urlObject = new URL(currentUrl);
let getLoc = urlObject.origin + urlObject.pathname;
window.getLoc = getLoc;
let hiddenInputsObj = Product.getHiddenInputsObject();
let getCurrency = hiddenInputsObj?.currency_code || Shopify.currency.active;
window.prodCurrency = getCurrency;

if (getLoc && getCurrency) {
    let resp = Product.sendXHRRequest(getLoc + '.js');
    let descriptionHtml = Product.parseDOM(
        `<html><body>${resp.description}<body></html>`
    );

    let optionKeywords = [
        'couleur',
        'color',
        'titre',
        'title',
        'titolo',
        'model',
        'modèle',
    ];

    let options = resp.options.filter(
        (el) =>
            !optionKeywords.some((keyword) =>
                el.name.toLowerCase().includes(keyword)
            )
    );

    let colorList = resp.options.filter((el) =>
        optionKeywords.some((keyword) =>
            el.name.toLowerCase().includes(keyword)
        )
    );

    let colorCombination = Product.getCombinations(colorList).map((el) =>
        encodeURI(el.join(' / '))
    );
    let colorLinks = colorCombination.map((el) => `${currentUrl}#${el}`);
    window.prodColorLinks = colorLinks;
    window.prodVariant = resp.variants;

    let combinations = Product.getCombinations(colorList);

    let colorDecliLinks = combinations.map((c) =>
        window.prodVariant.find((variant) =>
            Product.compareArrays(variant.options, c)
        )
    );

    let prod = [];
    combinations.forEach((combination) => {
        window.prodVariant.forEach((variant) => {
            if (Product.compareArrays(variant.options, combination)) {
                variant['color'] = combination.join(' / ');
                variant['colorOptions'] = combination;

                let getLoc = new URL(location.href);
                let url = `${getLoc.origin}${getLoc.pathname}?variant=${
                    variant.id
                }#${encodeURI(variant.color)}`;
                variant['color_url'] = url;
                prod.push(variant);
            }
        });
    });

    let currentColor = decodeURI(location.hash.slice(1));
    let color = currentColor || combinations[0].join(' / ');

    let variantsColor = prod.filter((el) =>
        Product.compareArrays(
            el.options,
            color.split(' / ').map((e) => e.trim())
        )
    );
    window.prodVariantsColor = variantsColor;

    colorList = colorList.flatMap((el) => el.values);
    resp.variants = resp.variants.filter((el) =>
        el.options.includes(colorList[1])
    );

    window.prodColorVariant = colorList.map((color) =>
        window.prodVariant.find((el) => el.options.includes(color))
    );
    window.prodColorVariant = window.prodColorVariant.map((variant, index) =>
        Product.addOrReplaceVariant(colorLinks[index], variant.id)
    );

    window.prodColorVariant = Array.from(
        new Map(
            window.prodColorVariant.map((url) => {
                const match = url.match(/variant=(\d+)/);
                return [match ? match[1] : url, url];
            })
        ).values()
    );

    let label = options.length ? options[0].values : [];
    label = label.filter((lab) =>
        window.prodVariant.some((el) => el.title.includes(lab))
    );

    label = label.filter((el) =>
        window.prodVariant.find(
            (v) => v.title.includes(el) && v.title.includes(color)
        )
    );

    let dispo = variantsColor.map((el) => el.available);
    let pictures = Product.getPictures(resp);

    let barcode = variantsColor.map((el) => el.barcode);
    let brut = variantsColor.map((el) =>
        el.compare_at_price ? el.compare_at_price / 100 : el.price / 100
    );
    let net = variantsColor.map((el) => el.price / 100);
    let currency = net.map((el) => getCurrency);
    currency = currency && !currency.length ? [getCurrency] : getCurrency;

    let variants = variantsColor.map((el) => el.id);
    let prodInfo = new Product(
        resp.id,
        descriptionHtml,
        resp.title,
        net,
        brut,
        currency,
        label,
        dispo,
        pictures,
        barcode,
        variants
    );

    window.decliColorLinks = colorDecliLinks.map((el) => el?.color_url);

    colorDecliLinks = colorDecliLinks.filter((el) => el);
    window.prodColorVariant = colorDecliLinks.map((el) => el.color_url);

    window.productInfo = prodInfo;
}

if (!window.productInfo?.description.trim()) {
    let descriptionSelector = document.evaluate(
        `//*[@id="drawer-description"]//p`,
        document.body,
        null,
        XPathResult.FIRST_ORDERED_NODE_TYPE,
        null
    ).singleNodeValue;

    if (descriptionSelector) {
        let descriptionHtml = descriptionSelector;
        window.productInfo.descriptionHtml = descriptionHtml;
        window.productInfo.description = descriptionHtml?.textContent;
    }
}
