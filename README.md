# CodeTypesHub ( Dépôt de Conseils )

Bienvenue dans le dépôt **Web Scrapo Tips** ! Ce dépôt vise à fournir une collection complète de techniques, bonnes pratiques et conseils spécifiques aux plateformes de sites e-commerce pour le web scraping en utilisant des technologies comme **JavaScript**, **XHR**, **sélecteurs CSS** et **XPath**.

## 🚀 Fonctionnalités
- **Techniques Générales** : Concepts de base et méthodes pour un web scraping efficace.
- **Guides Spécifiques aux Plateformes** : Aperçus détaillés pour des plateformes e-commerce populaires comme Shopify, Prestashop, Magento, WooCommerce, BigCommerce, Wix, Squarespace, et bien plus.
- **Exemples de Code** : Fragments de code prêts à l'emploi.
- **Bonnes Pratiques** : Conseils sur le scraping éthique, éviter les interdictions et respecter les règles des sites.

---

## 📁 Structure du Dépôt

### 1. Conseils Généraux
- Utiliser les **requêtes XHR** pour extraire des données efficacement.
- Exploiter les **sélecteurs CSS** et **XPath** pour un ciblage précis des données.
- Gérer la pagination et le défilement infini.

### 2. Guides Spécifiques aux Plateformes e-Commerce
- **Shopify**
  - Extraire les détails des produits, les prix et la disponibilité.
- **Prestashop**
  - ...
- **Magento**
    - ...
- **WooCommerce**
    - ...
- **BigCommerce**
    - ...
- **Wix**
    - ...
- **Squarespace**
    - ...

### 3. Bonnes Pratiques
- Respecter le fichier **robots.txt** pour eviter le BLACKLIST.
- Implémenter une limitation du taux de requêtes ( XHR ) pour éviter la détection.
- Imiter le comportement humain pour masquer l'activité des bots.

#### Standards pour les Outils

**Noms des fonctions :**
- Utiliser le format `snake_case`.
- Les noms doivent être rédigés en anglais.
- Ajouter le versioning avec un suffixe `_<nb>` (exemple : `get_sku_1`).
- Préfixer les fonctions par leur action principale (ex. : `get`, `set`).

**Commentaires :**
- Ajouter des commentaires explicatifs pour les configurations complexes ou les parties critiques du code (par exemple : PP ou Instances).

---

#### Standards pour le Code JavaScript

**Noms des variables :**
- Utiliser le format `camelCase`.
- Les noms doivent être rédigés en anglais.
- Les tableaux (Array) doivent avoir un nom se terminant par un "s" (exemple : `currencies`).
- Les booléens doivent commencer par `is` ou `has` (exemple : `isAvailable`, `hasPrice`).

**Guillemets :**
- Utiliser des template literals (``) pour les chaînes de caractères.
- Les guillemets simples (') ou doubles (") peuvent être utilisés pour des cas spécifiques (par exemple, lorsque les templates ne sont pas nécessaires).

**Fonctionnalité d’une fonction :**
- Une fonction doit implémenter une seule fonctionnalité (respect du principe de responsabilité unique).

**Commentaires :**
- Ajouter des commentaires uniquement pour les parties complexes.
- Préférer des commentaires courts et explicites placés directement au-dessus des blocs concernés.

**Indentation :**
- Utiliser 4 espaces pour l’indentation.

**Syntaxe ES :**
- Utiliser `let` pour déclarer les variables.
  - Permet de faciliter les tests dans la console du navigateur.
- Privilégier les `arrow functions` pour les méthodes comme `map` et `filter`.

**Automatisation du Formatage :**
- Utiliser Prettier pour formater automatiquement le code.

**Retour (return) :**
- Placer le `return` en dehors des conditions principales.

**Console :**
- Éviter d’utiliser `console.log` dans le code de production.

---

#### Exemple de Code :

```javascript
(function (dataAttributeStringified) {
    /**
     * Parses and processes a list of net prices.
     * Returns a list of processed prices including tax.
     */

    let taxRate = 0.2; // Définir un taux de taxe constant (20%)

    let processedPrices = [];
    let priceStrings =
        document
            .querySelector(`[class*='data_product']`)
            ?.getAttribute('price')
            ?.split('|') || [];

    // Traiter chaque prix net
    processedPrices = priceStrings
        .map((priceString) => {
            let netPrice = parseFloat(priceString.trim());

            if (isNaN(netPrice)) {
                return 0;
            }

            let grossPrice = netPrice + netPrice * taxRate; // Calculer le prix TTC
            return grossPrice.toFixed(2);
        })
        .filter((price) => price !== null);

    // Retourner la liste des prix traités
    return processedPrices;
})('DATA_ATTRIBUTE_INSTANCE_LIVE_SCRAPPER_SPOT');
```

---

#### Configuration Prettier (.prettierrc)

La configuration de Prettier permet d’assurer que le code est formaté de manière cohérente et propre. Vous pouvez consulter la configuration complète de Prettier dans le fichier [docs/PRETTIER.md](docs/PRETTIER.md).

```json
{
  "semi": true,
  "singleQuote": true,
  "trailingComma": "es5",
  "tabWidth": 4,
  "useTabs": false,
  "bracketSpacing": true,
  "arrowParens": "always",
  "printWidth": 80,
  "endOfLine": "lf",
  "quoteProps": "as-needed",
  "jsxSingleQuote": true
}
```

### 4. Exemples de Code
Explorez notre bibliothèque de scripts pour :
- Scraper des sites statiques et dynamiques.
- Gérer l'authentification et les cookies de session.

---

## 📜 Contribuer
Les contributions sont les bienvenues ! Si vous avez des conseils, des extraits de code ou des idées, suivez ces étapes :

1. Forkez le dépôt.
2. Créez une nouvelle branche pour votre fonctionnalité.
3. Ajoutez vos modifications et soumettez une pull request.

Assurez-vous que vos contributions respectent le **code de conduite** du dépôt et que tous les exemples incluent des commentaires appropriés.

---


## 🛠 Outils & Technologies
- **Langages** : JavaScript
- **Technologies** : XHR, sélecteurs CSS, XPath
- **Plateformes** : Shopify, Prestashop, Magento, WooCommerce, BigCommerce, Wix, Squarespace, ...

---

## 📧 Contact
Pour toute question ou retour, ouvrez une issue.

