(function (data_attribute_stringified) {
    let priceNet = [];

    let { net: net, label: label } = window.productInfo || {};
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
            priceNet.push(net[index]);
        }
    });

    priceNet = priceNet.length ? priceNet : [net[0]];
    priceNet = priceNet.filter((el) => el);
    if (!priceNet.length)
        priceNet = window.prodVariant.map((el) => el.price / 100);
    if (
        prodVariantsColor.length &&
        prodVariantsColor.length == window.productInfo?.label.length
    )
        priceNet = window.prodVariantsColor.map((el) => el.price / 100);

    return priceNet.join('<!LIST!>');
})('DATA_ATTRIBUTE_INSTANCE_LIVE_SCRAPPER_SPOT');
