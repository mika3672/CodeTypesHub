/**
 * Removes HTML tags from a string.
 * @param {string} htmlString - The string containing HTML tags.
 * @returns {string} - The plain text content without any HTML tags.
 */
function removeHTMLTags(htmlString) {
    let parser = new DOMParser();

    // Parse the string as HTML content
    let parsedDoc = parser.parseFromString(htmlString, 'text/html');

    return parsedDoc.body.textContent || '';
}

// Example input string with HTML tags
let stringWithTags = 'Product with <br/> tag description';

// Remove HTML tags from the string
let description = removeHTMLTags(stringWithTags);

console.log(description);
