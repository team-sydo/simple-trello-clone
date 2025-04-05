
import { User, Client, Contact, Project, Grain, ProjectStatus, GrainType } from "../types";

// Mock Users
export const mockUsers: User[] = [
  {
    id: "user1",
    nom: "Dupont",
    prenom: "Jean",
    poste: "Chef de Projet",
    equipe: "Production",
    admin: true
  },
  {
    id: "user2",
    nom: "Martin",
    prenom: "Sophie",
    poste: "Designer",
    equipe: "Créatif",
    admin: false
  },
  {
    id: "user3",
    nom: "Leroy",
    prenom: "Thomas",
    poste: "Développeur",
    equipe: "Technique",
    admin: false
  },
  {
    id: "user4",
    nom: "Bernard",
    prenom: "Léa",
    poste: "Consultante",
    equipe: "Stratégie",
    admin: false
  },
];

// Mock Contacts
export const mockContacts: Contact[] = [
  {
    id: "contact1",
    nom: "Petit",
    prenom: "Pierre",
    telephone: "01 23 45 67 89",
    email: "pierre.petit@example.com",
    clientId: "client1"
  },
  {
    id: "contact2",
    nom: "Dubois",
    prenom: "Marie",
    telephone: "01 23 45 67 90",
    email: "marie.dubois@example.com",
    clientId: "client1"
  },
  {
    id: "contact3",
    nom: "Moreau",
    prenom: "Julien",
    telephone: "01 23 45 67 91",
    email: "julien.moreau@example.com",
    clientId: "client2"
  },
  {
    id: "contact4",
    nom: "Lambert",
    prenom: "Claire",
    telephone: "01 23 45 67 92",
    email: "claire.lambert@example.com",
    clientId: "client3"
  },
];

// Mock Clients
export const mockClients: Client[] = [
  {
    id: "client1",
    nom: "Société A",
    contacts: mockContacts.filter(contact => contact.clientId === "client1"),
    projets: ["project1", "project2"]
  },
  {
    id: "client2",
    nom: "Entreprise B",
    contacts: mockContacts.filter(contact => contact.clientId === "client2"),
    projets: ["project3"]
  },
  {
    id: "client3",
    nom: "Compagnie C",
    contacts: mockContacts.filter(contact => contact.clientId === "client3"),
    projets: ["project4", "project5"]
  },
];

// Mock Grains
export const mockGrains: Grain[] = [
  // Project 1 grains
  {
    id: "grain1",
    titre: "Analyse des besoins",
    description: "Réaliser une analyse détaillée des besoins du client",
    status: "conception-consultant",
    projetId: "project1",
    type: "propale",
    lien: "https://example.com/analyses/client1"
  },
  {
    id: "grain2",
    titre: "Maquettes UI",
    description: "Créer les maquettes d'interface utilisateur",
    status: "conception-crea",
    projetId: "project1",
    type: "maquette",
    lien: "https://figma.com/file/ui-mockups"
  },
  {
    id: "grain3",
    titre: "Développement frontend",
    description: "Implémenter les interfaces utilisateur",
    status: "developpement",
    projetId: "project1",
    type: "e-learning"
  },
  
  // Project 2 grains
  {
    id: "grain4",
    titre: "Proposition commerciale",
    description: "Rédiger la proposition commerciale",
    status: "propal",
    projetId: "project2",
    type: "propale",
    lien: "https://drive.com/proposal-doc"
  },
  {
    id: "grain5",
    titre: "Estimation technique",
    description: "Réaliser l'estimation technique du projet",
    status: "conception-consultant",
    projetId: "project2",
    type: "budget"
  },
  
  // Project 3 grains
  {
    id: "grain6",
    titre: "Architecture du système",
    description: "Concevoir l'architecture technique",
    status: "conception-consultant",
    projetId: "project3",
    type: "propale"
  },
  {
    id: "grain7",
    titre: "Développement backend",
    description: "Développer les APIs et la logique métier",
    status: "developpement",
    projetId: "project3",
    type: "e-learning",
    lien: "https://github.com/backend-repo"
  },
  {
    id: "grain8",
    titre: "Tests fonctionnels",
    description: "Réaliser les tests fonctionnels",
    status: "retour-equipe",
    projetId: "project3",
    type: "maquette"
  },
  
  // Project 4 grains
  {
    id: "grain9",
    titre: "Analyse concurrentielle",
    description: "Analyser le positionnement des concurrents",
    status: "appel-offre",
    projetId: "project4",
    type: "budget",
    lien: "https://slides.com/market-analysis"
  },
  
  // Project 5 grains
  {
    id: "grain10",
    titre: "Revue client finale",
    description: "Présentation finale au client",
    status: "termine",
    projetId: "project5",
    type: "video",
    lien: "https://vimeo.com/final-presentation"
  },
];

// Mock Projects
export const mockProjects: Project[] = [
  {
    id: "project1",
    nom: "Refonte Site Web",
    description: "Refonte complète du site web corporate avec nouvelles fonctionnalités",
    status: "developpement",
    clientId: "client1",
    grains: mockGrains.filter(grain => grain.projetId === "project1"),
    chefDeProjetIds: ["user1"],
    equipeCreatifIds: ["user2"],
    equipeTechniqueIds: ["user3"],
    contactIds: ["contact1", "contact2"]
  },
  {
    id: "project2",
    nom: "Application Mobile",
    description: "Développement d'une application mobile iOS et Android",
    status: "propal",
    clientId: "client1",
    grains: mockGrains.filter(grain => grain.projetId === "project2"),
    chefDeProjetIds: ["user1"],
    equipeCreatifIds: ["user2"],
    equipeTechniqueIds: ["user3"]
  },
  {
    id: "project3",
    nom: "Système CRM",
    description: "Mise en place d'un système CRM personnalisé",
    status: "developpement",
    clientId: "client2",
    grains: mockGrains.filter(grain => grain.projetId === "project3"),
    chefDeProjetIds: ["user1", "user4"],
    equipeTechniqueIds: ["user3"],
    contactIds: ["contact3"]
  },
  {
    id: "project4",
    nom: "Étude de Marché",
    description: "Réalisation d'une étude de marché pour un nouveau produit",
    status: "appel-offre",
    clientId: "client3",
    grains: mockGrains.filter(grain => grain.projetId === "project4"),
    chefDeProjetIds: ["user4"],
    contactIds: ["contact4"]
  },
  {
    id: "project5",
    nom: "Identité Visuelle",
    description: "Création d'une nouvelle identité visuelle",
    status: "termine",
    clientId: "client3",
    grains: mockGrains.filter(grain => grain.projetId === "project5"),
    chefDeProjetIds: ["user1"], 
    equipeCreatifIds: ["user2"],
    contactIds: ["contact4"]
  },
];

// Helper function to get projects with their full data structure
export const getProjectsWithData = () => {
  return mockProjects.map(project => {
    const client = mockClients.find(client => client.id === project.clientId);
    
    // Get actual user objects for team members
    const chefsDeProjet = project.chefDeProjetIds ? 
      mockUsers.filter(user => project.chefDeProjetIds?.includes(user.id)) : [];
    
    const equipeCreatif = project.equipeCreatifIds ?
      mockUsers.filter(user => project.equipeCreatifIds?.includes(user.id)) : [];
      
    const equipeTechnique = project.equipeTechniqueIds ?
      mockUsers.filter(user => project.equipeTechniqueIds?.includes(user.id)) : [];
      
    const contacts = project.contactIds ?
      mockContacts.filter(contact => project.contactIds?.includes(contact.id)) : [];
      
    return {
      ...project,
      client,
      chefsDeProjet,
      equipeCreatif,
      equipeTechnique,
      contacts
    };
  });
};

// Helper function to get a project by ID with its full data structure
export const getProjectById = (projectId: string) => {
  const project = mockProjects.find(p => p.id === projectId);
  if (!project) return null;
  
  const client = mockClients.find(c => c.id === project.clientId);
  const grains = mockGrains.filter(g => g.projetId === projectId);
  
  // Get actual user objects for team members
  const chefsDeProjet = project.chefDeProjetIds ? 
    mockUsers.filter(user => project.chefDeProjetIds?.includes(user.id)) : [];
  
  const equipeCreatif = project.equipeCreatifIds ?
    mockUsers.filter(user => project.equipeCreatifIds?.includes(user.id)) : [];
    
  const equipeTechnique = project.equipeTechniqueIds ?
    mockUsers.filter(user => project.equipeTechniqueIds?.includes(user.id)) : [];
    
  const contacts = project.contactIds ?
    mockContacts.filter(contact => project.contactIds?.includes(contact.id)) : [];
    
  return {
    ...project,
    client,
    grains,
    chefsDeProjet,
    equipeCreatif,
    equipeTechnique,
    contacts
  };
};

// Helper function to get clients with contacts
export const getClientsWithContacts = () => {
  return mockClients.map(client => {
    return {
      ...client,
      contacts: client.contacts
    };
  });
};
