(function (data_attribute_stringified) {
    let currentUrl = window.location.href;
    let url = new URL(currentUrl);
    let variantId = url.searchParams.get('variant');

    let sku = window.prodVariant.filter((variant) => variant.id == variantId);
    sku = sku.length && sku[0]?.sku ? sku[0].sku : window.productInfo?.sku;

    return sku;
})('DATA_ATTRIBUTE_INSTANCE_LIVE_SCRAPPER_SPOT');
