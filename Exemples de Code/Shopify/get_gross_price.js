(function (data_attribute_stringified) {
    let priceBrut = [];

    let { brut: brut, label: label } = window.productInfo || {};
    let currentColor = decodeURIComponent(location.hash.slice(1)).replace(
        '_',
        ''
    );

    let options = label.map((el) => currentColor.split(' / ').concat(el));

    window.prodVariantsColor.forEach((variant, index) => {
        let array1 = variant.options;
        let array2 = options.length ? options : [[currentColor]];

        let areArraysEqual = function (arr1, arr2) {
            return arr1.sort().toString() === arr2.sort().toString();
        };

        let results = array2.map((arr) => areArraysEqual(array1, arr));
        if (results.includes(true)) {
            priceBrut.push((variant?.compare_at_price || 0) / 100);
        }
    });

    priceBrut = priceBrut.length ? priceBrut : [brut[0]];
    if (!priceBrut.length)
        priceBrut = window.prodVariant.map((el) => el.compare_at_price / 100);

    priceBrut = !location.hash.trim().length
        ? window.prodVariant.map((el) => el.compare_at_price / 100 || 0)
        : priceBrut;

    if (
        prodVariantsColor.length &&
        prodVariantsColor.length == window.productInfo?.label.length
    )
        priceBrut = window.prodVariantsColor.map(
            (el) => el.compare_at_price / 100
        );

    return priceBrut.join('<!LIST!>');
})('DATA_ATTRIBUTE_INSTANCE_LIVE_SCRAPPER_SPOT');
