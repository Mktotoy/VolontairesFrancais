#!/usr/bin/env python3
import os
from jinja2 import Environment, FileSystemLoader

# Configuration
TEMPLATES_DIR = 'templates'
OUTPUT_DIR = '.'

# FAQ structured data (JSON-LD)
FAQ_STRUCTURED_DATA = '''
        <script type="application/ld+json">
            {
                "@context": "https://schema.org",
                "@type": "FAQPage",
                "mainEntity": [
                    {
                        "@type": "Question",
                        "name": "\\"Volontaires Français\\", c'est quoi exactement ?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "\\"Volontaires Français\\" est une association loi 1901 officiellement créée le 28 octobre 2025, qui rassemble tous les volontaires ayant participé ou s'apprêtant à participer aux Jeux Olympiques et Paralympiques, été comme hiver. Notre mission est de faire vivre cette communauté unique, de partager nos expériences, de promouvoir les valeurs du bénévolat et de soutenir les futurs volontaires."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "Doit-on obligatoirement avoir été volontaire sur des JO pour rejoindre l'association ?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Oui. L'association \\"Volontaires Français\\" est spécifiquement destinée à \\"rassembler les bénévoles ayant participé - ou participant prochainement - aux Jeux Olympiques et Paralympiques\\", quelque soit l'édition. C'est ce qui crée notre lien commun."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "Je n'ai pas la nationalité française mais je souhaiterais rejoindre l'association. Est-ce possible ?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "L'association \\"Volontaires Français\\", comme son nom l'indique, a pour vocation première d'\\"Identifier et rassembler les anciens volontaires Français\\". Pour l'instant, l'adhésion est réservée aux volontaires de nationalité française. Nous vous invitons néanmoins à suivre nos réseaux sociaux où nous partagerons des informations publiques sur la vie de la communauté."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "Pourquoi devrais-je adhérer ?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Pour trois raisons principales : RESTER CONNECTÉ - Pour retrouver la \\"famille\\" des volontaires lors de nos événements et rencontres, et ne pas laisser la flamme s'éteindre. SE PRÉPARER - Si vous êtes futur volontaire, pour bénéficier de conseils, de webinaires et des retours d'expérience des anciens. TRANSMETTRE - Si vous êtes un ancien volontaire, pour valoriser votre expérience et aider à préparer la relève."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "Je n'ai pas pour projet de candidater pour de futurs jeux. Puis-je néanmoins rejoindre l'association ?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Oui, absolument. L'association n'est pas réservée qu'aux futurs candidats. Un de nos objectifs principaux est de rassembler les anciens volontaires et de \\"faire vivre la communauté\\". Si vous souhaitez \\"rester connecté à la famille\\", participer à nos événements, ou \\"valoriser et transmettre votre expérience\\", vous êtes au bon endroit."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "Je n'ai participé qu'aux Jeux de Paris 2024, suis-je concerné ?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Absolument ! Vous êtes le cœur de notre association. L'association a été fondée par des volontaires de Paris 2024 pour \\"rassembler celles et ceux qui ont participé\\" et prolonger cette aventure humaine."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "Je veux être volontaire pour les prochains Jeux (ex: Milano Cortina 2026). Pouvez-vous m'aider ?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Oui. C'est un de nos objectifs majeurs. En adhérant, vous aurez accès à un \\"soutien et des conseils\\", des webinaires de préparation et au partage d'expérience des anciens."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "Est-ce que l'adhésion garantit ma sélection comme volontaire pour les prochains Jeux ?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "NON. C'est un point très important. Nous sommes une association de soutien et de réseau, nous ne sommes pas le Comité d'Organisation des Jeux. La sélection des volontaires est la responsabilité exclusive de chaque Comité d'Organisation (ex: Milano Cortina 2026). Nous vous aidons à vous préparer, mais nous ne gérons ni le recrutement, ni les sélections."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "Êtes-vous l'association \\"officielle\\" de Paris 2024 ou du CNOSF ?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Nous sommes une association indépendante créée par des volontaires pour les volontaires. Nous travaillons en étroite collaboration avec le CNOSF et aspirons à intégrer la famille olympique, mais nous ne sommes pas une entité \\"officielle\\" de Paris 2024 (qui n'existe plus) ou du CNOSF."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "J'ai un problème avec mon uniforme / mon certificat de Paris 2024. Pouvez-vous m'aider ?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "NON. Malheureusement, nous ne pouvons pas vous aider sur ce point. Nous n'avons aucun accès à la logistique, aux outils ou aux stocks du Comité d'Organisation de Paris 2024. Notre association se tourne vers l'avenir pour construire la nouvelle communauté des volontaires."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "L'adhésion est-elle gratuite ?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Non. Pour financer nos actions (organisation d'événements, gestion du site web, animations, etc.) et assurer le fonctionnement de l'association, une cotisation annuelle sera demandée lors de l'ouverture des adhésions."
                        }
                    }
                ]
            }
        </script>'''

# Pages configuration
PAGES = {
    'index.html': {
        'template': 'pages/index.html',
        'context': {
            'page_title': 'Volontaires français - Accueil',
            'meta_description': 'Volontaires français - Association internationale des volontaires de Jeux olympiques et paralympiques',
            'active_page': 'accueil'
        }
    },
    'equipe.html': {
        'template': 'pages/equipe.html',
        'context': {
            'page_title': 'L\'équipe - Volontaires français',
            'meta_description': 'L\'équipe de Volontaires français - Conseil d\'administration',
            'active_page': 'equipe'
        }
    },
    'adhesion.html': {
        'template': 'pages/adhesion.html',
        'context': {
            'page_title': 'Pourquoi adhérer - Volontaires français',
            'meta_description': 'Découvrez pourquoi adhérer à Volontaires français - Rejoignez la communauté',
            'active_page': 'adhesion'
        }
    },
    'actu.html': {
        'template': 'pages/actu.html',
        'context': {
            'page_title': 'Actualités - Volontaires français',
            'meta_description': 'Actualités de Volontaires français',
            'active_page': 'actu'
        }
    },
    'galerie.html': {
        'template': 'pages/galerie.html',
        'context': {
            'page_title': 'Galerie Photos - Volontaires français',
            'meta_description': 'Galerie Photos de Volontaires français',
            'active_page': 'galerie'
        }
    },
    'faq.html': {
        'template': 'pages/faq.html',
        'context': {
            'page_title': 'FAQ - Volontaires français',
            'meta_description': 'FAQ - Foire aux Questions de Volontaires français',
            'active_page': 'faq',
            'extra_head': FAQ_STRUCTURED_DATA
        }
    },
    'mentions-legales.html': {
        'template': 'pages/mentions-legales.html',
        'context': {
            'page_title': 'Mentions légales - Volontaires français',
            'meta_description': 'Mentions légales de l\'association Volontaires français',
            'active_page': ''
        }
    }
}

# Build pages
print("🔨 Building pages...")
print()

env = Environment(loader=FileSystemLoader(TEMPLATES_DIR))

for output_file, config in PAGES.items():
    template = env.get_template(config['template'])
    html_content = template.render(**config['context'])
    
    output_path = os.path.join(OUTPUT_DIR, output_file)
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(html_content)
    
    print(f"✓ Generated {output_file}")

print()
print(f"✨ Build completed! {len(PAGES)} pages generated.")
