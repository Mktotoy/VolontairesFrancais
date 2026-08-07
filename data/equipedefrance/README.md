# Archive sources equipedefrance.com (Milano Cortina 2026)

Snapshots du 2026-08-07, Jeux terminés = données figées. Servent à régénérer
lib/athletes-info.ts sans dépendre du site (peut fermer post-Jeux).

- drupal-athletes-*.json : https://resultats.equipedefrance.com/milano-cortina-2026/data/drupal-athletes.json (176 athlètes ; champ olympicMedals FIGÉ pré-Milano, ne pas utiliser)
- widget-resultats-*.json : agrégat des widget-resultat-athlete-<objectID>.json pour les 26 candidats du vote
- palmares-scrape-*.json : bloc "Palmarès aux jeux" scrapé des pages /athlete/<slug> (source de vérité médailles)
