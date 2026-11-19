import { resolve } from 'node:path';
import { DatabaseSync } from 'node:sqlite';

const columns = {
  projets: ['id', 'nom', 'categorie', 'annee', 'imageAlt', 'style', 'accroche',
    'description', 'livrables', 'cover', 'generated'],
  oeuvres: ['id', 'titre', 'sousTitre', 'description', 'categorie', 'image', 'alt',
    'materiel', 'annee'],
};

export const databasePath = resolve(process.env.PORTFOLIO_DATABASE || 'src/data/portfolio.sqlite');

export function openDatabase(readOnly = true) {
  const database = new DatabaseSync(databasePath, { readOnly });
  database.exec('PRAGMA busy_timeout = 5000');
  return database;
}

function tableColumns(collection) {
  if (!Object.hasOwn(columns, collection)) throw new Error('Collection inconnue.');
  return columns[collection];
}

function toEntry(collection, row) {
  const entry = { ...row };
  if (collection === 'projets') entry.generated = Boolean(entry.generated);
  else entry.materiel = JSON.parse(entry.materiel);
  return entry;
}

export function listEntries(collection) {
  const fields = tableColumns(collection);
  const database = openDatabase();
  try {
    return database.prepare(`SELECT ${fields.join(', ')} FROM ${collection} ORDER BY position`)
      .all().map((row) => toEntry(collection, row));
  } finally {
    database.close();
  }
}

export function findEntry(database, collection, id) {
  const fields = tableColumns(collection);
  const row = database.prepare(`SELECT ${fields.join(', ')} FROM ${collection} WHERE id = ?`).get(id);
  return row && toEntry(collection, row);
}

export function saveEntry(database, collection, entry, creating) {
  const [primaryKey, ...fields] = tableColumns(collection);
  const values = fields.map((field) => {
    if (field === 'generated') return Number(Boolean(entry.generated));
    if (field === 'materiel') return JSON.stringify(entry.materiel);
    return entry[field] ?? null;
  });
  if (creating) {
    const placeholders = fields.map(() => '?').join(', ');
    database.prepare(`INSERT INTO ${collection} (${primaryKey}, ${fields.join(', ')}) VALUES (?, ${placeholders})`)
      .run(entry.id, ...values);
  } else {
    const assignments = fields.map((field) => `${field} = ?`).join(', ');
    database.prepare(`UPDATE ${collection} SET ${assignments} WHERE id = ?`).run(...values, entry.id);
  }
}
