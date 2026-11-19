CREATE TABLE projets (
  position INTEGER PRIMARY KEY,
  id TEXT NOT NULL UNIQUE,
  nom TEXT NOT NULL,
  categorie TEXT NOT NULL,
  annee TEXT NOT NULL,
  imageAlt TEXT NOT NULL,
  style TEXT NOT NULL,
  accroche TEXT NOT NULL,
  description TEXT NOT NULL,
  livrables TEXT NOT NULL,
  cover TEXT,
  generated INTEGER NOT NULL DEFAULT 0 CHECK (generated IN (0, 1))
) STRICT;

CREATE TABLE oeuvres (
  position INTEGER PRIMARY KEY,
  id TEXT NOT NULL UNIQUE,
  titre TEXT NOT NULL,
  sousTitre TEXT NOT NULL,
  description TEXT,
  categorie TEXT NOT NULL CHECK (categorie IN ('Dessin', 'Peinture', 'Autre')),
  image TEXT NOT NULL,
  alt TEXT NOT NULL,
  materiel TEXT NOT NULL CHECK (json_valid(materiel) AND json_type(materiel) = 'array'),
  annee TEXT
) STRICT;

PRAGMA user_version = 1;
