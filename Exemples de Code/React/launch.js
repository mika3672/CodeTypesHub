/**
 * Code pour les site en React qui necessite une ouverture du menu avant de recuperer les size et dispo
 *Similaire au code partagé par Florence lors de la session de formation
 * ------------------------Consigne --------------------------
 ** à ajouter dans lunch.js
 * elle affiche le menu , recup la lise des sizes puis les ajoute dans le DOM
 * ------------------------Explication  --------------------------
 **Ce code simule l'appui sur la touche "flèche bas" (ArrowDown) dans le navigateur.
 *comme si l'utilisateur appuyait sur cette touche depuis le clavier.
 *
 * Exemple de marque pour la fonction : Weekday.js
 *
 */

let dropdownInput = document.querySelector(`input[id*="react-select"][id*="size"]`);

if (dropdownInput) {
    dropdownInput.focus();

    let keydownEvent = new KeyboardEvent(`keydown`, {
        bubbles: true,
        cancelable: true,
        key: `ArrowDown`,
        code: `ArrowDown`,
    });

    dropdownInput.dispatchEvent(keydownEvent);

    setTimeout(() => {
        let sizeOptions = document.querySelectorAll(`[class*="menu"] [class*="option"]`);
        let oneSizeElement = document.querySelector(`div[data-cy*="product-size-select"]`);
        let availabilityStatuses = [];
        let sizeAvailabilityList = [];

        sizeOptions.forEach((option) => {
            let optionText = option.textContent.trim();
            let isAvailable = optionText.includes(`OUT`) ? `false` : `true`;
            sizeAvailabilityList.push({ size: optionText, availability: isAvailable });
            availabilityStatuses.push(isAvailable);
        });

        let container = document.createElement(`div`);
        container.id = `sizeAvailabilityContainer`;
        let ulElement = document.createElement(`ul`);

        sizeAvailabilityList.forEach((item) => {
            let liElement = document.createElement(`li`);
            liElement.textContent = `${item.size}: ${item.availability}`;
            ulElement.appendChild(liElement);
        });

        container.appendChild(ulElement);
        document.body.appendChild(container);
    }, 200);
}
