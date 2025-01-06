(function (data_attribute_stringified) {
    let selector1 =
        '[class*="allery"] [class*="thumbnail"] a[href][class*="visible"]';
    let elements1 = document.querySelectorAll(selector1);
    let imageUrls;

    if (elements1.length > 0) {
        imageUrls = Array.from(elements1).map((el) => el.href);
    } else {
        let selector2 = '[class="flickity-viewport"] [class*="visible"] img';
        let elements2 = document.querySelectorAll(selector2);
        imageUrls = Array.from(elements2).map((el) =>
            el.getAttribute('data-original-src')
        );
    }

    let picLinks = window.prodVariantsColor
        .map((el) => el?.featured_image?.src)
        .filter((e) => e);

    if (!imageUrls.length)
        imageUrls = picLinks.length ? picLinks : window.productInfo.pictures;

    return (imageUrls || []).join('<!LIST!>');
})('DATA_ATTRIBUTE_INSTANCE_LIVE_SCRAPPER_SPOT');
