
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Users, User, Building2 } from 'lucide-react';
import EntityTable from '@/components/list/EntityTable';
import { mockUsers, mockClients, mockContacts, getClientsWithContacts } from '@/data/mockData';
import { Client, Contact, User as UserType } from '@/types';
import { useToast } from '@/hooks/use-toast';

const Admin = () => {
  const { toast } = useToast();
  const [users, setUsers] = useState(mockUsers);
  const [clients, setClients] = useState(getClientsWithContacts());
  const [contacts, setContacts] = useState(mockContacts);
  
  // Table columns
  const userColumns = [
    {
      header: 'Nom',
      accessorKey: (user: UserType) => `${user.nom} ${user.prenom}`,
    },
    {
      header: 'Poste',
      accessorKey: 'poste' as keyof UserType,
    },
    {
      header: 'Équipe',
      accessorKey: 'equipe' as keyof UserType,
    },
    {
      header: 'Admin',
      accessorKey: 'admin' as keyof UserType,
      cell: (user: UserType) => (
        <span>{user.admin ? 'Oui' : 'Non'}</span>
      )
    }
  ];
  
  const clientColumns = [
    {
      header: 'Nom',
      accessorKey: 'nom' as keyof Client,
    },
    {
      header: 'Contacts',
      accessorKey: (client: Client) => {
        const clientWithContacts = clients.find(c => c.id === client.id);
        return clientWithContacts?.contacts?.length || 0;
      },
    },
    {
      header: 'Projets',
      accessorKey: (client: Client) => client.projets.length,
    }
  ];
  
  const contactColumns = [
    {
      header: 'Nom',
      accessorKey: (contact: Contact) => `${contact.nom} ${contact.prenom}`,
    },
    {
      header: 'Email',
      accessorKey: 'email' as keyof Contact,
    },
    {
      header: 'Téléphone',
      accessorKey: 'telephone' as keyof Contact,
    },
    {
      header: 'Client',
      accessorKey: (contact: Contact) => {
        const client = clients.find(client => 
          client.id === contact.clientId
        );
        return client ? client.nom : 'N/A';
      },
    }
  ];
  
  // Fake handlers for demo
  const handleAddUser = () => {
    toast({
      title: "Fonctionnalité à implémenter",
      description: "L'ajout d'utilisateurs sera disponible prochainement."
    });
  };
  
  const handleAddClient = () => {
    toast({
      title: "Fonctionnalité à implémenter",
      description: "L'ajout de clients sera disponible prochainement."
    });
  };
  
  const handleAddContact = () => {
    toast({
      title: "Fonctionnalité à implémenter",
      description: "L'ajout de contacts sera disponible prochainement."
    });
  };
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Administration</h1>
      </div>
      
      <Tabs defaultValue="users">
        <TabsList className="mb-6">
          <TabsTrigger value="users">
            <User className="mr-2 h-4 w-4" />
            Utilisateurs
          </TabsTrigger>
          <TabsTrigger value="clients">
            <Building2 className="mr-2 h-4 w-4" />
            Clients
          </TabsTrigger>
          <TabsTrigger value="contacts">
            <Users className="mr-2 h-4 w-4" />
            Contacts
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>Utilisateurs</CardTitle>
                  <CardDescription>Gérez les utilisateurs de l'application</CardDescription>
                </div>
                <Button onClick={handleAddUser}>
                  <Plus className="mr-2 h-4 w-4" />
                  Ajouter
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <EntityTable
                data={users}
                columns={userColumns}
                getRowId={(user) => user.id}
              />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="clients" className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>Clients</CardTitle>
                  <CardDescription>Gérez les clients de l'entreprise</CardDescription>
                </div>
                <Button onClick={handleAddClient}>
                  <Plus className="mr-2 h-4 w-4" />
                  Ajouter
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <EntityTable
                data={clients}
                columns={clientColumns}
                getRowId={(client) => client.id}
              />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="contacts" className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>Contacts</CardTitle>
                  <CardDescription>Gérez les contacts des clients</CardDescription>
                </div>
                <Button onClick={handleAddContact}>
                  <Plus className="mr-2 h-4 w-4" />
                  Ajouter
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <EntityTable
                data={contacts}
                columns={contactColumns}
                getRowId={(contact) => contact.id}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Admin;
