# Configuration de Prettier

Prettier est un formateur de code qui permet de maintenir un code propre et cohérent. Ce guide explique comment configurer Prettier, créer et utiliser un fichier `.prettierrc`, ainsi que l’intégrer efficacement dans VS Code.

---

## **1. Créer le fichier de configuration `.prettierrc`**

Le fichier `.prettierrc` contient les règles de formatage.

### Configuration :

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

### Étapes :

1. **Créer le fichier** :
   - Placez le fichier `.prettierrc` à la racine de votre projet.
   - Ajoutez-y les règles de configuration ci-dessus.

2. **Formats alternatifs** :
   Prettier supporte plusieurs formats pour sa configuration :
   - `.prettierrc.json` (fichier JSON, comme ci-dessus)
   - `.prettierrc` (JSON brut)

3. **Ignorer certains fichiers** :
   Créez un fichier `.prettierignore` pour exclure certains fichiers ou dossiers :
   ```
   dist/
   build/
   ```

---

## **2. Configurer VS Code pour Prettier**

### Étapes :

1. **Installer l’extension Prettier** :
   - Ouvrez VS Code.
   - Allez dans l’onglet Extensions (Ctrl+Shift+X).
   - Recherchez et installez **"Prettier - Code formatter"**.

2. **Définir Prettier comme formateur par défaut** :
   - Ouvrez les paramètres de VS Code (Ctrl+,).
   - Recherchez `default formatter`.
   - Sélectionnez **"Prettier - Code formatter"** comme formateur par défaut.

3. **Activer le formatage automatique** :
   - Toujours dans les paramètres, recherchez `format on save`.
   - Cochez l’option **"Editor: Format On Save"** pour un formatage automatique à chaque enregistrement.

---

## **3. Utiliser les commandes de Prettier**

### Dans VS Code :

- **Formater un fichier manuellement** :
  - Windows : `Shift+Alt+F`
  - Ou cliquez avec le bouton droit et sélectionnez **"Format Document"**.

---

## **4. Déboguer Prettier dans VS Code**

Si Prettier ne fonctionne pas comme prévu, ouvrez la console de sortie de VS Code et sélectionnez **"Prettier"** pour voir les journaux.

---

Avec cette configuration, Prettier formatte automatiquement votre code selon vos préférences, rendant vos fichiers propres et cohérents. 🚀
