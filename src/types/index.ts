
export type User = {
  id: string;
  nom: string;
  prenom: string;
  poste: string;
  equipe: string;
  admin: boolean;
};

export type Contact = {
  id: string;
  nom: string;
  prenom: string;
  telephone: string;
  email: string;
  clientId: string;
};

export type Client = {
  id: string;
  nom: string;
  contacts: Contact[];
  projets: string[]; // IDs of projects
};

export type ProjectStatus = 
  | "appel-offre"
  | "propal"
  | "conception-consultant"
  | "conception-crea"
  | "developpement"
  | "retour-equipe"
  | "retour-client"
  | "termine";

export type GrainStatus = ProjectStatus;

export type GrainType = 
  | "propale"
  | "budget"
  | "video"
  | "maquette"
  | "e-learning";

export const GRAIN_TYPE_LABELS: Record<GrainType, string> = {
  "propale": "Propale",
  "budget": "Budget", 
  "video": "Vidéo",
  "maquette": "Maquette",
  "e-learning": "E-Learning"
};

export type Grain = {
  id: string;
  titre: string;
  description: string;
  status: GrainStatus;
  projetId: string;
  type?: GrainType;
  lien?: string;
};

export type Project = {
  id: string;
  nom: string;
  description: string;
  status: ProjectStatus;
  clientId: string;
  grains: Grain[];
  chefDeProjetIds?: string[];
  equipeCreatifIds?: string[];
  equipeTechniqueIds?: string[];
  contactIds?: string[];
};

export const PROJECT_STATUS_LABELS: Record<ProjectStatus, string> = {
  "appel-offre": "Appel d'offre",
  "propal": "Propal",
  "conception-consultant": "Conception Consultant",
  "conception-crea": "Conception Créa",
  "developpement": "Développement",
  "retour-equipe": "Retour Équipe",
  "retour-client": "Retour Client",
  "termine": "Terminé"
};

export const PROJECT_STATUS_COLORS: Record<ProjectStatus, string> = {
  "appel-offre": "bg-status-appel-offre text-white",
  "propal": "bg-status-propal text-white",
  "conception-consultant": "bg-status-conception-consultant text-white",
  "conception-crea": "bg-status-conception-crea text-white",
  "developpement": "bg-status-developpement text-white",
  "retour-equipe": "bg-status-retour-equipe text-white",
  "retour-client": "bg-status-retour-client text-white",
  "termine": "bg-status-termine text-white"
};

export const ALL_PROJECT_STATUSES: ProjectStatus[] = [
  "appel-offre",
  "propal",
  "conception-consultant",
  "conception-crea",
  "developpement",
  "retour-equipe",
  "retour-client",
  "termine"
];

export const ALL_GRAIN_TYPES: GrainType[] = [
  "propale",
  "budget",
  "video",
  "maquette",
  "e-learning"
];
