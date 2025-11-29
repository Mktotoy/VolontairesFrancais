import directus from '@/lib/directus';
import { readItems } from '@directus/sdk';

type TeamMember = {
  id: number;
  first_name: string;
  last_name: string;
  full_name?: string | null;
  role_title?: string | null;
  category?: string | null;
  sort?: number | null;
  image?: string | null; // directus_files id
};

const DIRECTUS_URL = process.env.NEXT_PUBLIC_DIRECTUS_URL || 'http://localhost:8055';

export const revalidate = 300; // revalidate every 5 minutes

async function fetchTeam(): Promise<TeamMember[]> {
  try {
    const items = await directus.request(
      readItems('team_members', {
        fields: ['id', 'first_name', 'last_name', 'full_name', 'role_title', 'category', 'sort', 'image'],
        sort: ['sort', 'last_name', 'first_name'],
      })
    );
    return (items as TeamMember[]) || [];
  } catch (e) {
    console.warn('Failed to fetch team members', e);
    return [];
  }
}

function groupByCategory(members: TeamMember[]) {
  return members.reduce<Record<string, TeamMember[]>>((acc, member) => {
    const key = member.category || 'Autres';
    acc[key] = acc[key] || [];
    acc[key].push(member);
    return acc;
  }, {});
}

function getImageUrl(fileId?: string | null) {
  if (!fileId) return null;
  return `${DIRECTUS_URL}/assets/${fileId}`;
}

export default async function EquipePage() {
  const members = await fetchTeam();
  const grouped = groupByCategory(members);
  const categoriesOrder = ['Bureau', "Membres du Conseil d'Administration"];
  const orderedCategories = [
    ...categoriesOrder.filter((c) => grouped[c]),
    ...Object.keys(grouped).filter((c) => !categoriesOrder.includes(c)),
  ];

  return (
    <>
      <section className="page-header">
        <div className="container">
          <h1 className="page-title">Notre équipe</h1>
          <p className="page-subtitle">Le conseil d&apos;administration de Volontaires français</p>
        </div>
      </section>

      <section className="team">
        <div className="container">
          <div className="team-intro">
            <p>
              Notre conseil d&apos;administration est composé de volontaires passionnés et engagés, dédiés à la mission
              de rassembler, soutenir et valoriser la communauté des volontaires français des Jeux Olympiques et
              Paralympiques.
            </p>
          </div>

          {!members.length && <p>Aucun membre enregistré pour le moment.</p>}

          {orderedCategories.map((category) => (
            <div className="team-section" key={category}>
              <h2 className="section-title">{category}</h2>
              <div className="team-grid">
                {grouped[category].map((member) => {
                  const photo = getImageUrl(member.image);
                  const name = member.full_name || `${member.first_name} ${member.last_name}`;
                  return (
                    <div className="team-card" key={member.id}>
                      <div className="team-photo">
                        {photo ? (
                          <img src={photo} alt={name} />
                        ) : (
                          <div className="team-photo-placeholder">{name.slice(0, 1)}</div>
                        )}
                      </div>
                      <div className="team-info">
                        <h3 className="team-name">{name}</h3>
                        {member.role_title && <p className="team-role">{member.role_title}</p>}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
