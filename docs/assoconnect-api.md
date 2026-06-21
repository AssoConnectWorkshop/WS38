# AssoConnect API

Référence pour l'intégration de l'API AssoConnect dans ce projet. Synthèse de la
[documentation officielle](https://assoconnect.notion.site/AssoConnect-API-Documentation-fran-ais-59e2aa9b8bdc401da3e1520237625796)
— la source fait foi en cas de divergence. L'index en bas de page renvoie vers
chaque page d'origine.

> Client server-only de ce repo : `src/lib/assoconnect.ts`.

## Présentation

L'API permet de communiquer avec le système d'AssoConnect sans passer par
l'interface : lister, consulter, créer et modifier contacts, adhérents et
organisations, afin de synchroniser un SI externe avec celui d'AssoConnect.

- **Périmètre : CRM (« Communauté ») uniquement.** Les autres fonctionnalités ne
  sont pas (encore) exposées.
- **Accès contrôlé**, réservé aux abonnés de l'offre Professionnelle. Les clés
  (test + production) et l'ULID de l'organisation principale sont fournis par
  AssoConnect. Demande via le service client ; support : `api@assoconnect.com`.
- **Pas de sandbox** : créer un compte de test pour les essais.

## Authentification

Deux mécanismes selon l'usage.

### Clé d'API (intégration serveur — utilisé ici)

Toutes les requêtes passent en **HTTPS** avec la clé dans le header
`X-AUTH-TOKEN`.

| Élément | Valeur |
| --- | --- |
| Base URL | `https://app.assoconnect.com/api/v1` |
| Header d'auth | `X-AUTH-TOKEN: <votre_clé>` |
| Header attendu | `Accept: application/ld+json` |
| Liste des endpoints | https://app.assoconnect.com/api_documentation |

```bash
curl -X GET "https://app.assoconnect.com/api/v1/organizations/{ulid}" \
  -H "Accept: application/ld+json" \
  -H "X-AUTH-TOKEN: {token}"
```

Dans ce projet, clé et ULID sont des secrets **server-only** :
`ASSOCONNECT_API_KEY` et `ASSOCONNECT_ORGANIZATION_ULID` (jamais de préfixe
`NEXT_PUBLIC_`, jamais importés dans un composant client).

### OAuth 2 (SSO — AssoConnect comme Identity Provider)

Pour connecter un utilisateur via son compte AssoConnect (OAuth 2 pur, **pas**
OpenID Connect). Flux : `GET /oauth2/authorize` → échange du `code` via
`POST /oauth2/access_token` → header `Authorization: Bearer <access_token>`.
L'access token dure 1 h, le refresh token 1 mois (`POST /oauth2/refresh_token`).
Seul scope disponible : `all`. Voir la section SSO de la doc officielle.

## Rate limiting

**30 requêtes/seconde.** Au-delà, les requêtes sont refusées pendant une courte
période — prévoir une limitation côté intégration.

## Codes de réponse

- `2xx` : succès
- `4xx` : erreur liée aux paramètres (certaines renvoient un détail)
- `5xx` : erreur côté serveurs AssoConnect

```json
HTTP/1.1 404 Not Found
{
  "@context": "/api/v1/contexts/Error",
  "@type": "hydra:Error",
  "hydra:title": "An error occurred",
  "hydra:description": "Resource \"App\\Entity\\Organization\" with id \"...\" not found."
}
```

## Pagination

Listes paginées : **25 résultats par défaut, 100 maximum**. Paramètres `page` et
`itemsPerPage`. Navigation via `hydra:view` (`hydra:first`, `hydra:next`,
`hydra:last`) et `hydra:totalItems`.

```
GET /api/v1/organizations/{id}/contacts?page=1&itemsPerPage=10
```

## Ressources

### Contact

Concept cœur du CRM : regroupe les **personnes** (personnes physiques) et les
**structures** (personnes morales). Champs natifs : nom/prénom (ou nom pour une
structure), date de naissance (personne), email, téléphone fixe, téléphone
mobile, adresse postale. Des **champs personnalisés** (`customFields`) peuvent
s'ajouter selon la plateforme.

- **Personne** — champs natifs : prénom, nom, date de naissance, email,
  téléphones fixe/mobile, adresse postale, genre. Actions : afficher, rechercher,
  créer, modifier, supprimer, lister, ajouter à une organisation, relier à une
  structure, mettre à jour la photo de profil.
- **Structure** — champs natifs : nom, email, téléphones, adresse postale.
  Actions : afficher, créer, modifier, supprimer, lister.
- **Adhérent** — un contact lié à une organisation par une adhésion datée (date
  de début / fin, organisation de rattachement). Hors période → « ancien
  adhérent ». La gestion d'adhésion se fait à la création/mise à jour du contact.
- **Donateur** — un contact ayant fait au moins un don (date du premier don,
  organisation de rattachement) ; statut sans date de fin.
- **Champs personnalisés** — propres à chaque organisation. Propriétés : nom,
  cible (personnes ou structures), type (texte, liste déroulante, choix multiple,
  date, email, numérique, téléphone, fichier, URL…), valeurs possibles, catégorie.
  Dans un réseau centralisé, un champ défini sur une organisation est hérité par
  ses enfants (pas par ses parents).

### Organisation

Entité centrale d'une plateforme. Types : **organisation principale** (plus haut
niveau), **groupes avancés** (organisations enfants avec gestion propre),
**groupes simples/dynamiques** (segmentation du CRM). Propriétés : nom, email de
contact, téléphone, adresse postale, `isAdvanced`, `isLegalIndependent`.

- Une organisation enfant a un seul parent ; un parent peut avoir plusieurs
  enfants, sur autant de niveaux que souhaité.
- **Remontée récursive** : un contact ajouté à un niveau N remonte aux parents ;
  si l'organisation est légalement dépendante, les données comptables sont
  consolidées chez le parent.

### Réseau

Ensemble d'organisations distinctes liées par leur domaine et leur affiliation
(ex. une fédération sportive regroupant des clubs indépendants).

## Endpoints principaux

### Consulter une organisation

```
GET /api/v1/organizations/{ulid}
```

```json
{
  "@id": "/api/v1/organizations/0HXE3ZKHNZBK19GGYJYD2TP0AS",
  "@type": "Organization",
  "brand": "assoconnect",
  "isAdvanced": true,
  "isLegalIndependent": true,
  "logoUrl": "https://site.assoconnect.com/services/....",
  "name": "My Nonprofit Name",
  "parent": null,
  "phoneNumber": "+33612345678",
  "url": "https://{organization_base_url}"
}
```

### Lister les contacts d'une organisation

```
GET /api/v1/organizations/{organizationId}/contacts
```

Filtres (query string) : `type` / `type[]`, `relationType`,
`membershipDate[on]`, `membershipDate[from]`, `membershipDate[until]`. Réponse :
collection Hydra (`hydra:member`, `hydra:totalItems`, `hydra:view`).

```json
{
  "@type": "hydra:Collection",
  "hydra:member": [
    {
      "@id": "api/v1/crm/contacts/{contactId}",
      "@type": "Contact",
      "type": "person",
      "firstname": "Jean",
      "lastname": "ValJean",
      "email": "j.valjean@gmail.com",
      "landlinePhone": "+33123456789",
      "mobilePhone": "+33623456789",
      "relations": [
        { "type": "AFFILIATION", "organization": "api/v1/organization/...", "createdAt": "2021-01-01" }
      ]
    }
  ],
  "hydra:totalItems": 169
}
```

### Profil de l'utilisateur courant (OAuth 2)

```
GET /api/v1/crm/person/me        # firstName, lastName, contactId, ...
GET /api/v1/crm/contacts/{id}    # fiche complète : relations, customFields, ...
```

### Autres actions disponibles

Personnes (afficher / rechercher / créer / modifier / supprimer / lister /
photo), structures (afficher / créer / modifier / supprimer / lister), adhérents
et donateurs (lister), champs personnalisés (lister par personnes/structures),
organisations (afficher / lister enfants / lister affiliés), réseau (lister les
organisations). Voir l'index ci-dessous pour le détail de chaque endpoint.

## Webhooks

Notification HTTP automatique vers un SI externe au déclenchement d'un événement
(ex. mise à jour d'une fiche contact). Mise en place, déclenchement et logs
décrits dans la doc officielle (voir l'index).

## Index de la documentation officielle

Liens directs vers chaque page (domaine public `assoconnect.notion.site`).

- [Documentation API (racine)](https://assoconnect.notion.site/59e2aa9b8bdc401da3e1520237625796)
- [Comment utiliser l'API ? (prérequis, auth, premier appel)](https://assoconnect.notion.site/866f4108e49147b784bce14c86395c2d)
  - [Pagination](https://assoconnect.notion.site/788229df78c14606adcbedecf73aaa2e)
- [Ressources](https://assoconnect.notion.site/b5f9c5afbe8041edbfb62ab64dc4d2e7)
  - [Contact](https://assoconnect.notion.site/fa3bb0c2218c435cab6ecea603b60e87)
    - [Personne](https://assoconnect.notion.site/1c6c3c4f99c1434ba6f14d0668f4d8ff)
      · [Afficher](https://assoconnect.notion.site/ec0d4a588103490aa5791ff1da180fb5)
      · [Rechercher](https://assoconnect.notion.site/12ef3606d3bb8029ac6ac2f3487c0d06)
      · [Créer](https://assoconnect.notion.site/75d3b643c91e4e0b90d77db9f55220c6)
      · [Modifier](https://assoconnect.notion.site/6b20b66f2b1740babafe5a605a683674)
      · [Supprimer](https://assoconnect.notion.site/f172359440ae494fb6fd8830716b295a)
      · [Lister](https://assoconnect.notion.site/55ee2eaaab79483cbec378ad3160bf39)
      · [Ajouter à une organisation](https://assoconnect.notion.site/1bc4ba46ebe64f5096d46c9dc81ccf7a)
      · [Relier à une structure](https://assoconnect.notion.site/30cf3606d3bb80289679fd2db4079999)
      · [Photo de profil](https://assoconnect.notion.site/1f8f3606d3bb8089aff1c1dcd1e7694e)
    - [Structure](https://assoconnect.notion.site/5b6f33ecc84e489eb87f4e9aeeb4cb10)
      · [Afficher](https://assoconnect.notion.site/089a1e4b09bc4f10bc408fc9116a946e)
      · [Créer](https://assoconnect.notion.site/a2d0f91489274df08e231a7628d3bb7b)
      · [Modifier](https://assoconnect.notion.site/af31cbb932594b28ad87b233d1055626)
      · [Supprimer](https://assoconnect.notion.site/f287d8e2d19e4c788fa4ca89ce8f2477)
      · [Lister](https://assoconnect.notion.site/026b9f47ce20429a9f5d8a3781734e0a)
    - [Adhérent](https://assoconnect.notion.site/3257d42b82614e22b2ad5984281258f4)
      · [Lister les adhérents](https://assoconnect.notion.site/32e5dddc57764de6ae169ddeeddcc5de)
    - [Donateur](https://assoconnect.notion.site/db08c55e4c424a39b0503ec3baeb15b2)
      · [Lister les donateurs](https://assoconnect.notion.site/5e8070953b3a47a19ff2ad0855f5b6f5)
    - [Champs personnalisés](https://assoconnect.notion.site/fc3cfb0b7b644fd091882a6b95eacb25)
      · [Catégorie de champ](https://assoconnect.notion.site/4c929c33d96d48a8a8917e31152de70a)
      · [Lister (personnes)](https://assoconnect.notion.site/39ce6bb7ae27400ca757ddc90fd4503b)
      · [Lister (structures)](https://assoconnect.notion.site/e5ab90e756024bb2b2145e35ba31b13c)
    - [Lister les contacts d'une organisation](https://assoconnect.notion.site/6af499d6b18b42dc832787ec71c85cdb)
  - [Réseau](https://assoconnect.notion.site/2ba0d32d357749f2a45a1ec26f62f24f)
    · [Lister les organisations du réseau](https://assoconnect.notion.site/5e790a933f924c7d81f17de415de392e)
  - [Organisation (groupes, groupes avancés)](https://assoconnect.notion.site/2cef389cd7544f149e09357624395c50)
    · [Dépendance légale](https://assoconnect.notion.site/4313b536dc534c1ead1b0df4f2a7d3c6)
    · [Afficher une organisation](https://assoconnect.notion.site/c8b6e3cabfc8498b9f85a92f559e5fa6)
    · [Lister les organisations enfants](https://assoconnect.notion.site/f72a7d247ae94db29363670b5949a2ca)
    · [Lister les affiliés](https://assoconnect.notion.site/63bc54f54fc64cf089741d239c1b0263)
- [Système de webhook](https://assoconnect.notion.site/0111e60a063f486b916b42b294d90104)
  · [Présentation](https://assoconnect.notion.site/56f0ece88d1348898cb1ee9c967dd49f)
  · [Mettre en place](https://assoconnect.notion.site/54fd6be7a45249e1aa7f16ddf156a7b8)
  · [Déclenchement](https://assoconnect.notion.site/29f68612834b4e91a064713b6a1c38d4)
  · [Logs](https://assoconnect.notion.site/16ff3606d3bb80d19ed5efbb1ae13b93)
- [SSO — AssoConnect Identity Provider](https://assoconnect.notion.site/fc07186cdf4342d2adcd8bda7b5db43a)
- [Cas d'usage](https://assoconnect.notion.site/dca7a062cdb540c18280bc7bbfa31f6e)
- [Fonctionnalités non disponibles](https://assoconnect.notion.site/653c6b0064c240f4ae0d2d52e8ff821d)
- [Annonces Breaking Change](https://assoconnect.notion.site/17258d843ee54bc0b88c12368a05e807)
