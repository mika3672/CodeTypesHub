(function (data_attribute_stringified) {
    let availabilityList = [];

    let { dispo, label } = window.productInfo || {};

    // Get the current color from the URL hash
    let currentColor = decodeURIComponent(location.hash.slice(1)).replace(
        '_',
        ''
    );

    // Generate an array of options by combining the current color with labels
    let options = label.map((labelItem) =>
        currentColor.split(' / ').concat(labelItem)
    );

    // Iterate through product variants to determine their availability
    window.prodVariant.forEach((variant) => {
        let variantOptions = variant.options;
        let comparisonOptions = options.length ? options : [[currentColor]];

        // Function to compare two arrays for equality 
        let areArraysEqual = function (array1, array2) {
            return array1.sort().toString() === array2.sort().toString();
        };

        // Check if the variant options match
        let comparisonResults = comparisonOptions.map((option) =>
            areArraysEqual(variantOptions, option)
        );

        // If a match is found, add the availability status of the variant to the list
        if (comparisonResults.includes(true)) {
            availabilityList.push(variant.available);
        }
    });

    // Set availabilityList based on conditions
    availabilityList = availabilityList.length
        ? availabilityList
        : [dispo[0] || window.prodVariant[0]?.available];

    // If there is no hash in the URL, set availabilityList to all variants' availability
    availabilityList = !location.hash.trim().length
        ? window.prodVariant.map((variant) => variant.available)
        : availabilityList;

    // Check for color-specific variants and adjust the availability list accordingly
    if (
        prodVariantsColor.length &&
        prodVariantsColor.length === window.productInfo?.label.length
    ) {
        availabilityList = window.prodVariantsColor.map(
            (colorVariant) => colorVariant?.available
        );
    }

    // Return the availability
    return availabilityList.join('<!LIST!>');
})('DATA_ATTRIBUTE_INSTANCE_LIVE_SCRAPPER_SPOT');
