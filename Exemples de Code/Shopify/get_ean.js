(function (data_attribute_stringified) {
    let barcode = [];

    let { barcode: code, label: label } = window.productInfo || {};
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
            barcode.push(code[index]);
        }
    });

    barcode = barcode.length ? barcode : [code[0]];
    if (!barcode.length) barcode = window.prodVariant.map((el) => el.barcode);
    if (
        prodVariantsColor.length &&
        prodVariantsColor.length == window.productInfo?.label.length
    )
        barcode = window.prodVariantsColor.map((el) => el.barcode);

    barcode = barcode.map((el) => el || '');
    return barcode.join('<!LIST!>');
})('DATA_ATTRIBUTE_INSTANCE_LIVE_SCRAPPER_SPOT');
