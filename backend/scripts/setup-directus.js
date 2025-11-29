/**
 * Directus bootstrap script for base collections.
 *
 * Collections created:
 * - cards
 * - pages
 * - posts
 * - categories
 *
 * Fields include basic title/slug/content plus a posts.category → categories relation.
 *
 * Usage (from backend folder, Directus running on http://localhost:8055):
 *   setx DIRECTUS_EMAIL "admin@example.com"
 *   setx DIRECTUS_PASSWORD "your-password"
 *   setx DIRECTUS_URL "http://localhost:8055"
 *   # then restart the shell or set $env: vars for the current session
 *   node scripts/setup-directus.js
 */

const DIRECTUS_URL = process.env.DIRECTUS_URL || 'http://localhost:8055';
const DIRECTUS_EMAIL = process.env.DIRECTUS_EMAIL || 'admin@example.com';
const DIRECTUS_PASSWORD = process.env.DIRECTUS_PASSWORD || 'thoma1ss';

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

async function ensureCollection(token, collection) {
  const exists = await api(`/collections/${collection.collection}`, { token }).catch(() => null);
  if (exists) {
    console.log(`✔ collection ${collection.collection} already exists`);
    return;
  }
  await api('/collections', {
    method: 'POST',
    token,
    body: collection,
  });
  console.log(`+ created collection ${collection.collection}`);
}

async function ensureField(token, collection, fieldPayload) {
  const fieldName = fieldPayload.field;
  const exists = await api(`/fields/${collection}/${fieldName}`, { token }).catch(() => null);
  if (exists) {
    console.log(`✔ field ${collection}.${fieldName} already exists`);
    return;
  }
  await api(`/fields/${collection}`, {
    method: 'POST',
    token,
    body: fieldPayload,
  });
  console.log(`+ created field ${collection}.${fieldName}`);
}

async function ensureRelation(token, relationPayload) {
  const { many_collection, many_field } = relationPayload;
  const all = await api('/relations', { token });
  const exists = all.data.find(
    (r) => r.many_collection === many_collection && r.many_field === many_field
  );
  if (exists) {
    console.log(`✔ relation ${many_collection}.${many_field} already exists`);
    return;
  }
  await api('/relations', { method: 'POST', token, body: relationPayload });
  console.log(`+ created relation ${many_collection}.${many_field}`);
}

async function main() {
  const token = await login();
  console.log('Authenticated to Directus');

  // Collections definitions
  const collections = [
    {
      collection: 'cards',
      meta: {
        icon: 'credit_card',
        display_template: '{{title}}',
      },
      schema: {
        name: 'cards',
        schema: 'public',
        comment: 'Homepage/cards content',
      },
    },
    {
      collection: 'pages',
      meta: {
        icon: 'article',
        display_template: '{{title}}',
      },
      schema: {
        name: 'pages',
        schema: 'public',
        comment: 'Static pages',
      },
    },
    {
      collection: 'posts',
      meta: {
        icon: 'subject',
        display_template: '{{title}}',
      },
      schema: {
        name: 'posts',
        schema: 'public',
        comment: 'Blog posts',
      },
    },
    {
      collection: 'categories',
      meta: {
        icon: 'folder',
        display_template: '{{name}}',
      },
      schema: {
        name: 'categories',
        schema: 'public',
        comment: 'Post categories',
      },
    },
    {
      collection: 'team_members',
      meta: {
        icon: 'group',
        display_template: '{{first_name}} {{last_name}}',
      },
      schema: {
        name: 'team_members',
        schema: 'public',
        comment: 'Team members and roles',
      },
    },
    {
      collection: 'faq',
      meta: {
        icon: 'help',
        display_template: '{{question}}',
      },
      schema: {
        name: 'faq',
        schema: 'public',
        comment: 'Frequently asked questions',
      },
    },
    {
      collection: 'social_links',
      meta: {
        icon: 'share',
        display_template: '{{name}}',
      },
      schema: {
        name: 'social_links',
        schema: 'public',
        comment: 'Social network links',
      },
    },
  ];

  for (const c of collections) {
    await ensureCollection(token, c);
  }

  // Fields per collection
  const addFields = async () => {
    // cards
    await ensureField(token, 'cards', {
      field: 'id',
      type: 'integer',
      meta: { interface: 'integer', hidden: false, readonly: true },
      schema: {
        name: 'id',
        table: 'cards',
        data_type: 'integer',
        is_primary_key: true,
        has_auto_increment: true,
        is_nullable: false,
      },
    });
    await ensureField(token, 'cards', {
      field: 'title',
      type: 'string',
      meta: { interface: 'input', required: true },
      schema: {
        name: 'title',
        table: 'cards',
        data_type: 'varchar',
        max_length: 255,
        is_nullable: false,
      },
    });
    await ensureField(token, 'cards', {
      field: 'description',
      type: 'text',
      meta: { interface: 'textarea' },
      schema: {
        name: 'description',
        table: 'cards',
        data_type: 'text',
        is_nullable: true,
      },
    });
    await ensureField(token, 'cards', {
      field: 'image',
      type: 'string',
      meta: { interface: 'file', options: { folder: null } },
      schema: {
        name: 'image',
        table: 'cards',
        data_type: 'uuid',
        is_nullable: true,
      },
    });
    await ensureField(token, 'cards', {
      field: 'link',
      type: 'string',
      meta: { interface: 'input' },
      schema: {
        name: 'link',
        table: 'cards',
        data_type: 'varchar',
        max_length: 255,
        is_nullable: true,
      },
    });
    await ensureField(token, 'cards', {
      field: 'sort',
      type: 'integer',
      meta: { interface: 'numeric', options: { min: 0 } },
      schema: {
        name: 'sort',
        table: 'cards',
        data_type: 'integer',
        is_nullable: true,
      },
    });

    // pages
    await ensureField(token, 'pages', {
      field: 'id',
      type: 'integer',
      meta: { interface: 'integer', hidden: false, readonly: true },
      schema: {
        name: 'id',
        table: 'pages',
        data_type: 'integer',
        is_primary_key: true,
        has_auto_increment: true,
        is_nullable: false,
      },
    });
    await ensureField(token, 'pages', {
      field: 'title',
      type: 'string',
      meta: { interface: 'input', required: true },
      schema: {
        name: 'title',
        table: 'pages',
        data_type: 'varchar',
        max_length: 255,
        is_nullable: false,
      },
    });
    await ensureField(token, 'pages', {
      field: 'slug',
      type: 'string',
      meta: { interface: 'input' },
      schema: {
        name: 'slug',
        table: 'pages',
        data_type: 'varchar',
        max_length: 255,
        is_nullable: false,
        is_unique: true,
      },
    });
    await ensureField(token, 'pages', {
      field: 'content',
      type: 'text',
      meta: { interface: 'input-rich-text-md' },
      schema: {
        name: 'content',
        table: 'pages',
        data_type: 'text',
        is_nullable: true,
      },
    });
    await ensureField(token, 'pages', {
      field: 'status',
      type: 'string',
      meta: {
        interface: 'select-dropdown',
        options: { choices: ['draft', 'published'] },
        default_value: 'draft',
      },
      schema: {
        name: 'status',
        table: 'pages',
        data_type: 'varchar',
        max_length: 50,
        is_nullable: false,
        default_value: 'draft',
      },
    });
    await ensureField(token, 'pages', {
      field: 'published_at',
      type: 'timestamp',
      meta: { interface: 'datetime' },
      schema: {
        name: 'published_at',
        table: 'pages',
        data_type: 'timestamp',
        is_nullable: true,
      },
    });
    await ensureField(token, 'pages', {
      field: 'seo_title',
      type: 'string',
      meta: { interface: 'input' },
      schema: {
        name: 'seo_title',
        table: 'pages',
        data_type: 'varchar',
        max_length: 255,
        is_nullable: true,
      },
    });
    await ensureField(token, 'pages', {
      field: 'seo_description',
      type: 'string',
      meta: { interface: 'input' },
      schema: {
        name: 'seo_description',
        table: 'pages',
        data_type: 'varchar',
        max_length: 320,
        is_nullable: true,
      },
    });
    await ensureField(token, 'pages', {
      field: 'seo_image',
      type: 'uuid',
      meta: { interface: 'file', options: { folder: null } },
      schema: {
        name: 'seo_image',
        table: 'pages',
        data_type: 'uuid',
        is_nullable: true,
      },
    });

    // categories
    await ensureField(token, 'categories', {
      field: 'id',
      type: 'integer',
      meta: { interface: 'integer', hidden: false, readonly: true },
      schema: {
        name: 'id',
        table: 'categories',
        data_type: 'integer',
        is_primary_key: true,
        has_auto_increment: true,
        is_nullable: false,
      },
    });
    await ensureField(token, 'categories', {
      field: 'name',
      type: 'string',
      meta: { interface: 'input', required: true },
      schema: {
        name: 'name',
        table: 'categories',
        data_type: 'varchar',
        max_length: 255,
        is_nullable: false,
      },
    });
    await ensureField(token, 'categories', {
      field: 'slug',
      type: 'string',
      meta: { interface: 'input' },
      schema: {
        name: 'slug',
        table: 'categories',
        data_type: 'varchar',
        max_length: 255,
        is_nullable: false,
        is_unique: true,
      },
    });
    await ensureField(token, 'categories', {
      field: 'description',
      type: 'text',
      meta: { interface: 'textarea' },
      schema: {
        name: 'description',
        table: 'categories',
        data_type: 'text',
        is_nullable: true,
      },
    });

    // posts
    await ensureField(token, 'posts', {
      field: 'id',
      type: 'integer',
      meta: { interface: 'integer', hidden: false, readonly: true },
      schema: {
        name: 'id',
        table: 'posts',
        data_type: 'integer',
        is_primary_key: true,
        has_auto_increment: true,
        is_nullable: false,
      },
    });
    await ensureField(token, 'posts', {
      field: 'title',
      type: 'string',
      meta: { interface: 'input', required: true },
      schema: {
        name: 'title',
        table: 'posts',
        data_type: 'varchar',
        max_length: 255,
        is_nullable: false,
      },
    });
    await ensureField(token, 'posts', {
      field: 'slug',
      type: 'string',
      meta: { interface: 'input' },
      schema: {
        name: 'slug',
        table: 'posts',
        data_type: 'varchar',
        max_length: 255,
        is_nullable: false,
        is_unique: true,
      },
    });
    await ensureField(token, 'posts', {
      field: 'excerpt',
      type: 'text',
      meta: { interface: 'textarea' },
      schema: {
        name: 'excerpt',
        table: 'posts',
        data_type: 'text',
        is_nullable: true,
      },
    });
    await ensureField(token, 'posts', {
      field: 'content',
      type: 'text',
      meta: { interface: 'input-rich-text-md' },
      schema: {
        name: 'content',
        table: 'posts',
        data_type: 'text',
        is_nullable: true,
      },
    });
    await ensureField(token, 'posts', {
      field: 'status',
      type: 'string',
      meta: {
        interface: 'select-dropdown',
        options: { choices: ['draft', 'published'] },
        default_value: 'draft',
      },
      schema: {
        name: 'status',
        table: 'posts',
        data_type: 'varchar',
        max_length: 50,
        is_nullable: false,
        default_value: 'draft',
      },
    });
    await ensureField(token, 'posts', {
      field: 'published_at',
      type: 'timestamp',
      meta: { interface: 'datetime' },
      schema: {
        name: 'published_at',
        table: 'posts',
        data_type: 'timestamp',
        is_nullable: true,
      },
    });
    await ensureField(token, 'posts', {
      field: 'category',
      type: 'integer',
      meta: {
        interface: 'select-dropdown-m2o',
        options: { template: '{{name}}' },
        special: ['m2o'],
      },
      schema: {
        name: 'category',
        table: 'posts',
        data_type: 'integer',
        is_nullable: true,
        foreign_key_table: 'categories',
        foreign_key_column: 'id',
      },
    });
    await ensureField(token, 'posts', {
      field: 'seo_title',
      type: 'string',
      meta: { interface: 'input' },
      schema: {
        name: 'seo_title',
        table: 'posts',
        data_type: 'varchar',
        max_length: 255,
        is_nullable: true,
      },
    });
    await ensureField(token, 'posts', {
      field: 'seo_description',
      type: 'string',
      meta: { interface: 'input' },
      schema: {
        name: 'seo_description',
        table: 'posts',
        data_type: 'varchar',
        max_length: 320,
        is_nullable: true,
      },
    });
    await ensureField(token, 'posts', {
      field: 'seo_image',
      type: 'uuid',
      meta: { interface: 'file', options: { folder: null } },
      schema: {
        name: 'seo_image',
        table: 'posts',
        data_type: 'uuid',
        is_nullable: true,
      },
    });

    // categories SEO
    await ensureField(token, 'categories', {
      field: 'seo_title',
      type: 'string',
      meta: { interface: 'input' },
      schema: {
        name: 'seo_title',
        table: 'categories',
        data_type: 'varchar',
        max_length: 255,
        is_nullable: true,
      },
    });
    await ensureField(token, 'categories', {
      field: 'seo_description',
      type: 'string',
      meta: { interface: 'input' },
      schema: {
        name: 'seo_description',
        table: 'categories',
        data_type: 'varchar',
        max_length: 320,
        is_nullable: true,
      },
    });
    await ensureField(token, 'categories', {
      field: 'seo_image',
      type: 'uuid',
      meta: { interface: 'file', options: { folder: null } },
      schema: {
        name: 'seo_image',
        table: 'categories',
        data_type: 'uuid',
        is_nullable: true,
      },
    });

    // team_members
    await ensureField(token, 'team_members', {
      field: 'id',
      type: 'integer',
      meta: { interface: 'integer', hidden: false, readonly: true },
      schema: {
        name: 'id',
        table: 'team_members',
        data_type: 'integer',
        is_primary_key: true,
        has_auto_increment: true,
        is_nullable: false,
      },
    });
    await ensureField(token, 'team_members', {
      field: 'first_name',
      type: 'string',
      meta: { interface: 'input', required: true },
      schema: {
        name: 'first_name',
        table: 'team_members',
        data_type: 'varchar',
        max_length: 255,
        is_nullable: false,
      },
    });
    await ensureField(token, 'team_members', {
      field: 'last_name',
      type: 'string',
      meta: { interface: 'input', required: true },
      schema: {
        name: 'last_name',
        table: 'team_members',
        data_type: 'varchar',
        max_length: 255,
        is_nullable: false,
      },
    });
    await ensureField(token, 'team_members', {
      field: 'full_name',
      type: 'string',
      meta: { interface: 'input', required: true },
      schema: {
        name: 'full_name',
        table: 'team_members',
        data_type: 'varchar',
        max_length: 255,
        is_nullable: false,
      },
    });
    await ensureField(token, 'team_members', {
      field: 'slug',
      type: 'string',
      meta: { interface: 'input' },
      schema: {
        name: 'slug',
        table: 'team_members',
        data_type: 'varchar',
        max_length: 255,
        is_nullable: false,
        is_unique: true,
      },
    });
    await ensureField(token, 'team_members', {
      field: 'role_title',
      type: 'string',
      meta: { interface: 'input', required: true },
      schema: {
        name: 'role_title',
        table: 'team_members',
        data_type: 'varchar',
        max_length: 255,
        is_nullable: false,
      },
    });
    await ensureField(token, 'team_members', {
      field: 'category',
      type: 'string',
      meta: {
        interface: 'select-dropdown',
        options: { choices: ['Bureau', "Membres du Conseil d'Administration"] },
      },
      schema: {
        name: 'category',
        table: 'team_members',
        data_type: 'varchar',
        max_length: 255,
        is_nullable: false,
      },
    });
    await ensureField(token, 'team_members', {
      field: 'image',
      type: 'uuid',
      meta: { interface: 'file', options: { folder: null } },
      schema: {
        name: 'image',
        table: 'team_members',
        data_type: 'uuid',
        is_nullable: true,
      },
    });
    await ensureField(token, 'team_members', {
      field: 'sort',
      type: 'integer',
      meta: { interface: 'numeric', options: { min: 0 } },
      schema: {
        name: 'sort',
        table: 'team_members',
        data_type: 'integer',
        is_nullable: true,
      },
    });

    // faq
    await ensureField(token, 'faq', {
      field: 'id',
      type: 'integer',
      meta: { interface: 'integer', hidden: false, readonly: true },
      schema: {
        name: 'id',
        table: 'faq',
        data_type: 'integer',
        is_primary_key: true,
        has_auto_increment: true,
        is_nullable: false,
      },
    });
    await ensureField(token, 'faq', {
      field: 'question',
      type: 'string',
      meta: { interface: 'input', required: true },
      schema: {
        name: 'question',
        table: 'faq',
        data_type: 'varchar',
        max_length: 255,
        is_nullable: false,
      },
    });
    await ensureField(token, 'faq', {
      field: 'slug',
      type: 'string',
      meta: { interface: 'input' },
      schema: {
        name: 'slug',
        table: 'faq',
        data_type: 'varchar',
        max_length: 255,
        is_nullable: false,
        is_unique: true,
      },
    });
    await ensureField(token, 'faq', {
      field: 'answer',
      type: 'text',
      meta: { interface: 'input-rich-text-md' },
      schema: {
        name: 'answer',
        table: 'faq',
        data_type: 'text',
        is_nullable: true,
      },
    });
    await ensureField(token, 'faq', {
      field: 'category',
      type: 'string',
      meta: { interface: 'input' },
      schema: {
        name: 'category',
        table: 'faq',
        data_type: 'varchar',
        max_length: 255,
        is_nullable: true,
      },
    });
    await ensureField(token, 'faq', {
      field: 'sort',
      type: 'integer',
      meta: { interface: 'numeric', options: { min: 0 } },
      schema: {
        name: 'sort',
        table: 'faq',
        data_type: 'integer',
        is_nullable: true,
      },
    });

    // social_links
    await ensureField(token, 'social_links', {
      field: 'id',
      type: 'integer',
      meta: { interface: 'integer', hidden: false, readonly: true },
      schema: {
        name: 'id',
        table: 'social_links',
        data_type: 'integer',
        is_primary_key: true,
        has_auto_increment: true,
        is_nullable: false,
      },
    });
    await ensureField(token, 'social_links', {
      field: 'name',
      type: 'string',
      meta: { interface: 'input', required: true },
      schema: {
        name: 'name',
        table: 'social_links',
        data_type: 'varchar',
        max_length: 255,
        is_nullable: false,
      },
    });
    await ensureField(token, 'social_links', {
      field: 'slug',
      type: 'string',
      meta: { interface: 'input' },
      schema: {
        name: 'slug',
        table: 'social_links',
        data_type: 'varchar',
        max_length: 255,
        is_nullable: false,
        is_unique: true,
      },
    });
    await ensureField(token, 'social_links', {
      field: 'icon',
      type: 'string',
      meta: { interface: 'input' },
      schema: {
        name: 'icon',
        table: 'social_links',
        data_type: 'varchar',
        max_length: 255,
        is_nullable: true,
      },
    });
    await ensureField(token, 'social_links', {
      field: 'url',
      type: 'string',
      meta: { interface: 'input' },
      schema: {
        name: 'url',
        table: 'social_links',
        data_type: 'varchar',
        max_length: 500,
        is_nullable: false,
      },
    });
    await ensureField(token, 'social_links', {
      field: 'sort',
      type: 'integer',
      meta: { interface: 'numeric', options: { min: 0 } },
      schema: {
        name: 'sort',
        table: 'social_links',
        data_type: 'integer',
        is_nullable: true,
      },
    });
  };

  await addFields();

  // Seed team members (upsert by slug)
  const teamMembers = [
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

  const slugify = (str) =>
    str
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

  const upsertMember = async (member) => {
    const slug = slugify(`${member.first_name}-${member.last_name}`);
    const full_name = `${member.first_name} ${member.last_name}`;
    const existing = await api(
      `/items/team_members?filter[slug][_eq]=${encodeURIComponent(slug)}&limit=1`,
      { token }
    );
    const payload = { ...member, slug, full_name };
    if (existing?.data?.length) {
      const id = existing.data[0].id;
      await api(`/items/team_members/${id}`, {
        method: 'PATCH',
        token,
        body: payload,
      });
      console.log(`✔ updated team member ${full_name}`);
    } else {
      await api('/items/team_members', {
        method: 'POST',
        token,
        body: payload,
      });
      console.log(`+ created team member ${full_name}`);
    }
  };

  for (const member of teamMembers) {
    await upsertMember(member);
  }

  console.log('Done.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
