const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');

// Manually parse .env to avoid shell env conflicts
const envPath = path.join(__dirname, '../.env');
const envContent = fs.readFileSync(envPath, 'utf8');
const databaseUrlMatch = envContent.match(/DATABASE_URL=(.+)/);
const databaseUrl = databaseUrlMatch ? databaseUrlMatch[1].trim() : null;

if (!databaseUrl) {
  console.error("Could not find DATABASE_URL in .env file");
  process.exit(1);
}

console.log("Using Database URL from .env:", databaseUrl.split('@')[1]);

const pool = new Pool({
  connectionString: databaseUrl,
});

const AGE_OPTS = ['18 – 25 ans', '26 – 35 ans', '36 – 45 ans', '46 – 55 ans', '56 – 65 ans', '+ 65 ans'];
const GENRE_OPTS = ['Femme', 'Homme', 'Non binaire'];
const REGION_OPTS = ['Auvergne-Rhône-Alpes', 'Bourgogne-Franche-Comté', 'Bretagne', 'Grand Est', 'Île-de-France', 'Provence-Alpes-Côte d\'Azur', 'Nouvelle-Aquitaine', 'Occitanie', 'Expatriés français (précisez le pays)'];
const ZONES = ['MILAN', 'CORTINA D\'AMPEZZO', 'VERONA', 'VAL DI FIEMME', 'VALTELLINA', 'ANTERSELVA'];

const VENUES_BY_ZONE = {
  'MILAN': ['San Siro – Cérémonie d\'ouverture', 'Palazzo del Ghiaccio – Hockey sur glace', 'PalaTrussardi – Curling', 'Pista di pattinaggio di Largo Levi – Patinage de vitesse'],
  'CORTINA D\'AMPEZZO': ['Village olympique', 'Pista Olimpica di Cortina – Luge', 'Innsbruck Ice Hall – Patinage artistique', 'Dolomiti di Brenta'],
  'VERONA': ['Arena di Verona – Cérémonie de clôture', 'Piazza Bra', 'Fortezza Medicea'],
  'VAL DI FIEMME': ['Predazzo Ski Jumping Stadium – Saut à ski', 'Pista di sci nordico – Ski de fond', 'Combiné nordique'],
  'VALTELLINA': ['Bormio Stelvio – Ski alpin', 'Ski alpinisme', 'Télésiège Bormio 2000'],
  'ANTERSELVA': ['Südtirol Arena (Anterselva / Antholz) – Biathlon', 'Piste de biathlon', 'Centre d\'entraînement']
};

const MISSIONS = ['EVS', 'Assistant Famille Olympique', 'Accréditations / Uniformes', 'Médias', 'Sports', 'Chauffeur', 'Fonction support', 'Volontaire Spectateurs', 'Coordination', 'Logistique'];

const FEEDBACK_POINTS_FORTS = [
  'La solidarité entre volontaires français sur place !',
  'L\'énergie et l\'enthousiasme du groupe',
  'L\'organisation générale était impeccable',
  'Les moments de convivialité entre volontaires',
  'La qualité de l\'encadrement et du soutien',
  'La diversité des profils et des missions',
  'L\'apprentissage et les échanges internationaux',
  'La magique olympique véritablement ressentie',
  'Les repas en commun et les moments partagés',
  'La reconnaissance de nos efforts par les organisateurs'
];

const FEEDBACK_CONSEILS = [
  'Il faut absolument prévoir des navettes pour les volontaires logés loin.',
  'Améliorer la communication entre les différentes équipes',
  'Prévoir plus de temps de repos pour les volontaires',
  'Mieux organiser les rotations de mission',
  'Améliorer la qualité des repas fournis',
  'Renforcer l\'accompagnement des volontaires isolés',
  'Mettre en place un système de transport plus efficace',
  'Augmenter les moments de cohésion d\'équipe',
  'Mieux définir les rôles et responsabilités',
  'Prévoir une meilleure formation initiale'
];

const AUTRES_ELEMENTS = [
  'Une expérience inoubliable malgré les défis logistiques.',
  'J\'aimerais absolument revenir pour les prochains Jeux !',
  'Une belle aventure humaine avant tout',
  'Les défis logistiques mais l\'amitié compensait tout',
  'Moment clé de ma vie, je recommencerai',
  'Fierté d\'avoir participé à cet événement majeur',
  'Expérience enrichissante, dépassement de soi',
  'À reproduire absolument pour les Alpes 2030',
  'Beaucoup appris sur moi-même et les autres',
  'Gratitude envers tous les organisateurs'
];

function getRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getRandomMultiple(arr, count) {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, Math.min(count, arr.length));
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function generateData() {
  let emailCounter = 1;
  
  // Generate 100 diverse records
  for (let batch = 0; batch < 100; batch++) {
    const email = `volunteer.${emailCounter}@volontaires-francais.fr`;
    emailCounter++;
    
    const region = getRandom(REGION_OPTS);
    const primaryZone = getRandom(ZONES);
    
    // 60% chance to have only one site, 40% chance for multi-site
    let sites;
    if (Math.random() < 0.6) {
      sites = [primaryZone];
    } else {
      const otherZones = ZONES.filter(z => z !== primaryZone);
      sites = [primaryZone, ...getRandomMultiple(otherZones, getRandomInt(1, 2))];
    }
    
    // Generate venues for selected sites
    const venuesByZone = {};
    sites.forEach(zone => {
      const availableVenues = VENUES_BY_ZONE[zone];
      venuesByZone[zone.toLowerCase().replace(/[\s']/g, '_')] = getRandomMultiple(availableVenues, getRandomInt(1, 2));
    });

    const answers = {
      // Profil
      age: getRandom(AGE_OPTS),
      genre: getRandom(GENRE_OPTS),
      region: region,
      region_expat: region.includes('Expatriés') ? getRandom(['Italie', 'Suisse', 'Allemagne', 'Autriche']) : undefined,
      accompagnement: getRandom(['Oui', 'Non']),
      accompagnement_details: getRandom([
        'Besoin de traducteur occasionnel',
        'Mobilité réduite, accès aux sites nécessaire',
        'Allergie alimentaire - sans gluten',
        'Accompagnant pour soutien émotionnel',
        'N/A'
      ]),
      paris2024: getRandom(['Oui', 'Non']),
      autres_jo: getRandom(['Oui', 'Non']),
      autres_hiver: getRandom(['Oui', 'Non']),
      benevole_hiver: getRandom(['Oui', 'Non']),
      reserviste: getRandom(['Oui', 'Non']),
      adherent_vf: getRandom(['Oui', 'Non']),

      // Rôle & Sites
      type_jeux: getRandom(['Sur les Jeux Olympiques', 'Sur les Jeux Paralympiques', 'Sur les deux']),
      sites_zones: sites,
      milan_venues: sites.includes('MILAN') ? getRandomMultiple(VENUES_BY_ZONE['MILAN'], getRandomInt(1, 2)) : undefined,
      cortina_venues: sites.includes('CORTINA D\'AMPEZZO') ? getRandomMultiple(VENUES_BY_ZONE['CORTINA D\'AMPEZZO'], getRandomInt(1, 2)) : undefined,
      verona_venues: sites.includes('VERONA') ? getRandomMultiple(VENUES_BY_ZONE['VERONA'], getRandomInt(1, 2)) : undefined,
      fiemme_venues: sites.includes('VAL DI FIEMME') ? getRandomMultiple(VENUES_BY_ZONE['VAL DI FIEMME'], getRandomInt(1, 2)) : undefined,
      valtellina_venues: sites.includes('VALTELLINA') ? getRandomMultiple(VENUES_BY_ZONE['VALTELLINA'], getRandomInt(1, 2)) : undefined,
      anterselva_venues: sites.includes('ANTERSELVA') ? getRandomMultiple(VENUES_BY_ZONE['ANTERSELVA'], getRandomInt(1, 2)) : undefined,
      mission_principale: getRandom(MISSIONS),
      redéployé: getRandom(['Oui', 'Non']),
      responsable_equipe: getRandom(['Oui', 'Non']),

      // Vie aux Jeux
      satisfaction_globale: getRandomInt(5, 10),
      satisfaction_integration: getRandomInt(6, 10),
      satisfaction_gestion: getRandomInt(4, 9),
      satisfaction_attentes: getRandomInt(6, 10),
      difficulte_logement: getRandomInt(1, 8),
      prix_logement_nuit: getRandom(['51 - 75 €', '76 - 100 €', '101 - 125 €', '126 - 150 €']),
      prix_logement_global: getRandom(['501 – 700 €', '701 – 1 000 €', '1 001 – 1 300 €', '1 301 – 1 500 €']),
      annulation_logement: getRandom(['Oui', 'Non']),
      fraude_logement: getRandom(['Oui', 'Non']),
      temps_transport: getRandom(['1 à 30 min', '31 à 45 min', '46 à 60 min', '1h à 1h30', '1h30+']),
      transport_acceptable: getRandomInt(4, 10),
      satisfaction_transport: getRandomInt(3, 9),
      importance_transport: getRandomInt(7, 10),
      importance_repas: getRandomInt(6, 10),
      satisfaction_evenements: getRandomInt(5, 10),
      importance_evenements: getRandomInt(5, 10),
      periode_role: getRandom(['Novembre 2025', 'Décembre 2025', 'Janvier 2026']),
      periode_agenda: getRandom(['Janvier 2026', 'Décembre 2025']),
      difficulte_role_logement: getRandomInt(1, 6),
      difficulte_agenda_logement: getRandomInt(1, 6),

      // Opérationnel
      vst_training: getRandom(['Oui', 'Non']),
      satisfaction_checkin: getRandom(['Oui', 'Non']),
      checkout_realise: getRandom(['Oui', 'Non']),
      centre_volontaire: getRandom(['Oui', 'Non']),
      points_rdv_clairs: getRandom(['Oui', 'Non']),
      superviseur_joignable: getRandom(['Oui', 'Non']),
      formation_evacuation: getRandom(['Oui', 'Non']),
      intensite_mission: getRandom(['En sur-nombre', 'En sous-nombre', 'Au bon nombre']),
      rotation_poste: getRandom(['Oui', 'Non']),
      info_materiel: getRandom(['Oui', 'Non']),
      equipe_changeante: getRandom(['Oui', 'Non']),
      eloignement_degrade: getRandom(['Oui', 'Non']),
      point_fort: getRandom(FEEDBACK_POINTS_FORTS),
      conseil_alpes2030: getRandom(FEEDBACK_CONSEILS),

      // Futur
      candidat_la2028: getRandom(['Oui', 'Non', 'Je réfléchis encore']),
      candidat_alpes2030: getRandom(['Oui', 'Non', 'Je réfléchis encore']),
      candidat_brisbane2032: getRandom(['Oui', 'Non', 'Je réfléchis encore']),
      autres_elements: getRandom(AUTRES_ELEMENTS),

      // Divers
      connaissance_association: getRandom(['Oui', 'Non']),
      recevoir_resultats: getRandom(['Oui', 'Non']),
      email: email,
      rejoindre_association: getRandom(['Oui', 'Non'])
    };

    const query = 'INSERT INTO survey_responses (email, answers, version) VALUES ($1, $2, $3)';
    await pool.query(query, [email, JSON.stringify(answers), 'V4']);
    console.log(`✓ Generated data for: ${email} (Sites: ${sites.join(', ')})`);
  }
  
  // Verify data count
  const countResult = await pool.query('SELECT COUNT(*) FROM survey_responses');
  console.log(`\n✅ Total records in database: ${countResult.rows[0].count}`);
  
  await pool.end();
}

generateData().catch(err => {
  console.error(err);
  process.exit(1);
});
