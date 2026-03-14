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

console.log("Using Database URL from .env:", databaseUrl.split('@')[1]); // Log only the host part for security

const pool = new Pool({
  connectionString: databaseUrl,
});

const AGE_OPTS = ['18 – 25 ans', '26 – 35 ans', '36 – 45 ans', '46 – 55 ans', '56 – 65 ans', '+ 65 ans'];
const GENRE_OPTS = ['Femme', 'Homme', 'Non binaire'];
const REGION_OPTS = ['Auvergne-Rhône-Alpes', 'Bourgogne-Franche-Comté', 'Bretagne', 'Grand Est', 'Île-de-France', 'Expatriés français (précisez le pays)'];
const ZONES = ['MILAN', 'CORTINA D’AMPEZZO', 'VERONA', 'VAL DI FIEMME', 'VALTELLINA', 'ANTERSELVA'];
const MISSIONS = ['EVS', 'Assistant Famille Olympique', 'Accréditations / Uniformes', 'Médias', 'Sports', 'Chauffeur', 'Fonction support'];

function getRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function generateData() {
  // Clear old test data if needed, or just add more
  // await pool.query('DELETE FROM survey_responses WHERE email LIKE "thomas.aonzo+%"');

  for (let i = 11; i <= 20; i++) {
    const email = `thomas.aonzo+${i}@gmail.com`;
    const region = getRandom(REGION_OPTS);
    const sites = [getRandom(ZONES)];
    
    const answers = {
      // Profil
      age: getRandom(AGE_OPTS),
      genre: getRandom(GENRE_OPTS),
      region: region,
      region_expat: region.includes('Expatriés') ? 'Italie' : undefined,
      accompagnement: getRandom(['Oui', 'Non']),
      accompagnement_details: 'Besoins de traducteur occasionnel',
      paris2024: getRandom(['Oui', 'Non']),
      autres_jo: getRandom(['Oui', 'Non']),
      autres_hiver: getRandom(['Oui', 'Non']),
      benevole_hiver: getRandom(['Oui', 'Non']),
      reserviste: getRandom(['Oui', 'Non']),
      adherent_vf: getRandom(['Oui', 'Non']),

      // Rôle & Sites
      type_jeux: getRandom(['Sur les Jeux Olympiques', 'Sur les Jeux Paralympiques', 'Sur les deux']),
      sites_zones: sites,
      milan_venues: sites.includes('MILAN') ? ['San Siro – Cérémonie d’ouverture'] : undefined,
      cortina_venues: sites.includes('CORTINA D’AMPEZZO') ? ['Village olympique'] : undefined,
      fiemme_venues: sites.includes('VAL DI FIEMME') ? ['Predazzo Ski Jumping Stadium – Saut à ski / Combiné nordique'] : undefined,
      valtellina_venues: sites.includes('VALTELLINA') ? ['Bormio Stelvio – Ski alpin / Ski alpinisme'] : undefined,
      anterselva_venues: sites.includes('ANTERSELVA') ? ['Südtirol Arena (Anterselva / Antholz) – Biathlon'] : undefined,
      mission_principale: getRandom(MISSIONS),
      redéployé: getRandom(['Oui', 'Non']),
      responsable_equipe: getRandom(['Oui', 'Non']),

      // Vie aux Jeux
      satisfaction_globale: getRandomInt(6, 10),
      satisfaction_integration: getRandomInt(7, 10),
      satisfaction_gestion: getRandomInt(5, 9),
      satisfaction_attentes: getRandomInt(7, 10),
      difficulte_logement: getRandomInt(1, 8),
      prix_logement_nuit: getRandom(['51 - 75 €', '76 - 100 €', '101 - 125 €']),
      prix_logement_global: getRandom(['501 – 700 €', '701 – 1 000 €', '1 001 – 1 300 €']),
      annulation_logement: getRandom(['Oui', 'Non']),
      fraude_logement: getRandom(['Oui', 'Non']),
      temps_transport: getRandom(['1 à 30 min', '31 à 45 min', '46 à 60 min']),
      transport_acceptable: getRandomInt(5, 10),
      satisfaction_transport: getRandomInt(4, 9),
      importance_transport: getRandomInt(8, 10),
      importance_repas: getRandomInt(7, 10),
      satisfaction_evenements: getRandomInt(6, 10),
      importance_evenements: getRandomInt(6, 10),
      periode_role: getRandom(['Novembre 2025', 'Décembre 2025']),
      periode_agenda: getRandom(['Janvier 2026', 'Décembre 2025']),
      difficulte_role_logement: getRandomInt(1, 5),
      difficulte_agenda_logement: getRandomInt(1, 5),

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
      point_fort: 'La solidarité entre volontaires français sur place !',
      conseil_alpes2030: 'Il faut absolument prévoir des navettes pour les volontaires logés loin.',

      // Futur
      candidat_la2028: getRandom(['Oui', 'Non', 'Je réfléchis encore']),
      candidat_alpes2030: getRandom(['Oui', 'Je réfléchis encore']),
      candidat_brisbane2032: getRandom(['Non', 'Je réfléchis encore']),
      autres_elements: 'Une expérience inoubliable malgré les défis logistiques.',

      // Divers
      connaissance_association: getRandom(['Oui', 'Non']),
      recevoir_resultats: 'Oui',
      email: email,
      rejoindre_association: getRandom(['Oui', 'Non'])
    };

    const query = 'INSERT INTO survey_responses (email, answers, version) VALUES ($1, $2, $3)';
    await pool.query(query, [email, JSON.stringify(answers), 'V4']);
    console.log(`Inserted complete mock data for ${email}`);
  }
  await pool.end();
}

generateData().catch(err => {
  console.error(err);
  process.exit(1);
});
