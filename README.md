<a id="readme-top"></a>

<br />
<div align="center">
  <a href="https://fixmystreet.maximelust.fr">
    <img src="public/logo-fixmystreet-blanc.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">FixMyStreet</h3>

  <p align="center">
    Une application de signalement des défauts routiers pour les cyclistes de Bordeaux Métropole, en liaison avec les mairies locales
    <br />
    <a href="https://fixmystreet.maximelust.fr">Voir la démo</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Sommaire</summary>
  <ol>
    <li><a href="#stack">Stack</a></li>
    <li><a href="#architecture">Architecture</a></li>
    <li><a href="#structure">Structure</a></li>
    <li><a href="#fonctionnalités">Fonctionnalités</a></li>
    <li><a href="#getting-started">Getting Started</a></li>
  </ol>
</details>

## À propos du projet

[![Product Name Screen Shot][product-screenshot]](https://fixmystreet.maximelust.fr)

Projet en trio d'étudiants à l'ECV Bordeaux en 2ème année de Mastère Lead Developer Frontend.

Une application de signalement des défauts routiers pour les cyclistes de Bordeaux Métropole, en liaison avec les mairies locales.

<p align="right">(<a href="#readme-top">revenir en haut</a>)</p>

## Stack

* [![Next][Next.js]][Next-url] \
Meta framework mature, robuste, pérenne et SEO friendly
* [![Typescript][Typescript]][Typescript-url] \
Fort typage et robuste — Favorise la détection des erreurs en amont
* [![Tailwind][Tailwindcss.com]][Tailwindcss-url] \
Framework CSS léger et mobile first
* [![Leaflet][Leafletjs.com]][Leafletjs-url] \
Carte interactive complète et gratuite
* [![Supabase][Supabase.com]][Supabase-url] \
Base de donnée relationnelle, API REST, authentification et stockage de fichiers

<p align="right">(<a href="#readme-top">revenir en haut</a>)</p>

## Architecture

L'application repose sur **Next.js App Router** avec deux rôles distincts — `user` et `admin` — déterminés à la connexion via le JWT Supabase.

```
Browser → Next.js (App Router)
              ├── Supabase Auth    (session JWT + rôle)
              ├── Supabase DB      (signalements, statuts)
              └── Supabase Storage (photos des signalements)
```

- **Auth** : gérée côté serveur via `@supabase/ssr`. Le rôle `user_role` est encodé dans le JWT et vérifié à chaque layout protégé.
- **Données** : lues directement depuis le client Supabase (browser ou server selon le contexte). Pas d'API route intermédiaire.
- **PWA** : Service Worker déclaré dans `/public/sw.js`, manifest généré via `app/manifest.ts`. Nécessite HTTPS en local (`--experimental-https`).

<p align="right">(<a href="#readme-top">revenir en haut</a>)</p>

## Structure

```
app/
├── (auth)/               # Groupe de routes non protégées
│   ├── login/
│   ├── sign-up/
│   └── auth/             # Callbacks (mot de passe oublié, mise à jour)
├── user/
│   └── reports/          # Liste des signalements (vue utilisateur)
├── logout/
├── page.tsx              # Point d'entrée — redirige selon le rôle
└── types.d.ts            # Types globaux (ReportType, ReportFormData…)

components/
├── map/                  # MapView, Container, Markers (Leaflet + heatmap)
├── report-cards/         # ReportCard, ReportDetails, ReportLocation
├── report-form-manager/  # Étapes du formulaire de signalement
├── layouts/              # AdminLayout, UserLayout
├── navigation/           # Navigation + NavigationItem
├── form/                 # Inputs réutilisables (photo, localisation…)
└── ui/                   # Composants atomiques (boutons, loader, toasts…)

lib/
├── supabase/
│   ├── client.ts         # Client browser + helper withUser()
│   ├── server.ts         # Client server (SSR)
│   └── proxy.ts
└── utils/
    ├── db.ts             # Mappers catégories & statuts, fetchLatestStatus()
    ├── date.ts
    ├── location.ts
    └── useMapZoom.ts
```

<p align="right">(<a href="#readme-top">revenir en haut</a>)</p>

## Fonctionnalités

### Utilisateur
- Formulaire de signalement en **4 étapes** : choix de catégorie → détails (photo + localisation GPS) → récapitulatif → confirmation
- Catégories disponibles : `Dégât sur la voie`, `Signalisation`, `Éclairage défectueux`, `Encombrement`
- Consultation de ses propres signalements avec statut en temps réel
- Installation en PWA (prompt natif, mode hors-ligne basique)

### Administrateur
- **Carte interactive** (Leaflet) avec clustering de marqueurs et **heatmap** des signalements
- Panneau de signalements cliquables avec détails complets
- Suivi des statuts : `Créé` → `Validé` → `En cours` → `Terminé` / `Rejeté`

### Authentification
- Inscription / connexion par email
- Réinitialisation et mise à jour du mot de passe
- Sessions persistantes via `localStorage`

<p align="right">(<a href="#readme-top">revenir en haut</a>)</p>

## Getting Started

### Prérequis

```sh
npm install npm@latest -g
```

### Installation

1. Clonez le repo
   ```sh
   git clone git@github.com:DJKFifou/FixMyStreet.git
   ```

2. Installez les dépendances
   ```sh
   npm i
   ```

3. Créez un fichier `.env` à la racine avec vos clés Supabase
   ```env
   NEXT_PUBLIC_SUPABASE_URL=...
   NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=...
   ```

4. Lancez l'application
   ```sh
   npm run dev --experimental-https
   ```
   > Le flag `--experimental-https` est requis pour que le navigateur active la PWA en local.

<p align="right">(<a href="#readme-top">revenir en haut</a>)</p>

---

<!-- MARKDOWN LINKS & IMAGES -->
[product-screenshot]: public/paysage-01.jpg
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[Typescript]: https://img.shields.io/badge/Typescript-000000?style=for-the-badge&logo=typescript&logoColor=3178C6
[Typescript-url]: https://www.typescriptlang.org/
[Tailwindcss.com]: https://img.shields.io/badge/Tailwindcss-000000?style=for-the-badge&logo=tailwindcss&logoColor=61DAFB
[Tailwindcss-url]: https://tailwindcss.com/
[Leafletjs.com]: https://img.shields.io/badge/Leaflet-FFFFFF?style=for-the-badge&logo=leaflet&logoColor=lightgreen
[Leafletjs-url]: https://leafletjs.com/
[Supabase.com]: https://img.shields.io/badge/Supabase-000000?style=for-the-badge&logo=supabase&logoColor=green
[Supabase-url]: https://supabase.com/
