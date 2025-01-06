(function (data_attribute_stringified) {
    let selectors = document.querySelectorAll(
        `div[class*="product-form"] label[class~="color-swatch"]`
    );
    let colors = Array.from(selectors, (el) =>
        el.textContent.trim().toLowerCase()
    );
    let hash = decodeURIComponent(location.hash.slice(1))
        .replace('_', '')
        .split('/')
        .map((el) => el.trim().toLowerCase());
    let selector = document.querySelector(
        'div.ProductForm__Variants span.ProductForm__SelectedValue.Text--subdued'
    );
    let color =
        hash.find((h) => colors.includes(h)) || selector?.textContent || '';
    return color || hash.join(' / ');
})('DATA_ATTRIBUTE_INSTANCE_LIVE_SCRAPPER_SPOT');
