/**
 * Seed content into Directus from existing frontend pages:
 * - Categories: creates "Actu" (slug: actu)
 * - Posts: seeds the 5 news articles from app/actu/page.tsx into `posts` (status=published, category=Actu)
 * - FAQ: seeds entries from app/faq/page.tsx into `faq`
 * - Team members: seeds the team cards from app/equipe/page.tsx into `team_members`
 * - Social links: seeds common social URLs
 *
 * Requirements: collections already created (run setup-directus.js first).
 * Env vars: DIRECTUS_URL (default http://localhost:8055), DIRECTUS_EMAIL, DIRECTUS_PASSWORD.
 *
 * Run from backend folder:
 *   $env:DIRECTUS_URL="http://localhost:8055"
 *   $env:DIRECTUS_EMAIL="admin@example.com"
 *   $env:DIRECTUS_PASSWORD="<password>"
 *   node scripts/seed-from-front.js
 */

const DIRECTUS_URL = process.env.DIRECTUS_URL || 'http://localhost:8055';
const DIRECTUS_EMAIL = process.env.DIRECTUS_EMAIL || 'admin@example.com';
const DIRECTUS_PASSWORD = process.env.DIRECTUS_PASSWORD;

if (!DIRECTUS_PASSWORD) {
  console.error('Missing DIRECTUS_PASSWORD environment variable.');
  process.exit(1);
}

async function api(path, options = {}) {
  const res = await fetch(`${DIRECTUS_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(options.token ? { Authorization: `Bearer ${options.token}` } : {}),
    },
    method: options.method || 'GET',
    body: options.body ? JSON.stringify(options.body) : undefined,
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Request failed ${res.status} ${res.statusText}: ${text}`);
  }
  return res.status === 204 ? null : res.json();
}

async function login() {
  const data = await api('/auth/login', {
    method: 'POST',
    body: { email: DIRECTUS_EMAIL, password: DIRECTUS_PASSWORD },
  });
  return data.data.access_token;
}

const slugify = (str) =>
  str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

async function upsertByField(token, collection, field, value, payload) {
  const existing = await api(
    `/items/${collection}?filter[${encodeURIComponent(field)}][_eq]=${encodeURIComponent(
      value
    )}&limit=1`,
    { token }
  );
  if (existing?.data?.length) {
    const id = existing.data[0].id;
    await api(`/items/${collection}/${id}`, { method: 'PATCH', token, body: payload });
    console.log(`✔ updated ${collection} ${value}`);
    return id;
  }
  const created = await api(`/items/${collection}`, { method: 'POST', token, body: payload });
  console.log(`+ created ${collection} ${value}`);
  return created.data.id;
}

async function ensureCategoryActu(token) {
  const slug = 'actu';
  return upsertByField(token, 'categories', 'slug', slug, {
    name: 'Actualités',
    slug,
    description: 'Articles d’actualités',
    status: 'published',
  });
}

async function seedPosts(token, categoryId) {
  const posts = [
    {
      title: "« Il y a 1 mois... et déjà 250 volontaires ! »",
      date: '2025-11-28',
      excerpt:
        '<p>Il y a tout juste un mois, le 28 octobre, l’association « Volontaires français » voyait officiellement le jour...</p>',
      content: `
<p>Il y a tout juste un mois, le 28 octobre, l'association « Volontaires français » voyait officiellement le jour.</p>
<p>Nous avions une conviction : l’élan de Paris 2024 ne devait pas s’éteindre. Aujourd'hui, vous nous apportez la preuve que nous avions raison.</p>
<p>En seulement 30 jours :</p>
<p>• 250 adhérents nous ont rejoints (merci !).<br />
• Une communauté active de missionnés et réservistes pour #MilanoCortina2026 s'est déjà formée.<br />
• L'esprit de famille est bel et bien là.</p>
<p>Ce premier mois dépasse toutes nos espérances. Il confirme que cette association répond à un besoin réel : rassembler, soutenir et faire vivre l'héritage.</p>
<p>Merci à nos 250 premiers pionniers pour votre confiance.</p>
<p>L'aventure ne fait que commencer. Si vous n'avez pas encore franchi le pas, rejoignez le mouvement pour écrire les prochains mois avec nous !</p>
`,
    },
    {
      title: 'Première action concrète : check !',
      date: '2025-11-20',
      excerpt:
        '<p>Hier soir, l’association « Volontaires français » a animé sa toute première visioconférence de préparation destinée aux volontaires partants pour les Jeux Olympiques et Paralympiques de Milano Cortina 2026.</p>',
      content: `
<p>Hier soir, l'association « Volontaires français » a animé sa toute première visioconférence de préparation destinée aux volontaires (missionnés et réservistes) partants pour les Jeux Olympiques et Paralympiques de Milano Cortina 2026.</p>
<p>Au programme :</p>
<p>• retours d'expérience inspirants<br />
• conseils logistiques pour anticiper l'aventure<br />
• un vrai moment de partage et d'entraide</p>
<p>Un immense merci à tous les participants pour leur présence, leur énergie et leur engagement.</p>
<p>Cette première action illustre parfaitement la mission de notre association : FAIRE, SOUTENIR.</p>
<p>Et la suite arrive très vite !</p>
<p>Pour rejoindre nos prochaines actions, accéder à nos contenus exclusifs et participer à notre premier grand événement physique le 6 décembre, c'est simple !</p>
<div class="article-cta">
  <a href="https://www.helloasso.com/associations/volontaires-francais" target="_blank" class="btn-primary">
    Rejoignez la communauté !
  </a>
</div>
`,
    },
    {
      title: 'Les adhésions sont ouvertes !',
      date: '2025-11-11',
      excerpt:
        '<p><strong>Les adhésions à l’association « Volontaires français » sont officiellement ouvertes !</strong></p><p>Vous pouvez dès maintenant devenir membre via notre page HelloAsso sécurisée...</p>',
      content: `
<p>Les adhésions à l'association « Volontaires français » sont officiellement ouvertes !</p>
<p>Vous pouvez dès maintenant devenir membre et rejoindre le réseau national des volontaires olympiques et paralympiques via notre page HelloAsso sécurisée :</p>
<div class="article-cta">
  <a href="https://www.helloasso.com/associations/volontaires-francais/adhesions/adherez-a-volontaires-francais" target="_blank" class="btn-primary">
    Adhérer maintenant
  </a>
</div>
<h3>Pour rappel, qui peut adhérer ?</h3>
<p>L'association est ouverte à tous les volontaires français, sous deux conditions :</p>
<ol>
  <li>Être de nationalité française.</li>
  <li>
    ET remplir l'une de ces deux conditions :
    <ul>
      <li>Avoir été volontaire sur une Olympiade (été ou hiver), COJO, Club France ou Ville Hôte.</li>
      <li>OU être titulaire d'une mission affectée ou réserviste pour Milano Cortina.</li>
    </ul>
  </li>
</ol>
<h3>En devenant membre aujourd'hui, vous :</h3>
<ul class="article-list">
  <li>Rejoignez officiellement la communauté pour nos prochains événements.</li>
  <li>Accédez au soutien pour les futurs volontaires (#MilanoCortina2026).</li>
  <li>Devenez un acteur de la transmission de l'héritage de Paris 2024.</li>
</ul>
<p><strong>L'aventure continue, et elle commence ici.</strong></p>
`,
    },
    {
      title: 'Pourquoi adhérer ?',
      date: '2025-11-06',
      excerpt:
        '<h3>Merci pour votre enthousiasme !</h3><p>Nous sommes extrêmement heureux et agréablement surpris par l’enthousiasme incroyable partagé dans vos commentaires depuis le début de cette semaine.</p>',
      content: `
<h3>Vous l'avez confirmé :</h3>
<p>La famille des volontaires est bien là... et l'aventure ne fait que commencer ! Alors, on continue !</p>
<h3>Ce que l'association vous apporte concrètement</h3>
<p>Que vous soyez un ancien de Paris 2024 (ou d'une Olympiade précédente) ou un futur volontaire, notre mission est de vous accompagner.</p>
<h3>Rejoindre Volontaires français, c'est...</h3>
<ul class="article-list">
  <li>Rester connecté à la famille des volontaires.</li>
  <li>Préparer sereinement vos futures missions.</li>
  <li>Valoriser l'expérience incroyable que vous avez acquise.</li>
  <li>Parlez-en autour de vous !</li>
</ul>
`,
    },
    {
      title: 'La création de l’association',
      date: '2025-10-28',
      excerpt:
        '<p>Après de nombreux mois de travaux, nous avons le plaisir de vous annoncer la création de notre association « Volontaires français ».</p>',
      content: `
<p>Après de nombreux mois de travaux, nous avons le plaisir de vous annoncer la création de notre nouvelle association : « Volontaires français ».</p>
<p>Notre objectif est de rassembler, soutenir et valoriser tous les volontaires français ayant des missions lors des Jeux Olympiques et Paralympiques d'hier et de demain, en créant une communauté active et solidaire.</p>
<p>Pour ne rien manquer et être parmi les premiers à découvrir le lancement de notre campagne d'adhésion, connectez-vous à nos réseaux sociaux :</p>
<div class="article-social-links">
  <a href="https://www.facebook.com/profile.php?id=61581761488412" target="_blank" class="article-social-link">
    <i class="fab fa-facebook-f"></i> Facebook : Cliquez ici !
  </a>
  <a href="https://www.instagram.com/volontaires.francais/" target="_blank" class="article-social-link">
    <i class="fab fa-instagram"></i> Instagram : Cliquez ici !
  </a>
  <a href="https://www.linkedin.com/company/association-volontaire-francais/" target="_blank" class="article-social-link">
    <i class="fab fa-linkedin-in"></i> LinkedIn : Cliquez ici !
  </a>
</div>
<p>Rejoignez-nous et soyez au cœur de l'actualité de l'association.</p>
`,
    },
  ];

  for (const post of posts) {
    const slug = slugify(post.title);
    await upsertByField(
      token,
      'posts',
      'slug',
      slug,
      {
        title: post.title,
        slug,
        excerpt: post.excerpt,
        content: post.content,
        status: 'published',
        published_at: post.date,
        category: categoryId,
      }
    );
  }
}

async function seedFaq(token) {
  const faqs = [
    {
      question: '« Volontaires Français », c’est quoi exactement ?',
      answer:
        '<p>« Volontaires Français » est une association loi 1901 créée le 28 octobre 2025, qui rassemble tous les volontaires ayant participé ou s’apprêtant à participer aux Jeux Olympiques et Paralympiques, été comme hiver. Notre mission est de faire vivre cette communauté unique, de partager nos expériences, de promouvoir les valeurs du bénévolat et de soutenir les futurs volontaires.</p>',
      category: 'Général',
      sort: 1,
    },
    {
      question: 'Doit-on obligatoirement avoir été volontaire sur des JO pour rejoindre l’association ?',
      answer:
        '<p><b>Oui.</b> L’association « Volontaires Français » est spécifiquement destinée à rassembler les bénévoles ayant participé – ou participant prochainement – aux Jeux Olympiques et Paralympiques, quelle que soit l’édition. Que vous ayez été volontaire pour Paris 2024 (COJO), le Club France ou la Ville Hôte, vous êtes au bon endroit.</p>',
      category: 'Adhésion',
      sort: 2,
    },
    {
      question: 'Je n’ai pas la nationalité française mais je souhaiterais rejoindre l’association. Est-ce possible ?',
      answer:
        '<p>L’association « Volontaires Français » a pour vocation première d’identifier et rassembler les anciens volontaires français. Pour l’instant, l’adhésion est réservée aux volontaires de nationalité française. Suivez nos réseaux sociaux pour les infos publiques.</p>',
      category: 'Adhésion',
      sort: 3,
    },
    {
      question: 'Pourquoi devrais-je adhérer ?',
      answer:
        '<p>Pour trois raisons principales :</p><ul><li><strong>Rester connecté</strong> : retrouver la “famille” des volontaires et ne pas laisser la flamme s’éteindre.</li><li><strong>Se préparer</strong> : bénéficier de conseils, webinaires et retours d’expérience.</li><li><strong>Transmettre</strong> : valoriser ton expérience et aider la relève.</li></ul>',
      category: 'Adhésion',
      sort: 4,
    },
    {
      question: 'Je n’ai pas pour projet de candidater pour de futurs jeux. Puis-je néanmoins rejoindre l’association ?',
      answer:
        '<p>Oui. L’association n’est pas réservée qu’aux futurs candidats. Un objectif clé est de rassembler les anciens volontaires et faire vivre la communauté. Si tu veux rester connecté, participer à nos événements ou transmettre ton expérience, tu es au bon endroit.</p>',
      category: 'Adhésion',
      sort: 5,
    },
    {
      question: 'Je n’ai participé qu’aux Jeux de Paris 2024, suis-je concerné ?',
      answer:
        '<p>Absolument ! Tu es au cœur de l’association. Elle a été fondée par des volontaires de Paris 2024 pour rassembler celles et ceux qui ont participé.</p>',
      category: 'Adhésion',
      sort: 6,
    },
    {
      question: 'Je veux être volontaire pour les prochains Jeux (ex: Milano Cortina 2026). Pouvez-vous m’aider ?',
      answer:
        '<p>Oui. En adhérant, tu auras accès à un soutien et des conseils, des webinaires de préparation et aux partages d’expérience des anciens.</p>',
      category: 'Futur volontaire',
      sort: 7,
    },
    {
      question: 'L’adhésion garantit-elle ma sélection comme volontaire ?',
      answer:
        '<p><strong>Non.</strong> La sélection des volontaires est la responsabilité de chaque Comité d’Organisation. Nous aidons à te préparer, mais nous ne gérons ni le recrutement ni les sélections.</p>',
      category: 'Futur volontaire',
      sort: 8,
    },
    {
      question: 'Êtes-vous l’association “officielle” de Paris 2024 ou du CNOSF ?',
      answer:
        '<p>Nous sommes une association indépendante créée par des volontaires pour les volontaires. Nous collaborons avec le CNOSF et aspirons à intégrer la famille olympique, mais nous ne sommes pas une entité “officielle” du COJO ou du CNOSF.</p>',
      category: 'Association',
      sort: 9,
    },
    {
      question: 'J’ai un problème avec mon uniforme / certificat de Paris 2024. Pouvez-vous m’aider ?',
      answer:
        '<p><strong>Non.</strong> Nous n’avons aucun accès à la logistique ou aux stocks du COJO. Nous nous tournons vers l’avenir pour construire la nouvelle communauté des volontaires.</p>',
      category: 'Association',
      sort: 10,
    },
    {
      question: 'L’adhésion est-elle gratuite ?',
      answer:
        '<p>Non. Pour financer nos actions (événements, site web, animations, etc.) et assurer le fonctionnement de l’association, une cotisation annuelle sera demandée lors de l’ouverture des adhésions.</p>',
      category: 'Adhésion',
      sort: 11,
    },
  ];

  for (const faq of faqs) {
    const slug = slugify(faq.question).slice(0, 60);
    await upsertByField(token, 'faq', 'slug', slug, {
      question: faq.question,
      answer: faq.answer,
      category: faq.category,
      sort: faq.sort,
      slug,
    });
  }
}

async function seedTeam(token) {
  const members = [
    { first_name: 'Fabian', last_name: 'Tosolini', role_title: 'Président', category: 'Bureau', sort: 1 },
    { first_name: 'Mathilde', last_name: 'Gressier', role_title: 'Vice-Présidente', category: 'Bureau', sort: 2 },
    { first_name: 'Julien', last_name: 'Hugelé', role_title: 'Vice-Président', category: 'Bureau', sort: 3 },
    { first_name: 'Océane', last_name: 'Le Guern', role_title: 'Secrétaire', category: 'Bureau', sort: 4 },
    { first_name: 'Patrice', last_name: 'Lasserre', role_title: 'Secrétaire adjoint', category: 'Bureau', sort: 5 },
    { first_name: 'Philippe', last_name: 'Frigout', role_title: 'Trésorier', category: 'Bureau', sort: 6 },
    { first_name: 'Alexa', last_name: 'Dubreuil-Storer', role_title: 'Trésorière adjointe', category: 'Bureau', sort: 7 },
    { first_name: 'Enora', last_name: 'Adam', role_title: 'Membre du CA', category: "Membres du Conseil d'Administration", sort: 101 },
    { first_name: 'Florence', last_name: 'Casenove', role_title: 'Membre du CA', category: "Membres du Conseil d'Administration", sort: 102 },
    { first_name: 'Emmanuelle', last_name: 'Estrade', role_title: 'Membre du CA', category: "Membres du Conseil d'Administration", sort: 103 },
    { first_name: 'Marie-Anne', last_name: 'Ramond', role_title: 'Membre du CA', category: "Membres du Conseil d'Administration", sort: 104 },
    { first_name: 'Sébastien', last_name: 'Tomec', role_title: 'Membre du CA', category: "Membres du Conseil d'Administration", sort: 105 },
  ];

  for (const member of members) {
    const slug = slugify(`${member.first_name}-${member.last_name}`);
    const full_name = `${member.first_name} ${member.last_name}`;
    await upsertByField(token, 'team_members', 'slug', slug, {
      ...member,
      full_name,
      slug,
    });
  }
}

async function seedSocial(token) {
  const links = [
    { name: 'Facebook', icon: 'facebook', url: 'https://www.facebook.com/profile.php?id=61581761488412', sort: 1 },
    { name: 'Instagram', icon: 'instagram', url: 'https://www.instagram.com/volontaires.francais/', sort: 2 },
    { name: 'LinkedIn', icon: 'linkedin', url: 'https://www.linkedin.com/company/association-volontaire-francais/', sort: 3 },
  ];

  for (const link of links) {
    const slug = slugify(link.name);
    await upsertByField(token, 'social_links', 'slug', slug, { ...link, slug });
  }
}

async function main() {
  const token = await login();
  console.log('Authenticated.');

  const categoryId = await ensureCategoryActu(token);
  await seedPosts(token, categoryId);
  await seedFaq(token);
  await seedTeam(token);
  await seedSocial(token);

  console.log('Seeding completed.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
