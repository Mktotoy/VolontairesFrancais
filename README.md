# Site Vitrine - Volontaires français

Site web officiel de l'association internationale des volontaires de Jeux olympiques et paralympiques.

## 🎯 À propos

Volontaires français est une association dédiée à rassembler, soutenir et valoriser tous les volontaires français ayant des missions lors des Jeux Olympiques et Paralympiques d'hier et de demain.

## 🌟 Fonctionnalités

- **Page d'accueil** : Présentation de l'association, mission et objectifs
- **L'équipe** : Présentation des 11 membres du conseil d'administration avec photos
- **Pourquoi adhérer** : Avantages de l'adhésion et formulaire HelloAsso intégré
- **Actualités** : Articles et nouvelles de l'association
- **Galerie Photos** : Photos des événements olympiques et activités
- **FAQ** : Questions fréquentes avec Schema.org markup

## 🎨 Charte Graphique

### Couleurs Olympiques
- **Bleu** : #067fcc (couleur principale)
- **Jaune** : #fcb133 (accents)
- **Vert** : #07a459 (sections alternées)
- **Rouge** : #eb2f50 (call-to-action)

### Typographie
- **Logo et titres** : Walaweh (police custom)
- **Contenu** : Arial

## 🚀 Démarrage rapide

Le site est un site statique en HTML, CSS et JavaScript pur (pas de framework).

### Prérequis
- Python 3.11+ (pour le serveur de développement)

### Lancer le site

1. **Générer les pages HTML** (après modification des templates) :
```bash
python3 build.py
```

2. **Démarrer le serveur** :
```bash
python3 server.py
```

Le site sera accessible sur `http://localhost:5000`

## 📁 Structure du projet

```
volontaires-francais/
├── index.html              # Page d'accueil
├── equipe.html             # Page équipe
├── adhesion.html           # Page pourquoi adhérer
├── actu.html               # Page actualités
├── galerie.html            # Page galerie photos
├── faq.html                # Page FAQ
├── mentions-legales.html   # Mentions légales
├── templates/              # Templates Jinja2
│   ├── base.html           # Layout de base
│   ├── partials/           # Header et footer
│   └── pages/              # Templates de pages
├── css/
│   └── styles.css          # Styles globaux
├── js/
│   └── script.js           # Scripts interactifs
├── fonts/
│   ├── Walaweh.otf         # Police custom
│   └── LOGO_*.png          # Logos de l'association
├── images/                 # Images du site
│   └── equipe/             # Photos des membres
├── build.py                # Script de build Jinja2
└── server.py               # Serveur de développement
```

## 🔗 Liens importants

### Réseaux sociaux
- [Facebook](https://www.facebook.com/profile.php?id=61581761488412)
- [Instagram](https://www.instagram.com/volontaires.francais/)
- [LinkedIn](https://www.linkedin.com/company/association-volontaire-fran%C3%A7ais/)

### HelloAsso
- [Adhésion](https://www.helloasso.com/associations/volontaires-francais/adhesions/adherez-a-volontaires-francais)
- [Boutique Pin's](https://www.helloasso.com/associations/volontaires-francais/boutiques/vente-pin-s)

## ⚙️ Fonctionnalités techniques

- **Design responsive** : Adapté mobile, tablette et desktop
- **Menu hamburger** : Navigation mobile optimisée
- **Lightbox** : Visualisation agrandie des photos
- **Animations au scroll** : Apparition progressive des éléments
- **Barre de recherche** : Recherche de contenu
- **Cache-Control** : Headers optimisés pour le développement

## 📝 Conseil d'administration

- **Président** : Fabian Tosolini
- **Vice-Présidents** : Mathilde Gressier, Julien Hugelé
- **Secrétaires** : Océane Le Guern, Patrice Lasserre
- **Trésoriers** : Philippe Frigout, Alexa Dubreuil-Storer
- **Membres CA** : Enora Adam, Florence Casenove, Emmanuelle Estrade, Marie-Anne Ramond, Sébastien Tomec

## 📄 Licence

### Police Walaweh
La police Walaweh est protégée par des droits d'auteur. Pour un usage commercial, veuillez vous assurer d'avoir acquis une licence appropriée auprès de [DumadiStyle](https://dumadistyle.com/product/walaweh/).

### Contenu du site
© 2025 Volontaires français. Tous droits réservés.

## 🌐 Déploiement

Ce site est prêt à être déployé sur n'importe quel hébergeur de sites statiques :
- Netlify
- Vercel
- GitHub Pages
- Serveur web classique (Apache, Nginx)

Pour le domaine `www.volontairesfrancais.fr`, configurez simplement le DNS pour pointer vers votre hébergeur.

## 📞 Contact

Pour toute question, contactez l'équipe Volontaires français via nos réseaux sociaux ou le formulaire d'adhésion.

---

**Fait avec ❤️ pour la communauté des volontaires français des Jeux Olympiques et Paralympiques**
