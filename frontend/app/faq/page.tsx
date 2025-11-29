import FaqItem from '@/components/FaqItem';
import directus from '@/lib/directus';
import { readItems } from '@directus/sdk';

type Faq = {
  id: number;
  question: string;
  answer: string;
  category?: string | null;
  sort?: number | null;
};

export const revalidate = 300; // revalidate every 5 minutes

async function fetchFaqs(): Promise<Faq[]> {
  try {
    const items = await directus.request(
      readItems('faq', {
        fields: ['id', 'question', 'answer', 'category', 'sort'],
        sort: ['sort', 'question'],
      })
    );
    return (items as Faq[]) || [];
  } catch (e) {
    console.warn('Failed to fetch FAQ', e);
    return [];
  }
}

function buildFaqSchema(faqs: Faq[]) {
  const mainEntity = faqs.map((f) => ({
    '@type': 'Question',
    name: f.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: f.answer,
    },
  }));

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity,
  };
}

export default async function FaqPage() {
  const faqs = await fetchFaqs();
  const schema = faqs.length ? buildFaqSchema(faqs) : null;

  return (
    <>
      <section className="page-header">
        <div className="container">
          <h1 className="page-title">FAQ</h1>
          <p className="page-subtitle">Foire aux Questions</p>
        </div>
      </section>

      <section className="faq">
        <div className="container">
          <div className="faq-intro">
            <p>
              Vous avez des questions sur Volontaires français ? Retrouvez ici les réponses aux questions les plus
              fréquentes.
            </p>
          </div>

          <div className="faq-list">
            {!faqs.length && <p>Aucune question pour le moment.</p>}
            {faqs.map((faq, index) => (
              <FaqItem key={faq.id || index} number={index + 1} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </div>
      </section>
      {schema && (
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      )}
    </>
  );
}
