# Strapi + Volontaires français

Ce document pose l’architecture que tu as demandée : un back-office Strapi pour piloter les contenus du site vitrine actuel (build Jinja + `build.py`). Il reprend l’existant (`README.md`, `build.py`, `templates/…`) et trace les prochaines étapes côté CMS, pipeline de build et front.

## 1. État actuel (pour bien raccrocher)
- Le projet est un générateur Jinja qui…  
  * charge `templates/pages/*.html` pour chaque page (`build.py:5-186`),  
  * injecte des contextes statiques (`PAGES`),  
  * écrit les fichiers compilés dans la racine (`build.py:173-184`).  
- Le rendu final est 100 % HTML/CSS/JS statique (voir les templates sous `templates/pages` et les `partials` header/footer pour la navigation).  
- Le README indique qu’on régénère les pages via `python build.py` puis on lance `python server.py` (page 30-49 du README). Tout le contenu—actu, équipe, adhésion, etc.—est codé en dur dans les templates actuels.

## 2. Objectifs Strapi
1. Offrir au CA une interface de gestion simple (ajout d’actualités, mise à jour de l’équipe, gestion de la galerie, FAQ, contenus textes de page, etc.).
2. Garder le site HTML/CSS/JS comme front ; il consommera l’API Strapi au moment du build.
3. Garder `build.py` comme point d’entrée, mais faire en sorte qu’il récupère les données depuis l’API (avec un fallback local si le CMS n’est pas encore prêt).

## 3. Backend Strapi (architecture préconisée)
1. **Déploiement** : Strapi peut tourner sur Railway, Render ou un petit VPS. Choisis un `PostgreSQL` (ou SQLite en dev) et crée un admin (`STRAPI_ADMIN_EMAIL`, `STRAPI_ADMIN_PASSWORD`).
2. **Collections / single types** :
   | Type | Champs/relations clés | Utilisation |
   | --- | --- | --- |
   | `site-settings` (single type) | `hero_title`, `hero_subtitle`, `cta_label`, `cta_url`, `intro_paragraphs` (repeatable), `adhesion_summary`, `helloasso_url`, `stats` (component), `footer_cta`, liens réseaux | piloter la home, la page d’adhésion et les blocs partagés (header/footer). |
   | `news-article` | `title`, `slug`, `publishedAt`, `summary`, `body` (rich text), `hero_image` (media), `category`, `pinned`, `cta_label`, `cta_url` | feed actu (`templates/pages/actu.html`) + JSON-LD. |
   | `team-member` | `name`, `role`, `bio`, `order`, `photo` (media), `is_board_member`, `social_links` (composant) | page équipe (`templates/pages/equipe.html`). |
   | `gallery-item` | `caption`, `photo`, `album` (string/tag), `publishedAt` | page galerie et slides lightbox. |
   | `faq-entry` | `question`, `answer`, `order`, `category` | page FAQ + JSON-LD. |
   | `event` (optionnel) | `name`, `date`, `description`, `cta` | section “événements” si nécessaire pour la home. |
3. **Droits API** :
   * Autorise les `find` publiques (`public` role) pour les endpoints `news-articles`, `team-members`, `gallery-items`, `faq-entries` et `site-settings`.
   * Garde les créations/modifications côté admin.
4. **Webhooks** :
   * Crée un webhook dans Strapi qui appelle `https://<ton-host>/api/rebuild` (ou une route personnalisée) chaque fois qu’un contenu change, pour déclencher `python build.py` sur le front (via Netlify/Vercel Hook ou un petit serveur d’automatisation).

## 4. Pipeline de build + scripts
1. **Point d’entrée** : `python build.py` reste le script de génération. Il doit maintenant :
   * Lire un fichier local `data/cms-cache.json` (généré par un script de sync).
   * Fournir les listes suivantes aux templates : `articles`, `team_members`, `gallery_items`, `faq_entries`, `site_settings`.
2. **Script de synchronisation** : crée un petit script `scripts/refresh_cms_cache.py` (ou équivalent) :
   ```python
   from urllib.request import Request, urlopen
   from urllib.parse import urlencode
   import json, os

   STRAPI_BASE = os.environ.get("STRAPI_BASE_URL", "https://cms.volontairesfrancais.fr")
   STRAPI_TOKEN = os.environ.get("STRAPI_READ_TOKEN")

   def fetch(endpoint, params=None):
       url = f"{STRAPI_BASE}/api/{endpoint}"
       if params:
           url += f"?{urlencode(params)}"
       headers = {"Authorization": f"Bearer {STRAPI_TOKEN}"} if STRAPI_TOKEN else {}
       req = Request(url, headers={**headers, "Accept": "application/json"})
       with urlopen(req) as resp:
           return json.load(resp)["data"]

   def dump_cache():
       cache = {
           "articles": fetch("news-articles", {"sort": "publishedAt:desc"}),
           "team_members": fetch("team-members", {"sort": "order:asc"}),
           "gallery_items": fetch("gallery-items", {"sort": "publishedAt:desc"}),
           "faq_entries": fetch("faq-entries", {"sort": "order:asc"}),
           "site_settings": fetch("site-settings")
       }
       with open("data/cms-cache.json", "w", encoding="utf-8") as f:
           json.dump(cache, f, ensure_ascii=False, indent=2)
```
   * Ce script doit être invoqué avant `build.py` (via `make`, `taskfile`, ou `python -m scripts.refresh_cms_cache`).
   * Lorsqu’on est en dev local sans Strapi, tu peux remplir `data/cms-cache.json` manuellement avec les mêmes contenus qu’aujourd’hui (tu peux extraire la partie “articles” du template `templates/pages/actu.html` par exemple).
3. **Modification de `build.py`** :
   * Ajoute une fonction `load_cms_context()` qui lit le cache `data/cms-cache.json` (fais en sorte que l’absence du fichier ne crash pas, en utilisant un fallback).
   * Étends `PAGES` pour injecter les listes : e.g. `context["articles"] = context.get("articles") or cms["articles"]`.
   * Ajoute `context["settings"] = cms.get("site_settings", {})` pour que les templates puissent afficher dynamiquement hero/CTA du header et de la page “adhésion”.
4. **Gestion du JSON-LD** :
   * Génère `FAQ_STRUCTURED_DATA` à partir de `faq_entries` (boucle sur les données) pour garder le markup SEO.

## 5. Adaptation des templates (front)
1. **Actualités** (`templates/pages/actu.html`) :
   * Remplace les articles codés en dur par un loop :  
     ```jinja
     {% for article in articles %}
     <article class="news-article">
         <div class="article-header">
             <h2 class="article-title">{{ article.attributes.title }}</h2>
             <p class="article-date">
                 <i class="far fa-calendar"></i>
                 {{ article.attributes.publishedAt | date("long") }}
             </p>
         </div>
         ...
     {% endfor %}
     ```
   * Ajoute un fallback (`{% if not articles %}...{% endif %}`).
2. **Équipe** (`templates/pages/equipe.html`) : itère sur `team_members` et affiche `photo`, `bio`, `role`, `social_links`.
3. **Galerie** : génère le grid depuis `gallery_items`, avec `img src="{{ item.attributes.photo.data.attributes.url }}"`.
4. **FAQ** : affiche les questions/answers et recrée le JSON-LD depuis `faq_entries`.
5. **Pages “Accueillir” et “Adhésion”** : utilise `settings.attributes.adhesion_summary`, `settings.attributes.cta_label`, etc.
6. **Header/Footer** : récupère les liens réseaux / statuts (via `settings`) pour éviter les doublons.
7. **Bonus** : en tête du `templates/base.html`, tu peux injecter `{{ settings.attributes.hero_title }}` dans les metas ou le header.

## 6. Déploiement & workflow
1. **Flux** :
   * L’équipe met à jour les contenus dans Strapi (article, équipe, FAQ).  
   * Strapi envoie un webhook vers ton hébergeur statique (Netlify/Vercel) ou vers un `CI` qui :
     1. exécute `python scripts/refresh_cms_cache.py`,
     2. exécute `python build.py`.
   * Le build publie la nouvelle version statique.
2. **Environnements** :
   * `STRAPI_BASE_URL` (ex. `https://cms.volontairesfrancais.fr`),  
   * `STRAPI_READ_TOKEN` (token JWT généré par Strapi pour éviter de rendre l’API complètement ouverte).  
   * `CMS_CACHE_PATH` (optionnel) si tu veux changer l’emplacement du fichier JSON.
3. **Monitoring** :
   * Vérifie la santé du webhook et surveille des erreurs de cache (logs `scripts/refresh_cms_cache.py`).  
   * Teste régulièrement `python build.py` en local après avoir mis à jour `data/cms-cache.json`.

## 7. Prochaines actions possibles
1. Documenter les champs exacts à créer dans Strapi (tu peux copier cette table dans la doc d’admin).  
2. Créer un `README-CMS.md` que tu partages avec le CA pour qu’ils sachent comment publier une actu.  
3. Ajouter un build pipeline (GitHub Actions/Make) qui orchestre `refresh_cms_cache` → `build.py` → deploy.

