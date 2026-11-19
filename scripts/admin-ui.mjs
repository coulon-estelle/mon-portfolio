const definitions = {
  projets: {
    nom: 'Nom du projet',
    categorie: 'Catégorie',
    annee: 'Année ou contexte',
    imageAlt: 'Texte alternatif de l’image',
    accroche: 'Accroche',
    description: 'Description',
    livrables: 'Livrables',
  },
  oeuvres: {
    titre: 'Titre',
    sousTitre: 'Sous-titre',
    description: 'Description',
    categorie: 'Catégorie',
    alt: 'Texte alternatif de l’image',
    materiel: 'Matériel (un élément par ligne)',
    annee: 'Année',
  },
};
const form = document.querySelector('form');
const collection = document.querySelector('#collection');
const selector = document.querySelector('#entry');
const fields = document.querySelector('#fields');
const save = form.querySelector('button[type="submit"]');
const projectActions = document.querySelector('#project-actions');
const newProject = document.querySelector('#new-project');
const status = form.querySelector('[role="status"]');
const required = ['nom', 'titre', 'categorie', 'imageAlt', 'alt'];
let active;
let entries = [];
let original;
let dirty = false;
const maxImageBytes = 10 * 1024 * 1024;
const newEntry = '__new__';
const projectCategories = ['Identité visuelle', 'UI / UX', 'Web design', 'Illustration / Animation'];

async function request(url, options) {
  const response = await fetch(url, options);
  const data = await response.json();
  if (!response.ok) throw new Error(data.error);
  return data;
}

function renderEntry() {
  const creating = active === 'projets' && selector.value === newEntry;
  original = entries.find((entry) => entry.id === selector.value);
  fields.replaceChildren();
  save.disabled = true;
  dirty = false;
  save.textContent = creating ? 'Créer le projet' : 'Enregistrer';
  newProject.disabled = creating;
  if (!original && !creating) return;

  for (const [name, caption] of Object.entries(definitions[active])) {
    const label = document.createElement('label');
    label.textContent = caption;
    const isManagedProject = creating || original?.generated;
    const options = name === 'categorie' && (active === 'oeuvres' || isManagedProject)
      ? (active === 'oeuvres' ? ['Dessin', 'Peinture', 'Autre'] : projectCategories)
      : [];
    const tag = options.length ? 'select'
      : ['description', 'materiel'].includes(name) ? 'textarea' : 'input';
    const control = document.createElement(tag);
    if (tag === 'select') {
      control.append(...options.map((value) => new Option(value, value)));
    }
    if (tag === 'textarea') control.rows = 4;
    if (tag !== 'select') control.maxLength = 5000;
    control.name = name;
    control.required = required.includes(name) || (isManagedProject && ['description', 'annee'].includes(name));
    control.value = name === 'materiel' ? (original?.[name] ?? []).join('\n') : (original?.[name] ?? options[0] ?? '');
    label.append(control);
    fields.append(label);
  }
  const uploadLabel = document.createElement('label');
  uploadLabel.textContent = active === 'projets' ? 'Nouvelle image de couverture' : 'Nouvelle image de l’œuvre';
  const upload = document.createElement('input');
  upload.type = 'file';
  upload.name = 'upload';
  upload.accept = 'image/jpeg,image/png,image/webp';
  upload.required = creating;
  const hint = document.createElement('small');
  hint.id = 'image-upload-hint';
  hint.textContent = 'JPG, PNG ou WebP · 10 Mo maximum.';
  upload.setAttribute('aria-describedby', hint.id);
  upload.addEventListener('change', () => {
    upload.setCustomValidity(
      upload.files[0]?.size > maxImageBytes ? 'Choisis une image de 10 Mo maximum.' : '',
    );
  });
  uploadLabel.append(upload, hint);
  fields.append(uploadLabel);
}

async function loadCollection() {
  collection.disabled = selector.disabled = true;
  selector.replaceChildren();
  entries = [];
  renderEntry();
  active = collection.value;
  projectActions.hidden = true;
  status.textContent = 'Chargement…';
  try {
    entries = await request(`/api/${active}`);
    selector.append(...entries.map((entry) => new Option(entry.nom ?? entry.titre, entry.id)));
    renderEntry();
    projectActions.hidden = active !== 'projets';
    status.textContent = '';
  } catch (error) {
    status.textContent = error.message;
  } finally {
    collection.disabled = selector.disabled = false;
  }
}

function confirmDiscard() {
  return !dirty || window.confirm('Abandonner les modifications non enregistrées ?');
}
collection.addEventListener('change', () => {
  if (confirmDiscard()) loadCollection();
  else collection.value = active;
});
selector.addEventListener('change', () => {
  if (!confirmDiscard()) {
    selector.value = original?.id ?? newEntry;
    return;
  }
  if (selector.value !== newEntry) selector.querySelector(`option[value="${newEntry}"]`)?.remove();
  status.textContent = '';
  renderEntry();
});
newProject.addEventListener('click', () => {
  if (!confirmDiscard()) return;
  selector.append(new Option('Nouveau projet', newEntry, false, true));
  renderEntry();
  fields.querySelector('[name="nom"]').focus();
  status.textContent = '';
});
fields.addEventListener('input', () => {
  dirty = true;
  save.disabled = false;
});
window.addEventListener('beforeunload', (event) => {
  if (dirty) event.preventDefault();
});

function readImage(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result.split(',')[1]);
    reader.onerror = () => reject(new Error('Impossible de lire cette image.'));
    reader.readAsDataURL(file);
  });
}

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  if (!dirty || save.disabled) return;
  const values = Object.fromEntries(new FormData(form));
  const creating = selector.value === newEntry;
  const upload = values.upload;
  delete values.upload;
  collection.disabled = selector.disabled = fields.disabled = save.disabled = newProject.disabled = true;
  status.textContent = 'Enregistrement…';
  try {
    const image = upload?.size ? await readImage(upload) : undefined;
    const updated = await request(`/api/${active}`, {
      method: creating ? 'POST' : 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: original?.id, original, values, image }),
    });
    if (creating) {
      entries.push(updated);
      selector.selectedOptions[0].remove();
      selector.append(new Option(updated.nom, updated.id, false, true));
    } else {
      entries[selector.selectedIndex] = updated;
      selector.options[selector.selectedIndex].text = updated.nom ?? updated.titre;
    }
    renderEntry();
    status.textContent = creating ? `Projet créé · /projets/${updated.id}/` : 'Modifications enregistrées dans le projet.';
  } catch (error) {
    status.textContent = error.message;
  } finally {
    collection.disabled = selector.disabled = fields.disabled = false;
    newProject.disabled = selector.value === newEntry;
    save.disabled = !dirty;
  }
});

loadCollection();
