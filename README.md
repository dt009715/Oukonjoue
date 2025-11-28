# Oukonjoue?

## Description

Oukonjoue? est une plateforme destinée à aider les groupes de musique amateurs à trouver des salles de concert, bars, festivals, etc., dans leurs régions. Le site permet aux artistes et aux institutions de se connecter, de partager des informations, et de faciliter la réservation d'événements. Ce projet vise à simplifier l'accès des groupes de musique émergents aux infrastructures adaptées à leurs besoins.

## Prérequis

Avant de commencer, assurez-vous d'avoir les éléments suivants installés sur votre machine :

- **Node.js** (version 14 ou supérieure)
- **npm** (version 6 ou supérieure)

## Installation

1. Clonez ce projet dans votre répertoire local.

   ```bash
   git clone https://votre-url-de-repository.git
   ```

## Allez dans le répertoire du projet.

cd oukonjoue

## Installez les dépendances avec npm.

npm install

## Démarrer le projet

Pour démarrer le serveur de développement, utilisez la commande suivante :

npm run dev

## Tests

Ce dépôt est organisé en monorepo `pnpm`. Après installation des dépendances à la racine, les commandes suivantes sont disponibles :

- `pnpm test:frontend` : lance les tests unitaires du client React situé dans `packages/frontend`.
- `pnpm test:backend` : lance les tests unitaires du serveur Express dans `packages/Backend`.
- `pnpm test` : exécute successivement les suites frontend et backend pour vérifier la cohérence globale.

Chaque script peut être utilisé localement ou dans un pipeline CI pour automatiser les vérifications.

### Mode CI et couverture

- `pnpm --filter frontend run test:ci` exécute la suite React en mode headless avec collecte de couverture (>70 % sur `App`, `Header`, `FormContact`).
- `pnpm --filter backend run test:ci` lance Jest côté API avec `ts-jest` et un seuil global de 60 %.
- Le workflow GitHub Actions `ci.yml` (jobs `frontend`, `backend`, `deploy`) est déclenché sur chaque push/PR et bloque les branches tant que les tests échouent. Le job `deploy` sert de placeholder à adapter (Docker, Vercel, etc.) et cible l’environnement `production`.